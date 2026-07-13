-- 009_modules_6_8_expansion.sql
-- Modules 6-8 A1 expansion: lessons 2+ for Familia, Comida, Cuerpo Humano
-- Run AFTER 005_a1_reseed.sql

DELETE FROM exercises WHERE lesson_id IN (
  SELECT id FROM lessons
  WHERE module_id IN ('00000001-0000-0000-0000-000000000006','00000001-0000-0000-0000-000000000007','00000001-0000-0000-0000-000000000008')
  AND order_index > 1
);
DELETE FROM lessons
WHERE module_id IN ('00000001-0000-0000-0000-000000000006','00000001-0000-0000-0000-000000000007','00000001-0000-0000-0000-000000000008')
AND order_index > 1;

-- ===========================================================================
-- MODULE 06 — LA FAMILIA
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- Lesson 6.2: La Familia Extendida
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0006-0002-000000000001', '00000001-0000-0000-0000-000000000006', '00000000-0000-0000-0001-000000000001', 2, 'la-familia-extendida', '{"es": "La Familia Extendida", "en": "The Extended Family"}'::jsonb, '{"es": "Aprende el vocabulario para los miembros de la familia extendida: tío, tía, primo, abuelos, sobrino, sobrina, padrastro y madrastra.", "en": "Learn vocabulary for extended family members: uncle, aunt, cousin, grandparents, nephew, niece, stepfather and stepmother."}'::jsonb, 'vocabulary', 20, 12, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0006-0001-000000000001', '00000002-0000-0006-0002-000000000001', 1, 'word_match', '{"text": "Match each word with its translation"}'::jsonb, '{"pairs": [{"en": "uncle", "es": "tío"}, {"en": "aunt", "es": "tía"}, {"en": "cousin", "es": "primo/a"}, {"en": "grandparents", "es": "abuelos"}]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0006-0002-000000000001', '00000002-0000-0006-0002-000000000001', 2, 'flashcard', '{"text": "nephew", "subtext": "el hijo del hermano o hermana"}'::jsonb, '{"text": "sobrino", "phonetic": "/ˈnɛfjuː/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0006-0003-000000000001', '00000002-0000-0006-0002-000000000001', 3, 'flashcard', '{"text": "niece", "subtext": "la hija del hermano o hermana"}'::jsonb, '{"text": "sobrina", "phonetic": "/niːs/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0006-0004-000000000001', '00000002-0000-0006-0002-000000000001', 4, 'multiple_choice', '{"text": "What is ''padrastro'' in English?"}'::jsonb, '{"text": "stepfather"}'::jsonb, '["uncle", "grandfather", "father-in-law"]'::jsonb, '{"es": "''Padrastro'' se traduce como ''stepfather''. Es el esposo de tu madre que no es tu padre biológico."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0006-0005-000000000001', '00000002-0000-0006-0002-000000000001', 5, 'multiple_choice', '{"text": "My father''s mother is my ___."}'::jsonb, '{"text": "grandmother"}'::jsonb, '["grandfather", "aunt", "stepmother"]'::jsonb, '{"es": "La madre de tu padre o de tu madre es tu ''grandmother'' (abuela). Recuerda: ''grand-'' indica la generación anterior a tus padres."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0006-0006-000000000001', '00000002-0000-0006-0002-000000000001', 6, 'fill_blank', '{"text": "My mother''s brother is my ___."}'::jsonb, '{"text": "uncle", "accepted": ["uncle"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0006-0007-000000000001', '00000002-0000-0006-0002-000000000001', 7, 'fill_blank', '{"text": "My aunt''s son is my ___."}'::jsonb, '{"text": "cousin", "accepted": ["cousin"]}'::jsonb, NULL, NULL);

