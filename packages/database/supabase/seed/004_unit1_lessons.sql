-- =============================================
-- Seed: Unidad 1 — Lecciones 4–10
-- =============================================

-- =============================================
-- LESSON DEFINITIONS
-- =============================================
insert into public.lessons (id, unit_id, order_index, slug, title, description, lesson_type, xp_reward, estimated_minutes, is_published)
values
  (
    '00000000-0000-0001-0000-000000000004',
    '00000000-0000-0000-0001-000000000001',
    4, 'colores-y-adjetivos',
    '{"es": "Colores y Adjetivos", "en": "Colors and Adjectives"}',
    '{"es": "Aprende los colores y adjetivos básicos en inglés.", "en": "Learn basic colors and adjectives in English."}',
    'vocabulary', 10, 8, true
  ),
  (
    '00000000-0000-0001-0000-000000000005',
    '00000000-0000-0000-0001-000000000001',
    5, 'la-familia',
    '{"es": "La Familia", "en": "The Family"}',
    '{"es": "Aprende los miembros de la familia en inglés.", "en": "Learn family member vocabulary in English."}',
    'vocabulary', 10, 7, true
  ),
  (
    '00000000-0000-0001-0000-000000000006',
    '00000000-0000-0000-0001-000000000001',
    6, 'dias-y-meses',
    '{"es": "Días y Meses", "en": "Days and Months"}',
    '{"es": "Aprende los días de la semana y los meses del año.", "en": "Learn the days of the week and months of the year."}',
    'vocabulary', 10, 8, true
  ),
  (
    '00000000-0000-0001-0000-000000000007',
    '00000000-0000-0000-0001-000000000001',
    7, 'comida-y-bebida',
    '{"es": "Comida y Bebida", "en": "Food and Drink"}',
    '{"es": "Vocabulario esencial de comida y bebida en inglés.", "en": "Essential food and drink vocabulary in English."}',
    'vocabulary', 10, 8, true
  ),
  (
    '00000000-0000-0001-0000-000000000008',
    '00000000-0000-0000-0001-000000000001',
    8, 'el-cuerpo',
    '{"es": "El Cuerpo Humano", "en": "The Human Body"}',
    '{"es": "Las partes del cuerpo en inglés.", "en": "Body parts in English."}',
    'vocabulary', 10, 7, true
  ),
  (
    '00000000-0000-0001-0000-000000000009',
    '00000000-0000-0000-0001-000000000001',
    9, 'to-be',
    '{"es": "Verbo To Be", "en": "The Verb To Be"}',
    '{"es": "El verbo ser/estar en inglés: am, is, are.", "en": "The verb to be in English: am, is, are."}',
    'grammar', 15, 10, true
  ),
  (
    '00000000-0000-0001-0000-000000000010',
    '00000000-0000-0000-0001-000000000001',
    10, 'articulos-y-plurales',
    '{"es": "Artículos y Plurales", "en": "Articles and Plurals"}',
    '{"es": "Aprende a usar a/an y cómo formar plurales en inglés.", "en": "Learn to use a/an and how to form plurals in English."}',
    'grammar', 15, 10, true
  );


