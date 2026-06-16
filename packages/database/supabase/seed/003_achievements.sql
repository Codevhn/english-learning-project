-- =============================================
-- Seed: Achievement definitions
-- =============================================
insert into public.achievements (id, slug, title, description, icon, condition_type, condition_value)
values
  -- Lecciones completadas
  (
    '00000000-0000-0000-0001-000000000001',
    'first-lesson',
    '{"es": "Primera lección", "en": "First lesson"}',
    '{"es": "Completaste tu primera lección", "en": "Completed your first lesson"}',
    '🎯', 'lessons_completed', 1
  ),
  (
    '00000000-0000-0000-0001-000000000002',
    'five-lessons',
    '{"es": "Constante", "en": "Consistent"}',
    '{"es": "Completaste 5 lecciones", "en": "Completed 5 lessons"}',
    '📚', 'lessons_completed', 5
  ),
  (
    '00000000-0000-0000-0001-000000000003',
    'ten-lessons',
    '{"es": "Dedicado", "en": "Dedicated"}',
    '{"es": "Completaste 10 lecciones", "en": "Completed 10 lessons"}',
    '🎓', 'lessons_completed', 10
  ),
  (
    '00000000-0000-0000-0001-000000000004',
    'twenty-five-lessons',
    '{"es": "Estudioso", "en": "Scholar"}',
    '{"es": "Completaste 25 lecciones", "en": "Completed 25 lessons"}',
    '🏆', 'lessons_completed', 25
  ),

  -- Rachas
  (
    '00000000-0000-0000-0001-000000000005',
    'streak-3',
    '{"es": "Racha de 3", "en": "3-day streak"}',
    '{"es": "3 días seguidos estudiando", "en": "3 days in a row"}',
    '🔥', 'streak', 3
  ),
  (
    '00000000-0000-0000-0001-000000000006',
    'streak-7',
    '{"es": "Semana completa", "en": "Full week"}',
    '{"es": "7 días seguidos estudiando", "en": "7 days in a row"}',
    '🔥', 'streak', 7
  ),
  (
    '00000000-0000-0000-0001-000000000007',
    'streak-30',
    '{"es": "Mes de fuego", "en": "Month on fire"}',
    '{"es": "30 días seguidos estudiando", "en": "30 days in a row"}',
    '🔥', 'streak', 30
  ),

  -- XP acumulado
  (
    '00000000-0000-0000-0001-000000000008',
    'xp-100',
    '{"es": "Primeros 100 XP", "en": "First 100 XP"}',
    '{"es": "Acumulaste 100 XP", "en": "Earned 100 XP"}',
    '⭐', 'total_xp', 100
  ),
  (
    '00000000-0000-0000-0001-000000000009',
    'xp-500',
    '{"es": "500 XP", "en": "500 XP"}',
    '{"es": "Acumulaste 500 XP", "en": "Earned 500 XP"}',
    '⭐', 'total_xp', 500
  ),
  (
    '00000000-0000-0000-0001-000000000010',
    'xp-1000',
    '{"es": "1000 XP", "en": "1000 XP"}',
    '{"es": "Acumulaste 1000 XP", "en": "Earned 1000 XP"}',
    '⭐', 'total_xp', 1000
  ),

  -- Puntuación perfecta
  (
    '00000000-0000-0000-0001-000000000011',
    'perfect-score',
    '{"es": "Perfeccionista", "en": "Perfectionist"}',
    '{"es": "Completaste una lección con 100% de aciertos", "en": "Completed a lesson with 100% accuracy"}',
    '💎', 'perfect_lesson', 1
  );
