-- 028_a2_module5_pasado_simple_irregular.sql
-- A2 Module 5: Pasado Simple - Verbos Irregulares — 4 lessons
-- Run AFTER 026_a2_modules_4_6.sql

DELETE FROM exercises WHERE lesson_id IN (
  SELECT id FROM lessons WHERE module_id = 'b0000001-0000-0000-0000-000000000005'
);
DELETE FROM lessons WHERE module_id = 'b0000001-0000-0000-0000-000000000005';

INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES (
  'b0000002-0000-0000-0005-000000000001',
  'b0000001-0000-0000-0000-000000000005',
  'b0000000-0000-0000-0000-000000000001',
  1,
  'pasado-simple-irregulares-parte-1',
  '{"en": "Common Irregular Verbs (Part 1)", "es": "Verbos Irregulares Comunes (Parte 1)"}'::jsonb,
  '{"en": "Learn 8 essential irregular past tense verbs: go, have, see, do, make, take, get, come.", "es": "Aprende 8 verbos irregulares esenciales en pasado: go, have, see, do, make, take, get, come."}'::jsonb,
  'vocabulary',
  20,
  12,
  '{"intro": "En A1 aprendiste el presente simple y ya conoces el pasado simple regular con -ed. Ahora vas a aprender los verbos irregulares más comunes: no siguen la regla de -ed, tienen una forma especial en pasado que debes memorizar.", "sections": [{"type": "table", "title": "VERBOS IRREGULARES - PARTE 1", "headers": ["Base", "Pasado", "Español"], "rows": [["go", "went", "ir"], ["have", "had", "tener"], ["see", "saw", "ver"], ["do", "did", "hacer"], ["make", "made", "hacer / fabricar"], ["take", "took", "tomar / llevar"], ["get", "got", "obtener / conseguir"], ["come", "came", "venir"]]}, {"type": "explanation", "title": "CÓMO FUNCIONAN", "text": "Estos verbos no añaden -ed en pasado. Tienen una forma propia que no cambia según la persona: I went, you went, he went, we went, they went. Debes memorizar cada par base-pasado."}, {"type": "examples", "title": "EJEMPLOS", "items": [{"en": "I went to the park yesterday.", "es": "Fui al parque ayer."}, {"en": "She had a big breakfast this morning.", "es": "Ella tomó un gran desayuno esta mañana."}, {"en": "We saw a good movie last night.", "es": "Vimos una buena película anoche."}, {"en": "They came home late.", "es": "Ellos vinieron a casa tarde."}]}, {"type": "note", "variant": "tip", "text": "Recuerda: con did y didn''t, el verbo vuelve a su forma base. Ejemplo: Did you go? / I didn''t go (NO Did you went)."}]}'::jsonb,
  true
);

INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES (
  'b0000002-0000-0000-0005-000000000002',
  'b0000001-0000-0000-0000-000000000005',
  'b0000000-0000-0000-0000-000000000001',
  2,
  'pasado-simple-irregulares-parte-2',
  '{"en": "Common Irregular Verbs (Part 2)", "es": "Verbos Irregulares Comunes (Parte 2)"}'::jsonb,
  '{"en": "Learn 8 more irregular past tense verbs: give, know, think, say, eat, drink, write, read.", "es": "Aprende 8 verbos irregulares más en pasado: give, know, think, say, eat, drink, write, read."}'::jsonb,
  'vocabulary',
  22,
  13,
  '{"intro": "Sigue practicando los verbos irregulares. En esta lección aprenderás ocho verbos más que se usan muchísimo al hablar del pasado.", "sections": [{"type": "table", "title": "VERBOS IRREGULARES - PARTE 2", "headers": ["Base", "Pasado", "Español"], "rows": [["give", "gave", "dar"], ["know", "knew", "saber / conocer"], ["think", "thought", "pensar"], ["say", "said", "decir"], ["eat", "ate", "comer"], ["drink", "drank", "beber"], ["write", "wrote", "escribir"], ["read", "read", "leer"]]}, {"type": "explanation", "title": "OJO CON READ", "text": "El verbo read se escribe igual en presente y en pasado, pero se pronuncia diferente: en presente suena /riːd/ y en pasado suena /rɛd/ (como el color red). Solo el contexto indica el tiempo."}, {"type": "examples", "title": "EJEMPLOS", "items": [{"en": "He gave me a present for my birthday.", "es": "Él me dio un regalo de cumpleaños."}, {"en": "I thought about the problem all day.", "es": "Pensé en el problema todo el día."}, {"en": "She said her name was Ana.", "es": "Ella dijo que su nombre era Ana."}, {"en": "We read that book last month.", "es": "Leímos ese libro el mes pasado."}]}, {"type": "note", "variant": "warning", "text": "No confundas know (saber/conocer) con think (pensar). I knew = yo sabía/supe; I thought = yo pensé."}]}'::jsonb,
  true
);

INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES (
  'b0000002-0000-0000-0005-000000000003',
  'b0000001-0000-0000-0000-000000000005',
  'b0000000-0000-0000-0000-000000000001',
  3,
  'pasado-simple-irregulares-parte-3',
  '{"en": "Common Irregular Verbs (Part 3)", "es": "Verbos Irregulares Comunes (Parte 3)"}'::jsonb,
  '{"en": "Learn 8 more irregular past tense verbs: buy, find, leave, meet, tell, wear, win, sleep.", "es": "Aprende 8 verbos irregulares más en pasado: buy, find, leave, meet, tell, wear, win, sleep."}'::jsonb,
  'vocabulary',
  22,
  13,
  '{"intro": "En esta lección aprenderás ocho verbos irregulares más, muy comunes para contar historias y hablar de experiencias pasadas.", "sections": [{"type": "table", "title": "VERBOS IRREGULARES - PARTE 3", "headers": ["Base", "Pasado", "Español"], "rows": [["buy", "bought", "comprar"], ["find", "found", "encontrar"], ["leave", "left", "dejar / salir"], ["meet", "met", "conocer / encontrarse con"], ["tell", "told", "decir / contar"], ["wear", "wore", "llevar puesto"], ["win", "won", "ganar"], ["sleep", "slept", "dormir"]]}, {"type": "explanation", "title": "SAY VS TELL", "text": "Ya conoces said (decir algo). Told también significa decir, pero casi siempre necesita una persona: She told me a story (Ella me contó una historia)."}, {"type": "examples", "title": "EJEMPLOS", "items": [{"en": "I bought a new jacket last weekend.", "es": "Compré una chaqueta nueva el fin de semana pasado."}, {"en": "We met our new neighbors yesterday.", "es": "Conocimos a nuestros nuevos vecinos ayer."}, {"en": "He wore a suit to the wedding.", "es": "Él llevó puesto un traje a la boda."}, {"en": "Our team won the match.", "es": "Nuestro equipo ganó el partido."}]}, {"type": "note", "variant": "tip", "text": "Practica en voz alta: buy-bought, find-found, leave-left, meet-met, tell-told, wear-wore, win-won, sleep-slept. Repetir ayuda a memorizar."}]}'::jsonb,
  true
);

