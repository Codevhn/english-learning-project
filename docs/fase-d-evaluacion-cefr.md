# Plan de Acción — Fase D: Evaluación tipo CEFR

**Fecha:** 2026-07-13
**Estado — D.1 (can-do statements): RESUELTA.** `migrations/011_can_do_statements.sql` + `seed/019_can_do_statements.sql`. Nueva sección en `/profile` con afirmaciones "puedo hacer" agrupadas por nivel CEFR, más el campo correspondiente en el CMS (`ModuleForm`).
**Estado — D.2 (examen de fin de nivel): RESUELTA.** `migrations/012_level_exam.sql` + `seed/020_level_exam_achievement.sql` + `seed/021_a1_level_exam.sql`. Examen de A1 con banco de 30 ejercicios (muestra aleatoria de 24 por intento), umbral de aprobación 85%, desglose de fallos por `tags`, logro "A1 Certificado", y entrada bloqueada/desbloqueada en la página del curso.
**Estado — D.3 (prueba de ubicación): sigue bloqueada** — como se señaló abajo, no tiene mucho valor real hasta que exista contenido A2/B1.
**Contexto:** el sistema actual mide progreso solo a nivel de lección individual (mastery-gate: ≥80% para desbloquear la siguiente). Esta fase agrega tres capacidades que el mastery-gate por sí solo no puede dar: ubicar a un usuario nuevo en el nivel correcto, certificar que realmente domina un nivel CEFR completo (no solo lección por lección), y comunicar el progreso en el lenguaje "puedo hacer" que usan las certificaciones reales de idiomas.

---

## Objetivo de la fase

Tres entregables, ordenados por prioridad de construcción (no por importancia — el orden abajo minimiza dependencias y maximiza valor entregable antes de tener contenido A2/B1):

1. **D.1 — Reporte de progreso en "Puedo hacer" (can-do statements)**
2. **D.2 — Examen de fin de nivel** (certifica dominio real de un nivel CEFR completo)
3. **D.3 — Prueba de ubicación** (placement test, al registrarse)

---

## D.1 — Reporte de progreso en "Puedo hacer"

**Qué resuelve:** ahora mismo el progreso se comunica como "62% de A1 completado" — un número abstracto. El marco CEFR real se comunica en afirmaciones de capacidad ("Can-Do Statements"), que es lo que entienden empleadores, otras plataformas y el propio usuario para autoevaluarse fuera de Parlo.

**Por qué va primero:** no requiere cambios de esquema ni nueva UI compleja — es principalmente contenido (redactar las afirmaciones) más una vista de solo lectura. Es el entregable de menor esfuerzo y mayor visibilidad inmediata.

### Pasos

1. **Redactar 2-4 afirmaciones "puedo..." por módulo**, ancladas a lo que ese módulo específico enseña (ej. Módulo "Verbo To Be" → *"Puedo presentarme y decir de dónde soy"*, *"Puedo describir cómo es alguien o algo usando is/are"*). Se guardan como contenido nuevo, no requieren tabla nueva — se puede agregar un campo `can_do_statements: jsonb` a `modules` (array de strings en `es`/`en`), poblado vía el CMS ya existente (agregar el campo al `ModuleForm`).
2. **Migración**: `alter table modules add column can_do_statements jsonb default '[]';`
3. **UI**: nueva sección en `/profile` (o una pestaña nueva) que lista, agrupado por nivel CEFR, las afirmaciones desbloqueadas (módulo con `mastered = true`) vs. las que faltan (atenuadas/bloqueadas, mismo lenguaje visual que ya usamos en Rutas de Enfoque).
4. **CMS**: agregar el campo `can_do_statements` (textarea, una línea por afirmación) al formulario de módulo.

**Esfuerzo estimado:** bajo. Sin dependencias de otras fases.

---

## D.2 — Examen de fin de nivel

**Qué resuelve:** el mastery-gate certifica lección por lección, pero nunca evalúa si el usuario retiene y combina TODO lo del nivel a la vez. Alguien puede haber dominado cada lección por separado y aun así no ser capaz de usar los conceptos mezclados en una conversación real. Un examen de fin de nivel es la validación real de "esto se puede llamar A1 completo".

**Por qué va segundo:** a diferencia de la prueba de ubicación, un examen de fin de A1 **no necesita que exista contenido de A2/B1** — funciona enteramente dentro de lo que ya está construido. Se puede construir y tener valor real hoy mismo.

### Diseño

