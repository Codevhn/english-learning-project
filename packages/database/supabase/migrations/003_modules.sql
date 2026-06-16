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

-- The old constraints assumed Unit → Lesson (flat).
-- In the new architecture lessons live under modules, so:
--   (unit_id, order_index) → multiple modules can each have order_index = 1
--   (unit_id, slug)        → slugs only need to be unique within a module
alter table public.lessons drop constraint lessons_unit_id_order_index_key;
alter table public.lessons drop constraint lessons_unit_id_slug_key;
alter table public.lessons add constraint lessons_module_id_order_index_key
  unique (module_id, order_index);

create index lessons_module_id_idx on public.lessons(module_id);
create index modules_unit_id_idx   on public.modules(unit_id);

-- Expand lesson_type check constraint to include new types used in A1 curriculum
alter table public.lessons drop constraint lessons_lesson_type_check;
alter table public.lessons add constraint lessons_lesson_type_check
  check (lesson_type in ('vocabulary','grammar','listening','reading','speaking','mixed','theory_practice','conversation'));