INSERT INTO lessons (id, module_id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, theory_content, is_published) VALUES (
  'b0000002-0000-0000-0005-000000000004',
  'b0000001-0000-0000-0000-000000000005',
  'b0000000-0000-0000-0000-000000000001',
  4,
  'pasado-simple-irregulares-repaso',
  '{"en": "Review: Telling the Story of Your Weekend", "es": "Repaso: Narrar el Fin de Semana"}'::jsonb,
  '{"en": "Mixed review of all 24 irregular verbs plus the did/didn''t question and negative pattern.", "es": "Repaso mixto de los 24 verbos irregulares junto con el patrón de preguntas y negaciones con did/didn''t."}'::jsonb,
  'mixed',
  25,
  15,
  '{"intro": "Es hora de repasar los 24 verbos irregulares de esta unidad y practicar el patrón did/didn''t que ya conoces con estos nuevos verbos.", "sections": [{"type": "table", "title": "REPASO: 24 VERBOS IRREGULARES", "headers": ["Base", "Pasado", "Español"], "rows": [["go", "went", "ir"], ["have", "had", "tener"], ["see", "saw", "ver"], ["do", "did", "hacer"], ["make", "made", "hacer / fabricar"], ["take", "took", "tomar / llevar"], ["get", "got", "obtener / conseguir"], ["come", "came", "venir"], ["give", "gave", "dar"], ["know", "knew", "saber / conocer"], ["think", "thought", "pensar"], ["say", "said", "decir"], ["eat", "ate", "comer"], ["drink", "drank", "beber"], ["write", "wrote", "escribir"], ["read", "read", "leer"], ["buy", "bought", "comprar"], ["find", "found", "encontrar"], ["leave", "left", "dejar / salir"], ["meet", "met", "conocer / encontrarse con"], ["tell", "told", "decir / contar"], ["wear", "wore", "llevar puesto"], ["win", "won", "ganar"], ["sleep", "slept", "dormir"]]}, {"type": "explanation", "title": "DID / DIDN''T CON VERBOS IRREGULARES", "text": "Recuerda la regla que ya conoces: con did y didn''t, el verbo principal siempre vuelve a su forma base, sin importar si es regular o irregular. Did you see the movie? (no Did you saw). I didn''t eat breakfast (no I didn''t ate)."}, {"type": "examples", "title": "EJEMPLOS", "items": [{"en": "Did you go to the party last night?", "es": "¿Fuiste a la fiesta anoche?"}, {"en": "I didn''t find my keys this morning.", "es": "No encontré mis llaves esta mañana."}, {"en": "What did you do last weekend?", "es": "¿Qué hiciste el fin de semana pasado?"}, {"en": "We met our friends and had a great time.", "es": "Nos encontramos con nuestros amigos y la pasamos genial."}]}, {"type": "note", "variant": "tip", "text": "Cuando cuentes una historia en pasado, mezcla verbos regulares (-ed) e irregulares con naturalidad: I walked to the store, bought milk, and came home."}]}'::jsonb,
  true
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0001-0005-0001-000000000001',
  'b0000002-0000-0000-0005-000000000001',
  1,
  'flashcard',
  '{"text": "¿Cuál es el pasado de \"go\" (ir)?"}'::jsonb,
  '{"text": "went", "accepted": ["went"]}'::jsonb,
  NULL,
  '{"es": "go → went (ir). No cambia según la persona: I went, she went, they went."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:go"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0001-0005-0002-000000000001',
  'b0000002-0000-0000-0005-000000000001',
  2,
  'flashcard',
  '{"text": "¿Cuál es el pasado de \"have\" (tener)?"}'::jsonb,
  '{"text": "had", "accepted": ["had"]}'::jsonb,
  NULL,
  '{"es": "have → had (tener). Ejemplo: I had a dog last year."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:have"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0001-0005-0003-000000000001',
  'b0000002-0000-0000-0005-000000000001',
  3,
  'flashcard',
  '{"text": "¿Cuál es el pasado de \"see\" (ver)?"}'::jsonb,
  '{"text": "saw", "accepted": ["saw"]}'::jsonb,
  NULL,
  '{"es": "see → saw (ver). Ejemplo: We saw a good movie last night."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:see"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0001-0005-0004-000000000001',
  'b0000002-0000-0000-0005-000000000001',
  4,
  'multiple_choice',
  '{"text": "Yesterday I ___ my homework before dinner."}'::jsonb,
  '{"text": "did"}'::jsonb,
  '["done", "doed", "do"]'::jsonb,
  '{"es": "do → did en pasado. ''Doed'' no existe; ''done'' es el participio, no el pasado simple."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:do"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0001-0005-0005-000000000001',
  'b0000002-0000-0000-0005-000000000001',
  5,
  'multiple_choice',
  '{"text": "She ___ a chocolate cake for the party last night."}'::jsonb,
  '{"text": "made"}'::jsonb,
  '["maked", "make", "making"]'::jsonb,
  '{"es": "make → made en pasado. Ejemplo: She made a chocolate cake."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:make"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0001-0005-0006-000000000001',
  'b0000002-0000-0000-0005-000000000001',
  6,
  'fill_blank',
  '{"text": "We ___ the bus to school yesterday."}'::jsonb,
  '{"text": "took", "accepted": ["took"]}'::jsonb,
  NULL,
  '{"es": "take → took en pasado."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:take"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0001-0005-0007-000000000001',
  'b0000002-0000-0000-0005-000000000001',
  7,
  'fill_blank',
  '{"text": "He ___ a new phone last week."}'::jsonb,
  '{"text": "got", "accepted": ["got"]}'::jsonb,
  NULL,
  '{"es": "get → got en pasado."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:get"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0001-0005-0008-000000000001',
  'b0000002-0000-0000-0005-000000000001',
  8,
  'translation',
  '{"text": "Ellos vinieron a la fiesta anoche."}'::jsonb,
  '{"text": "They came to the party last night.", "accepted": ["They came to the party last night.", "They came to the party last night"]}'::jsonb,
  NULL,
  '{"es": "come → came en pasado."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:come"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0002-0005-0001-000000000001',
  'b0000002-0000-0000-0005-000000000002',
  1,
  'flashcard',
  '{"text": "¿Cuál es el pasado de \"give\" (dar)?"}'::jsonb,
  '{"text": "gave", "accepted": ["gave"]}'::jsonb,
  NULL,
  '{"es": "give → gave (dar). Ejemplo: He gave me a present."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:give"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0002-0005-0002-000000000001',
  'b0000002-0000-0000-0005-000000000002',
  2,
  'flashcard',
  '{"text": "¿Cuál es el pasado de \"know\" (saber/conocer)?"}'::jsonb,
  '{"text": "knew", "accepted": ["knew"]}'::jsonb,
  NULL,
  '{"es": "know → knew (saber/conocer). Ejemplo: I knew the answer."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:know"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0002-0005-0003-000000000001',
  'b0000002-0000-0000-0005-000000000002',
  3,
  'flashcard',
  '{"text": "¿Cuál es el pasado de \"think\" (pensar)?"}'::jsonb,
  '{"text": "thought", "accepted": ["thought"]}'::jsonb,
  NULL,
  '{"es": "think → thought (pensar). Ejemplo: I thought about it all day."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:think"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0002-0005-0004-000000000001',
  'b0000002-0000-0000-0005-000000000002',
  4,
  'multiple_choice',
  '{"text": "She ___ hello to everyone at the meeting."}'::jsonb,
  '{"text": "said"}'::jsonb,
  '["sayed", "says", "saying"]'::jsonb,
  '{"es": "say → said en pasado. ''Sayed'' no existe."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:say"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0002-0005-0005-000000000001',
  'b0000002-0000-0000-0005-000000000002',
  5,
  'multiple_choice',
  '{"text": "We ___ pizza for dinner last night."}'::jsonb,
  '{"text": "ate"}'::jsonb,
  '["eated", "eat", "eating"]'::jsonb,
  '{"es": "eat → ate en pasado."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:eat"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0002-0005-0006-000000000001',
  'b0000002-0000-0000-0005-000000000002',
  6,
  'fill_blank',
  '{"text": "He ___ a glass of water before bed."}'::jsonb,
  '{"text": "drank", "accepted": ["drank"]}'::jsonb,
  NULL,
  '{"es": "drink → drank en pasado."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:drink"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0002-0005-0007-000000000001',
  'b0000002-0000-0000-0005-000000000002',
  7,
  'fill_blank',
  '{"text": "I ___ a letter to my friend last week."}'::jsonb,
  '{"text": "wrote", "accepted": ["wrote"]}'::jsonb,
  NULL,
  '{"es": "write → wrote en pasado."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:write"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0002-0005-0008-000000000001',
  'b0000002-0000-0000-0005-000000000002',
  8,
  'word_match',
  '{"text": "Une cada verbo base con su forma en pasado."}'::jsonb,
  '{"pairs": [{"en": "give", "es": "gave"}, {"en": "know", "es": "knew"}, {"en": "think", "es": "thought"}, {"en": "read", "es": "read"}]}'::jsonb,
  NULL,
  '{"es": "El verbo ''read'' no cambia de forma escrita en pasado, solo de pronunciación."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:review"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0003-0005-0001-000000000001',
  'b0000002-0000-0000-0005-000000000003',
  1,
  'flashcard',
  '{"text": "¿Cuál es el pasado de \"buy\" (comprar)?"}'::jsonb,
  '{"text": "bought", "accepted": ["bought"]}'::jsonb,
  NULL,
  '{"es": "buy → bought (comprar). Ejemplo: I bought a new jacket."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:buy"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0003-0005-0002-000000000001',
  'b0000002-0000-0000-0005-000000000003',
  2,
  'flashcard',
  '{"text": "¿Cuál es el pasado de \"find\" (encontrar)?"}'::jsonb,
  '{"text": "found", "accepted": ["found"]}'::jsonb,
  NULL,
  '{"es": "find → found (encontrar). Ejemplo: She found her keys."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:find"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0003-0005-0003-000000000001',
  'b0000002-0000-0000-0005-000000000003',
  3,
  'flashcard',
  '{"text": "¿Cuál es el pasado de \"leave\" (dejar/salir)?"}'::jsonb,
  '{"text": "left", "accepted": ["left"]}'::jsonb,
  NULL,
  '{"es": "leave → left (dejar/salir). Ejemplo: He left home at seven."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:leave"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0003-0005-0004-000000000001',
  'b0000002-0000-0000-0005-000000000003',
  4,
  'multiple_choice',
  '{"text": "I ___ my friend at the mall yesterday."}'::jsonb,
  '{"text": "met"}'::jsonb,
  '["meeted", "meet", "meeting"]'::jsonb,
  '{"es": "meet → met en pasado. ''Meeted'' no existe."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:meet"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0003-0005-0005-000000000001',
  'b0000002-0000-0000-0005-000000000003',
  5,
  'multiple_choice',
  '{"text": "He ___ me a secret yesterday."}'::jsonb,
  '{"text": "told"}'::jsonb,
  '["telled", "tell", "telling"]'::jsonb,
  '{"es": "tell → told en pasado. ''Telled'' no existe."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:tell"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0003-0005-0006-000000000001',
  'b0000002-0000-0000-0005-000000000003',
  6,
  'fill_blank',
  '{"text": "She ___ a red dress at the party."}'::jsonb,
  '{"text": "wore", "accepted": ["wore"]}'::jsonb,
  NULL,
  '{"es": "wear → wore en pasado."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:wear"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0003-0005-0007-000000000001',
  'b0000002-0000-0000-0005-000000000003',
  7,
  'fill_blank',
  '{"text": "Our team ___ the game last night."}'::jsonb,
  '{"text": "won", "accepted": ["won"]}'::jsonb,
  NULL,
  '{"es": "win → won en pasado."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:win"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0003-0005-0008-000000000001',
  'b0000002-0000-0000-0005-000000000003',
  8,
  'translation',
  '{"text": "Yo dormí ocho horas anoche."}'::jsonb,
  '{"text": "I slept eight hours last night.", "accepted": ["I slept eight hours last night.", "I slept eight hours last night"]}'::jsonb,
  NULL,
  '{"es": "sleep → slept en pasado."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:sleep"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0004-0005-0001-000000000001',
  'b0000002-0000-0000-0005-000000000004',
  1,
  'multiple_choice',
  '{"text": "Did you ___ to the party last night?"}'::jsonb,
  '{"text": "go"}'::jsonb,
  '["went", "goes", "going"]'::jsonb,
  '{"es": "Con did, el verbo principal vuelve a su forma base: ''Did you go?'' NO ''Did you went?''."}'::jsonb,
  '{"grammar:irregular_verbs","grammar:did_question"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0004-0005-0002-000000000001',
  'b0000002-0000-0000-0005-000000000004',
  2,
  'multiple_choice',
  '{"text": "I didn''t ___ my keys yesterday."}'::jsonb,
  '{"text": "find"}'::jsonb,
  '["found", "finds", "finding"]'::jsonb,
  '{"es": "Con didn''t, el verbo principal vuelve a su forma base: ''I didn''t find'' NO ''I didn''t found''."}'::jsonb,
  '{"grammar:irregular_verbs","grammar:didnt_negative"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0004-0005-0003-000000000001',
  'b0000002-0000-0000-0005-000000000004',
  3,
  'fill_blank',
  '{"text": "We ___ (see) a great movie last weekend."}'::jsonb,
  '{"text": "saw", "accepted": ["saw"]}'::jsonb,
  NULL,
  '{"es": "see → saw en pasado."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:see"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0004-0005-0004-000000000001',
  'b0000002-0000-0000-0005-000000000004',
  4,
  'fill_blank',
  '{"text": "She ___ (write) three emails this morning."}'::jsonb,
  '{"text": "wrote", "accepted": ["wrote"]}'::jsonb,
  NULL,
  '{"es": "write → wrote en pasado."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:write"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0004-0005-0005-000000000001',
  'b0000002-0000-0000-0005-000000000004',
  5,
  'translation',
  '{"text": "Nosotros compramos un regalo para mamá."}'::jsonb,
  '{"text": "We bought a present for mom.", "accepted": ["We bought a present for mom.", "We bought a present for mom", "We bought a gift for mom."]}'::jsonb,
  NULL,
  '{"es": "buy → bought en pasado."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:buy"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0004-0005-0006-000000000001',
  'b0000002-0000-0000-0005-000000000004',
  6,
  'translation',
  '{"text": "¿Qué hiciste el fin de semana pasado?"}'::jsonb,
  '{"text": "What did you do last weekend?", "accepted": ["What did you do last weekend?", "What did you do last weekend"]}'::jsonb,
  NULL,
  '{"es": "Pregunta con did + verbo base: ''What did you do?'' NO ''What did you did?''."}'::jsonb,
  '{"grammar:irregular_verbs","grammar:did_question"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0004-0005-0007-000000000001',
  'b0000002-0000-0000-0005-000000000004',
  7,
  'fill_blank',
  '{"text": "They ___ (sleep) at a hotel last weekend."}'::jsonb,
  '{"text": "slept", "accepted": ["slept"]}'::jsonb,
  NULL,
  '{"es": "sleep → slept en pasado."}'::jsonb,
  '{"grammar:irregular_verbs","vocab:sleep"}'
);

INSERT INTO exercises (id, lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags) VALUES (
  'b0000003-0004-0005-0008-000000000001',
  'b0000002-0000-0000-0005-000000000004',
  8,
  'dictation',
  '{"text": "Escucha y escribe la oración exactamente como la escuchas.", "audio_text": "I met my friends and we had a great time."}'::jsonb,
  '{"accepted": ["I met my friends and we had a great time.", "I met my friends and we had a great time"]}'::jsonb,
  NULL,
  NULL,
  '{"grammar:irregular_verbs","vocab:review"}'
);