-- =============================================
-- EXERCISES: Lección 4 — Colores y Adjetivos
-- =============================================
insert into public.exercises (lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags)
values
  (
    '00000000-0000-0001-0000-000000000004', 1, 'flashcard',
    '{"text": "red · blue · yellow", "subtext": "Los tres colores primarios"}',
    '{"text": "rojo · azul · amarillo", "note": "Red /rɛd/, blue /bluː/, yellow /ˈjɛloʊ/"}',
    null,
    '{"es": "Red (rojo), blue (azul) y yellow (amarillo) son los tres colores primarios. ¡Memorízalos juntos!"}',
    '{colors,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000004', 2, 'multiple_choice',
    '{"text": "¿Cómo se dice \"verde\" en inglés?"}',
    '{"text": "green"}',
    '["grey", "cream", "brown"]',
    '{"es": "Green (/ɡriːn/) es verde. El color de las plantas y el pasto."}',
    '{colors,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000004', 3, 'multiple_choice',
    '{"text": "¿Qué significa \"orange\"?"}',
    '{"text": "naranja"}',
    '["morado", "rosado", "marrón"]',
    '{"es": "Orange (/ˈɔːrɪndʒ/) significa naranja. Curiosamente, es la misma palabra que la fruta."}',
    '{colors,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000004', 4, 'fill_blank',
    '{"text": "The sky is ___."}',
    '{"text": "blue", "accepted": ["blue", "Blue"]}',
    null,
    '{"es": "\"The sky is blue\" — el cielo es azul. Ejemplo clásico para practicar colores con el verbo to be."}',
    '{colors,grammar,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000004', 5, 'flashcard',
    '{"text": "big / small", "subtext": "Adjetivos de tamaño"}',
    '{"text": "grande / pequeño", "note": "Los adjetivos en inglés van ANTES del sustantivo: \"a big dog\", \"a small cat\"."}',
    null,
    '{"es": "En inglés los adjetivos preceden al sustantivo, al contrario que en español. Decimos \"a big house\", no \"a house big\"."}',
    '{adjectives,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000004', 6, 'multiple_choice',
    '{"text": "¿Qué significa \"tall\"?"}',
    '{"text": "alto/a"}',
    '["viejo/a", "rápido/a", "delgado/a"]',
    '{"es": "Tall (/tɔːl/) = alto. Su opuesto es short (/ʃɔːrt/) que significa bajo (de estatura) o corto."}',
    '{adjectives,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000004', 7, 'fill_blank',
    '{"text": "An elephant is very ___."}',
    '{"text": "big", "accepted": ["big", "Big", "large", "Large"]}',
    null,
    '{"es": "\"An elephant is very big\" — un elefante es muy grande. Big y large son sinónimos."}',
    '{adjectives,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000004', 8, 'multiple_choice',
    '{"text": "¿Cómo se dice \"frío\" en inglés?"}',
    '{"text": "cold"}',
    '["hot", "warm", "cool"]',
    '{"es": "Cold (/koʊld/) = frío. Hot = caliente. Warm = tibio/cálido. Cool = fresco. ¡Cuatro niveles de temperatura!"}',
    '{adjectives,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000004', 9, 'multiple_choice',
    '{"text": "¿Cuál es el color blanco en inglés?"}',
    '{"text": "white"}',
    '["black", "grey", "beige"]',
    '{"es": "White (/waɪt/) = blanco. Black (/blæk/) = negro. Grey (/ɡreɪ/) = gris."}',
    '{colors,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000004', 10, 'translation',
    '{"text": "Traduce al inglés: \"La manzana es roja.\""}',
    '{"text": "The apple is red.", "accepted": ["The apple is red.", "The apple is red", "the apple is red."]}',
    null,
    '{"es": "Estructura: sujeto + verbo to be + adjetivo. \"The apple is red\" sigue el patrón S + V + Adj."}',
    '{colors,grammar,A1}'
  );


