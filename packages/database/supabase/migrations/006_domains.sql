-- =============================================
-- Migration 006: Rutas de Enfoque (domain-specific vocabulary tracks)
-- =============================================
-- Domains are an OPTIONAL layer parallel to the CEFR course path — e.g.
-- "Programación", "Oficina", "Viajes". They reuse the exact same
-- modules -> lessons -> exercises engine as the CEFR units, just rooted
-- at a domain instead of a unit. A lesson/exercise belongs to exactly
-- one of {unit chain, domain chain} — never both, never neither.

create table public.domains (
  id           uuid primary key default uuid_generate_v4(),
  slug         text unique not null,
  title        jsonb not null default '{}',
  description  jsonb not null default '{}',
  icon         text not null,
  order_index  integer not null,
  is_published boolean not null default false,
  created_at   timestamptz not null default now()
);

alter table public.domains enable row level security;

create policy "Anyone can view published domains"
  on public.domains for select
  using (is_published = true);

create policy "Admins can manage domains"
  on public.domains for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- A module now belongs to EITHER a unit (CEFR path) OR a domain (Rutas
-- de Enfoque), never both.
alter table public.modules
  alter column unit_id drop not null,
  add column domain_id uuid references public.domains(id) on delete cascade,
  add constraint modules_owner_check check (
    (unit_id is not null and domain_id is null) or
    (unit_id is null and domain_id is not null)
  ),
  add constraint modules_domain_id_order_index_key unique (domain_id, order_index);

-- Lessons under a domain module have no CEFR unit.
alter table public.lessons
  alter column unit_id drop not null;

-- Which domains a user has opted into. Selecting a domain surfaces it
-- in the dashboard; it does not gate or replace the core CEFR path.
create table public.user_domains (
  user_id     uuid not null references public.profiles(id) on delete cascade,
  domain_id   uuid not null references public.domains(id) on delete cascade,
  selected_at timestamptz not null default now(),
  primary key (user_id, domain_id)
);

alter table public.user_domains enable row level security;

create policy "Users can view their own domain selections"
  on public.user_domains for select
  using (auth.uid() = user_id);

create policy "Users can manage their own domain selections"
  on public.user_domains for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own domain selections"
  on public.user_domains for update
  using (auth.uid() = user_id);

create policy "Users can remove their own domain selections"
  on public.user_domains for delete
  using (auth.uid() = user_id);
