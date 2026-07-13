-- 010a_theory_modules_3_5.sql
-- Adds theory_content to 8 lessons in modules 3, 4, 5
-- Run AFTER 008_modules_3_5_expansion.sql

-- Module 3, L2: Números del 21 al 100
UPDATE lessons SET theory_content = '{
  "intro": "En inglés, los números del 21 al 99 se forman combinando la decena con la unidad mediante un guion. Aprenderás el patrón y las decenas clave para contar con fluidez.",
  "sections": [
    {
      "type": "explanation",
      "title": "CÓMO FORMAR LOS NÚMEROS COMPUESTOS",
      "text": "La estructura es: decena + guion + unidad. Ejemplos: twenty-one (21), thirty-two (32), forty-five (45), ninety-nine (99). Las decenas son twenty, thirty, forty, fifty, sixty, seventy, eighty y ninety. Nota que forty no tiene la u de four, y que fifty y eighty cambian ligeramente respecto a five y eight."
    },
    {
      "type": "table",
      "title": "LAS DECENAS EN INGLÉS",
      "headers": ["Número", "Inglés", "Español"],
      "rows": [
        ["20", "twenty", "veinte"],
        ["30", "thirty", "treinta"],
        ["40", "forty", "cuarenta"],
        ["50", "fifty", "cincuenta"],
        ["60", "sixty", "sesenta"],
        ["70", "seventy", "setenta"],
        ["80", "eighty", "ochenta"],
        ["90", "ninety", "noventa"]
      ]
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "Las decenas exactas (twenty, thirty, etc.) no llevan guion. El guion solo aparece cuando se añade una unidad del 1 al 9: twenty-one, forty-three, ninety-nine."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0003-0002-000000000001';

-- Module 3, L3: Números del 100 al 1000 y Ordinales
UPDATE lessons SET theory_content = '{
  "intro": "En esta lección aprenderás a expresar centenas y millares en inglés, y también los números ordinales que indican posición o secuencia.",
  "sections": [
    {
      "type": "explanation",
      "title": "CENTENAS Y MILLARES",
      "text": "Las centenas se forman con el número cardinal más hundred: one hundred (100), two hundred (200), five hundred (500). Para el millar: one thousand (1,000). Los números intermedios añaden and: one hundred and twenty-three (123), three hundred and forty-five (345). En inglés americano el and a veces se omite: one hundred twenty-three."
    },
    {
      "type": "table",
      "title": "LOS NÚMEROS ORDINALES",
      "headers": ["Número", "Ordinal", "Español"],
      "rows": [
        ["1st", "first", "primero"],
        ["2nd", "second", "segundo"],
        ["3rd", "third", "tercero"],
        ["4th", "fourth", "cuarto"],
        ["5th", "fifth", "quinto"],
        ["10th", "tenth", "décimo"],
        ["20th", "twentieth", "vigésimo"],
        ["21st", "twenty-first", "vigésimo primero"]
      ]
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "Los tres primeros ordinales son irregulares: first, second, third. A partir del cuarto, la mayoría añade -th al cardinal: four → fourth, six → sixth. Las decenas terminan en -tieth: twenty → twentieth, thirty → thirtieth."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0003-0003-000000000001';

-- Module 3, L4: Precios y Dinero
UPDATE lessons SET theory_content = '{
  "intro": "Hablar de precios en inglés es esencial para las compras y transacciones del día a día. Aprenderás el sistema monetario y las frases más usadas para preguntar y responder sobre costos.",
  "sections": [
    {
      "type": "explanation",
      "title": "EL SISTEMA MONETARIO EN INGLÉS",
      "text": "En EE.UU. se usan dólares (dollars) y centavos (cents). El símbolo $ va antes del número. Para leer $5.99 se dice five dollars and ninety-nine cents, o en forma coloquial, five ninety-nine. En el Reino Unido se usan libras (pounds, £) y peniques (pence): £3.50 → three pounds fifty."
    },
    {
      "type": "examples",
      "title": "EXPRESAR Y PREGUNTAR PRECIOS",
      "items": [
        {"label": "preguntar el precio", "en": "How much is it?", "es": "¿Cuánto cuesta?"},
        {"label": "responder el precio", "en": "It costs ten dollars.", "es": "Cuesta diez dólares."},
        {"label": "precio con centavos", "en": "That''s three dollars and fifty cents.", "es": "Son tres dólares y cincuenta centavos."},
        {"label": "forma coloquial", "en": "It''s two ninety-nine.", "es": "Son dos noventa y nueve."}
      ]
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "En conversaciones informales es muy común omitir las palabras dollars y cents y decir solo los números: five ninety-nine en lugar de five dollars and ninety-nine cents. Ambas formas son correctas."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0003-0004-000000000001';

-- Module 4, L2: Los Meses y las Estaciones
UPDATE lessons SET theory_content = '{
  "intro": "Los doce meses del año y las cuatro estaciones tienen nombres propios en inglés que siempre se escriben con letra mayúscula, a diferencia del español.",
  "sections": [
    {
      "type": "table",
      "title": "LOS MESES DEL AÑO",
      "headers": ["Inglés", "Español"],
      "rows": [
        ["January", "enero"],
        ["February", "febrero"],
        ["March", "marzo"],
        ["April", "abril"],
        ["May", "mayo"],
        ["June", "junio"],
        ["July", "julio"],
        ["August", "agosto"],
        ["September", "septiembre"],
        ["October", "octubre"],
        ["November", "noviembre"],
        ["December", "diciembre"]
      ]
    },
    {
      "type": "explanation",
      "title": "LAS CUATRO ESTACIONES",
      "text": "Las estaciones del año en inglés son: spring (primavera), summer (verano), autumn o fall (otoño) y winter (invierno). En inglés americano se prefiere fall; en inglés británico se usa autumn. Para indicar la estación se usa in: in spring, in summer, in autumn, in winter."
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "En inglés, los meses y las estaciones siempre se escriben con mayúscula inicial: January, February, Spring, Summer. Esto es diferente al español, donde se escriben con minúscula."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0004-0002-000000000001';

-- Module 4, L4: Hablar de Fechas y Cumpleaños
UPDATE lessons SET theory_content = '{
  "intro": "En inglés hay dos formatos principales para decir fechas: el americano y el británico. Conocer ambos te permitirá entender y comunicar fechas en cualquier situación.",
  "sections": [
    {
      "type": "explanation",
      "title": "FORMATO AMERICANO Y BRITÁNICO",
      "text": "En el formato americano el mes va primero, seguido del día en forma ordinal: July 4th (July fourth). Al escribirlo: Mes/Día/Año → 07/04/2024. En el formato británico el día va primero: the 4th of July. Al escribirlo: Día/Mes/Año → 04/07/2024. Los ordinales se usan siempre al hablar: March 15th → March fifteenth."
    },
    {
      "type": "examples",
      "title": "EJEMPLOS DE FECHAS Y CUMPLEAÑOS",
      "items": [
        {"label": "formato americano", "en": "My birthday is on March 15th.", "es": "Mi cumpleaños es el 15 de marzo."},
        {"label": "formato británico", "en": "It''s the 20th of June.", "es": "Es el 20 de junio."},
        {"label": "preguntar la fecha", "en": "What''s today''s date?", "es": "¿Cuál es la fecha de hoy?"},
        {"label": "responder", "en": "Today is July 4th.", "es": "Hoy es el 4 de julio."}
      ]
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "Atención con la ambigüedad: la fecha escrita 04/07 significa April 7th para un americano y July 4th para un británico. Cuando sea posible, escribe el mes con letras para evitar confusiones: July 4, 2024."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0004-0004-000000000001';

-- Module 5, L2: Adjetivos de Tamaño y Forma
UPDATE lessons SET theory_content = '{
  "intro": "A diferencia del español, los adjetivos en inglés siempre van ANTES del sustantivo y no cambian según el género ni el número. Aprenderás los adjetivos de tamaño y forma más comunes.",
  "sections": [
    {
      "type": "explanation",
      "title": "ADJETIVOS DE TAMAÑO Y FORMA",
      "text": "Tamaño: big / large (grande), small / little (pequeño), tall (alto), short (bajo o corto), long (largo), wide (ancho), narrow (estrecho). Forma: round (redondo), square (cuadrado), rectangular (rectangular), oval (ovalado). El adjetivo siempre va antes del sustantivo: a big house, a small car, a round table."
    },
    {
      "type": "examples",
      "title": "EJEMPLOS EN CONTEXTO",
      "items": [
        {"label": "tamaño grande", "en": "She lives in a big house.", "es": "Ella vive en una casa grande."},
        {"label": "tamaño pequeño", "en": "I have a small dog.", "es": "Tengo un perro pequeño."},
        {"label": "altura", "en": "He is a tall man.", "es": "Él es un hombre alto."},
        {"label": "forma", "en": "We sat at a round table.", "es": "Nos sentamos en una mesa redonda."}
      ]
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "Los adjetivos en inglés no tienen plural: se dice big cats (no bigs cats) y small houses (no smalls houses). El adjetivo es invariable sin importar el género o el número del sustantivo."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0005-0002-000000000001';

-- Module 5, L3: Adjetivos de Temperatura y Sensaciones
UPDATE lessons SET theory_content = '{
  "intro": "Los adjetivos de temperatura y sensación táctil son esenciales para describir el entorno y cómo te sientes. En inglés se usan principalmente con los verbos be y feel.",
  "sections": [
    {
      "type": "explanation",
      "title": "ADJETIVOS DE TEMPERATURA Y TACTO",
      "text": "Temperatura (de mayor a menor calor): hot (caliente/caluroso), warm (cálido/tibio), cool (fresco), cold (frío), freezing (helado). Tacto y sensación: soft (suave), hard (duro), rough (áspero), smooth (liso), wet (mojado), dry (seco), heavy (pesado), light (ligero). Se usan con be para describir objetos y con feel para expresar cómo uno se siente."
    },
    {
      "type": "examples",
      "title": "EJEMPLOS EN CONTEXTO",
      "items": [
        {"label": "temperatura del objeto", "en": "The coffee is hot.", "es": "El café está caliente."},
        {"label": "sensación personal", "en": "I feel cold.", "es": "Tengo frío."},
        {"label": "tacto", "en": "This blanket is soft.", "es": "Esta manta es suave."},
        {"label": "condición", "en": "The road is wet.", "es": "La carretera está mojada."}
      ]
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "Muchos adjetivos de sensación describen también el clima y los estados de ánimo: a cold day (un día frío), I feel warm (me siento abrigado), a rough day (un día difícil). El contexto determina el significado exacto."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0005-0003-000000000001';

-- Module 5, L4: Adjetivos de Calidad y Opinión
UPDATE lessons SET theory_content = '{
  "intro": "Los adjetivos de opinión expresan tu valoración sobre algo o alguien. En inglés van siempre antes del sustantivo y, cuando se combinan con otros adjetivos, ocupan la primera posición.",
  "sections": [
    {
      "type": "explanation",
      "title": "ADJETIVOS DE OPINIÓN: POSITIVOS Y NEGATIVOS",
      "text": "Positivos: good (bueno), great (genial), excellent (excelente), wonderful (maravilloso), beautiful (hermoso), pretty (bonito), handsome (guapo), clean (limpio), fast (rápido), easy (fácil), cheap (barato), expensive (caro). Negativos: bad (malo), terrible (terrible), ugly (feo), dirty (sucio), slow (lento), difficult (difícil). Todos van antes del sustantivo que describen."
    },
    {
      "type": "examples",
      "title": "EJEMPLOS DE USO",
      "items": [
        {"label": "opinión positiva", "en": "This is an excellent movie.", "es": "Esta es una película excelente."},
        {"label": "opinión negativa", "en": "That was a terrible idea.", "es": "Esa fue una idea terrible."},
        {"label": "opinión + hecho", "en": "She has a beautiful big house.", "es": "Ella tiene una casa grande y hermosa."},
        {"label": "precio y calidad", "en": "This restaurant is expensive but wonderful.", "es": "Este restaurante es caro pero maravilloso."}
      ]
    },
    {
      "type": "note",
      "variant": "tip",
      "text": "Cuando hay varios adjetivos, los de opinión van primero: a beautiful big house (hermosa casa grande). El orden estándar en inglés es: opinión → tamaño → edad → forma → color → origen → material → sustantivo."
    }
  ]
}'::jsonb WHERE id = '00000002-0000-0005-0004-000000000001';
