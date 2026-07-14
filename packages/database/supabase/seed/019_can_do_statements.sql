-- 019_can_do_statements.sql
-- Fase D.1: "puedo hacer" statements for all 15 A1 modules.
-- Run AFTER migrations/011_can_do_statements.sql.

UPDATE modules SET can_do_statements = '[
  "Puedo pronunciar y reconocer las vocales cortas y largas del inglés.",
  "Puedo deletrear mi nombre y palabras comunes en inglés.",
  "Puedo distinguir sonidos difíciles para hispanohablantes como TH, W y la R inglesa."
]'::jsonb WHERE id = '00000001-0000-0000-0000-000000000001';

UPDATE modules SET can_do_statements = '[
  "Puedo saludar y despedirme de forma formal e informal.",
  "Puedo presentarme y preguntar por otras personas.",
  "Puedo usar frases de cortesía básicas en inglés."
]'::jsonb WHERE id = '00000001-0000-0000-0000-000000000002';

UPDATE modules SET can_do_statements = '[
  "Puedo contar del 1 al 1000 y usar números ordinales.",
  "Puedo entender y decir precios en inglés.",
  "Puedo hacer operaciones matemáticas básicas en inglés."
]'::jsonb WHERE id = '00000001-0000-0000-0000-000000000003';

UPDATE modules SET can_do_statements = '[
  "Puedo decir los días de la semana, meses y estaciones.",
  "Puedo decir la hora en inglés.",
  "Puedo hablar de fechas y cumpleaños."
]'::jsonb WHERE id = '00000001-0000-0000-0000-000000000004';

UPDATE modules SET can_do_statements = '[
  "Puedo describir objetos usando colores.",
  "Puedo describir tamaño, forma y temperatura de las cosas.",
  "Puedo dar mi opinión sobre algo usando adjetivos de calidad."
]'::jsonb WHERE id = '00000001-0000-0000-0000-000000000005';

UPDATE modules SET can_do_statements = '[
  "Puedo hablar de los miembros de mi familia inmediata y extendida.",
  "Puedo describir físicamente a mi familia.",
  "Puedo hablar de mi estado civil y mis relaciones personales."
]'::jsonb WHERE id = '00000001-0000-0000-0000-000000000006';

UPDATE modules SET can_do_statements = '[
  "Puedo nombrar frutas, verduras, carnes y bebidas comunes.",
  "Puedo pedir comida en un restaurante en inglés.",
  "Puedo expresar mis gustos y restricciones alimentarias."
]'::jsonb WHERE id = '00000001-0000-0000-0000-000000000007';

UPDATE modules SET can_do_statements = '[
  "Puedo nombrar las partes del cuerpo y de la cara.",
  "Puedo describir síntomas de una enfermedad.",
  "Puedo comunicarme con un médico sobre un problema de salud."
]'::jsonb WHERE id = '00000001-0000-0000-0000-000000000008';

UPDATE modules SET can_do_statements = '[
  "Puedo presentarme usando am/is/are.",
  "Puedo decir de dónde soy y cuál es mi profesión.",
  "Puedo describir cómo es alguien o algo.",
  "Puedo formar preguntas y negaciones con el verbo to be."
]'::jsonb WHERE id = '00000001-0000-0000-0000-000000000009';

UPDATE modules SET can_do_statements = '[
  "Puedo usar correctamente a/an y the.",
  "Puedo formar plurales regulares e irregulares.",
  "Puedo distinguir sustantivos contables e incontables."
]'::jsonb WHERE id = '00000001-0000-0000-0000-000000000010';

UPDATE modules SET can_do_statements = '[
  "Puedo usar pronombres de sujeto y objeto correctamente.",
  "Puedo expresar posesión con adjetivos y pronombres posesivos."
]'::jsonb WHERE id = '00000001-0000-0000-0000-000000000011';

UPDATE modules SET can_do_statements = '[
  "Puedo entender y usar frases típicas de un salón de clase.",
  "Puedo pedir ayuda y aclarar dudas en inglés.",
  "Puedo expresar acuerdo y desacuerdo."
]'::jsonb WHERE id = '00000001-0000-0000-0000-000000000012';

UPDATE modules SET can_do_statements = '[
  "Puedo hacer preguntas con qué, dónde, cuándo, quién, por qué y cómo.",
  "Puedo hablar de rutinas y hábitos usando el presente simple.",
  "Puedo decir que algo existe usando there is/there are.",
  "Puedo dar instrucciones simples y hablar de mis habilidades con can."
]'::jsonb WHERE id = '00000001-0000-0000-0000-000000000013';

UPDATE modules SET can_do_statements = '[
  "Puedo entender letras, números y precios al escucharlos.",
  "Puedo entender saludos, preguntas y descripciones simples al oído.",
  "Puedo escribir exactamente lo que escucho en un dictado corto.",
  "Puedo distinguir palabras que suenan parecido, como ship/sheep."
]'::jsonb WHERE id = '00000001-0000-0000-0000-000000000014';

UPDATE modules SET can_do_statements = '[
  "Puedo presentarme y responder preguntas básicas en voz alta.",
  "Puedo pronunciar frases de mi vida diaria con claridad."
]'::jsonb WHERE id = '00000001-0000-0000-0000-000000000015';
