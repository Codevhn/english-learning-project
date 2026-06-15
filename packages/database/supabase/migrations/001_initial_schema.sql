-- =============================================
-- Polyglot Platform — Initial Schema
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- PROFILES
-- =============================================
create table public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  username        text unique not null,
  display_name    text,
  avatar_url      text,
  native_language text not null default 'es',
  ui_language     text not null default 'es',
  is_admin        boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );

  insert into public.user_stats (user_id)
  values (new.id);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =============================================
-- COURSES
-- =============================================
create table public.courses (
  id                uuid primary key default uuid_generate_v4(),
  slug              text unique not null,
  title             jsonb not null default '{}',
  description       jsonb not null default '{}',
  source_language   text not null,
  target_language   text not null,
  cover_image_url   text,
  is_published      boolean not null default false,
  created_at        timestamptz not null default now()
);

alter table public.courses enable row level security;

create policy "Anyone can view published courses"
  on public.courses for select
  using (is_published = true);

create policy "Admins can manage courses"
  on public.courses for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- =============================================
-- UNITS
-- =============================================
create table public.units (
  id            uuid primary key default uuid_generate_v4(),
  course_id     uuid not null references public.courses(id) on delete cascade,
  order_index   integer not null,
  slug          text not null,
  title         jsonb not null default '{}',
  description   jsonb not null default '{}',
  cefr_level    text not null check (cefr_level in ('A1','A2','B1','B2','C1','C2')),
  icon          text,
  is_published  boolean not null default false,
  unique(course_id, slug),
  unique(course_id, order_index)
);

alter table public.units enable row level security;

create policy "Anyone can view published units"
  on public.units for select
  using (is_published = true);

create policy "Admins can manage units"
  on public.units for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- =============================================
-- LESSONS
-- =============================================
create table public.lessons (
  id                  uuid primary key default uuid_generate_v4(),
  unit_id             uuid not null references public.units(id) on delete cascade,
  order_index         integer not null,
  slug                text not null,
  title               jsonb not null default '{}',
  description         jsonb not null default '{}',
  lesson_type         text not null check (lesson_type in ('vocabulary','grammar','listening','reading','speaking','mixed')),
  xp_reward           integer not null default 10,
  estimated_minutes   integer not null default 5,
  is_published        boolean not null default false,
  unique(unit_id, slug),
  unique(unit_id, order_index)
);

alter table public.lessons enable row level security;

create policy "Anyone can view published lessons"
  on public.lessons for select
  using (is_published = true);

create policy "Admins can manage lessons"
  on public.lessons for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- =============================================
-- EXERCISES
-- =============================================
create table public.exercises (
  id              uuid primary key default uuid_generate_v4(),
  lesson_id       uuid not null references public.lessons(id) on delete cascade,
  order_index     integer not null,
  exercise_type   text not null check (exercise_type in (
    'multiple_choice','fill_blank','word_match','listening',
    'speaking','translation','flashcard','reorder_words'
  )),
  prompt          jsonb not null,
  correct_answer  jsonb not null,
  distractors     jsonb,
  explanation     jsonb,
  hint            text,
  media_url       text,
  difficulty      integer not null default 1 check (difficulty between 1 and 5),
  tags            text[] not null default '{}',
  created_at      timestamptz not null default now(),
  unique(lesson_id, order_index)
);

alter table public.exercises enable row level security;

create policy "Authenticated users can view exercises for published lessons"
  on public.exercises for select
  using (
    auth.role() = 'authenticated' and
    exists (
      select 1 from public.lessons l
      where l.id = exercises.lesson_id and l.is_published = true
    )
  );

create policy "Admins can manage exercises"
  on public.exercises for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- =============================================
-- VOCABULARY
-- =============================================
create table public.vocabulary (
  id                uuid primary key default uuid_generate_v4(),
  course_id         uuid not null references public.courses(id) on delete cascade,
  word              text not null,
  translation       jsonb not null default '{}',
  phonetic          text,
  audio_url         text,
  image_url         text,
  part_of_speech    text,
  cefr_level        text not null check (cefr_level in ('A1','A2','B1','B2','C1','C2')),
  example_sentence  jsonb,
  tags              text[] not null default '{}'
);

alter table public.vocabulary enable row level security;

create policy "Authenticated users can view vocabulary"
  on public.vocabulary for select
  using (auth.role() = 'authenticated');

create policy "Admins can manage vocabulary"
  on public.vocabulary for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- =============================================
-- USER PROGRESS
-- =============================================
create table public.user_progress (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  lesson_id     uuid not null references public.lessons(id) on delete cascade,
  status        text not null default 'not_started' check (status in ('not_started','in_progress','completed')),
  score         integer not null default 0 check (score between 0 and 100),
  attempts      integer not null default 0,
  completed_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique(user_id, lesson_id)
);

