-- Reverie — initial schema
-- Run this ONCE in the Supabase dashboard → SQL Editor → New query → paste → Run.
-- (Only needed because the hosted Supabase MCP requires an interactive login
--  that isn't available to the build agent. After this, everything is automated.)

create table if not exists public.templates (
  id text primary key,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sites (
  id text primary key,
  slug text unique not null,
  status text not null default 'draft',
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sites_slug_idx on public.sites (slug);
create index if not exists sites_status_idx on public.sites (status);

-- Security: these tables are only ever touched server-side with the SECRET
-- key (which bypasses RLS). Turn RLS ON with no policies so the public /
-- publishable (anon) key can neither read nor write them.
alter table public.templates enable row level security;
alter table public.sites enable row level security;
