-- Run once in Supabase SQL Editor to sync favorites between devices.
create table if not exists public.favorite_pairs (user_id uuid references auth.users(id) on delete cascade not null, pair text not null, created_at timestamptz not null default now(), primary key (user_id, pair));
alter table public.favorite_pairs enable row level security;
create policy "Users manage their own favorite pairs" on public.favorite_pairs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
