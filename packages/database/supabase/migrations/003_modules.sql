-- =============================================
-- Migration 003: Add modules table + theory_content to lessons
-- Run this in Supabase SQL Editor BEFORE seed 005_a1_reseed.sql
-- =============================================

-- Modules: sits between units and lessons
create table public.modules (
  id           uuid primary key default uuid_generate_v4(),
  unit_id      uuid not null references public.units(id) on delete cascade,
  order_index  integer not null,
  slug         text not null,
  title        jsonb not null default '{}',
  description  jsonb not null default '{}',
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  unique (unit_id, order_index)
);

alter table public.modules enable row level security;

create policy "Anyone can view published modules"
  on public.modules for select
  using (is_published = true);

-- Add module_id and theory_content to lessons
alter table public.lessons
  add column module_id    uuid references public.modules(id) on delete cascade,
  add column theory_content jsonb;

create index lessons_module_id_idx on public.lessons(module_id);
create index modules_unit_id_idx   on public.modules(unit_id);
