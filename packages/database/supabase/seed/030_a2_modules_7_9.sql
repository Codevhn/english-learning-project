-- 030_a2_modules_7_9.sql
-- Creates A2 modules 7-9 (of an eventual 14, per docs/cefr-a2-content-audit.md).
-- Lessons/exercises ship separately (031, 032, 033).
-- Run AFTER 022_a2_unit_and_modules.sql.

DELETE FROM modules WHERE id IN (
  'b0000001-0000-0000-0000-000000000007',
  'b0000001-0000-0000-0000-000000000008',
  'b0000001-0000-0000-0000-000000000009'
);

INSERT INTO modules (id, unit_id, order_index, slug, title, description, is_published) VALUES
('b0000001-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000001', 7, 'compras-y-ropa', '{"es": "Compras y Ropa", "en": "Shopping and Clothes"}'::jsonb, '{"es": "Aprende vocabulario de ropa y tallas, y a usar cuantificadores como some, any, much y many.", "en": "Learn clothing and size vocabulary, and how to use quantifiers like some, any, much, and many."}'::jsonb, true),
('b0000001-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000001', 8, 'el-clima-y-las-actividades', '{"es": "El Clima y las Actividades", "en": "Weather and Activities"}'::jsonb, '{"es": "Profundiza el vocabulario del clima y aprende a describir actividades y el clima en el pasado.", "en": "Deepen your weather vocabulary and learn to describe activities and past weather."}'::jsonb, true),
('b0000001-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000001', 9, 'transporte-y-direcciones', '{"es": "Transporte y Direcciones", "en": "Transportation and Directions"}'::jsonb, '{"es": "Aprende medios de transporte, cómo pedir y dar direcciones, y preposiciones de movimiento.", "en": "Learn transportation methods, how to ask for and give directions, and prepositions of movement."}'::jsonb, true);
