-- 008_modules_3_5_expansion.sql
-- Modules 3-5 A1 expansion: lessons 2+ for Números, Fechas, Colores/Adjetivos
-- Run AFTER 005_a1_reseed.sql

-- Direct-ID cleanup (handles orphan rows from previous seeding sessions)
DELETE FROM exercises WHERE id IN (
  '00000003-0002-0003-0001-000000000001',
  '00000003-0002-0003-0002-000000000001',
  '00000003-0002-0003-0003-000000000001',
  '00000003-0002-0003-0004-000000000001',
  '00000003-0002-0003-0005-000000000001',
  '00000003-0002-0003-0006-000000000001',
  '00000003-0002-0003-0007-000000000001',
  '00000003-0003-0003-0001-000000000001',
  '00000003-0003-0003-0002-000000000001',
  '00000003-0003-0003-0003-000000000001',
  '00000003-0003-0003-0004-000000000001',
  '00000003-0003-0003-0005-000000000001',
  '00000003-0003-0003-0006-000000000001',
  '00000003-0003-0003-0007-000000000001',
  '00000003-0004-0003-0001-000000000001',
  '00000003-0004-0003-0002-000000000001',
  '00000003-0004-0003-0003-000000000001',
  '00000003-0004-0003-0004-000000000001',
  '00000003-0004-0003-0005-000000000001',
  '00000003-0004-0003-0006-000000000001',
  '00000003-0004-0003-0007-000000000001',
  '00000003-0005-0003-0001-000000000001',
  '00000003-0005-0003-0002-000000000001',
  '00000003-0005-0003-0003-000000000001',
  '00000003-0005-0003-0004-000000000001',
  '00000003-0005-0003-0005-000000000001',
  '00000003-0005-0003-0006-000000000001',
  '00000003-0005-0003-0007-000000000001',
  '00000003-0002-0004-0001-000000000001',
  '00000003-0002-0004-0002-000000000001',
  '00000003-0002-0004-0003-000000000001',
  '00000003-0002-0004-0004-000000000001',
  '00000003-0002-0004-0005-000000000001',
  '00000003-0002-0004-0006-000000000001',
  '00000003-0002-0004-0007-000000000001',
  '00000003-0003-0004-0001-000000000001',
  '00000003-0003-0004-0002-000000000001',
  '00000003-0003-0004-0003-000000000001',
  '00000003-0003-0004-0004-000000000001',
  '00000003-0003-0004-0005-000000000001',
  '00000003-0003-0004-0006-000000000001',
  '00000003-0003-0004-0007-000000000001',
  '00000003-0004-0004-0001-000000000001',
  '00000003-0004-0004-0002-000000000001',
  '00000003-0004-0004-0003-000000000001',
  '00000003-0004-0004-0004-000000000001',
  '00000003-0004-0004-0005-000000000001',
  '00000003-0004-0004-0006-000000000001',
  '00000003-0004-0004-0007-000000000001',
  '00000003-0002-0005-0001-000000000001',
  '00000003-0002-0005-0002-000000000001',
  '00000003-0002-0005-0003-000000000001',
  '00000003-0002-0005-0004-000000000001',
  '00000003-0002-0005-0005-000000000001',
  '00000003-0002-0005-0006-000000000001',
  '00000003-0002-0005-0007-000000000001',
  '00000003-0003-0005-0001-000000000001',
  '00000003-0003-0005-0002-000000000001',
  '00000003-0003-0005-0003-000000000001',
  '00000003-0003-0005-0004-000000000001',
  '00000003-0003-0005-0005-000000000001',
  '00000003-0003-0005-0006-000000000001',
  '00000003-0003-0005-0007-000000000001',
  '00000003-0004-0005-0001-000000000001',
  '00000003-0004-0005-0002-000000000001',
  '00000003-0004-0005-0003-000000000001',
  '00000003-0004-0005-0004-000000000001',
  '00000003-0004-0005-0005-000000000001',
  '00000003-0004-0005-0006-000000000001',
  '00000003-0004-0005-0007-000000000001'
);
DELETE FROM lessons WHERE id IN (
  '00000002-0000-0003-0002-000000000001',
  '00000002-0000-0003-0003-000000000001',
  '00000002-0000-0003-0004-000000000001',
  '00000002-0000-0003-0005-000000000001',
  '00000002-0000-0004-0002-000000000001',
  '00000002-0000-0004-0003-000000000001',
  '00000002-0000-0004-0004-000000000001',
  '00000002-0000-0005-0002-000000000001',
  '00000002-0000-0005-0003-000000000001',
  '00000002-0000-0005-0004-000000000001'
);

