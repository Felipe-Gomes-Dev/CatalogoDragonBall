-- Executar NO MESMO PROJETO Supabase do Flutter. Não altera user_items.
create table if not exists public.dragonball_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  character_id integer not null check (character_id > 0),
  character jsonb not null,
  is_favorite boolean not null default false,
  is_consumed boolean not null default false,
  rating integer not null default 0 check (rating between 0 and 5),
  updated_at timestamptz not null default now(),
  primary key (user_id, character_id),
  constraint consumed_rating check (is_consumed or rating = 0)
);
alter table public.dragonball_items enable row level security;
grant select, insert, update, delete on public.dragonball_items to authenticated;
revoke all on public.dragonball_items from anon;
drop policy if exists dragonball_select_own on public.dragonball_items;
create policy dragonball_select_own on public.dragonball_items for select to authenticated using (auth.uid() = user_id);
drop policy if exists dragonball_insert_own on public.dragonball_items;
create policy dragonball_insert_own on public.dragonball_items for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists dragonball_update_own on public.dragonball_items;
create policy dragonball_update_own on public.dragonball_items for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists dragonball_delete_own on public.dragonball_items;
create policy dragonball_delete_own on public.dragonball_items for delete to authenticated using (auth.uid() = user_id);