-- ---------------------------------------------------------------------------
-- Lesson 6.3: Describir a tu Familia
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0006-0003-000000000001', '00000001-0000-0000-0000-000000000006', '00000000-0000-0000-0001-000000000001', 3, 'describir-a-tu-familia', '{"es": "Describir a tu Familia", "en": "Describing Your Family"}'::jsonb, '{"es": "Aprende a describir a los miembros de tu familia: altura, color de ojos, edad y otras características físicas.", "en": "Learn to describe your family members: height, eye colour, age and other physical characteristics."}'::jsonb, 'mixed', 20, 12, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0006-0001-000000000001', '00000002-0000-0006-0003-000000000001', 1, 'flashcard', '{"text": "tall", "subtext": "opposite of short"}'::jsonb, '{"text": "alto/a", "phonetic": "/tɔːl/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0006-0002-000000000001', '00000002-0000-0006-0003-000000000001', 2, 'flashcard', '{"text": "short", "subtext": "opposite of tall"}'::jsonb, '{"text": "bajo/a", "phonetic": "/ʃɔːrt/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0006-0003-000000000001', '00000002-0000-0006-0003-000000000001', 3, 'multiple_choice', '{"text": "How do you say ''Mi hermano es alto'' in English?"}'::jsonb, '{"text": "My brother is tall."}'::jsonb, '["My brother has tall.", "My brother are tall.", "I brother is tall."]'::jsonb, '{"es": "Con adjetivos de descripción física usamos el verbo ''to be'': ''My brother is tall.'' No se usa ''have'' para la altura."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0006-0004-000000000001', '00000002-0000-0006-0003-000000000001', 4, 'multiple_choice', '{"text": "She ___ blue eyes."}'::jsonb, '{"text": "has"}'::jsonb, '["is", "have", "are"]'::jsonb, '{"es": "Para el color de ojos usamos ''have/has'': ''She has blue eyes.'' La tercera persona singular usa ''has'', no ''have''."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0006-0005-000000000001', '00000002-0000-0006-0003-000000000001', 5, 'multiple_choice', '{"text": "He ___ 30 years old."}'::jsonb, '{"text": "is"}'::jsonb, '["has", "have", "are"]'::jsonb, '{"es": "Para la edad en inglés usamos ''to be'': ''He is 30 years old.'' En inglés NO se dice ''He has 30 years'' como en español."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0006-0006-000000000001', '00000002-0000-0006-0003-000000000001', 6, 'fill_blank', '{"text": "My sister ___ long brown hair."}'::jsonb, '{"text": "has", "accepted": ["has"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0006-0007-000000000001', '00000002-0000-0006-0003-000000000001', 7, 'fill_blank', '{"text": "My grandfather ___ very old. He is 85 years old."}'::jsonb, '{"text": "is", "accepted": ["is"]}'::jsonb, NULL, NULL);

-- ---------------------------------------------------------------------------
-- Lesson 6.4: Relaciones Personales
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0006-0004-000000000001', '00000001-0000-0000-0000-000000000006', '00000000-0000-0000-0001-000000000001', 4, 'relaciones-personales', '{"es": "Relaciones Personales", "en": "Personal Relationships"}'::jsonb, '{"es": "Aprende el vocabulario para hablar del estado civil y las relaciones: casado, soltero, divorciado, comprometido, novio y novia.", "en": "Learn vocabulary to talk about relationship status: married, single, divorced, engaged, boyfriend and girlfriend."}'::jsonb, 'vocabulary', 20, 12, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0006-0001-000000000001', '00000002-0000-0006-0004-000000000001', 1, 'word_match', '{"text": "Match each word with its translation"}'::jsonb, '{"pairs": [{"en": "married", "es": "casado/a"}, {"en": "single", "es": "soltero/a"}, {"en": "divorced", "es": "divorciado/a"}, {"en": "engaged", "es": "comprometido/a"}]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0006-0002-000000000001', '00000002-0000-0006-0004-000000000001', 2, 'flashcard', '{"text": "boyfriend", "subtext": "a romantic partner (male)"}'::jsonb, '{"text": "novio", "phonetic": "/ˈbɔɪfrɛnd/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0006-0003-000000000001', '00000002-0000-0006-0004-000000000001', 3, 'flashcard', '{"text": "girlfriend", "subtext": "a romantic partner (female)"}'::jsonb, '{"text": "novia", "phonetic": "/ˈɡɜːrlfrɛnd/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0006-0004-000000000001', '00000002-0000-0006-0004-000000000001', 4, 'multiple_choice', '{"text": "What does ''single'' mean in Spanish?"}'::jsonb, '{"text": "soltero/a"}'::jsonb, '["casado/a", "divorciado/a", "viudo/a"]'::jsonb, '{"es": "''Single'' significa ''soltero/a''. No confundas con ''married'' (casado/a) ni ''divorced'' (divorciado/a)."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0006-0005-000000000001', '00000002-0000-0006-0004-000000000001', 5, 'multiple_choice', '{"text": "They got ___ last year at a big church."}'::jsonb, '{"text": "married"}'::jsonb, '["single", "engaged", "divorced"]'::jsonb, '{"es": "''To get married'' significa ''casarse''. Es una frase muy común: ''They got married last year'' (Se casaron el año pasado)."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0006-0006-000000000001', '00000002-0000-0006-0004-000000000001', 6, 'fill_blank', '{"text": "She is ___ to Carlos. They will get married in June."}'::jsonb, '{"text": "engaged", "accepted": ["engaged"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0006-0007-000000000001', '00000002-0000-0006-0004-000000000001', 7, 'fill_blank', '{"text": "He broke up with his ___. Now he is single."}'::jsonb, '{"text": "girlfriend", "accepted": ["girlfriend"]}'::jsonb, NULL, NULL);

