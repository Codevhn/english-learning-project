-- 014_domain_programacion.sql
-- Pilot content for "Rutas de Enfoque" (domain-specific vocabulary tracks).
-- Run AFTER migrations/006_domains.sql.
-- Only uses vocabulary/grammar guaranteed taught by the domain unlock
-- threshold (10 mastered lessons = Alfabeto y Sonidos + El Verbo To Be).

DELETE FROM exercises WHERE lesson_id IN (
  'a0000003-0000-0000-0000-000000000001',
  'a0000003-0000-0000-0000-000000000002'
);
DELETE FROM lessons WHERE id IN (
  'a0000003-0000-0000-0000-000000000001',
  'a0000003-0000-0000-0000-000000000002'
);
DELETE FROM modules WHERE id = 'a0000002-0000-0000-0000-000000000001';
DELETE FROM domains WHERE id = 'a0000001-0000-0000-0000-000000000001';

-- ===========================================================================
-- Domain + module
-- ===========================================================================

INSERT INTO domains (id, slug, title, description, icon, order_index, is_published) VALUES
('a0000001-0000-0000-0000-000000000001', 'programacion', '{"es": "Programación y Tecnología", "en": "Programming and Technology"}'::jsonb, '{"es": "Vocabulario y frases para hablar de tu trabajo en tecnología: código, errores, reuniones y herramientas del día a día.", "en": "Vocabulary and phrases for talking about your tech job: code, bugs, meetings, and everyday tools."}'::jsonb, 'Code2', 1, true);

INSERT INTO modules (id, unit_id, domain_id, order_index, slug, title, description, is_published) VALUES
('a0000002-0000-0000-0000-000000000001', NULL, 'a0000001-0000-0000-0000-000000000001', 1, 'fundamentos-tech', '{"es": "Fundamentos de Tecnología", "en": "Tech Fundamentals"}'::jsonb, '{"es": "Vocabulario básico de tecnología y cómo presentarte como profesional de este campo.", "en": "Basic tech vocabulary and how to introduce yourself as a tech professional."}'::jsonb, true);

-- ===========================================================================
-- Lesson 1 — Vocabulario de Tecnología
-- ===========================================================================

INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('a0000003-0000-0000-0000-000000000001', 'a0000002-0000-0000-0000-000000000001', NULL, 1, 'vocabulario-de-tecnologia', '{"es": "Vocabulario de Tecnología", "en": "Technology Vocabulary"}'::jsonb, '{"es": "Aprende las palabras más comunes del día a día en un trabajo de tecnología: código, error, contraseña y más.", "en": "Learn the most common everyday words in a tech job: code, bug, password, and more."}'::jsonb, 'vocabulary', 20, 12, '{"intro": "Estas son las palabras que vas a escuchar y usar todos los días si trabajas en tecnología. No necesitas gramática nueva para esta lección — solo vocabulario.", "sections": [{"type": "note", "variant": "tip", "text": "Esta lección es parte de una Ruta de Enfoque opcional — no es parte del camino principal del curso, es un extra para tu vocabulario profesional."}]}'::jsonb, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('a0000004-0001-0000-0000-000000000001', 'a0000003-0000-0000-0000-000000000001', 1, 'flashcard', '{"text": "code", "subtext": "programming"}'::jsonb, '{"text": "código", "phonetic": "/koʊd/"}'::jsonb, NULL, NULL),
('a0000004-0001-0000-0000-000000000002', 'a0000003-0000-0000-0000-000000000001', 2, 'flashcard', '{"text": "bug", "subtext": "a mistake in the code"}'::jsonb, '{"text": "error / fallo", "phonetic": "/bʌɡ/"}'::jsonb, NULL, NULL),
('a0000004-0001-0000-0000-000000000003', 'a0000003-0000-0000-0000-000000000001', 3, 'flashcard', '{"text": "password", "subtext": "for logging in"}'::jsonb, '{"text": "contraseña", "phonetic": "/ˈpæswɜːrd/"}'::jsonb, NULL, NULL),
('a0000004-0001-0000-0000-000000000004', 'a0000003-0000-0000-0000-000000000001', 4, 'word_match', '{"text": "Une cada palabra con su traducción."}'::jsonb, '{"pairs": [{"en": "computer", "es": "computadora"}, {"en": "screen", "es": "pantalla"}, {"en": "keyboard", "es": "teclado"}, {"en": "file", "es": "archivo"}]}'::jsonb, NULL, NULL),
('a0000004-0001-0000-0000-000000000005', 'a0000003-0000-0000-0000-000000000001', 5, 'multiple_choice', '{"text": "¿Cómo se dice ''programa'' en inglés?"}'::jsonb, '{"text": "program"}'::jsonb, '["password", "screen", "bug"]'::jsonb, '{"es": "''Program'' es programa. Ojo: no confundir con ''programmer'' (programador/a)."}'::jsonb),
('a0000004-0001-0000-0000-000000000006', 'a0000003-0000-0000-0000-000000000001', 6, 'fill_blank', '{"text": "I need to fix this ___. (error)"}'::jsonb, '{"text": "bug", "accepted": ["bug"]}'::jsonb, NULL, '{"es": "''Bug'' es el término técnico para un error en el código."}'::jsonb),
('a0000004-0001-0000-0000-000000000007', 'a0000003-0000-0000-0000-000000000001', 7, 'fill_blank', '{"text": "Please save the ___ before you close it. (archivo)"}'::jsonb, '{"text": "file", "accepted": ["file"]}'::jsonb, NULL, '{"es": "''File'' es archivo. ''Save'' es guardar."}'::jsonb);

-- ===========================================================================
-- Lesson 2 — Preséntate como Profesional de Tecnología
-- ===========================================================================

INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('a0000003-0000-0000-0000-000000000002', 'a0000002-0000-0000-0000-000000000001', NULL, 2, 'presentate-profesional-tech', '{"es": "Preséntate como Profesional de Tecnología", "en": "Introduce Yourself as a Tech Professional"}'::jsonb, '{"es": "Usa el verbo to be para decir a qué te dedicas en el mundo de la tecnología.", "en": "Use the verb to be to say what you do in the tech world."}'::jsonb, 'mixed', 20, 12, '{"intro": "Ya dominas el verbo ''to be'' — ahora lo vas a usar para presentarte profesionalmente. No hay gramática nueva aquí, solo vocabulario aplicado a frases que ya sabes construir.", "sections": [{"type": "examples", "title": "EJEMPLOS", "items": [{"en": "I am a software developer.", "es": "Soy desarrollador/a de software."}, {"en": "She is a data engineer.", "es": "Ella es ingeniera de datos."}, {"en": "He is not a designer. He is a programmer.", "es": "Él no es diseñador. Es programador."}]}, {"type": "note", "variant": "tip", "text": "Esta lección es parte de una Ruta de Enfoque opcional — un extra para tu vocabulario profesional, no parte del camino principal del curso."}]}'::jsonb, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('a0000004-0002-0000-0000-000000000001', 'a0000003-0000-0000-0000-000000000002', 1, 'flashcard', '{"text": "developer", "subtext": "job title"}'::jsonb, '{"text": "desarrollador/a", "phonetic": "/dɪˈvɛləpər/"}'::jsonb, NULL, NULL),
('a0000004-0002-0000-0000-000000000002', 'a0000003-0000-0000-0000-000000000002', 2, 'flashcard', '{"text": "engineer", "subtext": "job title"}'::jsonb, '{"text": "ingeniero/a", "phonetic": "/ˌɛndʒɪˈnɪr/"}'::jsonb, NULL, NULL),
('a0000004-0002-0000-0000-000000000003', 'a0000003-0000-0000-0000-000000000002', 3, 'fill_blank', '{"text": "I ___ a software developer. (soy)"}'::jsonb, '{"text": "am", "accepted": ["am"]}'::jsonb, NULL, '{"es": "Con el sujeto ''I'' siempre se usa ''am''."}'::jsonb),
('a0000004-0002-0000-0000-000000000004', 'a0000003-0000-0000-0000-000000000002', 4, 'fill_blank', '{"text": "She ___ a data engineer. (es)"}'::jsonb, '{"text": "is", "accepted": ["is"]}'::jsonb, NULL, '{"es": "Con ''she'' (tercera persona) se usa ''is''."}'::jsonb),
('a0000004-0002-0000-0000-000000000005', 'a0000003-0000-0000-0000-000000000002', 5, 'multiple_choice', '{"text": "¿Cómo dices ''Él no es diseñador'' en inglés?"}'::jsonb, '{"text": "He is not a designer."}'::jsonb, '["He not is a designer.", "He no is a designer.", "He isn''t designer."]'::jsonb, '{"es": "La negación correcta con to be es ''is not'' (o ''isn''t'') después del sujeto."}'::jsonb),
('a0000004-0002-0000-0000-000000000006', 'a0000003-0000-0000-0000-000000000002', 6, 'translation', '{"text": "Soy programador y trabajo con computadoras."}'::jsonb, '{"text": "I am a programmer and I work with computers.", "accepted": ["I am a programmer and I work with computers."]}'::jsonb, NULL, '{"es": "''I am'' + profesión, y ''I work with'' + herramienta."}'::jsonb),
('a0000004-0002-0000-0000-000000000007', 'a0000003-0000-0000-0000-000000000002', 7, 'multiple_choice', '{"text": "My computer ___ very fast. (está)"}'::jsonb, '{"text": "is"}'::jsonb, '["am", "are"]'::jsonb, '{"es": "''Computer'' es tercera persona singular, así que se usa ''is''."}'::jsonb);