-- =============================================
-- EXERCISES: Lección 5 — La Familia
-- =============================================
insert into public.exercises (lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags)
values
  (
    '00000000-0000-0001-0000-000000000005', 1, 'flashcard',
    '{"text": "mother / father", "subtext": "¿Cómo se dicen papá y mamá en inglés?"}',
    '{"text": "madre / padre", "note": "También: mom /mɒm/ (informal para mother) y dad /dæd/ (informal para father)."}',
    null,
    '{"es": "Mother y father son las formas formales. Mom y dad son más comunes en el habla cotidiana."}',
    '{family,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000005', 2, 'flashcard',
    '{"text": "brother / sister", "subtext": "¿Cómo se dicen hermano y hermana?"}',
    '{"text": "hermano / hermana", "note": "Brother /ˈbrʌðər/, sister /ˈsɪstər/. Siblings = hermanos en general."}',
    null,
    '{"es": "Siblings es la palabra neutra que incluye brothers y sisters. \"I have two siblings\" = tengo dos hermanos."}',
    '{family,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000005', 3, 'multiple_choice',
    '{"text": "¿Qué significa \"grandmother\"?"}',
    '{"text": "abuela"}',
    '["tía", "prima", "madre"]',
    '{"es": "Grandmother (/ˈɡrændmʌðər/) = abuela. También se dice grandma /ˈɡrænmɑː/ de forma cariñosa."}',
    '{family,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000005', 4, 'multiple_choice',
    '{"text": "¿Cómo se dice \"hijo\" en inglés?"}',
    '{"text": "son"}',
    '["sun", "daughter", "nephew"]',
    '{"es": "Son (/sʌn/) = hijo. Cuidado: suena igual que sun (sol) pero se escribe diferente. Daughter (/ˈdɔːtər/) = hija."}',
    '{family,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000005', 5, 'fill_blank',
    '{"text": "My mom and dad are my ___."}',
    '{"text": "parents", "accepted": ["parents", "Parents"]}',
    null,
    '{"es": "Parents (/ˈpeərənts/) = padres (ambos). No confundir con \"parent\" que es singular (un padre/una madre)."}',
    '{family,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000005', 6, 'multiple_choice',
    '{"text": "¿Qué significa \"uncle\"?"}',
    '{"text": "tío"}',
    '["abuelo", "primo", "sobrino"]',
    '{"es": "Uncle (/ˈʌŋkəl/) = tío. Aunt (/ænt/ o /ɑːnt/) = tía. Nephew = sobrino. Niece = sobrina."}',
    '{family,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000005', 7, 'fill_blank',
    '{"text": "I have one brother and two ___."}',
    '{"text": "sisters", "accepted": ["sisters", "Sisters"]}',
    null,
    '{"es": "\"I have one brother and two sisters\" = tengo un hermano y dos hermanas. Nota el plural: sister → sisters."}',
    '{family,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000005', 8, 'multiple_choice',
    '{"text": "¿Cómo se dice \"prima\" en inglés?"}',
    '{"text": "cousin"}',
    '["niece", "aunt", "sister"]',
    '{"es": "Cousin (/ˈkʌzən/) = primo o prima. En inglés no hay distinción de género para cousin, ni para niece (sobrina vs sobrino no)."}',
    '{family,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000005', 9, 'translation',
    '{"text": "Traduce al inglés: \"Mi padre es médico.\""}',
    '{"text": "My father is a doctor.", "accepted": ["My father is a doctor.", "My father is a doctor", "My dad is a doctor.", "My dad is a doctor"]}',
    null,
    '{"es": "\"My father is a doctor.\" Nota que en inglés se usa el artículo \"a\" antes de la profesión: \"a doctor\", \"a teacher\", \"a nurse\"."}',
    '{family,grammar,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000005', 10, 'multiple_choice',
    '{"text": "\"She is my father''s mother.\" ¿Quién es ella?"}',
    '{"text": "Mi abuela"}',
    '["Mi madre", "Mi tía", "Mi prima"]',
    '{"es": "\"My father''s mother\" = la madre de mi padre = mi abuela (grandmother). El apóstrofo ''s indica posesión en inglés."}',
    '{family,A1}'
  );


