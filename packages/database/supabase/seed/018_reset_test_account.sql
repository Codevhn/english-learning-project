-- 018_reset_test_account.sql
-- Resets one user's progress/XP/streak/achievements/domain selections
-- back to a clean slate. Useful for QA after fixing the domain-lesson
-- XP/streak leakage bug. Does NOT touch the account itself (auth,
-- profile, is_admin) — only learning progress.

do $$
declare
  target_user_id uuid;
begin
  select id into target_user_id from profiles where username = 'TU_USERNAME_AQUI';

  if target_user_id is null then
    raise exception 'No profile found with that username — check the value first.';
  end if;

  delete from user_progress where user_id = target_user_id;
  delete from user_exercise_history where user_id = target_user_id;
  delete from user_achievements where user_id = target_user_id;
  delete from user_domains where user_id = target_user_id;

  update user_stats set
    total_xp = 0,
    current_streak = 0,
    longest_streak = 0,
    last_activity_date = null,
    total_lessons_completed = 0,
    total_words_learned = 0,
    updated_at = now()
  where user_id = target_user_id;
end $$;
