-- =============================================
-- Seed adicional: Lección 1 — El Alfabeto
-- Lección 3 — Números 1-20
-- =============================================

-- =============================================
-- EJERCICIOS: Lección 1 — El Alfabeto
-- =============================================
insert into public.exercises (lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags)
values
  -- 1. Flashcard: A
  (
    '00000000-0000-0001-0000-000000000001', 1, 'flashcard',
    '{"text": "A", "subtext": "¿Cómo se pronuncia esta letra en inglés?"}',
    '{"text": "ei", "phonetic": "/eɪ/", "note": "Como en \"say\" o \"day\". La misma vocal que en \"cake\"."}',
    null,
    '{"es": "La letra A en inglés suena \"ei\" (/eɪ/), no como la \"a\" española."}',
    '{alphabet,A1}'
  ),
  -- 2. Flashcard: E
  (
    '00000000-0000-0001-0000-000000000001', 2, 'flashcard',
    '{"text": "E", "subtext": "¿Cómo se pronuncia esta letra en inglés?"}',
    '{"text": "ii", "phonetic": "/iː/", "note": "Como en \"see\" o \"tree\". Un sonido largo."}',
    null,
    '{"es": "La letra E en inglés suena \"ii\" (/iː/), como la \"i\" española pero más larga."}',
    '{alphabet,A1}'
  ),
  -- 3. Multiple choice: pronunciación de B
  (
    '00000000-0000-0001-0000-000000000001', 3, 'multiple_choice',
    '{"text": "¿Cómo suena la letra B en inglés?"}',
    '{"text": "bi"}',
    '["be", "ba", "bu"]',
    '{"es": "La B en inglés se pronuncia \"bi\" (/biː/). Similar a la B española pero con el sonido de \"i\" larga al final."}',
    '{alphabet,A1}'
  ),
  -- 4. Multiple choice: pronunciación de C
  (
    '00000000-0000-0001-0000-000000000001', 4, 'multiple_choice',
    '{"text": "¿Cuál es la pronunciación correcta de la letra C?"}',
    '{"text": "si"}',
    '["ce", "ka", "ci"]',
    '{"es": "La C en inglés se pronuncia \"si\" (/siː/). No como la \"c\" española."}',
    '{alphabet,A1}'
  ),
  -- 5. Fill blank: letra que falta
  (
    '00000000-0000-0001-0000-000000000001', 5, 'fill_blank',
    '{"text": "A, B, ___, D, E", "blank_position": 2}',
    '{"text": "C", "accepted": ["C", "c"]}',
    null,
    '{"es": "El orden del alfabeto inglés es igual al español en las primeras letras: A, B, C, D, E..."}',
    '{alphabet,A1}'
  ),
  -- 6. Multiple choice: vocales
  (
    '00000000-0000-0001-0000-000000000001', 6, 'multiple_choice',
    '{"text": "¿Cuáles son las 5 vocales del alfabeto inglés?"}',
    '{"text": "A, E, I, O, U"}',
    '["A, E, I, O, Y", "A, I, O, U, W", "E, I, O, U, Y"]',
    '{"es": "Las vocales en inglés son A, E, I, O, U — las mismas que en español, aunque con pronunciaciones diferentes."}',
    '{alphabet,A1}'
  ),
  -- 7. Multiple choice: pronunciación de H
  (
    '00000000-0000-0001-0000-000000000001', 7, 'multiple_choice',
    '{"text": "La letra H en inglés se pronuncia..."}',
    '{"text": "eich"}',
    '["ha", "ache", "hache"]',
    '{"es": "La H inglesa se pronuncia \"eich\" (/eɪtʃ/). En inglés la H generalmente SÍ se pronuncia, a diferencia del español donde es muda."}',
    '{alphabet,A1}'
  ),
  -- 8. Fill blank: cuántas letras
  (
    '00000000-0000-0001-0000-000000000001', 8, 'fill_blank',
    '{"text": "El alfabeto inglés tiene ___ letras."}',
    '{"text": "26", "accepted": ["26", "veintiséis", "veintiseis"]}',
    null,
    '{"es": "El alfabeto inglés tiene 26 letras, igual que el español moderno (sin la Ñ)."}',
    '{alphabet,A1}'
  ),
  -- 9. Multiple choice: letra W
  (
    '00000000-0000-0001-0000-000000000001', 9, 'multiple_choice',
    '{"text": "¿Cómo se pronuncia la letra W en inglés?"}',
    '{"text": "dóbliuu"}',
    '["vei", "uve doble", "dáblio"]',
    '{"es": "La W se pronuncia \"double-u\" (/ˈdʌbəl.juː/) en inglés formal, o \"dóbliuu\" coloquialmente. Es una de las letras más difíciles de pronunciar para hispanohablantes."}',
    '{alphabet,A1}'
  ),
  -- 10. Translation: spell your name
  (
    '00000000-0000-0001-0000-000000000001', 10, 'translation',
    '{"text": "Traduce al inglés: \"¿Puedes deletrear tu nombre?\""}',
    '{"text": "Can you spell your name?", "accepted": ["Can you spell your name?", "Can you spell your name", "can you spell your name?"]}',
    null,
    '{"es": "\"Spell\" significa deletrear. \"Can you spell...?\" es la frase estándar para pedir que alguien deletree algo."}',
    '{alphabet,speaking,A1}'
  );

