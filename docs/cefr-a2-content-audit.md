# Auditoría de Contenido — Nivel A2

**Fecha:** 2026-07-13
**Método:** comparación contra los mismos inventarios de referencia usados en la auditoría de A1 (Cambridge English Grammar Profile, British Council/EAQUALS Core Inventory for General English, descriptores oficiales CEFR por destreza), cruzados con una revisión línea por línea de todo el contenido A1 ya construido (`005_a1_reseed.sql` a `011_can_do_statements.sql`) para determinar exactamente qué YA está cubierto y qué es territorio nuevo.
**Estado del esquema:** no existe ninguna fila en `units` con `cefr_level = 'A2'` todavía — A2 se construye desde cero, cero riesgo de contenido duplicado a nivel de base de datos. El riesgo real es pedagógico: repetir temas que A1 ya tocó superficialmente, o —peor— testear gramática de A2 sin haberla enseñado (la violación exacta que la auditoría de A1 encontró y corrigió).

---

## 1. Qué es A2 según CEFR

Descriptor global oficial: *"Puede comprender frases y expresiones de uso frecuente relacionadas con áreas de experiencia especialmente relevantes (información básica sobre sí mismo y su familia, compras, lugares de interés, ocupaciones, etc.). Puede realizar tareas simples y cotidianas que requieren un intercambio simple y directo de información. Sabe describir en términos sencillos aspectos de su pasado y su entorno."*

La palabra clave que distingue A2 de A1: **el pasado y el futuro**. A1 vive casi enteramente en presente (to be, presente simple, there is/are). A2 es el nivel donde el estudiante empieza a narrar — contar qué hizo, qué va a hacer, comparar cosas, dar consejos y opinar con más matiz.

---

## 2. Hallazgo importante: fugas de gramática A2 ya presentes en A1

Antes de diseñar A2, hay que señalar algo que la auditoría original de A1 no capturó porque llegó después: **dos estructuras gramaticales de A2 ya aparecen como texto de ejemplo o respuesta correcta en contenido A1, sin haber sido enseñadas nunca**:

| Estructura | Dónde aparece | Ejemplo literal |
|---|---|---|
| Pasado de to be (`was`) | `005_a1_reseed.sql`, en ejercicios de traducción y diálogos de restaurante | `"The food was delicious."`, `"My birthday was last week."` |
| Comparativos (`bigger`, `biggest`) | `005_a1_reseed.sql`, en un ejercicio de traducción sobre ciudades y en descripción de un apartamento | `"The biggest cities..."`, `"It's much bigger than Carlos's."` |

Estas son fugas menores (2-3 ocurrencias, no una lección completa mal ubicada), pero es exactamente la misma violación de "no testear lo que no se ha enseñado" que ya corregimos una vez. **Recomendación:** cuando se construya A2, las lecciones de "Pasado de To Be" y "Comparativos" deben ser de las primeras — así, retroactivamente, esas oraciones sueltas en A1 dejan de ser prematuras (el estudiante que ya pasó a A2 las habrá visto formalmente).

También confirmé que el vocabulario del clima (`sunny`, `cloudy`, `rainy`, `windy`, `hot`, `cold`, `warm`, `foggy`) **ya existe como tabla de vocabulario** dentro de la lección "Fechas y el Tiempo" de A1 — pero nunca se practica en un módulo dedicado (no hay ejercicios sobre pronósticos, actividades según el clima, o el pasado del clima: "it was raining"). A2 puede profundizar este tema sin duplicar: la vocabulario base ya está sembrado, pero no ha sido explotado en más contexto.

---

## 3. Gramática que introduce A2 (y que A1 NO cubre)

Verificado contra el contenido real — ninguna de estas estructuras tiene una lección dedicada en A1:

| Estructura | Por qué es A2 y no A1 |
|---|---|
| **Presente Continuo** (`I am watching TV`) | Requiere distinguir acción-en-progreso vs. hábito (presente simple) — un contraste que A1 nunca introduce porque solo enseña presente simple. |
| **Pasado Simple — verbos regulares** (`-ed`) | Narrar el pasado es la frontera clásica A1→A2. |
| **Pasado Simple — verbos irregulares** (top 30: went, had, saw, did...) | Mismo motivo; requiere lista propia porque no siguen regla fonética. |
| **Pasado de To Be** (`was/were`) | Ya "fugado" en A1 (ver sección 2) — debe enseñarse formalmente ahora. |
| **Comparativos y superlativos** (`-er/-est`, `more/most`, `as...as`) | Ya "fugado" en A1 (ver sección 2). |
| **Cuantificadores** (`some/any/much/many/a lot of/a few/a little`) | A1 usa "some" de forma suelta en frases de cortesía (`"Would you like some tea?"`) pero nunca como punto gramatical con su propia regla (contable vs. incontable + afirmativo/negativo/pregunta). |
| **Futuro con "going to" y "will"** | A1 no tiene ningún tiempo futuro. |
| **Modales de obligación/consejo: have to, must, should** | A1 solo enseña `can` (habilidad/petición cortés). `"have to"` aparece una vez como frase fija de despedida (`"I have to go now"`), sin enseñarse como estructura. |
| **Preposiciones de lugar y movimiento** (`in/on/under/next to`, `to/from/into`) | A1 no tiene ninguna lección de preposiciones — vacío total. |
| **Adverbios de frecuencia** (`always/usually/often/sometimes/rarely/never`) | No existen en A1. |
| **Genitivo sajón** (`John's book`) | No existe en A1. |
| **Conectores básicos** (`because, so, but, although`) | A1 usa oraciones simples sin conectar; A2 empieza a unir ideas. |

