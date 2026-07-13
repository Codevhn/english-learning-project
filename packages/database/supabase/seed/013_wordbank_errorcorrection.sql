-- 013_wordbank_errorcorrection.sql
-- First content using the new "word_bank_fill" and "error_correction" exercise types
-- (see migrations/005_exercise_types_wordbank_errorcorrection.sql — run that migration first)
-- Adds module 13 L7 (Completa con las Palabras) and L8 (Encuentra el Error)
-- Both lessons use ONLY grammar/vocabulary already taught earlier in A1.

DELETE FROM exercises WHERE lesson_id IN (
  '00000002-0000-0000-0013-000000000007',
  '00000002-0000-0000-0013-000000000008'
);
DELETE FROM lessons WHERE id IN (
  '00000002-0000-0000-0013-000000000007',
  '00000002-0000-0000-0013-000000000008'
);

-- ===========================================================================
-- Module 13 L7 — Completa con las Palabras: Repaso
-- ===========================================================================

INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0000-0013-000000000007', '00000001-0000-0000-0000-000000000013', '00000000-0000-0000-0001-000000000001', 7, 'completa-con-las-palabras-repaso', '{"es": "Completa con las Palabras: Repaso", "en": "Fill with Word Bank: Review"}'::jsonb, '{"es": "Arrastra las palabras correctas del banco para completar cada oración — sin necesidad de escribir.", "en": "Tap the correct words from the bank to complete each sentence — no typing required."}'::jsonb, 'grammar', 25, 15, '{"intro": "En esta lección vas a completar oraciones tocando palabras de un banco, en lugar de escribirlas. Esto te obliga a reconocer la palabra correcta entre varias opciones parecidas — presta atención a to be, do/does, there is/are y can.", "sections": [{"type": "note", "variant": "tip", "text": "Toca una palabra del banco para colocarla en el espacio vacío. Si te equivocas, toca la palabra colocada para devolverla al banco y elige otra."}]}'::jsonb, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0013-0007-0001-000000000001', '00000002-0000-0000-0013-000000000007', 1, 'word_bank_fill', '{"text": "She ___ a doctor."}'::jsonb, '{"answers": ["is"]}'::jsonb, '["are", "am"]'::jsonb, '{"es": "Con ''she'' (tercera persona singular) se usa ''is''."}'::jsonb),
('00000003-0013-0007-0002-000000000001', '00000002-0000-0000-0013-000000000007', 2, 'word_bank_fill', '{"text": "There ___ two cats in the garden."}'::jsonb, '{"answers": ["are"]}'::jsonb, '["is", "am"]'::jsonb, '{"es": "''Cats'' es plural, así que se usa ''there are''."}'::jsonb),
('00000003-0013-0007-0003-000000000001', '00000002-0000-0000-0013-000000000007', 3, 'word_bank_fill', '{"text": "___ you like coffee?"}'::jsonb, '{"answers": ["Do"]}'::jsonb, '["Does", "Are"]'::jsonb, '{"es": "Con ''you'' y un verbo de acción como ''like'' se usa el auxiliar ''do''."}'::jsonb),
('00000003-0013-0007-0004-000000000001', '00000002-0000-0000-0013-000000000007', 4, 'word_bank_fill', '{"text": "He ___ like vegetables."}'::jsonb, '{"answers": ["doesn''t"]}'::jsonb, '["don''t", "isn''t"]'::jsonb, '{"es": "Con ''he'' la negación de presente simple es ''doesn''t''."}'::jsonb),
('00000003-0013-0007-0005-000000000001', '00000002-0000-0000-0013-000000000007', 5, 'word_bank_fill', '{"text": "___ you help me, please?"}'::jsonb, '{"answers": ["Can"]}'::jsonb, '["Do", "Is"]'::jsonb, '{"es": "''Can'' se usa para pedir ayuda cortésmente."}'::jsonb),
('00000003-0013-0007-0006-000000000001', '00000002-0000-0000-0013-000000000007', 6, 'word_bank_fill', '{"text": "My brother ___ tall and he ___ blue eyes."}'::jsonb, '{"answers": ["is", "has"]}'::jsonb, '["are", "have"]'::jsonb, '{"es": "''Is'' describe una cualidad (to be) y ''has'' describe una posesión (to have), ambos con ''he''."}'::jsonb),
('00000003-0013-0007-0007-000000000001', '00000002-0000-0000-0013-000000000007', 7, 'word_bank_fill', '{"text": "They ___ speak Spanish very well."}'::jsonb, '{"answers": ["can"]}'::jsonb, '["is", "does"]'::jsonb, '{"es": "''Can'' expresa habilidad: saben hablar español."}'::jsonb);