-- ===========================================================================
-- MODULE 07 — COMIDA Y BEBIDA
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- Lesson 7.2: Frutas y Verduras
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0007-0002-000000000001', '00000001-0000-0000-0000-000000000007', '00000000-0000-0000-0001-000000000001', 2, 'frutas-y-verduras', '{"es": "Frutas y Verduras", "en": "Fruit and Vegetables"}'::jsonb, '{"es": "Aprende el vocabulario de frutas y verduras en inglés: manzana, plátano, naranja, fresa, zanahoria, tomate, lechuga y patata.", "en": "Learn fruit and vegetable vocabulary in English: apple, banana, orange, strawberry, carrot, tomato, lettuce and potato."}'::jsonb, 'vocabulary', 20, 12, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0007-0001-000000000001', '00000002-0000-0007-0002-000000000001', 1, 'word_match', '{"text": "Match each word with its translation"}'::jsonb, '{"pairs": [{"en": "apple", "es": "manzana"}, {"en": "banana", "es": "plátano"}, {"en": "orange", "es": "naranja"}, {"en": "strawberry", "es": "fresa"}]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0007-0002-000000000001', '00000002-0000-0007-0002-000000000001', 2, 'flashcard', '{"text": "carrot", "subtext": "a long orange vegetable"}'::jsonb, '{"text": "zanahoria", "phonetic": "/ˈkærət/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0007-0003-000000000001', '00000002-0000-0007-0002-000000000001', 3, 'flashcard', '{"text": "lettuce", "subtext": "a green leafy vegetable used in salads"}'::jsonb, '{"text": "lechuga", "phonetic": "/ˈlɛtɪs/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0007-0004-000000000001', '00000002-0000-0007-0002-000000000001', 4, 'multiple_choice', '{"text": "Which of these is a vegetable?"}'::jsonb, '{"text": "potato"}'::jsonb, '["apple", "banana", "strawberry"]'::jsonb, '{"es": "''Potato'' (patata) es una verdura. ''Apple'' (manzana), ''banana'' (plátano) y ''strawberry'' (fresa) son frutas."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0007-0005-000000000001', '00000002-0000-0007-0002-000000000001', 5, 'multiple_choice', '{"text": "What is ''tomate'' in English?"}'::jsonb, '{"text": "tomato"}'::jsonb, '["lettuce", "carrot", "potato"]'::jsonb, '{"es": "''Tomate'' en inglés es ''tomato'' /təˈmeɪtəʊ/. Es uno de los cognados más fáciles de recordar porque es casi idéntico."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0007-0006-000000000001', '00000002-0000-0007-0002-000000000001', 6, 'fill_blank', '{"text": "I eat an ___ every morning. It is red and sweet."}'::jsonb, '{"text": "apple", "accepted": ["apple"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0007-0007-000000000001', '00000002-0000-0007-0002-000000000001', 7, 'fill_blank', '{"text": "The salad has ___, tomato, and onion in it."}'::jsonb, '{"text": "lettuce", "accepted": ["lettuce"]}'::jsonb, NULL, NULL);

