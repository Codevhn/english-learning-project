-- 010b_theory_modules_6_8.sql
-- Adds theory_content to 9 lessons in modules 6, 7, 8
-- Run AFTER 009_modules_6_8_expansion.sql

-- Module 6 L2 — La Familia Extendida
UPDATE lessons SET theory_content = '{
  "intro": "Además de la familia inmediata, en inglés hay vocabulario específico para los parientes extendidos. Una diferencia clave: ''cousin'' es la misma palabra para primo y prima.",
  "sections": [
    {
      "type": "table",
      "title": "FAMILIA EXTENDIDA EN INGLÉS",
      "headers": ["Español", "Inglés", "Nota"],
      "rows": [
        ["tío", "uncle", "masculino"],
        ["tía", "aunt", "femenino — /ænt/ o /ɑːnt/"],
        ["primo / prima", "cousin", "mismo para ambos géneros"],
        ["abuelo", "grandfather / grandpa", "formal / informal"],
        ["abuela", "grandmother / grandma", "formal / informal"],
        ["sobrino", "nephew", ""],
        ["sobrina", "niece", ""],
        ["padrastro", "stepfather", ""],
        ["madrastra", "stepmother", ""]
      ]
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "La palabra ''cousin'' es la misma para primo y prima. Si necesitas especificar di ''male cousin'' o ''female cousin'', aunque en conversación rara vez es necesario."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0006-0002-000000000001';

-- Module 6 L3 — Describir a tu Familia
UPDATE lessons SET theory_content = '{
  "intro": "Para describir a los miembros de tu familia en inglés se usan dos verbos clave: ''to be'' para personalidad y estatura, y ''to have'' para rasgos físicos como ojos o cabello.",
  "sections": [
    {
      "type": "explanation",
      "title": "TO BE VS TO HAVE PARA DESCRIBIR",
      "text": "Usa ''to be'' para adjetivos de personalidad y estatura: ''My brother is tall and funny.'' Usa ''to have'' para características físicas: ''My sister has brown eyes.'' Para la edad siempre usa ''to be'': ''My dad is 50 years old'' — nunca ''My dad has 50 years''."
    },
    {
      "type": "examples",
      "title": "EJEMPLOS",
      "items": [
        {"label": "Personalidad", "en": "My aunt is very kind.", "es": "Mi tía es muy amable."},
        {"label": "Estatura", "en": "My grandfather is tall.", "es": "Mi abuelo es alto."},
        {"label": "Ojos", "en": "She has green eyes.", "es": "Ella tiene ojos verdes."},
        {"label": "Cabello", "en": "He has short black hair.", "es": "Él tiene el cabello negro y corto."},
        {"label": "Edad", "en": "My cousin is 25 years old.", "es": "Mi primo tiene 25 años."}
      ]
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "''She has 25 years'' es un error muy común. La edad siempre va con ''to be'': ''She is 25'' o ''She is 25 years old''."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0006-0003-000000000001';

-- Module 6 L4 — Relaciones Personales
UPDATE lessons SET theory_content = '{
  "intro": "En inglés hay vocabulario preciso para el estado civil y las relaciones personales. Estas palabras son esenciales para presentarte o hablar de otras personas.",
  "sections": [
    {
      "type": "table",
      "title": "ESTADO CIVIL Y RELACIONES",
      "headers": ["Inglés", "Español"],
      "rows": [
        ["single", "soltero/a"],
        ["married", "casado/a"],
        ["divorced", "divorciado/a"],
        ["widowed", "viudo/a"],
        ["engaged", "comprometido/a"],
        ["boyfriend / girlfriend", "novio / novia"],
        ["husband / wife", "esposo / esposa"],
        ["partner", "pareja (neutro, formal)"],
        ["fiancé / fiancée", "prometido / prometida"]
      ]
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "''Partner'' es la palabra más neutral e inclusiva. En contextos formales o profesionales es la opción más segura cuando no sabes el tipo de relación de alguien."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0006-0004-000000000001';

-- Module 7 L2 — Frutas y Verduras
UPDATE lessons SET theory_content = '{
  "intro": "El vocabulario de frutas y verduras en inglés es fundamental para el supermercado, recetas y restaurantes. Hay algunas irregularidades de plural y gramática importantes.",
  "sections": [
    {
      "type": "table",
      "title": "FRUTAS Y VERDURAS COMUNES",
      "headers": ["Español", "Inglés", "Plural"],
      "rows": [
        ["manzana", "apple", "apples"],
        ["plátano", "banana", "bananas"],
        ["naranja", "orange", "oranges"],
        ["fresa", "strawberry", "strawberries"],
        ["zanahoria", "carrot", "carrots"],
        ["tomate", "tomato", "tomatoes (irregular)"],
        ["papa / patata", "potato", "potatoes (irregular)"],
        ["lechuga", "lettuce", "incontable — some lettuce"],
        ["cebolla", "onion", "onions"],
        ["maíz", "corn", "incontable — some corn"]
      ]
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "''Tomato'' y ''potato'' tienen plurales con -es: tomatoes, potatoes. ''Lettuce'' y ''corn'' son incontables y no llevan plural cuando hablas de la verdura en general."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0007-0002-000000000001';

-- Module 7 L3 — En el Restaurante
UPDATE lessons SET theory_content = '{
  "intro": "Estas frases te permitirán desenvolverte con confianza en cualquier restaurante de habla inglesa, desde pedir la mesa hasta pagar la cuenta.",
  "sections": [
    {
      "type": "examples",
      "title": "FRASES CLAVE EN EL RESTAURANTE",
      "items": [
        {"label": "Reservar mesa", "en": "A table for two, please.", "es": "Una mesa para dos, por favor."},
        {"label": "Pedir", "en": "I''d like the pasta, please.", "es": "Quisiera la pasta, por favor."},
        {"label": "Preguntar", "en": "What do you recommend?", "es": "¿Qué recomienda?"},
        {"label": "Alergias", "en": "Does this contain nuts?", "es": "¿Esto contiene nueces?"},
        {"label": "La cuenta", "en": "Can I have the bill, please?", "es": "¿Me trae la cuenta, por favor?"},
        {"label": "Propina", "en": "Keep the change.", "es": "Quédese con el cambio."}
      ]
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "Americanos dicen ''check'', británicos dicen ''bill''. ''I''d like...'' es más educado que ''I want...'' — úsalo siempre al pedir en un restaurante."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0007-0003-000000000001';

-- Module 7 L4 — Preferencias Alimentarias
UPDATE lessons SET theory_content = '{
  "intro": "Expresar gustos, disgustos y restricciones alimentarias en inglés es esencial cuando viajas o convives con personas de habla inglesa.",
  "sections": [
    {
      "type": "explanation",
      "title": "CÓMO EXPRESAR PREFERENCIAS",
      "text": "Usa ''I like'' para gustos generales y ''I love'' para lo que te encanta. Para negativo: ''I don''t like'' es educado, ''I hate'' es muy fuerte. Para necesidades: ''I''m vegetarian/vegan'', ''I''m allergic to [food]'', ''I can''t eat [food]''."
    },
    {
      "type": "examples",
      "title": "EJEMPLOS PRÁCTICOS",
      "items": [
        {"label": "Gusto", "en": "I love spicy food.", "es": "Me encanta la comida picante."},
        {"label": "Disgusto", "en": "I don''t like seafood.", "es": "No me gusta el marisco."},
        {"label": "Preferencia", "en": "I prefer chicken to beef.", "es": "Prefiero el pollo a la carne de res."},
        {"label": "Dieta", "en": "I''m vegetarian. I don''t eat meat.", "es": "Soy vegetariano/a. No como carne."},
        {"label": "Alergia", "en": "I''m allergic to dairy.", "es": "Soy alérgico/a a los lácteos."},
        {"label": "Opinión", "en": "This is delicious! / This is too salty.", "es": "¡Esto está delicioso! / Esto está muy salado."}
      ]
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "Si tienes una alergia grave, di claramente: ''I have a serious allergy to [food].'' Los restaurantes lo toman en serio cuando se comunica con firmeza."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0007-0004-000000000001';

-- Module 8 L2 — La Cara y la Cabeza
UPDATE lessons SET theory_content = '{
  "intro": "Las partes de la cara y la cabeza en inglés son vocabulario esencial para describir personas, entender conversaciones sobre apariencia y comunicarte en contextos médicos.",
  "sections": [
    {
      "type": "table",
      "title": "PARTES DE LA CARA Y CABEZA",
      "headers": ["Español", "Inglés", "Plural / Nota"],
      "rows": [
        ["ojo", "eye", "eyes"],
        ["nariz", "nose", "noses"],
        ["boca", "mouth", "mouths"],
        ["oreja", "ear", "ears"],
        ["cabello", "hair", "incontable en general"],
        ["frente", "forehead", "foreheads"],
        ["barbilla", "chin", "chins"],
        ["mejilla", "cheek", "cheeks"],
        ["ceja", "eyebrow", "eyebrows"],
        ["labio", "lip", "lips"],
        ["diente", "tooth", "plural irregular: teeth"]
      ]
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "''Hair'' es incontable cuando hablas del cabello en general: ''She has long hair'' (correcto). Solo usas ''a hair'' para un cabello suelto individual. Y ''tooth'' tiene plural irregular: ''teeth''."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0008-0002-000000000001';

-- Module 8 L3 — Síntomas y Enfermedades
UPDATE lessons SET theory_content = '{
  "intro": "Hay dos estructuras principales para hablar de síntomas en inglés: ''I have a [síntoma]'' para enfermedades y sensaciones, y ''My [parte del cuerpo] hurts'' para dolor localizado.",
  "sections": [
    {
      "type": "table",
      "title": "SÍNTOMAS Y ENFERMEDADES COMUNES",
      "headers": ["Inglés", "Español"],
      "rows": [
        ["I have a headache", "tengo dolor de cabeza"],
        ["I have a stomachache", "tengo dolor de estómago"],
        ["I have a sore throat", "tengo dolor de garganta"],
        ["I have a cold", "tengo un resfriado"],
        ["I have a fever", "tengo fiebre"],
        ["I have a cough", "tengo tos"],
        ["I feel dizzy", "me siento mareado/a"],
        ["My head hurts", "me duele la cabeza"],
        ["My back hurts", "me duele la espalda"]
      ]
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "''I am cold'' significa que tienes frío (temperatura), NO que estás resfriado. Para el resfriado di siempre ''I have a cold''. Este es uno de los errores más comunes entre hispanohablantes."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0008-0003-000000000001';

-- Module 8 L4 — En el Médico
UPDATE lessons SET theory_content = '{
  "intro": "Ir al médico en un país de habla inglesa puede ser estresante. Conocer las frases que usa el médico y las que tú debes usar te dará seguridad cuando más la necesitas.",
  "sections": [
    {
      "type": "examples",
      "title": "CONVERSACIÓN EN EL CONSULTORIO",
      "items": [
        {"label": "Recepción", "en": "I have an appointment with Dr. Smith.", "es": "Tengo una cita con el Dr. Smith."},
        {"label": "Médico pregunta", "en": "What seems to be the problem?", "es": "¿Cuál parece ser el problema?"},
        {"label": "Médico pregunta", "en": "Where does it hurt?", "es": "¿Dónde le duele?"},
        {"label": "Paciente responde", "en": "It hurts here. I''ve had it for three days.", "es": "Me duele aquí. Lo tengo desde hace tres días."},
        {"label": "Médico indica", "en": "Take this medicine twice a day.", "es": "Tome este medicamento dos veces al día."},
        {"label": "Receta", "en": "Here is your prescription.", "es": "Aquí tiene su receta."}
      ]
    },
    {
      "type": "table",
      "title": "VOCABULARIO MÉDICO ESENCIAL",
      "headers": ["Inglés", "Español"],
      "rows": [
        ["appointment", "cita médica"],
        ["prescription", "receta médica"],
        ["pharmacy", "farmacia"],
        ["symptom", "síntoma"],
        ["dosage", "dosis"],
        ["twice a day", "dos veces al día"],
        ["emergency room", "sala de emergencias"]
      ]
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "En emergencias di: ''Call an ambulance!'' / ''I need help!'' / ''Call 911!'' (EE.UU.) o ''Call 999!'' (Reino Unido). Son frases que vale la pena memorizar."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0008-0004-000000000001';
