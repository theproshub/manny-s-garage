create table if not exists public.repair_bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  vehicle text not null,
  issue text not null,
  preferred_date text not null,
  created_at timestamptz not null default now()
);
