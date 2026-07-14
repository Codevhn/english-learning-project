-- 022_a2_unit_and_modules.sql
-- Creates the A2 unit and its first 3 modules (of an eventual 14, per
-- docs/cefr-a2-content-audit.md). Lessons/exercises for these modules
-- ship in separate files (023, 024, 025).

DELETE FROM modules WHERE id IN (
  'b0000001-0000-0000-0000-000000000001',
  'b0000001-0000-0000-0000-000000000002',
  'b0000001-0000-0000-0000-000000000003'
);
DELETE FROM units WHERE id = 'b0000000-0000-0000-0000-000000000001';

INSERT INTO units (id, course_id, order_index, slug, title, description, cefr_level, is_published)
SELECT
  'b0000000-0000-0000-0000-000000000001',
  id,
  2,
  'a2-elemental',
  '{"es": "A2 — Elemental", "en": "A2 — Elementary"}'::jsonb,
  '{"es": "Empieza a narrar en pasado, hablar de planes futuros, comparar cosas y describir tu día a día con más detalle.", "en": "Start narrating in the past, talking about future plans, comparing things, and describing your daily life in more detail."}'::jsonb,
  'A2',
  true
FROM courses WHERE slug = 'ingles-para-hispanohablantes';

INSERT INTO modules (id, unit_id, order_index, slug, title, description, is_published) VALUES
('b0000001-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 1, 'rutinas-diarias-adverbios-frecuencia', '{"es": "Rutinas Diarias y Adverbios de Frecuencia", "en": "Daily Routines and Adverbs of Frequency"}'::jsonb, '{"es": "Aprende vocabulario de rutina diaria y cómo decir con qué frecuencia haces algo.", "en": "Learn daily routine vocabulary and how to say how often you do something."}'::jsonb, true),
('b0000001-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 2, 'presente-continuo', '{"es": "Presente Continuo", "en": "Present Continuous"}'::jsonb, '{"es": "Aprende a hablar de lo que está pasando ahora mismo, y a distinguirlo del presente simple.", "en": "Learn to talk about what is happening right now, and how to tell it apart from the present simple."}'::jsonb, true),
('b0000001-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 3, 'pasado-to-be-comparativos', '{"es": "Pasado de To Be y Comparativos", "en": "Past of To Be and Comparatives"}'::jsonb, '{"es": "Aprende a hablar del pasado con was/were, y a comparar cosas usando adjetivos comparativos y superlativos.", "en": "Learn to talk about the past with was/were, and to compare things using comparative and superlative adjectives."}'::jsonb, true);
