-- 020_level_exam_achievement.sql
-- Achievement awarded on passing a level exam (Fase D.2).
-- Run AFTER migrations/012_level_exam.sql.

insert into public.achievements (id, slug, title, description, icon, condition_type, condition_value)
values
  (
    '00000000-0000-0000-0001-000000000012',
    'a1-certificado',
    '{"es": "A1 Certificado", "en": "A1 Certified"}',
    '{"es": "Aprobaste el examen final de nivel A1", "en": "Passed the A1 level exam"}',
    'Award', 'level_exam_passed', 1
  )
on conflict (slug) do update set
  title           = excluded.title,
  description     = excluded.description,
  icon            = excluded.icon,
  condition_type  = excluded.condition_type,
  condition_value = excluded.condition_value;