alter table public.user_progress enable row level security;

create policy "Users can view their own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- =============================================
-- USER EXERCISE HISTORY (SRS)
-- =============================================
create table public.user_exercise_history (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid not null references public.profiles(id) on delete cascade,
  exercise_id       uuid not null references public.exercises(id) on delete cascade,
  vocabulary_id     uuid references public.vocabulary(id) on delete set null,
  was_correct       boolean not null,
  response_time_ms  integer not null default 0,
  answered_at       timestamptz not null default now(),
  ease_factor       numeric not null default 2.5,
  interval_days     integer not null default 1,
  next_review_at    timestamptz not null default now() + interval '1 day',
  repetitions       integer not null default 0
);

create index idx_user_exercise_history_user_next
  on public.user_exercise_history(user_id, next_review_at);

alter table public.user_exercise_history enable row level security;

create policy "Users can view their own exercise history"
  on public.user_exercise_history for select
  using (auth.uid() = user_id);

create policy "Users can insert their own exercise history"
  on public.user_exercise_history for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own exercise history"
  on public.user_exercise_history for update
  using (auth.uid() = user_id);

-- =============================================
-- USER STATS
-- =============================================
create table public.user_stats (
  user_id                   uuid primary key references public.profiles(id) on delete cascade,
  total_xp                  integer not null default 0,
  current_streak            integer not null default 0,
  longest_streak            integer not null default 0,
  last_activity_date        date,
  total_lessons_completed   integer not null default 0,
  total_words_learned       integer not null default 0,
  updated_at                timestamptz not null default now()
);

alter table public.user_stats enable row level security;

create policy "Users can view their own stats"
  on public.user_stats for select
  using (auth.uid() = user_id);

create policy "Users can update their own stats"
  on public.user_stats for update
  using (auth.uid() = user_id);

-- =============================================
-- ACHIEVEMENTS
-- =============================================
create table public.achievements (
  id                uuid primary key default uuid_generate_v4(),
  slug              text unique not null,
  title             jsonb not null default '{}',
  description       jsonb not null default '{}',
  icon              text not null,
  condition_type    text not null,
  condition_value   integer not null
);

alter table public.achievements enable row level security;

create policy "Anyone can view achievements"
  on public.achievements for select
  using (true);

create table public.user_achievements (
  user_id         uuid not null references public.profiles(id) on delete cascade,
  achievement_id  uuid not null references public.achievements(id) on delete cascade,
  earned_at       timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

alter table public.user_achievements enable row level security;

create policy "Users can view their own achievements"
  on public.user_achievements for select
  using (auth.uid() = user_id);

create policy "System can insert achievements"
  on public.user_achievements for insert
  with check (auth.uid() = user_id);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Update streak after activity
create or replace function public.update_streak(p_user_id uuid)
returns void
language plpgsql
security definer
as $$
declare
  v_last_date date;
  v_today date := current_date;
  v_streak integer;
  v_longest integer;
begin
  select last_activity_date, current_streak, longest_streak
  into v_last_date, v_streak, v_longest
  from public.user_stats
  where user_id = p_user_id;

  if v_last_date is null then
    v_streak := 1;
  elsif v_last_date = v_today then
    -- Already studied today, no change
    return;
  elsif v_last_date = v_today - 1 then
    v_streak := v_streak + 1;
  else
    v_streak := 1;
  end if;

  v_longest := greatest(v_streak, coalesce(v_longest, 0));

  update public.user_stats
  set
    current_streak = v_streak,
    longest_streak = v_longest,
    last_activity_date = v_today,
    updated_at = now()
  where user_id = p_user_id;
end;
$$;

-- Award XP and update stats after lesson completion
create or replace function public.complete_lesson(
  p_user_id  uuid,
  p_lesson_id uuid,
  p_score    integer,
  p_xp       integer
)
returns void
language plpgsql
security definer
as $$
begin
  insert into public.user_progress (user_id, lesson_id, status, score, attempts, completed_at, updated_at)
  values (p_user_id, p_lesson_id, 'completed', p_score, 1, now(), now())
  on conflict (user_id, lesson_id) do update
  set
    status = 'completed',
    score = greatest(user_progress.score, excluded.score),
    attempts = user_progress.attempts + 1,
    completed_at = case when user_progress.status != 'completed' then now() else user_progress.completed_at end,
    updated_at = now();

  update public.user_stats
  set
    total_xp = total_xp + p_xp,
    total_lessons_completed = total_lessons_completed + 1,
    updated_at = now()
  where user_id = p_user_id;

  perform public.update_streak(p_user_id);
end;
$$;