-- =============================================
-- EXERCISES: Lección 6 — Días y Meses
-- =============================================
insert into public.exercises (lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags)
values
  (
    '00000000-0000-0001-0000-000000000006', 1, 'flashcard',
    '{"text": "Monday · Tuesday · Wednesday", "subtext": "Los primeros tres días de la semana"}',
    '{"text": "lunes · martes · miércoles", "note": "En inglés los días de la semana siempre se escriben con mayúscula."}',
    null,
    '{"es": "A diferencia del español, los días de la semana en inglés siempre se escriben con mayúscula: Monday, Tuesday, Wednesday..."}',
    '{days,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000006', 2, 'multiple_choice',
    '{"text": "¿Qué día es \"Thursday\"?"}',
    '{"text": "jueves"}',
    '["martes", "viernes", "miércoles"]',
    '{"es": "Thursday (/ˈθɜːrzdeɪ/) = jueves. La semana: Mon, Tue, Wed, Thu, Fri, Sat, Sun."}',
    '{days,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000006', 3, 'fill_blank',
    '{"text": "Monday, Tuesday, ___, Thursday"}',
    '{"text": "Wednesday", "accepted": ["Wednesday", "wednesday"]}',
    null,
    '{"es": "El orden correcto: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday."}',
    '{days,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000006', 4, 'multiple_choice',
    '{"text": "¿Cuál es el primer mes del año?"}',
    '{"text": "January"}',
    '["June", "July", "March"]',
    '{"es": "January (/ˈdʒænjueri/) = enero. El año empieza con January y termina con December."}',
    '{months,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000006', 5, 'flashcard',
    '{"text": "March · June · September · December", "subtext": "Los meses de cambio de estación"}',
    '{"text": "marzo · junio · septiembre · diciembre", "note": "En inglés los meses también se escriben siempre con mayúscula."}',
    null,
    '{"es": "Los 12 meses en inglés también van en mayúscula: January, February, March, April, May, June, July, August, September, October, November, December."}',
    '{months,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000006', 6, 'fill_blank',
    '{"text": "January, February, ___"}',
    '{"text": "March", "accepted": ["March", "march"]}',
    null,
    '{"es": "La secuencia de los primeros meses: January (ene), February (feb), March (mar)..."}',
    '{months,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000006', 7, 'multiple_choice',
    '{"text": "¿Cuántos días tiene una semana en inglés?"}',
    '{"text": "7 (seven)"}',
    '["5 (five)", "6 (six)", "8 (eight)"]',
    '{"es": "A week has seven days. La semana laboral es de Monday a Friday (5 días). El weekend es Saturday y Sunday."}',
    '{days,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000006', 8, 'multiple_choice',
    '{"text": "¿Qué mes es \"August\"?"}',
    '{"text": "agosto"}',
    '["abril", "octubre", "junio"]',
    '{"es": "August (/ˈɔːɡəst/) = agosto. Es el octavo mes del año."}',
    '{months,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000006', 9, 'multiple_choice',
    '{"text": "\"Saturday and Sunday\" es..."}',
    '{"text": "el fin de semana (the weekend)"}',
    '["los días laborables", "la semana completa", "los días de escuela"]',
    '{"es": "Saturday y Sunday forman el weekend (fin de semana). Los días laborables son los weekdays: Mon–Fri."}',
    '{days,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000006', 10, 'translation',
    '{"text": "Traduce al inglés: \"Mi cumpleaños es en julio.\""}',
    '{"text": "My birthday is in July.", "accepted": ["My birthday is in July.", "My birthday is in July", "my birthday is in july."]}',
    null,
    '{"es": "\"My birthday is in July.\" En inglés se usa \"in\" con los meses: in January, in February... Igual que en español: en enero, en febrero."}',
    '{months,grammar,A1}'
  );


