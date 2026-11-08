-- Private storage bucket for client deliverables.
-- Files live at "<project_id>/<file>". Access policies on storage.objects are defined in
-- 0001_client_portal.sql: admins have full access, clients can read only files of their own projects.
insert into storage.buckets (id, name, public)
values ('deliverables', 'deliverables', false)
on conflict (id) do nothing;
