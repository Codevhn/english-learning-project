-- =============================================
-- Seed: "Inglés para Hispanohablantes" — A1
-- =============================================

-- Course
insert into public.courses (id, slug, title, description, source_language, target_language, is_published)
values (
  '00000000-0000-0000-0000-000000000001',
  'ingles-para-hispanohablantes',
  '{"es": "Inglés para Hispanohablantes", "en": "English for Spanish Speakers"}',
  '{"es": "Aprende inglés desde cero con un currículo estructurado y progresivo, diseñado para hispanohablantes.", "en": "Learn English from scratch with a structured, progressive curriculum designed for Spanish speakers."}',
  'es',
  'en',
  true
);

-- Unit A1
insert into public.units (id, course_id, order_index, slug, title, description, cefr_level, icon, is_published)
values (
  '00000000-0000-0000-0001-000000000001',
  '00000000-0000-0000-0000-000000000001',
  1,
  'a1-principiante',
  '{"es": "A1 — Principiante", "en": "A1 — Beginner"}',
  '{"es": "Los fundamentos del inglés: el alfabeto, saludos, números y gramática básica.", "en": "English fundamentals: the alphabet, greetings, numbers, and basic grammar."}',
  'A1',
  null,
  true
);

-- Lesson 1: El Alfabeto
insert into public.lessons (id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, is_published)
values (
  '00000000-0000-0001-0000-000000000001',
  '00000000-0000-0000-0001-000000000001',
  1,
  'el-alfabeto',
  '{"es": "El Alfabeto", "en": "The Alphabet"}',
  '{"es": "Aprende las 26 letras del alfabeto inglés y cómo se pronuncian.", "en": "Learn the 26 letters of the English alphabet and how they sound."}',
  'vocabulary',
  10,
  8,
  true
);

-- Lesson 2: Saludos Básicos
insert into public.lessons (id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, is_published)
values (
  '00000000-0000-0001-0000-000000000002',
  '00000000-0000-0000-0001-000000000001',
  2,
  'saludos-basicos',
  '{"es": "Saludos Básicos", "en": "Basic Greetings"}',
  '{"es": "Aprende a saludar y presentarte en inglés.", "en": "Learn how to greet people and introduce yourself in English."}',
  'vocabulary',
  10,
  6,
  true
);

-- Lesson 3: Números 1-20
insert into public.lessons (id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, is_published)
values (
  '00000000-0000-0001-0000-000000000003',
  '00000000-0000-0000-0001-000000000001',
  3,
  'numeros-1-20',
  '{"es": "Números 1–20", "en": "Numbers 1–20"}',
  '{"es": "Aprende a contar del 1 al 20 en inglés.", "en": "Learn to count from 1 to 20 in English."}',
  'vocabulary',
  10,
  7,
  true
);

-- =============================================
-- Vocabulary: Greetings
-- =============================================
insert into public.vocabulary (id, course_id, word, translation, phonetic, part_of_speech, cefr_level, example_sentence, tags)
values
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'hello', '{"es": "hola"}', '/həˈloʊ/', 'exclamation', 'A1', '{"es": "Hola, ¿cómo estás?", "en": "Hello, how are you?"}', '{greetings}'),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'goodbye', '{"es": "adiós"}', '/ˌɡʊdˈbaɪ/', 'exclamation', 'A1', '{"es": "Adiós, hasta luego.", "en": "Goodbye, see you later."}', '{greetings}'),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'good morning', '{"es": "buenos días"}', '/ˌɡʊd ˈmɔːrnɪŋ/', 'phrase', 'A1', '{"es": "Buenos días, ¿cómo dormiste?", "en": "Good morning, how did you sleep?"}', '{greetings,time}'),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'good afternoon', '{"es": "buenas tardes"}', '/ˌɡʊd ˈæftərˌnuːn/', 'phrase', 'A1', '{"es": "Buenas tardes, señora García.", "en": "Good afternoon, Mrs. García."}', '{greetings,time}'),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'good evening', '{"es": "buenas noches (saludo)"}', '/ˌɡʊd ˈiːvnɪŋ/', 'phrase', 'A1', '{"es": "Buenas noches a todos.", "en": "Good evening, everyone."}', '{greetings,time}'),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'good night', '{"es": "buenas noches (despedida)"}', '/ˌɡʊd ˈnaɪt/', 'phrase', 'A1', '{"es": "Buenas noches, que descanses.", "en": "Good night, sleep well."}', '{greetings,time}'),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'please', '{"es": "por favor"}', '/pliːz/', 'adverb', 'A1', '{"es": "Un café, por favor.", "en": "A coffee, please."}', '{polite}'),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'thank you', '{"es": "gracias"}', '/ˈθæŋk juː/', 'phrase', 'A1', '{"es": "Gracias por tu ayuda.", "en": "Thank you for your help."}', '{polite}'),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'yes', '{"es": "sí"}', '/jɛs/', 'adverb', 'A1', null, '{basic}'),
  (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'no', '{"es": "no"}', '/noʊ/', 'adverb', 'A1', null, '{basic}');

