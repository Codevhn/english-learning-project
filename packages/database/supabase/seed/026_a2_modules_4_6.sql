-- 026_a2_modules_4_6.sql
-- Creates A2 modules 4-6 (of an eventual 14, per docs/cefr-a2-content-audit.md).
-- Lessons/exercises ship separately (027, 028, 029).
-- Run AFTER 022_a2_unit_and_modules.sql.

DELETE FROM modules WHERE id IN (
  'b0000001-0000-0000-0000-000000000004',
  'b0000001-0000-0000-0000-000000000005',
  'b0000001-0000-0000-0000-000000000006'
);

INSERT INTO modules (id, unit_id, order_index, slug, title, description, is_published) VALUES
('b0000001-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 4, 'pasado-simple-verbos-regulares', '{"es": "Pasado Simple: Verbos Regulares", "en": "Past Simple: Regular Verbs"}'::jsonb, '{"es": "Aprende a narrar en pasado con verbos regulares (-ed), y a formar negativos y preguntas con did.", "en": "Learn to narrate in the past with regular verbs (-ed), and to form negatives and questions with did."}'::jsonb, true),
('b0000001-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000001', 5, 'pasado-simple-verbos-irregulares', '{"es": "Pasado Simple: Verbos Irregulares", "en": "Past Simple: Irregular Verbs"}'::jsonb, '{"es": "Aprende los verbos irregulares más comunes del inglés en pasado.", "en": "Learn the most common irregular verbs in English in the past tense."}'::jsonb, true),
('b0000001-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000001', 6, 'la-casa-y-los-muebles', '{"es": "La Casa y los Muebles", "en": "The House and Furniture"}'::jsonb, '{"es": "Aprende el vocabulario de las habitaciones de la casa, los muebles, y las preposiciones de lugar.", "en": "Learn vocabulary for rooms in the house, furniture, and prepositions of place."}'::jsonb, true);
