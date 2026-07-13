-- =============================================
-- Migration 004: Add dictation and reverse_translation exercise types
-- =============================================

alter table public.exercises drop constraint exercises_exercise_type_check;
alter table public.exercises add constraint exercises_exercise_type_check
  check (exercise_type in (
    'multiple_choice','fill_blank','word_match','listening',
    'speaking','translation','flashcard','reorder_words',
    'dictation','reverse_translation'
  ));
