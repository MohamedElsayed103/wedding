-- Zifaf — order / lead capture
-- Run once (Supabase SQL editor) OR let the Supabase↔GitHub integration apply it.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'new',
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_created_idx on public.orders (created_at desc);

-- Server-only access (secret key bypasses RLS); no public policies.
alter table public.orders enable row level security;