-- =============================================
-- EXERCISES: Lección 7 — Comida y Bebida
-- =============================================
insert into public.exercises (lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags)
values
  (
    '00000000-0000-0001-0000-000000000007', 1, 'flashcard',
    '{"text": "bread · milk · water", "subtext": "Tres alimentos básicos"}',
    '{"text": "pan · leche · agua", "note": "Bread /brɛd/, milk /mɪlk/, water /ˈwɔːtər/"}',
    null,
    '{"es": "Bread (pan), milk (leche) y water (agua) son tres de los alimentos más básicos en cualquier idioma."}',
    '{food,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000007', 2, 'multiple_choice',
    '{"text": "¿Qué es \"apple\"?"}',
    '{"text": "manzana"}',
    '["naranja", "plátano", "uva"]',
    '{"es": "Apple (/ˈæpəl/) = manzana. Una de las frutas más comunes en inglés. \"An apple a day keeps the doctor away.\""}',
    '{food,fruit,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000007', 3, 'fill_blank',
    '{"text": "I drink ___ every morning."}',
    '{"text": "water", "accepted": ["water", "coffee", "milk", "juice", "tea"]}',
    null,
    '{"es": "\"I drink water/coffee/milk every morning\" — todas son respuestas válidas aquí. La clave es el verbo drink (beber)."}',
    '{food,drinks,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000007', 4, 'multiple_choice',
    '{"text": "¿Qué significa \"chicken\"?"}',
    '{"text": "pollo"}',
    '["cerdo", "ternera", "pescado"]',
    '{"es": "Chicken (/ˈtʃɪkɪn/) = pollo. Pork = cerdo, beef = ternera/res, fish = pescado."}',
    '{food,meat,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000007', 5, 'flashcard',
    '{"text": "rice · eggs · coffee", "subtext": "Básicos del desayuno y la cocina"}',
    '{"text": "arroz · huevos · café", "note": "Rice /raɪs/, eggs /ɛɡz/, coffee /ˈkɒfi/"}',
    null,
    '{"es": "Rice (arroz) y eggs (huevos) son básicos de la cocina. Coffee (café) es la bebida favorita de muchos."}',
    '{food,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000007', 6, 'multiple_choice',
    '{"text": "¿Qué significa \"vegetables\"?"}',
    '{"text": "verduras / vegetales"}',
    '["frutas", "carnes", "bebidas"]',
    '{"es": "Vegetables (/ˈvɛdʒtəbəlz/) = verduras o vegetales. Fruit = fruta. Meat = carne."}',
    '{food,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000007', 7, 'fill_blank',
    '{"text": "She eats ___ for breakfast."}',
    '{"text": "eggs", "accepted": ["eggs", "bread", "fruit", "cereal", "rice"]}',
    null,
    '{"es": "\"She eats eggs for breakfast\" — ella come huevos en el desayuno. Breakfast = desayuno, lunch = almuerzo, dinner = cena."}',
    '{food,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000007', 8, 'multiple_choice',
    '{"text": "¿Cómo se dice \"tengo hambre\" en inglés?"}',
    '{"text": "I am hungry"}',
    '["I have hunger", "I want food", "I eat now"]',
    '{"es": "\"I am hungry\" — en inglés se usa el verbo to be (ser/estar), no el verbo tener. \"I am hungry\" literalmente sería \"yo estoy hambriento\"."}',
    '{food,grammar,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000007', 9, 'multiple_choice',
    '{"text": "¿Qué es \"juice\"?"}',
    '{"text": "jugo / zumo"}',
    '["agua", "leche", "té"]',
    '{"es": "Juice (/dʒuːs/) = jugo o zumo. Orange juice = jugo de naranja. Apple juice = jugo de manzana."}',
    '{food,drinks,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000007', 10, 'translation',
    '{"text": "Traduce al inglés: \"Quiero un vaso de agua, por favor.\""}',
    '{"text": "I want a glass of water, please.", "accepted": ["I want a glass of water, please.", "I want a glass of water please", "I would like a glass of water, please.", "I''d like a glass of water, please."]}',
    null,
    '{"es": "\"I want a glass of water, please.\" Glass of = un vaso de. I would like / I''d like es una forma más educada de pedir."}',
    '{food,drinks,polite,A1}'
  );


