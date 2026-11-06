create type public.app_role as enum ('admin', 'client');
create type public.contact_plan as enum ('starter', 'growth', 'scale', 'not_sure');
create type public.contact_status as enum ('new', 'read', 'archived');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select public.has_role(auth.uid(), 'admin')
$$;

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  business_name text,
  plan public.contact_plan not null default 'not_sure',
  message text not null,
  source_page text,
  status public.contact_status not null default 'new',
  email_sent boolean not null default false
);
grant select, update on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
alter table public.contact_messages enable row level security;
create policy "Admins read messages" on public.contact_messages for select to authenticated using (public.is_admin());
create policy "Admins update messages" on public.contact_messages for update to authenticated using (public.is_admin()) with check (public.is_admin());

create table public.contact_rate_limits (
  id uuid primary key default gen_random_uuid(),
  ip_hash text not null,
  created_at timestamptz not null default now()
);
create index contact_rate_limits_ip_time on public.contact_rate_limits (ip_hash, created_at);
grant all on public.contact_rate_limits to service_role;
alter table public.contact_rate_limits enable row level security;