-- =============================================
-- Exercises: Lesson 2 — Saludos Básicos
-- =============================================
insert into public.exercises (lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags)
values
  -- Exercise 1: Flashcard
  (
    '00000000-0000-0001-0000-000000000002', 1, 'flashcard',
    '{"text": "hello", "subtext": "¿Qué significa esta palabra?"}',
    '{"text": "hola", "phonetic": "/həˈloʊ/"}',
    null,
    '{"es": "\"Hello\" es el saludo más común en inglés, equivalente a \"hola\" en español."}',
    '{greetings,A1}'
  ),
  -- Exercise 2: Multiple choice
  (
    '00000000-0000-0001-0000-000000000002', 2, 'multiple_choice',
    '{"text": "¿Cómo se dice \"buenos días\" en inglés?"}',
    '{"text": "Good morning"}',
    '["Good night", "Good afternoon", "Good evening"]',
    '{"es": "\"Good morning\" se usa para saludar en la mañana. \"Good afternoon\" es para la tarde y \"Good evening\" para la noche."}',
    '{greetings,A1}'
  ),
  -- Exercise 3: Multiple choice
  (
    '00000000-0000-0001-0000-000000000002', 3, 'multiple_choice',
    '{"text": "¿Qué significa \"goodbye\"?"}',
    '{"text": "adiós"}',
    '["hola", "por favor", "gracias"]',
    '{"es": "\"Goodbye\" es la forma estándar de despedirse. También se puede decir \"bye\" de manera más informal."}',
    '{greetings,A1}'
  ),
  -- Exercise 4: Fill blank
  (
    '00000000-0000-0001-0000-000000000002', 4, 'fill_blank',
    '{"text": "— ___, how are you? — Fine, thank you!", "blank_position": 0}',
    '{"text": "Hello", "accepted": ["hello", "hi", "Hello", "Hi"]}',
    null,
    '{"es": "Completar con un saludo. \"Hello\" o \"Hi\" son ambos correctos aquí."}',
    '{greetings,A1}'
  ),
  -- Exercise 5: Multiple choice
  (
    '00000000-0000-0001-0000-000000000002', 5, 'multiple_choice',
    '{"text": "¿Cómo se dice \"gracias\" en inglés?"}',
    '{"text": "Thank you"}',
    '["Please", "Sorry", "Excuse me"]',
    '{"es": "\"Thank you\" o simplemente \"thanks\" son las formas de agradecer en inglés."}',
    '{polite,A1}'
  ),
  -- Exercise 6: Translation
  (
    '00000000-0000-0001-0000-000000000002', 6, 'translation',
    '{"text": "Traduce al inglés: \"Por favor, repite eso.\""}',
    '{"text": "Please repeat that.", "accepted": ["Please repeat that.", "Please repeat that", "please repeat that"]}',
    null,
    '{"es": "\"Please\" va al inicio o al final de la frase de petición. \"Please repeat that\" o \"Repeat that, please\" son ambas correctas."}',
    '{polite,A1}'
  ),
  -- Exercise 7: Multiple choice
  (
    '00000000-0000-0001-0000-000000000002', 7, 'multiple_choice',
    '{"text": "Son las 9 de la noche. ¿Cuál es el saludo correcto?"}',
    '{"text": "Good evening"}',
    '["Good morning", "Good afternoon", "Good night"]',
    '{"es": "\"Good evening\" se usa para saludar desde las ~6pm. \"Good night\" es para despedirse antes de dormir, no para saludar."}',
    '{greetings,A1}'
  ),
  -- Exercise 8: Flashcard
  (
    '00000000-0000-0001-0000-000000000002', 8, 'flashcard',
    '{"text": "please", "subtext": "¿Qué significa y cuándo se usa?"}',
    '{"text": "por favor", "phonetic": "/pliːz/", "note": "Se añade a cualquier petición para hacerla más cortés."}',
    null,
    '{"es": "\"Please\" hace cualquier petición más educada. Puede ir al principio o al final de la frase."}',
    '{polite,A1}'
  );

-- =============================================
-- Achievements seed
-- =============================================
insert into public.achievements (slug, title, description, icon, condition_type, condition_value)
values
  ('first-lesson', '{"es": "Primer Paso", "en": "First Step"}', '{"es": "Completa tu primera lección", "en": "Complete your first lesson"}', 'BookOpen', 'lessons', 1),
  ('streak-3', '{"es": "3 Días Seguidos", "en": "3-Day Streak"}', '{"es": "Estudia 3 días consecutivos", "en": "Study 3 days in a row"}', 'Flame', 'streak', 3),
  ('streak-7', '{"es": "Semana Perfecta", "en": "Week Warrior"}', '{"es": "Estudia 7 días consecutivos", "en": "Study 7 days in a row"}', 'Flame', 'streak', 7),
  ('streak-30', '{"es": "Mes de Estudio", "en": "Monthly Master"}', '{"es": "Estudia 30 días consecutivos", "en": "Study 30 days in a row"}', 'Trophy', 'streak', 30),
  ('words-50', '{"es": "50 Palabras", "en": "50 Words"}', '{"es": "Aprende 50 palabras", "en": "Learn 50 words"}', 'BookMarked', 'words', 50),
  ('words-100', '{"es": "100 Palabras", "en": "Century Club"}', '{"es": "Aprende 100 palabras", "en": "Learn 100 words"}', 'Award', 'words', 100),
  ('perfect-lesson', '{"es": "Lección Perfecta", "en": "Perfectionist"}', '{"es": "Obtén 100% en cualquier lección", "en": "Score 100% on any lesson"}', 'Star', 'perfect_lesson', 1);