-- ---------------------------------------------------------------------------
-- Lesson 7.3: En el Restaurante
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0007-0003-000000000001', '00000001-0000-0000-0000-000000000007', '00000000-0000-0000-0001-000000000001', 3, 'en-el-restaurante', '{"es": "En el Restaurante", "en": "At the Restaurant"}'::jsonb, '{"es": "Aprende frases esenciales para pedir en un restaurante: pedir la carta, hacer tu pedido, pedir la cuenta y reservar una mesa.", "en": "Learn essential phrases for ordering in a restaurant: asking for the menu, placing your order, requesting the bill and booking a table."}'::jsonb, 'mixed', 25, 15, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0007-0001-000000000001', '00000002-0000-0007-0003-000000000001', 1, 'flashcard', '{"text": "I''d like...", "subtext": "a polite way to order food or drinks"}'::jsonb, '{"text": "Quisiera...", "phonetic": "/aɪd laɪk/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0007-0002-000000000001', '00000002-0000-0007-0003-000000000001', 2, 'flashcard', '{"text": "the bill, please", "subtext": "said when you want to pay at a restaurant"}'::jsonb, '{"text": "la cuenta, por favor", "phonetic": "/ðə bɪl pliːz/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0007-0003-000000000001', '00000002-0000-0007-0003-000000000001', 3, 'multiple_choice', '{"text": "How do you ask for a table for two?"}'::jsonb, '{"text": "A table for two, please."}'::jsonb, '["Two tables, please.", "I''d like two chairs.", "Can I have two seats?"]'::jsonb, '{"es": "Para reservar mesa decimos ''A table for two, please'' (Una mesa para dos, por favor). Es una frase fija muy útil en restaurantes."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0007-0004-000000000001', '00000002-0000-0007-0003-000000000001', 4, 'multiple_choice', '{"text": "Which phrase orders food politely?"}'::jsonb, '{"text": "Can I have the soup, please?"}'::jsonb, '["Give me soup.", "I want soup now.", "Soup!"]'::jsonb, '{"es": "''Can I have...?'' es la forma más cortés y común de pedir algo. ''Give me'' suena brusco. Usa siempre ''Can I have'' o ''I''d like'' en un restaurante."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0007-0005-000000000001', '00000002-0000-0007-0003-000000000001', 5, 'multiple_choice', '{"text": "What does ''the bill, please'' mean?"}'::jsonb, '{"text": "la cuenta, por favor"}'::jsonb, '["el menú, por favor", "la mesa, por favor", "el agua, por favor"]'::jsonb, '{"es": "''The bill'' es la cuenta en un restaurante. En inglés americano también se dice ''the check, please''. Ambas formas son correctas."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0007-0006-000000000001', '00000002-0000-0007-0003-000000000001', 6, 'fill_blank', '{"text": "I''d ___ a coffee and a piece of cake, please."}'::jsonb, '{"text": "like", "accepted": ["like"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0007-0007-000000000001', '00000002-0000-0007-0003-000000000001', 7, 'fill_blank', '{"text": "Can I ___ a glass of water, please?"}'::jsonb, '{"text": "have", "accepted": ["have"]}'::jsonb, NULL, NULL);