DELETE FROM exercises WHERE lesson_id IN (
  SELECT id FROM lessons
  WHERE module_id IN ('00000001-0000-0000-0000-000000000003','00000001-0000-0000-0000-000000000004','00000001-0000-0000-0000-000000000005')
  AND order_index > 1
);
DELETE FROM lessons
WHERE module_id IN ('00000001-0000-0000-0000-000000000003','00000001-0000-0000-0000-000000000004','00000001-0000-0000-0000-000000000005')
AND order_index > 1;

-- ===========================================================================
-- MODULE 03 — Números y Matemáticas Básicas
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- Lesson 3-2: Números del 21 al 100
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0003-0002-000000000001', '00000001-0000-0000-0000-000000000003', '00000000-0000-0000-0001-000000000001', 2, 'numeros-21-100', '{"es": "Números del 21 al 100", "en": "Numbers 21 to 100"}'::jsonb, '{"es": "Aprende las decenas y los números compuestos del 21 al 100 en inglés.", "en": "Learn the tens and compound numbers from 21 to 100 in English."}'::jsonb, 'vocabulary', 20, 12, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0003-0001-000000000001', '00000002-0000-0003-0002-000000000001', 1, 'word_match', '{"text": "Relaciona cada número con su nombre en inglés."}'::jsonb, '{"pairs": [{"en": "twenty-one", "es": "veintiuno"}, {"en": "thirty", "es": "treinta"}, {"en": "fifty-five", "es": "cincuenta y cinco"}, {"en": "eighty", "es": "ochenta"}]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0003-0002-000000000001', '00000002-0000-0003-0002-000000000001', 2, 'flashcard', '{"text": "forty", "subtext": "4 × 10"}'::jsonb, '{"text": "cuarenta", "phonetic": "/ˈfɔːr.ti/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0003-0003-000000000001', '00000002-0000-0003-0002-000000000001', 3, 'flashcard', '{"text": "seventy-two"}'::jsonb, '{"text": "setenta y dos", "phonetic": "/ˌsev.ən.tiˈtuː/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0003-0004-000000000001', '00000002-0000-0003-0002-000000000001', 4, 'multiple_choice', '{"text": "¿Cómo se dice 96 en inglés?"}'::jsonb, '{"text": "ninety-six"}'::jsonb, '["sixty-nine", "nine-six", "ninety-sixteen"]'::jsonb, '{"es": "96 = ninety (90) + six (6). Las decenas del 20 al 90 son: twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0003-0005-000000000001', '00000002-0000-0003-0002-000000000001', 5, 'multiple_choice', '{"text": "¿Qué número representa ''forty-three''?"}'::jsonb, '{"text": "43"}'::jsonb, '["34", "403", "430"]'::jsonb, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0003-0006-000000000001', '00000002-0000-0003-0002-000000000001', 6, 'fill_blank', '{"text": "En inglés, 60 se dice ___."}'::jsonb, '{"text": "sixty", "accepted": ["sixty"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0003-0007-000000000001', '00000002-0000-0003-0002-000000000001', 7, 'fill_blank', '{"text": "En inglés, 28 se dice twenty-___."}'::jsonb, '{"text": "eight", "accepted": ["eight"]}'::jsonb, NULL, NULL);

-- ---------------------------------------------------------------------------
-- Lesson 3-3: Números del 100 al 1000 y Ordinales
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0003-0003-000000000001', '00000001-0000-0000-0000-000000000003', '00000000-0000-0000-0001-000000000001', 3, 'numeros-100-1000-ordinales', '{"es": "Números del 100 al 1000 y Ordinales", "en": "Numbers 100 to 1000 and Ordinals"}'::jsonb, '{"es": "Aprende a expresar centenas y miles, y a usar los números ordinales para indicar orden y posición.", "en": "Learn to express hundreds and thousands, and use ordinal numbers to indicate order and position."}'::jsonb, 'vocabulary', 25, 15, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0003-0001-000000000001', '00000002-0000-0003-0003-000000000001', 1, 'flashcard', '{"text": "one hundred", "subtext": "el número 100"}'::jsonb, '{"text": "cien / ciento", "phonetic": "/wʌn ˈhʌn.drəd/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0003-0002-000000000001', '00000002-0000-0003-0003-000000000001', 2, 'flashcard', '{"text": "five hundred", "subtext": "el número 500"}'::jsonb, '{"text": "quinientos", "phonetic": "/faɪv ˈhʌn.drəd/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0003-0003-000000000001', '00000002-0000-0003-0003-000000000001', 3, 'word_match', '{"text": "Relaciona cada número ordinal con su traducción al español."}'::jsonb, '{"pairs": [{"en": "first", "es": "primero / primera"}, {"en": "second", "es": "segundo / segunda"}, {"en": "third", "es": "tercero / tercera"}, {"en": "fourth", "es": "cuarto / cuarta"}]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0003-0004-000000000001', '00000002-0000-0003-0003-000000000001', 4, 'multiple_choice', '{"text": "¿Cómo se dice 750 en inglés?"}'::jsonb, '{"text": "seven hundred and fifty"}'::jsonb, '["seventy fifty", "seven hundreds fifty", "seven hundred fifty-zero"]'::jsonb, '{"es": "Para números entre 100 y 999: [centenas] hundred and [resto]. Ejemplo: 750 = seven hundred and fifty."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0003-0005-000000000001', '00000002-0000-0003-0003-000000000001', 5, 'multiple_choice', '{"text": "¿Qué significa ''the fifth floor''?"}'::jsonb, '{"text": "el quinto piso"}'::jsonb, '["el primer piso", "el cincuenta piso", "el quinto-cuarto piso"]'::jsonb, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0003-0006-000000000001', '00000002-0000-0003-0003-000000000001', 6, 'fill_blank', '{"text": "She finished in ___ place. She won the gold medal."}'::jsonb, '{"text": "first", "accepted": ["first"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0003-0007-000000000001', '00000002-0000-0003-0003-000000000001', 7, 'fill_blank', '{"text": "There are three ___ people at the concert. (300)"}'::jsonb, '{"text": "hundred", "accepted": ["hundred"]}'::jsonb, NULL, NULL);

-- ---------------------------------------------------------------------------
-- Lesson 3-4: Precios y Dinero
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0003-0004-000000000001', '00000001-0000-0000-0000-000000000003', '00000000-0000-0000-0001-000000000001', 4, 'precios-y-dinero', '{"es": "Precios y Dinero", "en": "Prices and Money"}'::jsonb, '{"es": "Aprende a hablar de precios, dinero y transacciones comerciales básicas en inglés.", "en": "Learn to talk about prices, money, and basic commercial transactions in English."}'::jsonb, 'vocabulary', 20, 12, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0003-0001-000000000001', '00000002-0000-0003-0004-000000000001', 1, 'word_match', '{"text": "Relaciona cada término con su traducción al español."}'::jsonb, '{"pairs": [{"en": "dollar", "es": "dólar"}, {"en": "cent", "es": "centavo"}, {"en": "price", "es": "precio"}, {"en": "receipt", "es": "recibo"}]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0003-0002-000000000001', '00000002-0000-0003-0004-000000000001', 2, 'flashcard', '{"text": "How much does it cost?", "subtext": "pregunta esencial para comprar algo"}'::jsonb, '{"text": "¿Cuánto cuesta?", "phonetic": "/haʊ mʌtʃ dəz ɪt kɒst/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0003-0003-000000000001', '00000002-0000-0003-0004-000000000001', 3, 'flashcard', '{"text": "change", "subtext": "money returned after payment"}'::jsonb, '{"text": "cambio / vuelto", "phonetic": "/tʃeɪndʒ/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0003-0004-000000000001', '00000002-0000-0003-0004-000000000001', 4, 'multiple_choice', '{"text": "¿Cómo se lee ''$4.50'' en inglés?"}'::jsonb, '{"text": "four dollars and fifty cents"}'::jsonb, '["four point fifty", "four fifty dollars", "forty-five cents"]'::jsonb, '{"es": "Para precios en inglés: primero los dólares, luego ''and'', luego los centavos. $4.50 = four dollars and fifty cents."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0003-0005-000000000001', '00000002-0000-0003-0004-000000000001', 5, 'multiple_choice', '{"text": "¿Qué significa ''It''s on sale''?"}'::jsonb, '{"text": "Está en oferta / con descuento"}'::jsonb, '["Está agotado", "Es muy caro", "No está disponible"]'::jsonb, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0003-0006-000000000001', '00000002-0000-0003-0004-000000000001', 6, 'fill_blank', '{"text": "That jacket ___ twenty dollars."}'::jsonb, '{"text": "costs", "accepted": ["costs"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0003-0007-000000000001', '00000002-0000-0003-0004-000000000001', 7, 'fill_blank', '{"text": "Do you have ___? I don''t have the exact amount."}'::jsonb, '{"text": "change", "accepted": ["change"]}'::jsonb, NULL, NULL);

-- ---------------------------------------------------------------------------
-- Lesson 3-5: Operaciones Matemáticas en Inglés
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0003-0005-000000000001', '00000001-0000-0000-0000-000000000003', '00000000-0000-0000-0001-000000000001', 5, 'operaciones-matematicas', '{"es": "Operaciones Matemáticas en Inglés", "en": "Math Operations in English"}'::jsonb, '{"es": "Aprende a expresar sumas, restas, multiplicaciones y divisiones en inglés.", "en": "Learn to express addition, subtraction, multiplication, and division in English."}'::jsonb, 'vocabulary', 25, 15, '{"intro": "En inglés, las operaciones matemáticas tienen nombres específicos. Aprenderlos te permitirá resolver problemas, entender instrucciones y comunicarte en contextos académicos o laborales.", "sections": [{"type": "table", "title": "OPERACIONES MATEMÁTICAS", "headers": ["Símbolo", "En inglés", "Traducción", "Ejemplo"], "rows": [["+", "plus / and", "más", "5 plus 3 equals 8"], ["-", "minus", "menos", "10 minus 4 equals 6"], ["×", "times / multiplied by", "por / multiplicado por", "3 times 4 equals 12"], ["÷", "divided by", "dividido entre / por", "20 divided by 4 equals 5"], ["=", "equals / is", "igual a / es", "7 plus 2 equals 9"]]}, {"type": "note", "variant": "tip", "text": "La estructura de una operación en inglés es: [número] [operación] [número] equals [resultado]. Ejemplo: Eight times three equals twenty-four."}]}'::jsonb, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0005-0003-0001-000000000001', '00000002-0000-0003-0005-000000000001', 1, 'flashcard', '{"text": "plus", "subtext": "el símbolo +"}'::jsonb, '{"text": "más", "phonetic": "/plʌs/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0005-0003-0002-000000000001', '00000002-0000-0003-0005-000000000001', 2, 'flashcard', '{"text": "divided by", "subtext": "el símbolo ÷"}'::jsonb, '{"text": "dividido entre / por", "phonetic": "/dɪˈvaɪ.dɪd baɪ/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0005-0003-0003-000000000001', '00000002-0000-0003-0005-000000000001', 3, 'word_match', '{"text": "Relaciona cada símbolo con su nombre en inglés."}'::jsonb, '{"pairs": [{"en": "plus", "es": "más (+)"}, {"en": "minus", "es": "menos (−)"}, {"en": "times", "es": "por (×)"}, {"en": "equals", "es": "igual (=)"}]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0005-0003-0004-000000000001', '00000002-0000-0003-0005-000000000001', 4, 'multiple_choice', '{"text": "¿Cómo se dice ''12 ÷ 3 = 4'' en inglés?"}'::jsonb, '{"text": "Twelve divided by three equals four"}'::jsonb, '["Twelve minus three equals four", "Twelve times three equals four", "Three divided twelve is four"]'::jsonb, '{"es": "÷ se dice ''divided by''. La estructura es: [número] divided by [número] equals [resultado]. Ej: 12 divided by 3 equals 4."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0005-0003-0005-000000000001', '00000002-0000-0003-0005-000000000001', 5, 'multiple_choice', '{"text": "¿Qué significa ''Six times nine''?"}'::jsonb, '{"text": "Seis por nueve (6 × 9)"}'::jsonb, '["Seis más nueve (6 + 9)", "Seis menos nueve (6 − 9)", "Seis entre nueve (6 ÷ 9)"]'::jsonb, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0005-0003-0006-000000000001', '00000002-0000-0003-0005-000000000001', 6, 'fill_blank', '{"text": "Five ___ three equals eight. (5 + 3 = 8)"}'::jsonb, '{"text": "plus", "accepted": ["plus", "and"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0005-0003-0007-000000000001', '00000002-0000-0003-0005-000000000001', 7, 'fill_blank', '{"text": "Twenty ___ four equals five. (20 ÷ 4 = 5)"}'::jsonb, '{"text": "divided by", "accepted": ["divided by"]}'::jsonb, NULL, NULL);

-- ===========================================================================
-- MODULE 04 — Fechas y el Tiempo
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- Lesson 4-2: Los Meses y las Estaciones
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0004-0002-000000000001', '00000001-0000-0000-0000-000000000004', '00000000-0000-0000-0001-000000000001', 2, 'meses-y-estaciones', '{"es": "Los Meses y las Estaciones", "en": "Months and Seasons"}'::jsonb, '{"es": "Aprende los doce meses del año y las cuatro estaciones en inglés.", "en": "Learn the twelve months of the year and the four seasons in English."}'::jsonb, 'vocabulary', 20, 12, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0004-0001-000000000001', '00000002-0000-0004-0002-000000000001', 1, 'word_match', '{"text": "Relaciona cada estación con su traducción al español."}'::jsonb, '{"pairs": [{"en": "spring", "es": "primavera"}, {"en": "summer", "es": "verano"}, {"en": "autumn", "es": "otoño"}, {"en": "winter", "es": "invierno"}]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0004-0002-000000000001', '00000002-0000-0004-0002-000000000001', 2, 'flashcard', '{"text": "February", "subtext": "el segundo mes del año"}'::jsonb, '{"text": "febrero", "phonetic": "/ˈfeb.ru.er.i/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0004-0003-000000000001', '00000002-0000-0004-0002-000000000001', 3, 'flashcard', '{"text": "November", "subtext": "el undécimo mes del año"}'::jsonb, '{"text": "noviembre", "phonetic": "/noʊˈvem.bər/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0004-0004-000000000001', '00000002-0000-0004-0002-000000000001', 4, 'multiple_choice', '{"text": "¿En qué estación cae la Navidad en el hemisferio norte?"}'::jsonb, '{"text": "Winter (invierno)"}'::jsonb, '["Summer (verano)", "Spring (primavera)", "Autumn (otoño)"]'::jsonb, '{"es": "La Navidad es el 25 de diciembre. En el hemisferio norte, diciembre cae en invierno (winter), que va aproximadamente de diciembre a febrero."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0004-0005-000000000001', '00000002-0000-0004-0002-000000000001', 5, 'multiple_choice', '{"text": "¿Cuál es el tercer mes del año en inglés?"}'::jsonb, '{"text": "March"}'::jsonb, '["May", "February", "April"]'::jsonb, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0004-0006-000000000001', '00000002-0000-0004-0002-000000000001', 6, 'fill_blank', '{"text": "My favorite month is ___. It is the last month of the year."}'::jsonb, '{"text": "December", "accepted": ["December"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0004-0007-000000000001', '00000002-0000-0004-0002-000000000001', 7, 'fill_blank', '{"text": "Flowers bloom in ___. The weather gets warmer after winter."}'::jsonb, '{"text": "spring", "accepted": ["spring", "Spring"]}'::jsonb, NULL, NULL);

-- ---------------------------------------------------------------------------
-- Lesson 4-3: Decir la Hora
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0004-0003-000000000001', '00000001-0000-0000-0000-000000000004', '00000000-0000-0000-0001-000000000001', 3, 'decir-la-hora', '{"es": "Decir la Hora", "en": "Telling the Time"}'::jsonb, '{"es": "Aprende a preguntar y decir la hora en inglés usando los dos sistemas: formal y tradicional.", "en": "Learn to ask and tell the time in English using both systems: formal and traditional."}'::jsonb, 'grammar', 25, 15, '{"intro": "En inglés hay dos formas de decir la hora. El sistema formal usa solo números (3:20 = three twenty). El sistema tradicional usa las expresiones ''past'' (pasado) y ''to'' (para/faltando). Ambos sistemas son correctos y muy comunes.", "sections": [{"type": "table", "title": "CÓMO DECIR LA HORA", "headers": ["Hora", "Sistema formal", "Sistema tradicional"], "rows": [["9:00", "nine", "nine o''clock"], ["9:15", "nine fifteen", "quarter past nine"], ["9:30", "nine thirty", "half past nine"], ["9:45", "nine forty-five", "quarter to ten"], ["9:50", "nine fifty", "ten to ten"]]}, {"type": "note", "variant": "tip", "text": "Para preguntar la hora di: ''What time is it?'' o ''What''s the time?''. La respuesta empieza con ''It''s'': ''It''s three o''clock.''"}]}'::jsonb, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0004-0001-000000000001', '00000002-0000-0004-0003-000000000001', 1, 'flashcard', '{"text": "What time is it?", "subtext": "pregunta para saber la hora"}'::jsonb, '{"text": "¿Qué hora es?", "phonetic": "/wɒt taɪm ɪz ɪt/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0004-0002-000000000001', '00000002-0000-0004-0003-000000000001', 2, 'flashcard', '{"text": "half past", "subtext": ":30 — treinta minutos pasada la hora"}'::jsonb, '{"text": "y media", "phonetic": "/hɑːf pɑːst/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0004-0003-000000000001', '00000002-0000-0004-0003-000000000001', 3, 'word_match', '{"text": "Relaciona cada expresión de tiempo con su equivalente en español."}'::jsonb, '{"pairs": [{"en": "o''clock", "es": "en punto"}, {"en": "quarter past", "es": "y cuarto"}, {"en": "half past", "es": "y media"}, {"en": "quarter to", "es": "menos cuarto"}]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0004-0004-000000000001', '00000002-0000-0004-0003-000000000001', 4, 'multiple_choice', '{"text": "¿Cómo se dice ''3:15'' en inglés?"}'::jsonb, '{"text": "It''s quarter past three"}'::jsonb, '["It''s three past quarter", "It''s quarter to three", "It''s fifteen to three"]'::jsonb, '{"es": "X:15 se dice ''quarter past X''. ''Quarter'' significa cuarto de hora (15 minutos). Así, 3:15 = quarter past three (un cuarto pasadas las tres)."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0004-0005-000000000001', '00000002-0000-0004-0003-000000000001', 5, 'multiple_choice', '{"text": "¿Qué hora es ''ten to eight''?"}'::jsonb, '{"text": "7:50"}'::jsonb, '["8:10", "10:08", "8:50"]'::jsonb, '{"es": "''Ten to eight'' significa diez minutos ANTES de las ocho, es decir, 7:50. La estructura ''X to Y'' indica X minutos que faltan para la hora Y."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0004-0006-000000000001', '00000002-0000-0004-0003-000000000001', 6, 'fill_blank', '{"text": "The meeting starts at nine ___. The clock shows exactly 9:00."}'::jsonb, '{"text": "o''clock", "accepted": ["o''clock"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0004-0007-000000000001', '00000002-0000-0004-0003-000000000001', 7, 'fill_blank', '{"text": "It''s half ___ seven. The time is 7:30."}'::jsonb, '{"text": "past", "accepted": ["past"]}'::jsonb, NULL, NULL);

-- ---------------------------------------------------------------------------
-- Lesson 4-4: Hablar de Fechas y Cumpleaños
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0004-0004-000000000001', '00000001-0000-0000-0000-000000000004', '00000000-0000-0000-0001-000000000001', 4, 'fechas-y-cumpleanos', '{"es": "Hablar de Fechas y Cumpleaños", "en": "Talking About Dates and Birthdays"}'::jsonb, '{"es": "Aprende a preguntar y decir fechas completas, y a hablar de cumpleaños y aniversarios en inglés.", "en": "Learn to ask and say complete dates, and talk about birthdays and anniversaries in English."}'::jsonb, 'mixed', 20, 12, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0004-0001-000000000001', '00000002-0000-0004-0004-000000000001', 1, 'flashcard', '{"text": "birthday", "subtext": "el día en que naciste"}'::jsonb, '{"text": "cumpleaños", "phonetic": "/ˈbɜːrθ.deɪ/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0004-0002-000000000001', '00000002-0000-0004-0004-000000000001', 2, 'flashcard', '{"text": "anniversary", "subtext": "celebración que se repite cada año"}'::jsonb, '{"text": "aniversario", "phonetic": "/ˌæn.ɪˈvɜːr.sər.i/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0004-0003-000000000001', '00000002-0000-0004-0004-000000000001', 3, 'word_match', '{"text": "Relaciona cada expresión temporal con su traducción al español."}'::jsonb, '{"pairs": [{"en": "yesterday", "es": "ayer"}, {"en": "tomorrow", "es": "mañana"}, {"en": "last week", "es": "la semana pasada"}, {"en": "next year", "es": "el próximo año"}]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0004-0004-000000000001', '00000002-0000-0004-0004-000000000001', 4, 'multiple_choice', '{"text": "¿Cómo se pregunta la fecha en inglés?"}'::jsonb, '{"text": "What''s the date today?"}'::jsonb, '["Which date is today?", "How is the date?", "When is today?"]'::jsonb, '{"es": "En inglés se dice ''What''s the date today?'' o ''What is today''s date?''. ''When is today?'' no es una expresión natural en inglés."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0004-0005-000000000001', '00000002-0000-0004-0004-000000000001', 5, 'multiple_choice', '{"text": "¿Cómo se dice ''el 5 de marzo'' en inglés?"}'::jsonb, '{"text": "March fifth / the fifth of March"}'::jsonb, '["Five of March", "March five", "The March 5th"]'::jsonb, '{"es": "Las fechas en inglés usan números ordinales: March fifth o the fifth of March. La expresión ''five of March'' no es natural en inglés."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0004-0006-000000000001', '00000002-0000-0004-0004-000000000001', 6, 'fill_blank', '{"text": "Happy ___! I hope you have a wonderful day. (cumpleaños feliz)"}'::jsonb, '{"text": "birthday", "accepted": ["birthday"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0004-0007-000000000001', '00000002-0000-0004-0004-000000000001', 7, 'fill_blank', '{"text": "They celebrate their wedding ___ every August. (aniversario)"}'::jsonb, '{"text": "anniversary", "accepted": ["anniversary"]}'::jsonb, NULL, NULL);

-- ===========================================================================
-- MODULE 05 — Colores y Adjetivos Básicos
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- Lesson 5-2: Adjetivos de Tamaño y Forma
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0005-0002-000000000001', '00000001-0000-0000-0000-000000000005', '00000000-0000-0000-0001-000000000001', 2, 'adjetivos-tamano-y-forma', '{"es": "Adjetivos de Tamaño y Forma", "en": "Size and Shape Adjectives"}'::jsonb, '{"es": "Aprende a describir el tamaño y la forma de personas y objetos usando adjetivos en inglés.", "en": "Learn to describe the size and shape of people and objects using adjectives in English."}'::jsonb, 'vocabulary', 20, 12, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0005-0001-000000000001', '00000002-0000-0005-0002-000000000001', 1, 'word_match', '{"text": "Relaciona cada adjetivo con su traducción al español."}'::jsonb, '{"pairs": [{"en": "big", "es": "grande"}, {"en": "small", "es": "pequeño / pequeña"}, {"en": "tall", "es": "alto / alta"}, {"en": "short", "es": "bajo / corto"}]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0005-0002-000000000001', '00000002-0000-0005-0002-000000000001', 2, 'flashcard', '{"text": "wide", "subtext": "opposite of narrow"}'::jsonb, '{"text": "ancho / amplio", "phonetic": "/waɪd/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0005-0003-000000000001', '00000002-0000-0005-0002-000000000001', 3, 'flashcard', '{"text": "round", "subtext": "shape like a circle or ball"}'::jsonb, '{"text": "redondo / redonda", "phonetic": "/raʊnd/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0005-0004-000000000001', '00000002-0000-0005-0002-000000000001', 4, 'multiple_choice', '{"text": "¿Cuál es el antónimo de ''tall'' en inglés?"}'::jsonb, '{"text": "short"}'::jsonb, '["long", "thin", "wide"]'::jsonb, '{"es": "''Tall'' significa alto (para personas o edificios). Su antónimo es ''short'' (bajo). ''Long'' describe longitud horizontal, no altura vertical."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0005-0005-000000000001', '00000002-0000-0005-0002-000000000001', 5, 'multiple_choice', '{"text": "¿Qué adjetivo describe mejor la forma de una pelota?"}'::jsonb, '{"text": "round"}'::jsonb, '["square", "flat", "triangular"]'::jsonb, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0005-0006-000000000001', '00000002-0000-0005-0002-000000000001', 6, 'fill_blank', '{"text": "The elephant is very ___. It is one of the largest animals on Earth."}'::jsonb, '{"text": "big", "accepted": ["big", "large", "huge"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0002-0005-0007-000000000001', '00000002-0000-0005-0002-000000000001', 7, 'fill_blank', '{"text": "She is very ___. She can reach the top shelf without a ladder. (alta)"}'::jsonb, '{"text": "tall", "accepted": ["tall"]}'::jsonb, NULL, NULL);

-- ---------------------------------------------------------------------------
-- Lesson 5-3: Adjetivos de Temperatura y Sensaciones
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0005-0003-000000000001', '00000001-0000-0000-0000-000000000005', '00000000-0000-0000-0001-000000000001', 3, 'adjetivos-temperatura-sensaciones', '{"es": "Adjetivos de Temperatura y Sensaciones", "en": "Temperature and Sensation Adjectives"}'::jsonb, '{"es": "Aprende a describir la temperatura y las sensaciones físicas con adjetivos en inglés.", "en": "Learn to describe temperature and physical sensations with adjectives in English."}'::jsonb, 'vocabulary', 20, 12, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0005-0001-000000000001', '00000002-0000-0005-0003-000000000001', 1, 'word_match', '{"text": "Relaciona cada adjetivo de temperatura con su traducción al español."}'::jsonb, '{"pairs": [{"en": "hot", "es": "caliente / caluroso"}, {"en": "cold", "es": "frío / frío"}, {"en": "warm", "es": "tibio / cálido"}, {"en": "cool", "es": "fresco"}]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0005-0002-000000000001', '00000002-0000-0005-0003-000000000001', 2, 'flashcard', '{"text": "freezing", "subtext": "much colder than cold"}'::jsonb, '{"text": "helado / congelado", "phonetic": "/ˈfriː.zɪŋ/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0005-0003-000000000001', '00000002-0000-0005-0003-000000000001', 3, 'flashcard', '{"text": "boiling", "subtext": "extremely hot — like water at 100°C"}'::jsonb, '{"text": "hirviendo / abrasador", "phonetic": "/ˈbɔɪ.lɪŋ/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0005-0004-000000000001', '00000002-0000-0005-0003-000000000001', 4, 'multiple_choice', '{"text": "¿Cómo describes una sopa recién preparada?"}'::jsonb, '{"text": "The soup is hot"}'::jsonb, '["The soup is cool", "The soup is freezing", "The soup is cold"]'::jsonb, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0005-0005-000000000001', '00000002-0000-0005-0003-000000000001', 5, 'multiple_choice', '{"text": "¿Qué significa ''The weather is mild today''?"}'::jsonb, '{"text": "El clima está templado / agradable hoy"}'::jsonb, '["El clima está muy frío hoy", "El clima está muy caluroso hoy", "El clima es peligroso hoy"]'::jsonb, '{"es": "''Mild'' describe un clima templado, ni muy frío ni muy caluroso. Es una temperatura moderada y agradable, perfecta para estar al aire libre."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0005-0006-000000000001', '00000002-0000-0005-0003-000000000001', 6, 'fill_blank', '{"text": "I need a jacket. It''s very ___ outside today. (muy frío)"}'::jsonb, '{"text": "cold", "accepted": ["cold", "freezing"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0003-0005-0007-000000000001', '00000002-0000-0005-0003-000000000001', 7, 'fill_blank', '{"text": "The water is ___ at 100 degrees Celsius. (hirviendo)"}'::jsonb, '{"text": "boiling", "accepted": ["boiling"]}'::jsonb, NULL, NULL);

-- ---------------------------------------------------------------------------
-- Lesson 5-4: Adjetivos de Calidad y Opinión
-- ---------------------------------------------------------------------------
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES
('00000002-0000-0005-0004-000000000001', '00000001-0000-0000-0000-000000000005', '00000000-0000-0000-0001-000000000001', 4, 'adjetivos-calidad-opinion', '{"es": "Adjetivos de Calidad y Opinión", "en": "Quality and Opinion Adjectives"}'::jsonb, '{"es": "Aprende adjetivos para expresar calidad y opinión personal sobre personas, lugares y cosas en inglés.", "en": "Learn adjectives to express quality and personal opinion about people, places, and things in English."}'::jsonb, 'vocabulary', 25, 15, NULL, true);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0005-0001-000000000001', '00000002-0000-0005-0004-000000000001', 1, 'word_match', '{"text": "Relaciona cada adjetivo con su traducción al español."}'::jsonb, '{"pairs": [{"en": "beautiful", "es": "hermoso / hermosa"}, {"en": "ugly", "es": "feo / fea"}, {"en": "delicious", "es": "delicioso / deliciosa"}, {"en": "awful", "es": "horrible / terrible"}]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0005-0002-000000000001', '00000002-0000-0005-0004-000000000001', 2, 'flashcard', '{"text": "amazing", "subtext": "very impressive or surprising"}'::jsonb, '{"text": "increíble / asombroso", "phonetic": "/əˈmeɪ.zɪŋ/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0005-0003-000000000001', '00000002-0000-0005-0004-000000000001', 3, 'flashcard', '{"text": "terrible", "subtext": "very bad or unpleasant"}'::jsonb, '{"text": "terrible / horrible", "phonetic": "/ˈter.ɪ.bəl/"}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0005-0004-000000000001', '00000002-0000-0005-0004-000000000001', 4, 'multiple_choice', '{"text": "¿Cuál es sinónimo de ''wonderful''?"}'::jsonb, '{"text": "fantastic"}'::jsonb, '["awful", "boring", "ugly"]'::jsonb, '{"es": "''Wonderful'' y ''fantastic'' son sinónimos que expresan algo maravilloso o excelente. ''Awful'', ''boring'' y ''ugly'' tienen connotaciones negativas."}'::jsonb);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0005-0005-000000000001', '00000002-0000-0005-0004-000000000001', 5, 'multiple_choice', '{"text": "¿Qué significa ''The food was disgusting''?"}'::jsonb, '{"text": "La comida era asquerosa / muy desagradable"}'::jsonb, '["La comida era deliciosa", "La comida era mediocre", "La comida estaba fría"]'::jsonb, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0005-0006-000000000001', '00000002-0000-0005-0004-000000000001', 6, 'fill_blank', '{"text": "This movie is ___. I fell asleep halfway through. (muy aburrida)"}'::jsonb, '{"text": "boring", "accepted": ["boring", "awful", "terrible"]}'::jsonb, NULL, NULL);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation) VALUES
('00000003-0004-0005-0007-000000000001', '00000002-0000-0005-0004-000000000001', 7, 'fill_blank', '{"text": "The sunset was ___. We took many photos. (hermoso / increíble)"}'::jsonb, '{"text": "beautiful", "accepted": ["beautiful", "amazing", "gorgeous"]}'::jsonb, NULL, NULL);