-- =============================================
-- EXERCISES: Lección 8 — El Cuerpo Humano
-- =============================================
insert into public.exercises (lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags)
values
  (
    '00000000-0000-0001-0000-000000000008', 1, 'flashcard',
    '{"text": "head · hands · feet", "subtext": "Partes del cuerpo: arriba y abajo"}',
    '{"text": "cabeza · manos · pies", "note": "Head /hɛd/, hands /hændz/, feet /fiːt/ (plural de foot)"}',
    null,
    '{"es": "Foot (pie) → feet (pies): un plural irregular. De la misma forma: tooth (diente) → teeth (dientes)."}',
    '{body,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000008', 2, 'multiple_choice',
    '{"text": "¿Qué significa \"eyes\"?"}',
    '{"text": "ojos"}',
    '["orejas", "nariz", "boca"]',
    '{"es": "Eyes (/aɪz/) = ojos. Eye es el singular (un ojo). Con los órganos pares, casi siempre usamos el plural: eyes, ears, hands, feet."}',
    '{body,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000008', 3, 'fill_blank',
    '{"text": "I have two ___ and two legs."}',
    '{"text": "arms", "accepted": ["arms", "Arms", "hands", "Hands"]}',
    null,
    '{"es": "\"I have two arms and two legs\" — tengo dos brazos y dos piernas. Arms = brazos, legs = piernas."}',
    '{body,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000008', 4, 'multiple_choice',
    '{"text": "¿Cómo se dice \"nariz\" en inglés?"}',
    '{"text": "nose"}',
    '["mouth", "chin", "ear"]',
    '{"es": "Nose (/noʊz/) = nariz. Mouth (/maʊθ/) = boca. Ear (/ɪr/) = oreja/oído. Chin (/tʃɪn/) = mentón/barbilla."}',
    '{body,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000008', 5, 'flashcard',
    '{"text": "nose · ears · mouth", "subtext": "La cara: ¿cómo se dicen?"}',
    '{"text": "nariz · orejas · boca", "note": "Nose /noʊz/, ears /ɪrz/, mouth /maʊθ/. Todas partes de la cara (face)."}',
    null,
    '{"es": "Face = cara. On your face you have: two eyes, a nose, a mouth, two ears. ¡Y también cheeks (mejillas) y a chin (barbilla)!"}',
    '{body,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000008', 6, 'multiple_choice',
    '{"text": "¿Qué significa \"leg\"?"}',
    '{"text": "pierna"}',
    '["brazo", "pie", "rodilla"]',
    '{"es": "Leg (/lɛɡ/) = pierna. Arm (/ɑːrm/) = brazo. Foot (/fʊt/) = pie. Knee (/niː/) = rodilla."}',
    '{body,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000008', 7, 'fill_blank',
    '{"text": "She has brown ___."}',
    '{"text": "eyes", "accepted": ["eyes", "Eyes", "hair", "Hair"]}',
    null,
    '{"es": "\"She has brown eyes/hair\" = ella tiene ojos/cabello castaño. Brown eyes = ojos marrones, brown hair = cabello castaño."}',
    '{body,colors,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000008', 8, 'multiple_choice',
    '{"text": "¿Cómo se dice \"me duele la cabeza\"?"}',
    '{"text": "My head hurts"}',
    '["I have head", "My head is bad", "Head pain"]',
    '{"es": "\"My head hurts\" o \"I have a headache\". Hurts = duele. También: my back hurts, my stomach hurts..."}',
    '{body,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000008', 9, 'translation',
    '{"text": "Traduce al inglés: \"El cuerpo humano tiene 206 huesos.\""}',
    '{"text": "The human body has 206 bones.", "accepted": ["The human body has 206 bones.", "The human body has 206 bones"]}',
    null,
    '{"es": "Bones (/boʊnz/) = huesos. Body (/ˈbɒdi/) = cuerpo. Human (/ˈhjuːmən/) = humano."}',
    '{body,A1}'
  );