-- ---------------------------------------------------------------------------
-- Lesson 7.4: Preferencias Alimentarias
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0007-0004-000000000001', '00000001-0000-0000-0000-000000000007', '00000000-0000-0000-0001-000000000001', 4, 'preferencias-alimentarias', '{"es": "Preferencias Alimentarias", "en": "Food Preferences"}'::jsonb, '{"es": "Aprende a expresar gustos y restricciones alimentarias: me gusta, no me gusta, soy vegetariano, soy alérgico, delicioso y asqueroso.", "en": "Learn to express food likes and dietary restrictions: I like, I don''t like, I''m vegetarian, I''m allergic to, delicious and disgusting."}'::jsonb, 'mixed', 20, 12, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0007-0001-000000000001', '00000002-0000-0007-0004-000000000001', 1, 'flashcard', '{"text": "delicious", "subtext": "something that tastes very good"}'::jsonb, '{"text": "delicioso/a", "phonetic": "/dɪˈlɪʃəs/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0007-0002-000000000001', '00000002-0000-0007-0004-000000000001', 2, 'flashcard', '{"text": "disgusting", "subtext": "something that tastes very bad"}'::jsonb, '{"text": "asqueroso/a", "phonetic": "/dɪsˈɡʌstɪŋ/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0007-0003-000000000001', '00000002-0000-0007-0004-000000000001', 3, 'multiple_choice', '{"text": "How do you say ''No me gustan los mariscos''?"}'::jsonb, '{"text": "I don''t like seafood."}'::jsonb, '["I like seafood.", "I eat seafood.", "I love fish."]'::jsonb, '{"es": "Para expresar que algo no te gusta usamos ''I don''t like...''. El negativo de ''like'' se forma con ''don''t'' (do not) + verbo."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0007-0004-000000000001', '00000002-0000-0007-0004-000000000001', 4, 'multiple_choice', '{"text": "What does ''I''m vegetarian'' mean in Spanish?"}'::jsonb, '{"text": "No como carne."}'::jsonb, '["Me encantan las verduras.", "Soy alérgico.", "Como muy poco."]'::jsonb, '{"es": "''I''m vegetarian'' significa ''Soy vegetariano/a'', es decir, que no comes carne. Puedes añadir: ''I don''t eat meat or fish''."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0007-0005-000000000001', '00000002-0000-0007-0004-000000000001', 5, 'multiple_choice', '{"text": "I''m ___ to nuts. I can''t eat them."}'::jsonb, '{"text": "allergic"}'::jsonb, '["vegetarian", "vegan", "intolerant"]'::jsonb, '{"es": "''Allergic'' (alérgico/a) se usa para alergias. La frase es ''I''m allergic to...'' (Soy alérgico/a a...). Es esencial saberlo para la seguridad alimentaria."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0007-0006-000000000001', '00000002-0000-0007-0004-000000000001', 6, 'fill_blank', '{"text": "This pizza is ___! I love it so much."}'::jsonb, '{"text": "delicious", "accepted": ["delicious"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0007-0007-000000000001', '00000002-0000-0007-0004-000000000001', 7, 'fill_blank', '{"text": "I ___ like mushrooms. I never eat them."}'::jsonb, '{"text": "don''t", "accepted": ["don''t", "do not"]}'::jsonb, NULL, NULL);

