-- 024_a2_module2_presente_continuo.sql
-- A2 Module 2: Presente Continuo — 4 lessons
-- Run AFTER 022_a2_unit_and_modules.sql

DELETE FROM exercises WHERE lesson_id IN (
  SELECT id FROM lessons WHERE module_id = 'b0000001-0000-0000-0000-000000000002'
);
DELETE FROM lessons WHERE module_id = 'b0000001-0000-0000-0000-000000000002';

-- ============================================================
-- LESSON 1: Formar el Presente Continuo
-- ============================================================
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published)
VALUES (
  'b0000002-0000-0000-0002-000000000001',
  'b0000001-0000-0000-0000-000000000002',
  'b0000000-0000-0000-0000-000000000001',
  1,
  'presente-continuo-formacion',
  '{"en": "Forming the Present Continuous", "es": "Formar el Presente Continuo"}'::jsonb,
  '{"en": "Learn how to build am/is/are + verb-ing and the three spelling rules for -ing.", "es": "Aprende a formar am/is/are + verbo-ing y las tres reglas de ortografía para el -ing."}'::jsonb,
  'grammar',
  20,
  12,
  '{"intro": "El presente continuo se forma con el verbo to be (am/is/are) más el verbo principal terminado en -ing: sujeto + am/is/are + verbo-ing. Se usa para hablar de acciones que están pasando ahora mismo.", "sections": [{"type": "table", "title": "REGLAS DE ORTOGRAFÍA PARA -ING", "headers": ["Regla", "Ejemplos"], "rows": [["Regla general: añade -ing", "eat -> eating, go -> going, read -> reading"], ["Verbos terminados en -e muda: elimina la e", "make -> making, write -> writing, dance -> dancing"], ["Verbos cortos (consonante-vocal-consonante): dobla la consonante final", "run -> running, sit -> sitting, swim -> swimming"]]}, {"type": "examples", "title": "EJEMPLOS", "items": [{"en": "I am eating breakfast now.", "es": "Estoy desayunando ahora."}, {"en": "She is making a cake.", "es": "Ella está haciendo un pastel."}, {"en": "They are running in the park.", "es": "Ellos están corriendo en el parque."}]}, {"type": "note", "variant": "tip", "text": "Am, is y are casi siempre se contraen: I''m, she''s, they''re. Usa las contracciones al hablar."}]}'::jsonb,
  true
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES
('b0000003-0001-0002-0001-000000000001', 'b0000002-0000-0000-0002-000000000001', 1, 'multiple_choice',
  '{"text": "¿Cuál es la forma correcta del verbo write en presente continuo?"}'::jsonb,
  '{"text": "writing"}'::jsonb,
  '["writeing", "writting", "writeng"]'::jsonb,
  '{"es": "Los verbos terminados en -e muda pierden la e antes de añadir -ing: write → writing."}'::jsonb,
  '{"grammar:present_continuous_formation","grammar:spelling_rules"}'
),
('b0000003-0001-0002-0002-000000000001', 'b0000002-0000-0000-0002-000000000001', 2, 'multiple_choice',
  '{"text": "¿Cuál es la forma correcta del verbo run en presente continuo?"}'::jsonb,
  '{"text": "running"}'::jsonb,
  '["runing", "runnning", "runeing"]'::jsonb,
  '{"es": "Run es un verbo corto (consonante-vocal-consonante), así que se dobla la n final: run → running."}'::jsonb,
  '{"grammar:present_continuous_formation","grammar:spelling_rules"}'
),
('b0000003-0001-0002-0003-000000000001', 'b0000002-0000-0000-0002-000000000001', 3, 'fill_blank',
  '{"text": "She ___ (make) a sandwich right now."}'::jsonb,
  '{"text": "is making", "accepted": ["is making"]}'::jsonb,
  NULL,
  '{"es": "Sujeto she + is + making (make pierde la e final)."}'::jsonb,
  '{"grammar:present_continuous_formation"}'
),
('b0000003-0001-0002-0004-000000000001', 'b0000002-0000-0000-0002-000000000001', 4, 'fill_blank',
  '{"text": "I ___ (sit) on the sofa now."}'::jsonb,
  '{"text": "am sitting", "accepted": ["am sitting"]}'::jsonb,
  NULL,
  '{"es": "Sujeto I + am + sitting (sit dobla la t final)."}'::jsonb,
  '{"grammar:present_continuous_formation","grammar:spelling_rules"}'
),
('b0000003-0001-0002-0005-000000000001', 'b0000002-0000-0000-0002-000000000001', 5, 'fill_blank',
  '{"text": "We ___ (play) football at the moment."}'::jsonb,
  '{"text": "are playing", "accepted": ["are playing"]}'::jsonb,
  NULL,
  '{"es": "Sujeto we + are + playing (regla general: solo se añade -ing)."}'::jsonb,
  '{"grammar:present_continuous_formation"}'
),
('b0000003-0001-0002-0006-000000000001', 'b0000002-0000-0000-0002-000000000001', 6, 'translation',
  '{"text": "Ella está escribiendo una carta."}'::jsonb,
  '{"text": "She is writing a letter.", "accepted": ["She is writing a letter.", "She''s writing a letter."]}'::jsonb,
  NULL,
  NULL,
  '{"grammar:present_continuous_formation"}'
),
('b0000003-0001-0002-0007-000000000001', 'b0000002-0000-0000-0002-000000000001', 7, 'translation',
  '{"text": "Nosotros estamos corriendo en el parque."}'::jsonb,
  '{"text": "We are running in the park.", "accepted": ["We are running in the park.", "We''re running in the park."]}'::jsonb,
  NULL,
  NULL,
  '{"grammar:present_continuous_formation","grammar:spelling_rules"}'
),
('b0000003-0001-0002-0008-000000000001', 'b0000002-0000-0000-0002-000000000001', 8, 'multiple_choice',
  '{"text": "¿Qué regla de ortografía se aplica para formar sit → sitting?"}'::jsonb,
  '{"text": "Doblar la consonante final"}'::jsonb,
  '["Añadir -ing sin cambios", "Eliminar la e final", "Cambiar la y por i"]'::jsonb,
  '{"es": "Sit es un verbo corto con consonante-vocal-consonante, así que se dobla la última consonante: sit → sitting."}'::jsonb,
  '{"grammar:spelling_rules"}'
);

-- ============================================================
-- LESSON 2: Presente Continuo: Afirmativo, Negativo e Interrogativo
-- ============================================================
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published)
VALUES (
  'b0000002-0000-0000-0002-000000000002',
  'b0000001-0000-0000-0000-000000000002',
  'b0000000-0000-0000-0000-000000000001',
  2,
  'presente-continuo-afirmativo-negativo-interrogativo',
  '{"en": "Present Continuous: Affirmative, Negative and Interrogative", "es": "Presente Continuo: Afirmativo, Negativo e Interrogativo"}'::jsonb,
  '{"en": "Learn how to make negative sentences and questions in the present continuous, plus short answers.", "es": "Aprende a formar oraciones negativas y preguntas en presente continuo, además de respuestas cortas."}'::jsonb,
  'grammar',
  22,
  13,
  '{"intro": "El presente continuo tiene tres formas: afirmativa, negativa e interrogativa. Las tres usan el verbo to be (am/is/are) como auxiliar.", "sections": [{"type": "table", "title": "AFIRMATIVO, NEGATIVO E INTERROGATIVO", "headers": ["Forma", "Estructura", "Ejemplo"], "rows": [["Afirmativa", "sujeto + am/is/are + verbo-ing", "She is listening to music."], ["Negativa", "sujeto + am/is/are + not + verbo-ing", "She isn''t listening to music."], ["Interrogativa", "Am/Is/Are + sujeto + verbo-ing?", "Is she listening to music?"]]}, {"type": "explanation", "title": "RESPUESTAS CORTAS", "text": "Para responder preguntas cortas, usamos el mismo auxiliar (am/is/are) sin repetir el verbo principal: ''Are you working? Yes, I am. / No, I''m not.'' ''Is he studying? Yes, he is. / No, he isn''t.''"}, {"type": "note", "variant": "warning", "text": "Cuidado: en inglés SIEMPRE necesitas el verbo to be antes del verbo -ing. No digas ''I working''; di ''I am working''."}]}'::jsonb,
  true
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES
('b0000003-0002-0002-0001-000000000001', 'b0000002-0000-0000-0002-000000000002', 1, 'multiple_choice',
  '{"text": "¿Cuál es la forma negativa correcta de They are sleeping?"}'::jsonb,
  '{"text": "They aren''t sleeping."}'::jsonb,
  '["They not are sleeping.", "They doesn''t sleeping.", "They no are sleeping."]'::jsonb,
  '{"es": "La negación se forma con am/is/are + not: are + not = aren''t."}'::jsonb,
  '{"grammar:present_continuous_negative"}'
),
('b0000003-0002-0002-0002-000000000001', 'b0000002-0000-0000-0002-000000000002', 2, 'fill_blank',
  '{"text": "He ___ (not/study) English now."}'::jsonb,
  '{"text": "isn''t studying", "accepted": ["isn''t studying", "is not studying"]}'::jsonb,
  NULL,
  '{"es": "Sujeto he + isn''t (is + not) + studying."}'::jsonb,
  '{"grammar:present_continuous_negative"}'
),
('b0000003-0002-0002-0003-000000000001', 'b0000002-0000-0000-0002-000000000002', 3, 'fill_blank',
  '{"text": "___ you working right now?"}'::jsonb,
  '{"text": "Are", "accepted": ["Are"]}'::jsonb,
  NULL,
  '{"es": "Para preguntar con you, el auxiliar es are: Are you working right now?"}'::jsonb,
  '{"grammar:present_continuous_question"}'
),
('b0000003-0002-0002-0004-000000000001', 'b0000002-0000-0000-0002-000000000002', 4, 'translation',
  '{"text": "¿Estás escuchando música?"}'::jsonb,
  '{"text": "Are you listening to music?", "accepted": ["Are you listening to music?"]}'::jsonb,
  NULL,
  NULL,
  '{"grammar:present_continuous_question"}'
),
('b0000003-0002-0002-0005-000000000001', 'b0000002-0000-0000-0002-000000000002', 5, 'translation',
  '{"text": "Ella no está durmiendo."}'::jsonb,
  '{"text": "She isn''t sleeping.", "accepted": ["She isn''t sleeping.", "She is not sleeping."]}'::jsonb,
  NULL,
  NULL,
  '{"grammar:present_continuous_negative"}'
),
('b0000003-0002-0002-0006-000000000001', 'b0000002-0000-0000-0002-000000000002', 6, 'error_correction',
  '{"text": "I working in the garden now.", "error_word": "working"}'::jsonb,
  '{"text": "am working"}'::jsonb,
  '["is working", "are working"]'::jsonb,
  '{"es": "Falta el auxiliar. Con el sujeto I siempre usamos am: I am working."}'::jsonb,
  '{"grammar:present_continuous_formation","grammar:common_mistakes"}'
),
('b0000003-0002-0002-0007-000000000001', 'b0000002-0000-0000-0002-000000000002', 7, 'error_correction',
  '{"text": "She is watch a movie now.", "error_word": "watch"}'::jsonb,
  '{"text": "watching"}'::jsonb,
  '["watches", "watchs"]'::jsonb,
  '{"es": "Después del auxiliar is necesitamos el verbo en forma -ing: watching."}'::jsonb,
  '{"grammar:present_continuous_formation","grammar:common_mistakes"}'
),
('b0000003-0002-0002-0008-000000000001', 'b0000002-0000-0000-0002-000000000002', 8, 'multiple_choice',
  '{"text": "¿Cuál es la respuesta corta correcta y negativa para Is he studying?"}'::jsonb,
  '{"text": "No, he isn''t."}'::jsonb,
  '["No, he don''t.", "No, he not.", "No, isn''t he."]'::jsonb,
  '{"es": "Las respuestas cortas repiten el auxiliar: is → isn''t."}'::jsonb,
  '{"grammar:present_continuous_question"}'
);

-- ============================================================
-- LESSON 3: Presente Continuo vs. Presente Simple
-- ============================================================
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published)
VALUES (
  'b0000002-0000-0000-0002-000000000003',
  'b0000001-0000-0000-0000-000000000002',
  'b0000000-0000-0000-0000-000000000001',
  3,
  'presente-continuo-vs-presente-simple',
  '{"en": "Present Continuous vs. Present Simple", "es": "Presente Continuo vs. Presente Simple"}'::jsonb,
  '{"en": "Understand when to use present simple for habits and present continuous for actions happening right now.", "es": "Aprende cuándo usar el presente simple para hábitos y el presente continuo para acciones que pasan ahora mismo."}'::jsonb,
  'grammar',
  24,
  14,
  '{"intro": "En español, el presente simple sirve tanto para hábitos (Como pan cada día) como para acciones que pasan ahora mismo (Como pan ahora). En inglés esto no funciona igual: hay que elegir entre presente simple y presente continuo según el significado.", "sections": [{"type": "explanation", "title": "CUÁNDO USAR CADA UNO", "text": "Usa el presente simple para hábitos, rutinas y hechos generales. Usa el presente continuo para acciones que están pasando en este momento o situaciones temporales. Palabras clave del presente simple: usually, every day, on Mondays. Palabras clave del presente continuo: now, right now, at the moment."}, {"type": "table", "title": "COMPARACIÓN", "headers": ["Presente Simple (hábito)", "Presente Continuo (ahora mismo)"], "rows": [["I eat breakfast every day.", "I am eating breakfast right now."], ["She works in a bank.", "She is working late today."], ["They play tennis on Saturdays.", "They are playing tennis at the moment."]]}, {"type": "examples", "title": "EJEMPLOS", "items": [{"en": "I usually walk to school, but today I am taking the bus.", "es": "Normalmente camino a la escuela, pero hoy estoy tomando el autobús."}, {"en": "He works in an office, but right now he is working from home.", "es": "Él trabaja en una oficina, pero ahora mismo está trabajando desde casa."}]}, {"type": "note", "variant": "tip", "text": "Busca palabras clave como now, right now o at the moment — casi siempre indican presente continuo."}]}'::jsonb,
  true
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES
('b0000003-0003-0002-0001-000000000001', 'b0000002-0000-0000-0002-000000000003', 1, 'multiple_choice',
  '{"text": "Elige la opción correcta: Look! It ___ now."}'::jsonb,
  '{"text": "is raining"}'::jsonb,
  '["rains", "rain", "raining"]'::jsonb,
  '{"es": "Look! y now indican que la acción pasa ahora mismo, así que usamos presente continuo."}'::jsonb,
  '{"grammar:present_simple_contrast","grammar:present_continuous"}'
),
('b0000003-0003-0002-0002-000000000001', 'b0000002-0000-0000-0002-000000000003', 2, 'multiple_choice',
  '{"text": "Elige la opción correcta: She usually ___ to work by bus."}'::jsonb,
  '{"text": "goes"}'::jsonb,
  '["is going", "go", "going"]'::jsonb,
  '{"es": "Usually indica un hábito, así que usamos presente simple: she goes."}'::jsonb,
  '{"grammar:present_simple_contrast"}'
),
('b0000003-0003-0002-0003-000000000001', 'b0000002-0000-0000-0002-000000000003', 3, 'fill_blank',
  '{"text": "At the moment, she ___ (read) a book."}'::jsonb,
  '{"text": "is reading", "accepted": ["is reading"]}'::jsonb,
  NULL,
  '{"es": "At the moment indica una acción que pasa ahora mismo: presente continuo."}'::jsonb,
  '{"grammar:present_continuous"}'
),
('b0000003-0003-0002-0004-000000000001', 'b0000002-0000-0000-0002-000000000003', 4, 'fill_blank',
  '{"text": "Every day, he ___ (walk) to school."}'::jsonb,
  '{"text": "walks", "accepted": ["walks"]}'::jsonb,
  NULL,
  '{"es": "Every day indica una rutina: presente simple."}'::jsonb,
  '{"grammar:present_simple_contrast"}'
),
('b0000003-0003-0002-0005-000000000001', 'b0000002-0000-0000-0002-000000000003', 5, 'translation',
  '{"text": "Normalmente como en casa, pero hoy estoy comiendo en un restaurante."}'::jsonb,
  '{"text": "I usually eat at home, but today I am eating in a restaurant.", "accepted": ["I usually eat at home, but today I am eating in a restaurant.", "I usually eat at home, but today I''m eating in a restaurant."]}'::jsonb,
  NULL,
  NULL,
  '{"grammar:present_simple_contrast","grammar:present_continuous"}'
),
('b0000003-0003-0002-0006-000000000001', 'b0000002-0000-0000-0002-000000000003', 6, 'translation',
  '{"text": "Ahora mismo, ellos están estudiando para el examen."}'::jsonb,
  '{"text": "Right now, they are studying for the exam.", "accepted": ["Right now, they are studying for the exam.", "Right now, they''re studying for the exam."]}'::jsonb,
  NULL,
  NULL,
  '{"grammar:present_continuous"}'
),
('b0000003-0003-0002-0007-000000000001', 'b0000002-0000-0000-0002-000000000003', 7, 'dialogue_fill',
  '{"lines": [{"speaker": "A", "text": "What are you doing right now?"}, {"speaker": "B", "text": "___"}, {"speaker": "A", "text": "Oh, that sounds fun!"}]}'::jsonb,
  '{"text": "I''m watching a movie."}'::jsonb,
  '["I watch movies every weekend.", "I go to the cinema on Fridays.", "I like movies a lot."]'::jsonb,
  '{"es": "La pregunta right now pide una respuesta en presente continuo, no un hábito."}'::jsonb,
  '{"grammar:present_continuous","grammar:present_simple_contrast"}'
),
('b0000003-0003-0002-0008-000000000001', 'b0000002-0000-0000-0002-000000000003', 8, 'multiple_choice',
  '{"text": "¿Qué expresión indica presente continuo?"}'::jsonb,
  '{"text": "right now"}'::jsonb,
  '["every day", "usually", "on Mondays"]'::jsonb,
  '{"es": "Right now describe el momento actual, por eso se usa con presente continuo."}'::jsonb,
  '{"grammar:present_simple_contrast"}'
);

-- ============================================================
-- LESSON 4: Presente Continuo para el Futuro Cercano
-- ============================================================
INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published)
VALUES (
  'b0000002-0000-0000-0002-000000000004',
  'b0000001-0000-0000-0000-000000000002',
  'b0000000-0000-0000-0000-000000000001',
  4,
  'presente-continuo-futuro-cercano',
  '{"en": "Present Continuous for Near Future Plans", "es": "Presente Continuo para el Futuro Cercano"}'::jsonb,
  '{"en": "Use the present continuous to talk about arranged plans in the near future.", "es": "Usa el presente continuo para hablar de planes y citas ya organizadas en el futuro cercano."}'::jsonb,
  'grammar',
  25,
  15,
  '{"intro": "El presente continuo no solo describe acciones que pasan ahora mismo. También se usa para hablar de planes o citas futuras ya decididas, especialmente con una expresión de tiempo futuro.", "sections": [{"type": "explanation", "title": "PLANES FUTUROS YA ORGANIZADOS", "text": "Cuando algo ya está organizado o planeado (una cita, una reunión, un viaje), usamos presente continuo + expresión de tiempo futuro, aunque la acción todavía no haya pasado. Expresiones comunes: tomorrow, tonight, next week, on Saturday, this weekend."}, {"type": "examples", "title": "EJEMPLOS", "items": [{"en": "I am meeting a friend tomorrow.", "es": "Voy a encontrarme con un amigo mañana."}, {"en": "We are having dinner with my parents on Saturday.", "es": "Vamos a cenar con mis padres el sábado."}, {"en": "She is flying to Madrid next week.", "es": "Ella va a volar a Madrid la próxima semana."}, {"en": "They are visiting their grandmother this weekend.", "es": "Ellos van a visitar a su abuela este fin de semana."}]}, {"type": "note", "variant": "tip", "text": "La diferencia con el uso de ''ahora mismo'' está en la expresión de tiempo: ''I am eating now'' (ahora) frente a ''I am eating with my boss tomorrow'' (plan futuro)."}]}'::jsonb,
  true
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES
('b0000003-0004-0002-0001-000000000001', 'b0000002-0000-0000-0002-000000000004', 1, 'multiple_choice',
  '{"text": "¿Cuál oración expresa un plan futuro ya organizado?"}'::jsonb,
  '{"text": "He is visiting his cousins next weekend."}'::jsonb,
  '["He visits his cousins every weekend.", "He is running now.", "He runs every morning."]'::jsonb,
  '{"es": "Next weekend junto al presente continuo indica un plan futuro, no un hábito ni una acción actual."}'::jsonb,
  '{"grammar:future_arrangements"}'
),
('b0000003-0004-0002-0002-000000000001', 'b0000002-0000-0000-0002-000000000004', 2, 'multiple_choice',
  '{"text": "¿Cuál de estas es una expresión de tiempo futuro?"}'::jsonb,
  '{"text": "tomorrow"}'::jsonb,
  '["now", "right now", "at the moment"]'::jsonb,
  '{"es": "Tomorrow (mañana) se refiere al futuro; las otras opciones se refieren al momento presente."}'::jsonb,
  '{"vocab:time_expressions","grammar:future_arrangements"}'
),
('b0000003-0004-0002-0003-000000000001', 'b0000002-0000-0000-0002-000000000004', 3, 'fill_blank',
  '{"text": "I ___ (meet) my friend tomorrow."}'::jsonb,
  '{"text": "am meeting", "accepted": ["am meeting"]}'::jsonb,
  NULL,
  '{"es": "Con un plan futuro organizado usamos am/is/are + verbo-ing: I am meeting."}'::jsonb,
  '{"grammar:future_arrangements"}'
),
('b0000003-0004-0002-0004-000000000001', 'b0000002-0000-0000-0002-000000000004', 4, 'fill_blank',
  '{"text": "We ___ (have) dinner with my parents on Saturday."}'::jsonb,
  '{"text": "are having", "accepted": ["are having"]}'::jsonb,
  NULL,
  '{"es": "On Saturday es una expresión de futuro cercano; usamos presente continuo: we are having."}'::jsonb,
  '{"grammar:future_arrangements"}'
),
('b0000003-0004-0002-0005-000000000001', 'b0000002-0000-0000-0002-000000000004', 5, 'translation',
  '{"text": "Vuelo a Madrid la próxima semana."}'::jsonb,
  '{"text": "I am flying to Madrid next week.", "accepted": ["I am flying to Madrid next week.", "I''m flying to Madrid next week."]}'::jsonb,
  NULL,
  NULL,
  '{"grammar:future_arrangements"}'
),
('b0000003-0004-0002-0006-000000000001', 'b0000002-0000-0000-0002-000000000004', 6, 'translation',
  '{"text": "Cenamos con mis padres el sábado."}'::jsonb,
  '{"text": "We are having dinner with my parents on Saturday.", "accepted": ["We are having dinner with my parents on Saturday.", "We''re having dinner with my parents on Saturday."]}'::jsonb,
  NULL,
  NULL,
  '{"grammar:future_arrangements"}'
),
('b0000003-0004-0002-0007-000000000001', 'b0000002-0000-0000-0002-000000000004', 7, 'word_bank_fill',
  '{"text": "Next Saturday, she ___ ___ her grandmother."}'::jsonb,
  '{"answers": ["is", "visiting"]}'::jsonb,
  '["visits", "are"]'::jsonb,
  '{"es": "Next Saturday indica un plan futuro: she + is + visiting."}'::jsonb,
  '{"grammar:future_arrangements"}'
),
('b0000003-0004-0002-0008-000000000001', 'b0000002-0000-0000-0002-000000000004', 8, 'fill_blank',
  '{"text": "Tonight, I ___ (have) dinner with my boss."}'::jsonb,
  '{"text": "am having", "accepted": ["am having"]}'::jsonb,
  NULL,
  '{"es": "Tonight es una expresión de futuro cercano; usamos presente continuo: I am having."}'::jsonb,
  '{"grammar:future_arrangements"}'
);