-- =============================================
-- EXERCISES: Lección 9 — Verbo To Be
-- =============================================
insert into public.exercises (lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags)
values
  (
    '00000000-0000-0001-0000-000000000009', 1, 'flashcard',
    '{"text": "I am · You are · He/She/It is", "subtext": "El verbo to be en singular"}',
    '{"text": "yo soy/estoy · tú eres/estás · él/ella/ello es/está", "note": "Am solo se usa con I. Is se usa con he, she, it. Are con you, we, they."}',
    null,
    '{"es": "To be (ser/estar) es el verbo más importante del inglés. Tiene tres formas: am (I), is (he/she/it), are (you/we/they)."}',
    '{grammar,tobe,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000009', 2, 'multiple_choice',
    '{"text": "\"She ___ a teacher.\" ¿Qué forma del verbo to be va aquí?"}',
    '{"text": "is"}',
    '["am", "are", "be"]',
    '{"es": "Con she, he, it se usa IS. \"She is a teacher\" = ella es profesora. Recuerda: I am, You are, He/She/It IS."}',
    '{grammar,tobe,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000009', 3, 'fill_blank',
    '{"text": "I ___ very happy today."}',
    '{"text": "am", "accepted": ["am", "Am"]}',
    null,
    '{"es": "Con I siempre se usa AM. \"I am happy\" = estoy feliz. La contracción es \"I''m happy\"."}',
    '{grammar,tobe,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000009', 4, 'multiple_choice',
    '{"text": "\"We ___ from Spain.\" ¿Qué forma del verbo to be va aquí?"}',
    '{"text": "are"}',
    '["am", "is", "be"]',
    '{"es": "Con we, you (plural) y they se usa ARE. \"We are from Spain\" = somos de España."}',
    '{grammar,tobe,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000009', 5, 'flashcard',
    '{"text": "We are · You are · They are", "subtext": "El verbo to be en plural"}',
    '{"text": "nosotros somos/estamos · vosotros sois/estáis · ellos son/están", "note": "Contracciones: we''re, you''re, they''re"}',
    null,
    '{"es": "Las contracciones son muy comunes en inglés hablado: we''re, you''re, they''re. I''m happy = I am happy."}',
    '{grammar,tobe,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000009', 6, 'fill_blank',
    '{"text": "He ___ very tall."}',
    '{"text": "is", "accepted": ["is", "Is"]}',
    null,
    '{"es": "Con he/she/it siempre se usa IS. \"He is very tall\" = él es muy alto. Contracción: \"He''s very tall\"."}',
    '{grammar,tobe,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000009', 7, 'multiple_choice',
    '{"text": "\"Are you cold?\" — ¿Cuál es la respuesta correcta?"}',
    '{"text": "Yes, I am."}',
    '["Yes, I is.", "Yes, you are.", "Yes, I be."]',
    '{"es": "La respuesta corta a \"Are you...?\" es \"Yes, I am\" o \"No, I''m not\". ¡Nunca \"Yes, I are\"!"}',
    '{grammar,tobe,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000009', 8, 'multiple_choice',
    '{"text": "¿Cuál es la forma negativa de \"I am\"?"}',
    '{"text": "I am not / I''m not"}',
    '["I not am", "I don''t am", "I no am"]',
    '{"es": "La negación del verbo to be es directa: I am not (I''m not), you are not (you aren''t), he is not (he isn''t)."}',
    '{grammar,tobe,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000009', 9, 'translation',
    '{"text": "Traduce al inglés: \"Nosotros somos de México.\""}',
    '{"text": "We are from Mexico.", "accepted": ["We are from Mexico.", "We are from Mexico", "We''re from Mexico.", "We''re from Mexico"]}',
    null,
    '{"es": "\"We are from Mexico\" o \"We''re from Mexico\". From = de (origen). También: \"I am from Colombia\", \"She is from Argentina\"."}',
    '{grammar,tobe,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000009', 10, 'translation',
    '{"text": "Traduce al inglés: \"El perro es grande y marrón.\""}',
    '{"text": "The dog is big and brown.", "accepted": ["The dog is big and brown.", "The dog is big and brown", "The dog is large and brown."]}',
    null,
    '{"es": "\"The dog is big and brown.\" Cuando hay dos adjetivos, se unen con and. Nota: los adjetivos no cambian de género en inglés."}',
    '{grammar,tobe,colors,A1}'
  );