-- =============================================
-- EJERCICIOS: Lección 3 — Números 1-20
-- =============================================
insert into public.exercises (lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags)
values
  -- 1. Flashcard: 1-5
  (
    '00000000-0000-0001-0000-000000000003', 1, 'flashcard',
    '{"text": "1, 2, 3, 4, 5", "subtext": "¿Sabes estos números en inglés?"}',
    '{"text": "one, two, three, four, five", "note": "Pronúncialos: uan, tuu, zrii, foor, faiv"}',
    null,
    '{"es": "Los primeros cinco números: one (1), two (2), three (3), four (4), five (5)."}',
    '{numbers,A1}'
  ),
  -- 2. Multiple choice: 7
  (
    '00000000-0000-0001-0000-000000000003', 2, 'multiple_choice',
    '{"text": "¿Cómo se dice el número 7 en inglés?"}',
    '{"text": "seven"}',
    '["six", "eight", "eleven"]',
    '{"es": "Seven (7). Recuerda la secuencia: six (6), seven (7), eight (8)."}',
    '{numbers,A1}'
  ),
  -- 3. Multiple choice: traducción de "three"
  (
    '00000000-0000-0001-0000-000000000003', 3, 'multiple_choice',
    '{"text": "¿Qué número es \"three\"?"}',
    '{"text": "3"}',
    '["2", "13", "30"]',
    '{"es": "Three = 3. No confundir con thirteen (13) o thirty (30)."}',
    '{numbers,A1}'
  ),
  -- 4. Fill blank: secuencia
  (
    '00000000-0000-0001-0000-000000000003', 4, 'fill_blank',
    '{"text": "eight, nine, ___, eleven"}',
    '{"text": "ten", "accepted": ["ten", "Ten"]}',
    null,
    '{"es": "La secuencia es eight (8), nine (9), ten (10), eleven (11)."}',
    '{numbers,A1}'
  ),
  -- 5. Multiple choice: 12
  (
    '00000000-0000-0001-0000-000000000003', 5, 'multiple_choice',
    '{"text": "¿Cómo se dice 12 en inglés?"}',
    '{"text": "twelve"}',
    '["twenty", "eleven", "thirteen"]',
    '{"es": "Twelve (12) es irregular. Del 13 en adelante se forma con el sufijo -teen: thirteen, fourteen, fifteen..."}',
    '{numbers,A1}'
  ),
  -- 6. Flashcard: teens
  (
    '00000000-0000-0001-0000-000000000003', 6, 'flashcard',
    '{"text": "13, 14, 15", "subtext": "¿Cómo se forman estos números?"}',
    '{"text": "thirteen, fourteen, fifteen", "note": "Los números del 13 al 19 terminan en -teen. ¡Cuidado con la pronunciación!"}',
    null,
    '{"es": "Thirteen, fourteen, fifteen. El sufijo -teen indica los números del 13 al 19."}',
    '{numbers,A1}'
  ),
  -- 7. Multiple choice: 20
  (
    '00000000-0000-0001-0000-000000000003', 7, 'multiple_choice',
    '{"text": "¿Cómo se dice 20 en inglés?"}',
    '{"text": "twenty"}',
    '["twelve", "twelfth", "nineteen"]',
    '{"es": "Twenty (20). Los múltiplos de diez terminan en -ty: twenty, thirty, forty..."}',
    '{numbers,A1}'
  ),
  -- 8. Fill blank: en contexto
  (
    '00000000-0000-0001-0000-000000000003', 8, 'fill_blank',
    '{"text": "I have ___ cats. (2)"}',
    '{"text": "two", "accepted": ["two", "Two"]}',
    null,
    '{"es": "\"I have two cats\" = Tengo dos gatos. Los números van antes del sustantivo en inglés."}',
    '{numbers,grammar,A1}'
  ),
  -- 9. Multiple choice: cuántos años
  (
    '00000000-0000-0001-0000-000000000003', 9, 'multiple_choice',
    '{"text": "\"I am sixteen years old.\" ¿Cuántos años tiene?"}',
    '{"text": "16"}',
    '["6", "60", "17"]',
    '{"es": "Sixteen = 16. \"I am X years old\" es la forma de decir la edad en inglés."}',
    '{numbers,A1}'
  ),
  -- 10. Translation
  (
    '00000000-0000-0001-0000-000000000003', 10, 'translation',
    '{"text": "Traduce al inglés: \"Tengo veinte años.\""}',
    '{"text": "I am twenty years old.", "accepted": ["I am twenty years old.", "I am twenty years old", "i am twenty years old.", "I''m twenty years old.", "I am 20 years old.", "I am 20 years old"]}',
    null,
    '{"es": "\"I am twenty years old\" o \"I''m twenty\" son las formas correctas. En inglés no se usa el verbo tener (have) para la edad, sino el verbo ser/estar (be)."}',
    '{numbers,grammar,A1}'
  );
