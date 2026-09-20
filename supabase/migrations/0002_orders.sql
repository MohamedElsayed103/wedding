-- Zifaf — order / lead capture
-- Safe to run repeatedly (Supabase SQL editor) OR let the Supabase↔GitHub
-- integration apply it. Works whether the table is new or already exists.

-- 1. Create the table if it doesn't exist yet.
create table if not exists public.orders (
  id text primary key default gen_random_uuid()::text,
  status text not null default 'new',
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Bring an EXISTING table (e.g. one created without a status column) up to
--    spec. add column if not exists is a no-op when the column is already there.
alter table public.orders add column if not exists status     text        not null default 'new';
alter table public.orders add column if not exists updated_at timestamptz not null default now();
alter table public.orders add column if not exists created_at timestamptz not null default now();

-- 3. Indexes for the Leads page (newest first) + status filtering.
create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_created_idx on public.orders (created_at desc);

-- 4. Server-only access (secret key bypasses RLS); no public policies.
alter table public.orders enable row level security;
