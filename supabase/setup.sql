-- Run once in the Supabase SQL Editor. No public/anon table or bucket access.
create table if not exists public.portfolio_projects (
  id text primary key,
  data text not null,
  archived integer not null default 0 check (archived in (0, 1)),
  created_at text not null,
  updated_at text not null,
  owner_id text
);
alter table public.portfolio_projects enable row level security;
revoke all on public.portfolio_projects from anon, authenticated;
grant all on public.portfolio_projects to service_role;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-images', 'portfolio-images', false, 8388608, array['image/png','image/jpeg','image/webp'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

-- Failed/abandoned direct uploads can leave private staging/* objects.
-- Periodically remove staging objects older than one day using the Storage API
-- or dashboard (do not DELETE storage.objects directly).
