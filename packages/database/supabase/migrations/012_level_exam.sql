-- =============================================
-- Migration 012: Level exams (Fase D.2)
-- =============================================
-- A level exam is a lesson with module_id = NULL (belongs directly to a
-- unit, not any single module) and lesson_type = 'level_exam'. It draws
-- a random subset of a larger exercise bank per attempt and requires a
-- higher pass threshold than a regular lesson (see lib/mastery.ts).

alter table public.lessons drop constraint lessons_lesson_type_check;
alter table public.lessons add constraint lessons_lesson_type_check
  check (lesson_type in (
    'vocabulary','grammar','listening','reading','speaking','mixed',
    'theory_practice','conversation','level_exam'
  ));