-- ===========================================================================
-- MODULE 08 — EL CUERPO HUMANO
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- Lesson 8.2: La Cara y la Cabeza
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0008-0002-000000000001', '00000001-0000-0000-0000-000000000008', '00000000-0000-0000-0001-000000000001', 2, 'la-cara-y-la-cabeza', '{"es": "La Cara y la Cabeza", "en": "The Face and Head"}'::jsonb, '{"es": "Aprende el vocabulario de las partes de la cara: ojos, nariz, boca, orejas, frente, barbilla, mejilla y ceja.", "en": "Learn vocabulary for the parts of the face: eyes, nose, mouth, ears, forehead, chin, cheek and eyebrow."}'::jsonb, 'vocabulary', 20, 12, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0008-0001-000000000001', '00000002-0000-0008-0002-000000000001', 1, 'word_match', '{"text": "Match each word with its translation"}'::jsonb, '{"pairs": [{"en": "eyes", "es": "ojos"}, {"en": "nose", "es": "nariz"}, {"en": "mouth", "es": "boca"}, {"en": "ears", "es": "orejas"}]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0008-0002-000000000001', '00000002-0000-0008-0002-000000000001', 2, 'flashcard', '{"text": "forehead", "subtext": "the area above your eyes and below your hair"}'::jsonb, '{"text": "frente", "phonetic": "/ˈfɔːrhɛd/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0008-0003-000000000001', '00000002-0000-0008-0002-000000000001', 3, 'flashcard', '{"text": "eyebrow", "subtext": "the strip of hair above your eye"}'::jsonb, '{"text": "ceja", "phonetic": "/ˈaɪbraʊ/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0008-0004-000000000001', '00000002-0000-0008-0002-000000000001', 4, 'multiple_choice', '{"text": "What is ''mejilla'' in English?"}'::jsonb, '{"text": "cheek"}'::jsonb, '["chin", "forehead", "temple"]'::jsonb, '{"es": "''Mejilla'' en inglés es ''cheek'' /tʃiːk/. ''Chin'' es barbilla, ''forehead'' es frente y ''temple'' es sien."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0008-0005-000000000001', '00000002-0000-0008-0002-000000000001', 5, 'multiple_choice', '{"text": "What is ''barbilla'' in English?"}'::jsonb, '{"text": "chin"}'::jsonb, '["cheek", "forehead", "eyebrow"]'::jsonb, '{"es": "''Barbilla'' en inglés es ''chin'' /tʃɪn/. Es la parte más baja de la cara, justo debajo de la boca."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0008-0006-000000000001', '00000002-0000-0008-0002-000000000001', 6, 'fill_blank', '{"text": "She has beautiful green ___."}'::jsonb, '{"text": "eyes", "accepted": ["eyes"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0008-0007-000000000001', '00000002-0000-0008-0002-000000000001', 7, 'fill_blank', '{"text": "He has a very small ___. He can barely smell anything."}'::jsonb, '{"text": "nose", "accepted": ["nose"]}'::jsonb, NULL, NULL);

-- ---------------------------------------------------------------------------
-- Lesson 8.3: Síntomas y Enfermedades
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0008-0003-000000000001', '00000001-0000-0000-0000-000000000008', '00000000-0000-0000-0001-000000000001', 3, 'sintomas-y-enfermedades', '{"es": "Síntomas y Enfermedades", "en": "Symptoms and Illnesses"}'::jsonb, '{"es": "Aprende a describir síntomas comunes en inglés: dolor de cabeza, dolor de garganta, fiebre, resfriado, tos y dolor de estómago.", "en": "Learn to describe common symptoms in English: headache, sore throat, fever, cold, cough and stomachache."}'::jsonb, 'mixed', 25, 15, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0008-0001-000000000001', '00000002-0000-0008-0003-000000000001', 1, 'flashcard', '{"text": "headache", "subtext": "pain in your head"}'::jsonb, '{"text": "dolor de cabeza", "phonetic": "/ˈhɛdeɪk/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0008-0002-000000000001', '00000002-0000-0008-0003-000000000001', 2, 'flashcard', '{"text": "fever", "subtext": "high body temperature, usually above 38°C"}'::jsonb, '{"text": "fiebre", "phonetic": "/ˈfiːvər/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0008-0003-000000000001', '00000002-0000-0008-0003-000000000001', 3, 'multiple_choice', '{"text": "How do you say ''Tengo dolor de garganta'' in English?"}'::jsonb, '{"text": "I have a sore throat."}'::jsonb, '["I have a headache.", "I have a cough.", "I have a cold."]'::jsonb, '{"es": "''Dolor de garganta'' se dice ''sore throat'' en inglés. ''Sore'' significa dolorido. Frase completa: ''I have a sore throat.''"}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0008-0004-000000000001', '00000002-0000-0008-0003-000000000001', 4, 'multiple_choice', '{"text": "What does ''stomachache'' mean in Spanish?"}'::jsonb, '{"text": "dolor de estómago"}'::jsonb, '["dolor de cabeza", "dolor de garganta", "dolor de espalda"]'::jsonb, '{"es": "''Stomachache'' es dolor de estómago. En inglés añadimos ''-ache'' a la parte del cuerpo: headache, stomachache, backache."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0008-0005-000000000001', '00000002-0000-0008-0003-000000000001', 5, 'multiple_choice', '{"text": "I ___ a terrible cold this week."}'::jsonb, '{"text": "have"}'::jsonb, '["am", "feel", "do"]'::jsonb, '{"es": "Con enfermedades y síntomas usamos ''have'': ''I have a cold'', ''I have a fever''. No se usa ''am'' porque ''a cold'' es un sustantivo, no un adjetivo."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0008-0006-000000000001', '00000002-0000-0008-0003-000000000001', 6, 'fill_blank', '{"text": "I have a ___. My temperature is 39 degrees."}'::jsonb, '{"text": "fever", "accepted": ["fever"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0008-0007-000000000001', '00000002-0000-0008-0003-000000000001', 7, 'fill_blank', '{"text": "She has a ___. She coughs all night long."}'::jsonb, '{"text": "cough", "accepted": ["cough"]}'::jsonb, NULL, NULL);