**Lo que NO hay que repetir** (ya cubierto sólidamente en A1, no tocar de nuevo salvo para reforzar en contexto nuevo): to be en todas sus formas, presente simple completo (afirmativo/negativo/interrogativo con do/does), there is/there are, pronombres (sujeto/objeto/posesivos), artículos (a/an/the/cero), plurales, palabras interrogativas, imperativos, `can` de habilidad y petición.

---

## 4. Vocabulario y temas de A2

Cruzando el plan maestro original (Unidad 2: A2 — Elemental) con los temas estándar de currículos A2 (British Council Core Inventory):

| Tema | Ya sembrado en A1? | Qué agrega A2 |
|---|---|---|
| Rutinas diarias | No | Vocabulario de rutina (get up, go to work, have breakfast) + adverbios de frecuencia |
| Casa y muebles | No | Habitaciones, muebles, preposiciones de lugar |
| Compras y ropa | Parcial (números/precios en A1) | Prendas de vestir, tallas, frases de compra, cuantificadores |
| Transporte y direcciones | No | Medios de transporte, pedir/dar direcciones, preposiciones de movimiento |
| El clima | Vocabulario básico sembrado, sin práctica | Pronósticos, actividades según clima, clima en pasado |
| Trabajos y profesiones | Básico (`to be` + profesión) | Describir un día de trabajo, responsabilidades |
| Tiempo libre y pasatiempos | No | Deportes, hobbies, gustos con más matiz |
| Viajes y turismo | No | Reservar hotel, itinerarios, lugares de interés |
| Salud (ampliada) | Básico (partes del cuerpo, síntomas presentes) | Síntomas en pasado, consejos con should |
| Describir personalidad | Solo físico (A1) | Adjetivos de carácter (friendly, shy, funny, generous) |

---

## 5. Cobertura de las cuatro destrezas en A2 (según descriptores oficiales)

| Destreza | Qué exige CEFR A2 | Factible con el motor actual |
|---|---|---|
| Listening | Entender diálogos cortos, conversaciones telefónicas simples | Sí — mismo componente `Listening`/`Dictation` ya construido, solo necesita diálogos más largos |
| Speaking | Intercambios simples y rutinarios (no solo producción aislada) | Parcial — `DialogueFill` ya permite practicar intercambios; `Speaking` sigue siendo lectura en voz alta, no conversación real |
| Reading | Leer textos cortos y predecibles: carteles, horarios, postales simples | Sin cambios de motor — se puede hacer con `multiple_choice`/`fill_blank` sobre un texto corto en el `prompt` |
| Writing | Escribir notas simples, una carta personal muy básica, rellenar formularios | **Hueco real**: no existe ningún ejercicio de composición libre (todo lo actual es completar/traducir/elegir, nunca "escribe 3 oraciones sobre..."). No es necesario resolverlo para A2 mínimo viable, pero es una limitación que persiste del diseño de A1 y vale la pena anotar para el futuro. |

---

## 6. Propuesta de módulos para A2

Manteniendo la escala de A1 (12 módulos temáticos + listening + speaking dedicados), en orden de dependencia gramatical (cada módulo solo usa gramática ya enseñada en A1 o en un módulo A2 anterior):

| # | Módulo | Punto gramatical central | Lecciones estimadas |
|---|---|---|---|
| 1 | Rutinas Diarias y Adverbios de Frecuencia | Adverbios de frecuencia + presente simple en contexto de rutina | 4 |
| 2 | Presente Continuo | Acción en progreso vs. hábito, futuro cercano con arreglos | 4 |
| 3 | Pasado de To Be y Comparativos | `was/were`, comparativos/superlativos (cierra las fugas de la sección 2) | 4 |
| 4 | Pasado Simple: Verbos Regulares | `-ed`, pronunciación de la terminación | 4 |
| 5 | Pasado Simple: Verbos Irregulares | Top 30 irregulares, negativo/interrogativo con `did` | 4 |
| 6 | La Casa y los Muebles | Preposiciones de lugar | 3 |
| 7 | Compras y Ropa | Cuantificadores (some/any/much/many) | 4 |
| 8 | El Clima y las Actividades | Profundiza vocabulario ya sembrado + pasado del clima | 3 |
| 9 | Transporte y Direcciones | Preposiciones de movimiento | 3 |
| 10 | Futuro: Going To y Will | Planes vs. decisiones espontáneas | 4 |
| 11 | Obligación y Consejo | `have to`, `must`, `should` | 4 |
| 12 | Describir Personalidad y Trabajo | Adjetivos de carácter, conectores básicos | 3 |
| 13 | Comprensión Auditiva A2 | Diálogos y llamadas telefónicas (repaso, sin gramática nueva) | 4-5 |
| 14 | Producción Oral A2 | Práctica hablada de toda la gramática A2 | 4-5 |

**Total estimado:** 14 módulos, ~52 lecciones, ~350-400 ejercicios — una escala comparable a A1 (15 módulos, 68 lecciones, 527 ejercicios). Igual que A1, se puede cerrar con un examen de fin de nivel A2 reutilizando el mecanismo de D.2 ya construido.

---

## 7. Consideraciones estructurales

- **Cero cambios de esquema.** Todo el motor (`units` → `modules` → `lessons` → `exercises`, mastery-gate, SRS, CMS) ya soporta múltiples niveles CEFR sin modificación — la tabla `units` ya tiene el `check` constraint permitiendo `A2` desde el primer día.
- **Una sola fila nueva en `units`**: `course_id` (mismo curso), `order_index = 2`, `cefr_level = 'A2'`.
- El examen de fin de A1 (D.2) ya asume que existirá una siguiente unidad para "desbloquear" — A2 es exactamente esa pieza faltante.
- Dado el tamaño (14 módulos), recomiendo construir en el mismo patrón usado para A1: unos pocos módulos por sesión de trabajo, no los 14 de una vez.