-- =============================================
-- EXERCISES: Lección 10 — Artículos y Plurales
-- =============================================
insert into public.exercises (lesson_id, order_index, exercise_type, prompt, correct_answer, distractors, explanation, tags)
values
  (
    '00000000-0000-0001-0000-000000000010', 1, 'flashcard',
    '{"text": "a / an", "subtext": "¿Cuándo se usa cada artículo?"}',
    '{"text": "un/una (antes de consonante) / un/una (antes de vocal)", "note": "A + consonante: a book, a cat. An + vocal: an apple, an egg, an hour."}',
    null,
    '{"es": "La regla es por sonido, no por letra. Se dice ''an hour'' porque hour suena /aʊər/ (empieza con vocal). Se dice ''a university'' porque suena /juːnɪˈvɜːrsɪti/ (empieza con ''y'', consonante)."}',
    '{grammar,articles,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000010', 2, 'multiple_choice',
    '{"text": "\"___ apple a day keeps the doctor away.\" ¿Qué artículo va aquí?"}',
    '{"text": "An"}',
    '["A", "The", "—"]',
    '{"es": "Apple empieza con vocal (a), entonces se usa AN. \"An apple\" = una manzana."}',
    '{grammar,articles,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000010', 3, 'multiple_choice',
    '{"text": "\"___ book is on the table.\" ¿Qué artículo va aquí?"}',
    '{"text": "A"}',
    '["An", "—", "One"]',
    '{"es": "Book empieza con consonante (b), entonces se usa A. \"A book\" = un libro."}',
    '{grammar,articles,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000010', 4, 'fill_blank',
    '{"text": "___ orange is a fruit."}',
    '{"text": "An", "accepted": ["An", "an"]}',
    null,
    '{"es": "Orange empieza con vocal (o), entonces se usa AN. \"An orange\" = una naranja."}',
    '{grammar,articles,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000010', 5, 'flashcard',
    '{"text": "Formación del plural regular", "subtext": "¿Cómo se forman la mayoría de los plurales?"}',
    '{"text": "sustantivo + s: books, cats, dogs\nsustantivo en -s/-sh/-ch/-x + es: buses, dishes, churches", "note": "La mayoría de plurales se forman solo añadiendo -s."}',
    null,
    '{"es": "Regla general: añade -s. Si termina en s, sh, ch, x o z, añade -es. book→books, bus→buses, church→churches."}',
    '{grammar,plurals,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000010', 6, 'fill_blank',
    '{"text": "I have three ___ on my desk. (book)"}',
    '{"text": "books", "accepted": ["books", "Books"]}',
    null,
    '{"es": "Book → books. El plural regular más sencillo: solo añade -s. Three books = tres libros."}',
    '{grammar,plurals,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000010', 7, 'multiple_choice',
    '{"text": "¿Cuál es el plural de \"child\"?"}',
    '{"text": "children"}',
    '["childs", "childes", "child''s"]',
    '{"es": "Child → children es un plural irregular. Otros irregulares: man→men, woman→women, mouse→mice, tooth→teeth, foot→feet."}',
    '{grammar,plurals,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000010', 8, 'multiple_choice',
    '{"text": "\"___ elephant is in the zoo.\" ¿Qué artículo va?"}',
    '{"text": "An"}',
    '["A", "The", "Some"]',
    '{"es": "Elephant empieza con vocal (e), entonces se usa AN. \"An elephant\" = un elefante."}',
    '{grammar,articles,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000010', 9, 'multiple_choice',
    '{"text": "¿Cuál es el plural de \"city\"?"}',
    '{"text": "cities"}',
    '["citys", "cityes", "city''s"]',
    '{"es": "Cuando un sustantivo termina en consonante + y, se cambia la y por -ies: city→cities, baby→babies, party→parties."}',
    '{grammar,plurals,A1}'
  ),
  (
    '00000000-0000-0001-0000-000000000010', 10, 'translation',
    '{"text": "Traduce al inglés: \"Los gatos están sobre la mesa.\""}',
    '{"text": "The cats are on the table.", "accepted": ["The cats are on the table.", "The cats are on the table"]}',
    null,
    '{"es": "\"The cats are on the table.\" Aquí se usa THE (artículo definido) porque nos referimos a gatos específicos. On = sobre/encima de. Table = mesa."}',
    '{grammar,articles,plurals,A1}'
  );
