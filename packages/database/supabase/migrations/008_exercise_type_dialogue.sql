-- =============================================
-- Migration 008: Add dialogue_fill exercise type
-- =============================================

alter table public.exercises drop constraint exercises_exercise_type_check;
alter table public.exercises add constraint exercises_exercise_type_check
  check (exercise_type in (
    'multiple_choice','fill_blank','word_match','listening',
    'speaking','translation','flashcard','reorder_words',
    'dictation','reverse_translation','word_bank_fill','error_correction',
    'dialogue_fill'
  ));
