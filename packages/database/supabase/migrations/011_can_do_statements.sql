-- =============================================
-- Migration 011: Can-do statements per module (Fase D.1)
-- =============================================
-- CEFR-style "I can..." statements shown as unlockable progress
-- checklist, grouped by CEFR level, instead of raw percentages.

alter table public.modules
  add column can_do_statements jsonb not null default '[]';