-- ===========================================================================
-- Module 13 L8 — Encuentra el Error: Repaso
-- ===========================================================================

INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0000-0013-000000000008', '00000001-0000-0000-0000-000000000013', '00000000-0000-0000-0001-000000000001', 8, 'encuentra-el-error-repaso', '{"es": "Encuentra el Error: Repaso", "en": "Find the Error: Review"}'::jsonb, '{"es": "Cada oración tiene un error gramatical. Identifica cuál es la forma correcta de la palabra marcada.", "en": "Each sentence has a grammar mistake. Identify the correct form of the highlighted word."}'::jsonb, 'grammar', 25, 15, '{"intro": "Esta lección entrena tu ojo gramatical: verás una oración con una palabra incorrecta marcada, y tendrás que elegir su forma correcta entre varias opciones. Es un ejercicio distinto — no traduces ni completas, sino que corriges.", "sections": [{"type": "note", "variant": "tip", "text": "Fíjate en el sujeto de la oración (I, you, he, she...) — la mayoría de estos errores están relacionados con la concordancia entre el sujeto y el verbo."}]}'::jsonb, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0013-0008-0001-000000000001', '00000002-0000-0000-0013-000000000008', 1, 'error_correction', '{"text": "She go to school every day.", "error_word": "go"}'::jsonb, '{"text": "goes"}'::jsonb, '["going", "gone"]'::jsonb, '{"es": "Con ''she'' (tercera persona) el verbo lleva -s: ''goes''."}'::jsonb),
('00000003-0013-0008-0002-000000000001', '00000002-0000-0000-0013-000000000008', 2, 'error_correction', '{"text": "He don''t like coffee.", "error_word": "don''t"}'::jsonb, '{"text": "doesn''t"}'::jsonb, '["not", "isn''t"]'::jsonb, '{"es": "Con ''he'' la negación correcta es ''doesn''t'', no ''don''t''."}'::jsonb),
('00000003-0013-0008-0003-000000000001', '00000002-0000-0000-0013-000000000008', 3, 'error_correction', '{"text": "There is three books on the table.", "error_word": "is"}'::jsonb, '{"text": "are"}'::jsonb, '["be", "was"]'::jsonb, '{"es": "''Books'' es plural, así que necesita ''there are'', no ''there is''."}'::jsonb),
('00000003-0013-0008-0004-000000000001', '00000002-0000-0000-0013-000000000008', 4, 'error_correction', '{"text": "I are a teacher.", "error_word": "are"}'::jsonb, '{"text": "am"}'::jsonb, '["is", "be"]'::jsonb, '{"es": "Con el sujeto ''I'' siempre se usa ''am'', nunca ''are''."}'::jsonb),
('00000003-0013-0008-0005-000000000001', '00000002-0000-0000-0013-000000000008', 5, 'error_correction', '{"text": "She have two brothers.", "error_word": "have"}'::jsonb, '{"text": "has"}'::jsonb, '["haves", "having"]'::jsonb, '{"es": "''Have'' es irregular: con he/she/it se convierte en ''has''."}'::jsonb),
('00000003-0013-0008-0006-000000000001', '00000002-0000-0000-0013-000000000008', 6, 'error_correction', '{"text": "Does she likes tea?", "error_word": "likes"}'::jsonb, '{"text": "like"}'::jsonb, '["liking", "liked"]'::jsonb, '{"es": "Cuando la pregunta ya usa ''does'', el verbo principal vuelve a su forma base: ''like'', sin -s."}'::jsonb),
('00000003-0013-0008-0007-000000000001', '00000002-0000-0000-0013-000000000008', 7, 'error_correction', '{"text": "He can plays the guitar.", "error_word": "plays"}'::jsonb, '{"text": "play"}'::jsonb, '["playing", "played"]'::jsonb, '{"es": "Después de ''can'' el verbo siempre va en forma base, sin -s: ''can play'', no ''can plays''."}'::jsonb);
