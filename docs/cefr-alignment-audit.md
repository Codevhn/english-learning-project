# Auditoría de alineación CEFR — Nivel A1

**Fecha:** 2026-06-17
**Fuente auditada:** `packages/database/supabase/seed/005_a1_reseed.sql` (12 módulos, 55 lecciones, 442 ejercicios — recuento exacto, corrige el "~440" del comentario de cabecera del propio archivo)
**Método:** lectura completa del seed + comparación contra los inventarios de referencia CEFR A1 más usados en la industria (Cambridge English Grammar Profile, British Council/EAQUALS Core Inventory for General English, descriptores oficiales CEFR por destreza).

**Estado — Fase A (gramática faltante): RESUELTA.** `packages/database/supabase/seed/006_grammar_gap_fix.sql` reordena los módulos (Verbo To Be y Pronombres Personales se mueven antes, ya que el resto del currículo depende de ellos) y agrega el módulo 3 "Preguntas y Estructuras Básicas" con 5 lecciones dedicadas: Palabras Interrogativas, Presente Simple Afirmativo, Presente Simple Negativo e Interrogativo (do/does), There Is/There Are, e Imperativos y Can (habilidad). Esto cierra los 5 huecos gramaticales de la sección 3 de este documento. Validado ejecutando el esquema real + ambos seeds contra una instancia de Postgres limpia (13 módulos, 60 lecciones, 482 ejercicios, re-ejecución idempotente confirmada). **Pendiente:** Fase B (listening) y Fase C (speaking) — siguen en cero, ver sección 1.

---

## Veredicto

**El currículo actual NO está alineado al CEFR A1 de forma rigurosa.** Cubre razonablemente bien vocabulario y un subconjunto de gramática, pero falla en dos requisitos no negociables del marco: cobertura de las cuatro destrezas, y enseñanza explícita antes de evaluación. Ambos fallos son sistemáticos (afectan a los 12 módulos por igual), no aislados.

---

## 1. Matriz de cobertura por destreza

| Destreza CEFR | Estado | Evidencia |
|---|---|---|
| **Listening** (comprensión auditiva) | ❌ Ausente, 0% | 0 de 442 ejercicios son tipo `listening`. 0 referencias a `audio_url` en todo el archivo. No existe componente de UI para reproducir audio. |
| **Speaking** (producción/interacción oral) | ❌ Ausente, 0% | 0 de 442 ejercicios son tipo `speaking`. No existe reconocimiento de voz ni componente de UI para ese tipo. |
| **Reading** (comprensión lectora) | ⚠️ Parcial | Existe vía `fill_blank`/`multiple_choice` con textos cortos, pero son oraciones aisladas, no textos continuos (CEFR A1 espera leer "letreros, carteles, catálogos" — formatos breves pero reales, no solo frases sueltas de práctica gramatical). |
| **Writing** (producción escrita) | ⚠️ Parcial | Cubierto solo vía `translation` (traducir una oración ES→EN). CEFR A1 espera además poder "escribir una postal simple" o "rellenar formularios con datos personales" — no hay ningún ejercicio de ese formato. |

Distribución global de los 442 ejercicios: `multiple_choice` 143, `fill_blank` 106, `translation` 104, `flashcard` 87, `reorder_words` 1, `word_match` 1, **`listening` 0, `speaking` 0**.

---

## 2. Tabla módulo por módulo

| # | Módulo | Lecciones | Ejercicios (tipos) | Qué enseña bien | Gaps / violaciones encontradas |
|---|---|---|---|---|---|
| 1 | Alfabeto y Sonidos | 4 | 33 (flashcard 8, multiple_choice 11, fill_blank 11, translation 2, word_match 1) | Nombres de letras, pronunciación de vocales/consonantes difíciles para hispanohablantes | Ninguna instrucción de audio real para un módulo cuyo contenido (sonidos, pronunciación) es inherentemente auditivo — la ironía más visible del problema de listening. |
| 2 | Saludos y Presentaciones | 5 | 40 | Saludos formales/informales, despedidas, cortesía | Línea 164: usa `What's your name?`, `Where are you from?`, `How old are you?` como bloque de frases fijas — son preguntas WH- usadas productivamente sin que "palabras interrogativas" se enseñe nunca como punto gramatical propio. |
| 3 | Números y Matemáticas | 5 | 40 | Números 1–1,000,000, ordinales, precios | Líneas 346, 348, 356: `there are ___ days/minutes` se usa como respuesta esperada en `fill_blank`/`translation` — primera aparición de "there is/are" como estructura testeada, sin haberse enseñado. |
| 4 | Fechas y Tiempo | 5 | 40 | Días, meses, estaciones, hora, fechas | Sin gap gramatical nuevo relevante; vocabulario bien acotado a A1. |
| 5 | Colores y Adjetivos | 4 | 32 | Colores, tamaño/forma, adjetivos de calidad, describir personas | Ninguno nuevo. |
| 6 | La Familia | 4 | 32 | Miembros de familia, posesivos con familia | Línea 1150: `There are five of us` aparece como respuesta de `translation` — otra instancia de "there is/are" testeado sin lección propia. |
| 7 | Comida y Bebida | 5 | 40 | Vocabulario de comida, restaurante, gustos | Líneas 596, 603-604: `Can I have...?` / `Can we have the bill?` se enseñan como frases fijas de cortesía (aceptable como léxico funcional A1) — **pero** línea 612-616: la lección "Me Gusta / No Me Gusta" testea activamente `Do you like...?` / `Do` como respuesta de `fill_blank`, con explicación que dice literalmente "es el auxiliar para el presente simple" — un punto gramatical (Presente Simple interrogativo con do/does) que nunca tuvo lección dedicada en ningún punto anterior del currículo. |
| 8 | Cuerpo Humano | 4 | 32 | Partes del cuerpo, cara, síntomas, en el médico | Línea 654: pregunta `What seems to be the problem?` reutiliza WH- questions sin enseñanza explícita previa (ver módulo 2). |
| 9 | Verbo To Be | 6 | 49 (incluye el único `reorder_words` de todo el currículo) | Excelente: afirmativo, negativo, interrogativo, identidad, estados, contraste con español — el módulo mejor construido pedagógicamente de los 12. | Ninguno relevante — es el único módulo que sí enseña su estructura ANTES de testearla de forma consistente. |
| 10 | Artículos y Sustantivos | 5 | 40 | A/AN, THE, plurales, contables/incontables, artículo cero | Líneas 916, 920, 924, 940, 944: la lección de "Sustantivos Contables e Incontables" usa y testea `there is/there aren't/are there any` repetidamente como vehículo para enseñar `some/any/much/many` — es la lección que más usa "there is/are" de todo el currículo, y sigue sin presentarla nunca como estructura formal con su propio nombre y regla. |
| 11 | Pronombres Personales | 4 | 32 | Sujeto, objeto, posesivos adjetivos y pronombres | Línea 1050: `Do you have yours?` vuelve a testear el auxiliar `do` interrogativo (tercera aparición, ver módulo 7). |
| 12 | Lenguaje Funcional A1 | 4 | 32 | Frases de aula, pedir ayuda/aclaración (`Can you help me?`, `Could you...?` como léxico funcional — correctamente enseñado como chunks, no como gramática modal completa), expresar acuerdo/desacuerdo, repaso general | La lección de repaso (12.4) es un resumen de teoría + más ejercicios del mismo tipo, **no una evaluación real** que certifique objetivamente el nivel alcanzado contra los descriptores "can-do" del CEFR. Línea 1140: vuelve a testear "there are ___ children" en el repaso, consolidando una estructura que el estudiante nunca vio enseñada formalmente. |

