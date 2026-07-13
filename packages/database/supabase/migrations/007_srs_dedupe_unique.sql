-- =============================================
-- Migration 007: Make user_exercise_history one row per (user, exercise)
-- =============================================
-- submit-answer previously inserted a fresh DEFAULT_CARD row on every
-- single answer, so the SM-2 schedule never actually progressed across
-- lesson sessions (only /practice's update-srs path correctly continued
-- an existing schedule). This dedupes any rows that already accumulated
-- and adds a uniqueness constraint so future writes are forced to
-- upsert-and-continue instead of insert-and-reset.

-- Keep only the most recent row per (user_id, exercise_id); break exact
-- timestamp ties deterministically by id.
delete from public.user_exercise_history a
using public.user_exercise_history b
where a.user_id = b.user_id
  and a.exercise_id = b.exercise_id
  and (a.answered_at, a.id) < (b.answered_at, b.id);

alter table public.user_exercise_history
  add constraint user_exercise_history_user_exercise_key unique (user_id, exercise_id);
