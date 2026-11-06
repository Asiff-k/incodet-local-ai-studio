create type public.project_status as enum ('planning','in_progress','review','live','on_hold');
create type public.milestone_status as enum ('todo','in_progress','done');
create type public.invoice_status as enum ('draft','sent','pending_confirmation','paid','overdue');
create type public.payment_method as enum ('payoneer','wise','paypal','bank_transfer');

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  business_name text,
  email text not null unique check (email = lower(email)),
  user_id uuid unique
);
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null,
  status public.project_status not null default 'planning',
  progress int not null default 0 check (progress between 0 and 100),
  start_date date,
  target_date date,
  summary text
);
create table public.milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  status public.milestone_status not null default 'todo',
  due_date date,
  sort_order int not null default 0
);
create table public.deliverables (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  file_path text,
  external_url text,
  created_at timestamptz not null default now()
);
create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  client_id uuid not null references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  number text unique,
  issue_date date not null default current_date,
  due_date date,
  currency text not null default 'USD' check (currency = 'USD'),
  status public.invoice_status not null default 'draft',
  notes text
);
create table public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  description text not null,
  quantity numeric(12,2) not null default 1,
  unit_price numeric(12,2) not null default 0
);
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  method public.payment_method not null,
  reference text,
  reported_at timestamptz,
  confirmed_at timestamptz,
  confirmed_by uuid
);
create table public.admin_allowlist (email text primary key check (email = lower(email)));

grant select, insert, update, delete on public.clients, public.projects, public.milestones, public.deliverables, public.invoices, public.invoice_items to authenticated;
grant select, update, delete on public.payments to authenticated;
grant all on public.clients, public.projects, public.milestones, public.deliverables, public.invoices, public.invoice_items, public.payments, public.admin_allowlist to service_role;
grant delete on public.contact_messages to authenticated;

alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.milestones enable row level security;
alter table public.deliverables enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;
alter table public.payments enable row level security;
alter table public.admin_allowlist enable row level security;

create or replace function public.current_client_id()
returns uuid language sql stable security definer set search_path = public as $$
  select id from public.clients where user_id = auth.uid() limit 1
$$;

create or replace function public.invoice_client_id(_invoice uuid)
returns uuid language sql stable security definer set search_path = public as $$
  select client_id from public.invoices where id = _invoice
$$;
create or replace function public.project_client_id(_project uuid)
returns uuid language sql stable security definer set search_path = public as $$
  select client_id from public.projects where id = _project
$$;

create policy "admin all" on public.clients for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "client own" on public.clients for select to authenticated using (user_id = auth.uid());
create policy "admin all" on public.projects for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "client own" on public.projects for select to authenticated using (client_id = public.current_client_id());
create policy "admin all" on public.milestones for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "client own" on public.milestones for select to authenticated using (public.project_client_id(project_id) = public.current_client_id());
create policy "admin all" on public.deliverables for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "client own" on public.deliverables for select to authenticated using (public.project_client_id(project_id) = public.current_client_id());
create policy "admin all" on public.invoices for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "client own" on public.invoices for select to authenticated using (client_id = public.current_client_id() and status <> 'draft');
create policy "admin all" on public.invoice_items for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "client own" on public.invoice_items for select to authenticated using (public.invoice_client_id(invoice_id) = public.current_client_id());
create policy "admin all" on public.payments for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "client own" on public.payments for select to authenticated using (public.invoice_client_id(invoice_id) = public.current_client_id());
create policy "admin delete messages" on public.contact_messages for delete to authenticated using (public.is_admin());

-- Invoice numbers INC-YYYY-NNN
create or replace function public.set_invoice_number()
returns trigger language plpgsql security definer set search_path = public as $$
declare y text := to_char(coalesce(new.issue_date, current_date), 'YYYY'); n int;
begin
  if new.number is null or new.number = '' then
    perform pg_advisory_xact_lock(hashtext('invoice_number_' || y));
    select coalesce(max(substring(number from 10)::int), 0) + 1 into n
      from public.invoices where number like 'INC-' || y || '-%';
    new.number := 'INC-' || y || '-' || lpad(n::text, 3, '0');
  end if;
  return new;
end $$;
create trigger invoices_number before insert on public.invoices for each row execute function public.set_invoice_number();

-- Link an auth user to roles and client record by verified email
create or replace function public.link_user_by_email(_user_id uuid, _email text)
returns void language plpgsql security definer set search_path = public as $$
declare e text := lower(trim(_email));
begin
  if e is null or e = '' then return; end if;
  if exists (select 1 from public.admin_allowlist where email = e) then
    insert into public.user_roles(user_id, role) values (_user_id, 'admin') on conflict do nothing;
  end if;
  update public.clients set user_id = _user_id where email = e and (user_id is null or user_id = _user_id);
  if found then
    insert into public.user_roles(user_id, role) values (_user_id, 'client') on conflict do nothing;
  end if;
end $$;
revoke execute on function public.link_user_by_email(uuid, text) from public, anon, authenticated;

create or replace function public.handle_auth_user_signin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.email_confirmed_at is not null then
    perform public.link_user_by_email(new.id, new.email);
  end if;
  return new;
end $$;
create trigger on_auth_user_signin after insert or update of email_confirmed_at, last_sign_in_at on auth.users
  for each row execute function public.handle_auth_user_signin();

-- Callable by the signed-in user to (re)link themselves; uses their own verified email only
create or replace function public.claim_portal_access()
returns void language plpgsql security definer set search_path = public as $$
declare e text; c timestamptz;
begin
  select email, email_confirmed_at into e, c from auth.users where id = auth.uid();
  if c is not null then perform public.link_user_by_email(auth.uid(), e); end if;
end $$;
revoke execute on function public.claim_portal_access() from public, anon;
grant execute on function public.claim_portal_access() to authenticated;

-- Storage: private deliverables bucket, path "<project_id>/<file>"
create policy "deliverables admin all" on storage.objects for all to authenticated
  using (bucket_id = 'deliverables' and public.is_admin()) with check (bucket_id = 'deliverables' and public.is_admin());
create policy "deliverables client read" on storage.objects for select to authenticated
  using (bucket_id = 'deliverables' and public.project_client_id(((storage.foldername(name))[1])::uuid) = public.current_client_id());