-- ---------------------------------------------------------------------------
-- Lesson 8.4: En el Médico
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0008-0004-000000000001', '00000001-0000-0000-0000-000000000008', '00000000-0000-0000-0001-000000000001', 4, 'en-el-medico', '{"es": "En el Médico", "en": "At the Doctor''s"}'::jsonb, '{"es": "Aprende el vocabulario y frases esenciales para una consulta médica: médico, cita, ¿Dónde te duele?, receta y tomar medicamento.", "en": "Learn the vocabulary and essential phrases for a medical appointment: doctor, appointment, Where does it hurt?, prescription and take medicine."}'::jsonb, 'mixed', 25, 15, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0008-0001-000000000001', '00000002-0000-0008-0004-000000000001', 1, 'flashcard', '{"text": "prescription", "subtext": "a written order from a doctor for medicine"}'::jsonb, '{"text": "receta médica", "phonetic": "/prɪˈskrɪpʃən/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0008-0002-000000000001', '00000002-0000-0008-0004-000000000001', 2, 'flashcard', '{"text": "appointment", "subtext": "a scheduled meeting with a doctor"}'::jsonb, '{"text": "cita médica", "phonetic": "/əˈpɔɪntmənt/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0008-0003-000000000001', '00000002-0000-0008-0004-000000000001', 3, 'multiple_choice', '{"text": "How does the doctor ask where the pain is?"}'::jsonb, '{"text": "Where does it hurt?"}'::jsonb, '["What is your name?", "How old are you?", "Do you feel sick?"]'::jsonb, '{"es": "''Where does it hurt?'' es la pregunta del médico para localizar el dolor. Respuesta típica: ''It hurts here'' (Me duele aquí) o ''My stomach hurts'' (Me duele el estómago)."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0008-0004-000000000001', '00000002-0000-0008-0004-000000000001', 4, 'multiple_choice', '{"text": "Take this medicine ___ a day."}'::jsonb, '{"text": "twice"}'::jsonb, '["double", "two times", "second"]'::jsonb, '{"es": "''Twice'' significa ''dos veces''. En inglés: once (una vez), twice (dos veces), three times (tres veces). ''Twice'' es la forma nativa correcta."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0008-0005-000000000001', '00000002-0000-0008-0004-000000000001', 5, 'multiple_choice', '{"text": "What does ''I need to see a doctor'' mean?"}'::jsonb, '{"text": "Necesito ver a un médico."}'::jsonb, '["Necesito una receta.", "Quiero ir al hospital.", "Tengo una cita."]'::jsonb, '{"es": "''I need to see a doctor'' = Necesito ver a un médico. También puedes decir ''I need to make a doctor''s appointment'' (Necesito pedir cita con el médico)."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0008-0006-000000000001', '00000002-0000-0008-0004-000000000001', 6, 'fill_blank', '{"text": "I need to make an ___ with my doctor for next week."}'::jsonb, '{"text": "appointment", "accepted": ["appointment"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0008-0007-000000000001', '00000002-0000-0008-0004-000000000001', 7, 'fill_blank', '{"text": "The doctor gave me a ___ for antibiotics."}'::jsonb, '{"text": "prescription", "accepted": ["prescription"]}'::jsonb, NULL, NULL);