---

## 3. Hallazgos transversales (afectan a varios módulos)

### 3.1 "There is / There are" — testeado en 4 módulos (3, 6, 10, 12), enseñado en 0
Es la violación más repetida del currículo. Aparece 26 veces en total entre ejemplos y ejercicios, incluyendo como respuesta correcta obligatoria en `fill_blank` y `translation`, pero nunca tiene una lección que explique la regla (cuándo usar *is* vs *are*, la forma negativa *there isn't/aren't*, la interrogativa *is there/are there*).

### 3.2 Presente Simple interrogativo (`do/does`) — testeado en 3 módulos (7, 10, 11), enseñado en 0
El currículo enseña el verbo **to be** de forma excelente y exhaustiva (módulo 9), pero nunca enseña el **Presente Simple con verbos regulares** ni su auxiliar `do/does` — pese a que `do/does` se usa activamente como respuesta correcta en al menos 3 ejercicios distintos, con una explicación que asume que el estudiante ya sabe qué es "el auxiliar del presente simple".

### 3.3 Palabras interrogativas (what/where/when/who/why/how) — usadas en casi todos los módulos, enseñadas en 0
72 apariciones de "what", 31 de "where", etc. Se usan productivamente desde el módulo 2 ("Saludos y Presentaciones") pero nunca se enseñan como categoría gramatical propia (formación de preguntas WH-).

### 3.4 Imperativos y "can" para habilidad — parcialmente cubiertos, pero de forma incompleta
"Can" para peticiones corteses (`Can I have...?`, `Can you help me?`) sí está correctamente enseñado como frase fija funcional en los módulos 7 y 12 — esto **sí** cumple el estándar CEFR A1 para lenguaje funcional. Pero "can" para expresar habilidad (`I can swim`, `She can't drive`), que es un punto gramatical A1 estándar y distinto, no se enseña en ningún módulo.

### 3.5 Sin mecanismo de certificación real
El "repaso general" final (lección 12.4) es contenido de teoría + ejercicios adicionales, no una evaluación con umbral de aprobación que valide los descriptores "can-do" oficiales antes de desbloquear A2.

---

## 4. Severidad y prioridad de corrección

| Prioridad | Hallazgo | Por qué es grave |
|---|---|---|
| 🔴 Crítica | Cero listening / cero speaking | Dos de las cuatro destrezas CEFR completamente ausentes. Ningún organismo certificador reconocería esto como A1 completo. |
| 🔴 Crítica | "There is/are" y "do/does" testeados sin enseñanza previa | Viola directamente la regla del proyecto de no evaluar lo no enseñado — afecta a 4+ módulos y a decenas de ejercicios. |
| 🟡 Moderada | WH- questions nunca formalizadas | Se usan bien pero de forma puramente memorística/lexical, no como regla transferible. |
| 🟡 Moderada | "Can" de habilidad ausente | Gap de contenido puntual, fácil de cerrar con 1 lección. |
| 🟢 Menor | Repaso final no es evaluación certificadora | Importante para rigor pero no bloquea el aprendizaje en sí. |

---

## 5. Próximos pasos (pendiente de tu autorización para ejecutar)

Este documento es solo diagnóstico — no se ha modificado ningún archivo de contenido ni código. Cuando quieras avanzar, el plan de remediación por fases (gramática faltante → listening real → speaking real → evaluación tipo CEFR) ya fue discutido y queda listo para iniciarse por la fase que elijas.
