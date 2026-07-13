-- 012_dictation_reverse_translation.sql
-- First content using the new "dictation" and "reverse_translation" exercise types
-- (see migrations/004_exercise_types_dictation_reverse.sql — run that migration first)
-- Adds module 14 L6 (Dictado: Repaso General) and module 13 L6 (Traducción Inversa)
-- Both lessons use ONLY vocabulary/grammar already taught earlier in A1.

DELETE FROM exercises WHERE lesson_id IN (
  '00000002-0000-0000-0014-000000000006',
  '00000002-0000-0000-0013-000000000006'
);
DELETE FROM lessons WHERE id IN (
  '00000002-0000-0000-0014-000000000006',
  '00000002-0000-0000-0013-000000000006'
);

-- ===========================================================================
-- Module 14 L6 — Dictado: Repaso General
-- ===========================================================================

INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0000-0014-000000000006', '00000001-0000-0000-0000-000000000014', '00000000-0000-0000-0001-000000000001', 6, 'dictado-repaso-general', '{"es": "Dictado: Repaso General", "en": "Dictation: General Review"}'::jsonb, '{"es": "Escucha y escribe exactamente lo que oigas — sin opciones de multiple choice. El ejercicio más exigente de comprensión auditiva.", "en": "Listen and type exactly what you hear — no multiple choice options. The most demanding listening comprehension exercise."}'::jsonb, 'listening', 30, 15, '{"intro": "A diferencia de las lecciones anteriores de escucha, aquí no hay opciones para elegir — tienes que escribir exactamente lo que escuches, letra por letra. Es el ejercicio más exigente para entrenar tu oído, porque no puedes adivinar entre opciones: tienes que procesar cada sonido y convertirlo en texto.", "sections": [{"type": "note", "variant": "tip", "text": "Usa el botón de tortuga para escuchar el audio más lento si te cuesta distinguir las palabras. Revisa mayúsculas y ortografía antes de responder — un dictado exige precisión."}]}'::jsonb, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0014-0006-0001-000000000001', '00000002-0000-0000-0014-000000000006', 1, 'dictation', '{"text": "Escucha y escribe la frase completa.", "audio_text": "My name is Ana."}'::jsonb, '{"accepted": ["My name is Ana.", "My name is Ana"]}'::jsonb, NULL, NULL),
('00000003-0014-0006-0002-000000000001', '00000002-0000-0000-0014-000000000006', 2, 'dictation', '{"text": "Escucha y escribe la frase completa.", "audio_text": "I am from Colombia."}'::jsonb, '{"accepted": ["I am from Colombia.", "I am from Colombia"]}'::jsonb, NULL, NULL),
('00000003-0014-0006-0003-000000000001', '00000002-0000-0000-0014-000000000006', 3, 'dictation', '{"text": "Escucha y escribe la frase completa.", "audio_text": "There is a book on the table."}'::jsonb, '{"accepted": ["There is a book on the table.", "There is a book on the table"]}'::jsonb, NULL, NULL),
('00000003-0014-0006-0004-000000000001', '00000002-0000-0000-0014-000000000006', 4, 'dictation', '{"text": "Escucha y escribe la frase completa.", "audio_text": "She has two brothers."}'::jsonb, '{"accepted": ["She has two brothers.", "She has two brothers"]}'::jsonb, NULL, NULL),
('00000003-0014-0006-0005-000000000001', '00000002-0000-0000-0014-000000000006', 5, 'dictation', '{"text": "Escucha y escribe la frase completa.", "audio_text": "Can you help me, please?"}'::jsonb, '{"accepted": ["Can you help me, please?", "Can you help me please?"]}'::jsonb, NULL, NULL),
('00000003-0014-0006-0006-000000000001', '00000002-0000-0000-0014-000000000006', 6, 'dictation', '{"text": "Escucha y escribe la frase completa.", "audio_text": "I don''t like coffee."}'::jsonb, '{"accepted": ["I don''t like coffee.", "I dont like coffee."]}'::jsonb, NULL, NULL),
('00000003-0014-0006-0007-000000000001', '00000002-0000-0000-0014-000000000006', 7, 'dictation', '{"text": "Escucha y escribe la frase completa.", "audio_text": "What time is it?"}'::jsonb, '{"accepted": ["What time is it?", "What time is it"]}'::jsonb, NULL, NULL);