- **Naturaleza del examen:** una "lección" especial que no pertenece a ningún módulo — pertenece a la unidad (nivel CEFR) completa. Requiere haber dominado el 100% de los módulos del nivel para desbloquearse (a diferencia de Rutas de Enfoque, aquí sí debe ser una puerta dura).
- **Contenido:** 30-40 ejercicios que MEZCLAN los distintos tipos ya construidos (multiple_choice, fill_blank, listening, dialogue_fill, error_correction, etc.), tomados de temas repartidos por TODO el nivel, no solo del último módulo. Las preguntas deben ser nuevas (no las mismas ya vistas en las lecciones), para medir retención real y no memorización.
- **Etiquetado por destreza:** la tabla `exercises` ya tiene una columna `tags: string[]` que hoy no se usa en ningún lado del código. Se reutiliza para marcar cada ítem del examen con su área (`"grammar:present_simple"`, `"vocab:family"`, `"listening"`, etc.) — esto habilita el reporte de "en qué fallaste" sin tocar el esquema.
- **Umbral de aprobación:** más alto que el mastery-gate normal (propuesta: 85%, configurable como constante en `lib/mastery.ts` junto a `MASTERY_THRESHOLD`).
- **Resultado:**
  - Aprueba → logro/insignia distintivo ("A1 Certificado", visualmente distinto de un logro normal) + desbloquea la siguiente unidad CEFR.
  - Reprueba → pantalla de resultados que agrupa los fallos por el `tag` de cada ejercicito fallado (ej. "Repasa: presente simple negativo, there is/are") en vez de solo mostrar un porcentaje. Debe poder reintentarse, pero con un pool de preguntas más grande que la cantidad mostrada por intento (para que reintentar no sea solo repetir las mismas).

### Pasos técnicos

1. **Esquema:** agregar `is_level_exam boolean default false` a `lessons` (o un `lesson_type` nuevo, ej. `'level_exam'`, que ya está soportado como texto libre en el `check` constraint — más simple, sin migración de esquema).
2. **Lógica de desbloqueo:** nueva verificación en la página de unidad — el examen aparece (bloqueado) cuando existe, y se desbloquea solo si TODOS los módulos de esa unidad tienen `mastered = true` para el usuario.
3. **Contenido:** escribir el banco de 30-40 ejercicios para el examen de fin de A1, con `tags` poblados. Esto ya es completamente viable con el CMS (el editor de ejercicios ya soporta cualquier tipo y JSON de prompt/correct_answer/distractors — solo falta exponer el campo `tags` en el `ExerciseForm`, que hoy no está en el formulario).
4. **CMS:** agregar campo `tags` (input de texto separado por comas) al `ExerciseForm`.
5. **UI de resultados:** nueva pantalla de resultados de examen (variante de `LessonComplete`) que agrupa fallos por tag y ofrece reintento.
6. **Lógica de reintento con pool grande:** si el examen tiene, digamos, 60 ejercicios en el banco pero cada intento muestra 30 elegidos al azar, un reintento no repite exactamente lo mismo.

**Esfuerzo estimado:** medio-alto. Depende de D.1 solo en el sentido de que comparten la idea de "certificación visible", pero no hay dependencia técnica dura.

---

## D.3 — Prueba de ubicación (placement test)

**Qué resuelve:** hoy todo usuario nuevo empieza forzosamente en Módulo 1, Lección 1 de A1, sin importar si ya sabe inglés básico. Una prueba de ubicación lo evalúa al registrarse y lo coloca en el punto correcto.

**Por qué va tercero:** su valor real depende de que exista más de un nivel CEFR con contenido — hoy solo A1 está construido, así que una prueba de ubicación completa (decidir entre A1/A2/B1) todavía no tiene mucho donde "ubicar" a nadie. Construirla ahora tendría valor limitado: como mucho, podría decidir "empieza en el Módulo 3 de A1 en vez del Módulo 1" para alguien con conocimientos parciales. Recomendación: **posponer la versión completa hasta que exista contenido A2**, y como mucho considerar una versión reducida ("¿ya sabes lo básico de A1? sáltate al módulo X") si se quiere algo utilizable antes.

### Diseño (para cuando se construya)

- Pantalla en el flujo de onboarding, antes de entrar al dashboard por primera vez, con opción de "Omitir y empezar desde cero" (nunca debe ser obligatoria — un usuario que quiere repasar desde el inicio debe poder hacerlo).
- 15-25 preguntas de dificultad creciente (mezclando niveles), con lógica simple de corte por rangos de aciertos (no hace falta adaptativo real tipo CAT/IRT para la primera versión — un test de longitud fija con bandas de puntaje es suficiente y mucho más simple de construir).
- Al terminar: marca como `completed`+`score` sintético las lecciones/módulos anteriores al punto de ubicación (para que el mastery-gate no bloquee el avance), y redirige al punto detectado.
- Requiere banco de preguntas representativas de cada nivel — por lo tanto depende de que A2 (y eventualmente B1) tengan al menos una muestra de contenido etiquetado por nivel.

**Esfuerzo estimado:** medio, pero bloqueado en la práctica por la falta de contenido A2/B1.

---

## Orden de construcción recomendado

| Orden | Entregable | Depende de | Se puede construir hoy |
|---|---|---|---|
| 1 | D.1 Can-do statements | Nada | Sí |
| 2 | D.2 Examen de fin de A1 | Nada (usa solo contenido A1 existente) | Sí |
| 3 | D.3 Prueba de ubicación | Contenido A2/B1 real | No — esperar a tener A2 |

## Piezas de infraestructura que esta fase reutiliza sin cambios

- Motor de ejercicios completo (los 14 tipos ya construidos)
- CMS (`/admin`) para autoría de contenido de examen — solo necesita 2 campos nuevos en los formularios (`tags` en ejercicios, `can_do_statements` en módulos)
- `lib/mastery.ts` como lugar natural para el nuevo umbral de aprobación de examen
- Columna `exercises.tags` — existe desde el esquema original, nunca usada hasta ahora
