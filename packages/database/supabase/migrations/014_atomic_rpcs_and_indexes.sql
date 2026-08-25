-- =============================================
-- Migration 014: Scalability — atomic RPCs + indexes
-- =============================================
-- Two problems fixed:
-- 1) Race conditions: complete-lesson / submit-answer / update-srs did
--    read-modify-write from JS. Two concurrent requests lost XP or
--    corrupted SM-2 state. These RPCs do atomic in-DB updates.
-- 2) Missing indexes: only 3 secondary indexes existed; the leaderboard
--    sort and common lookups would full-scan at scale.

-- ---------------------------------------------
-- Indexes
-- ---------------------------------------------

-- Leaderboard: ORDER BY total_xp DESC LIMIT n
create index if not exists idx_user_stats_total_xp
  on public.user_stats (total_xp desc);

-- Lesson exercise listings
create index if not exists idx_exercises_lesson
  on public.exercises (lesson_id, order_index);

-- Level exam lookup (module_id is null, lesson_type = level_exam)
create index if not exists idx_lessons_unit_type
  on public.lessons (unit_id, lesson_type)
  where unit_id is not null;

-- Domain path listings
create index if not exists idx_modules_domain
  on public.modules (domain_id, order_index);

-- Daily SRS review queue (next_review_at scan across all users)
create index if not exists idx_user_exercise_history_next_review
  on public.user_exercise_history (next_review_at);

-- ---------------------------------------------
-- Atomic RPC: record an SRS answer (submit-answer / update-srs)
-- Replaces JS read-modify-write of user_exercise_history.
-- p_card fields are the SM-2 OUTPUT computed client-side; this RPC
-- just persists them atomically with upsert semantics.
-- ---------------------------------------------
create or replace function public.record_answer(
  p_exercise_id   uuid,
  p_was_correct   boolean,
  p_ease_factor   numeric,
  p_interval_days integer,
  p_repetitions   integer,
  p_next_review_at timestamptz,
  p_response_time_ms integer default 0,
  p_vocabulary_id uuid default null
)
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.user_exercise_history (
    user_id, exercise_id, vocabulary_id, was_correct, response_time_ms,
    ease_factor, interval_days, repetitions, next_review_at, answered_at
  )
  values (
    auth.uid(), p_exercise_id, p_vocabulary_id, p_was_correct, p_response_time_ms,
    p_ease_factor, p_interval_days, p_repetitions, p_next_review_at, now()
  )
  on conflict (user_id, exercise_id) do update set
    was_correct      = excluded.was_correct,
    response_time_ms = excluded.response_time_ms,
    ease_factor      = excluded.ease_factor,
    interval_days    = excluded.interval_days,
    repetitions      = excluded.repetitions,
    next_review_at   = excluded.next_review_at,
    answered_at      = excluded.answered_at;
$$;

-- ---------------------------------------------
-- Atomic RPC: complete a lesson.
-- Wraps the existing complete_lesson() but derives xp_reward from the
-- lessons row itself so the client can never forge XP, and guards
-- against double-counting XP on repeated completions of an already-
-- completed lesson.
-- ---------------------------------------------
create or replace function public.complete_lesson_secure(
  p_lesson_id uuid,
  p_score     integer
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_xp        integer;
  v_already   boolean;
  v_user_id   uuid := auth.uid();
begin
  if v_user_id is null then
    raise exception 'not authenticated';
  end if;

  select l.xp_reward into v_xp
  from public.lessons l
  where l.id = p_lesson_id and l.is_published = true;
  
  if v_xp is null then
    raise exception 'lesson not found or not published';
  end if;

  select exists (
    select 1 from public.user_progress
    where user_id = v_user_id and lesson_id = p_lesson_id and status = 'completed'
  ) into v_already;

  insert into public.user_progress (user_id, lesson_id, status, score, attempts, completed_at, updated_at)
  values (v_user_id, p_lesson_id, 'completed', greatest(0, least(100, p_score)), 1, now(), now())
  on conflict (user_id, lesson_id) do update set
    status = 'completed',
    score = greatest(user_progress.score, excluded.score),
    attempts = user_progress.attempts + 1,
    completed_at = case when user_progress.status != 'completed' then now() else user_progress.completed_at end,
    updated_at = now();

  -- Award XP only on first completion (replays still bump attempts/score).
  if not v_already then
    update public.user_stats
    set total_xp = total_xp + v_xp,
        total_lessons_completed = total_lessons_completed + 1,
        updated_at = now()
    where user_id = v_user_id;

    perform public.update_streak(v_user_id);
  end if;
end;
$$;

grant execute on function public.complete_lesson_secure(uuid, integer) to authenticated;
grant execute on function public.record_answer(uuid, boolean, numeric, integer, integer, timestamptz, integer, uuid) to authenticated;