-- ===========================================================================
-- Module 13 L6 — Traducción Inversa: Repaso de Estructuras
-- ===========================================================================

INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0000-0013-000000000006', '00000001-0000-0000-0000-000000000013', '00000000-0000-0000-0001-000000000001', 6, 'traduccion-inversa-repaso', '{"es": "Traducción Inversa: Repaso de Estructuras", "en": "Reverse Translation: Structure Review"}'::jsonb, '{"es": "Traduce del inglés al español para confirmar que entiendes las estructuras que ya aprendiste: preguntas, presente simple, there is/are, imperativos y can.", "en": "Translate from English to Spanish to confirm you understand the structures you already learned: questions, present simple, there is/are, imperatives, and can."}'::jsonb, 'grammar', 25, 15, '{"intro": "Hasta ahora practicaste traducir del español al inglés. En esta lección haremos lo contrario: verás una oración en inglés y la traducirás al español. Esto confirma que realmente ENTIENDES la estructura, no solo que memorizaste una frase en un solo sentido.", "sections": [{"type": "note", "variant": "tip", "text": "Traducir en ambas direcciones (español→inglés e inglés→español) fortalece la memoria mucho más que traducir siempre en la misma dirección."}]}'::jsonb, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0013-0006-0001-000000000001', '00000002-0000-0000-0013-000000000006', 1, 'reverse_translation', '{"text": "Where do you live?"}'::jsonb, '{"accepted": ["¿Dónde vives?", "Donde vives?"]}'::jsonb, NULL, '{"es": "''Where'' pregunta por un lugar, y ''do you live'' usa el auxiliar ''do'' porque ''live'' es un verbo de acción."}'::jsonb),
('00000003-0013-0006-0002-000000000001', '00000002-0000-0000-0013-000000000006', 2, 'reverse_translation', '{"text": "She works in an office."}'::jsonb, '{"accepted": ["Ella trabaja en una oficina."]}'::jsonb, NULL, '{"es": "''Works'' lleva -s porque el sujeto es ''she'' (tercera persona)."}'::jsonb),
('00000003-0013-0006-0003-000000000001', '00000002-0000-0000-0013-000000000006', 3, 'reverse_translation', '{"text": "There are three chairs in the kitchen."}'::jsonb, '{"accepted": ["Hay tres sillas en la cocina."]}'::jsonb, NULL, '{"es": "''There are'' se usa porque ''chairs'' es plural."}'::jsonb),
('00000003-0013-0006-0004-000000000001', '00000002-0000-0000-0013-000000000006', 4, 'reverse_translation', '{"text": "He doesn''t eat meat."}'::jsonb, '{"accepted": ["Él no come carne."]}'::jsonb, NULL, '{"es": "''Doesn''t'' es la forma negativa para he/she/it, y el verbo principal ''eat'' vuelve a su forma base."}'::jsonb),
('00000003-0013-0006-0005-000000000001', '00000002-0000-0000-0013-000000000006', 5, 'reverse_translation', '{"text": "Can you speak English?"}'::jsonb, '{"accepted": ["¿Sabes hablar inglés?", "¿Puedes hablar inglés?"]}'::jsonb, NULL, '{"es": "''Can'' aquí pregunta por habilidad — se traduce como ''saber hacer algo''."}'::jsonb),
('00000003-0013-0006-0006-000000000001', '00000002-0000-0000-0013-000000000006', 6, 'reverse_translation', '{"text": "Open the door, please."}'::jsonb, '{"accepted": ["Abre la puerta, por favor."]}'::jsonb, NULL, '{"es": "Es un imperativo — instrucción directa sin sujeto, con ''please'' para ser cortés."}'::jsonb),
('00000003-0013-0006-0007-000000000001', '00000002-0000-0000-0013-000000000006', 7, 'reverse_translation', '{"text": "Why are you tired?"}'::jsonb, '{"accepted": ["¿Por qué estás cansado?", "¿Por qué estás cansada?"]}'::jsonb, NULL, '{"es": "''Why'' pregunta por una razón. Con ''to be'' no se necesita ''do/does''."}'::jsonb);
