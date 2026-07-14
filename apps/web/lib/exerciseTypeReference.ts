export interface ExerciseTypeSpec {
  label: string;
  description: string;
  promptExample: string;
  correctAnswerExample: string;
  distractorsExample: string;
  needsDistractors: boolean;
}

export const EXERCISE_TYPE_REFERENCE: Record<string, ExerciseTypeSpec> = {
  multiple_choice: {
    label: "Opción múltiple",
    description: "Pregunta + 1 respuesta correcta + 3 distractores.",
    promptExample: `{"text": "¿Cómo se dice 'gato' en inglés?"}`,
    correctAnswerExample: `{"text": "cat"}`,
    distractorsExample: `["dog", "bird", "fish"]`,
    needsDistractors: true,
  },
  flashcard: {
    label: "Flashcard",
    description: "Palabra en inglés, se voltea para revelar la traducción.",
    promptExample: `{"text": "cat", "subtext": "animal"}`,
    correctAnswerExample: `{"text": "gato", "phonetic": "/kæt/"}`,
    distractorsExample: `null`,
    needsDistractors: false,
  },
  fill_blank: {
    label: "Completar espacio",
    description: "Oración con ___ y un input de texto libre.",
    promptExample: `{"text": "I have a ___. (gato)"}`,
    correctAnswerExample: `{"text": "cat", "accepted": ["cat"]}`,
    distractorsExample: `null`,
    needsDistractors: false,
  },
  translation: {
    label: "Traducción (ES→EN)",
    description: "Oración en español, se traduce al inglés libremente.",
    promptExample: `{"text": "Tengo un gato."}`,
    correctAnswerExample: `{"text": "I have a cat.", "accepted": ["I have a cat."]}`,
    distractorsExample: `null`,
    needsDistractors: false,
  },
  reverse_translation: {
    label: "Traducción inversa (EN→ES)",
    description: "Oración en inglés, se traduce al español libremente.",
    promptExample: `{"text": "I have a cat."}`,
    correctAnswerExample: `{"accepted": ["Tengo un gato."]}`,
    distractorsExample: `null`,
    needsDistractors: false,
  },
  word_match: {
    label: "Emparejar palabras",
    description: "4-6 pares inglés/español para unir.",
    promptExample: `{"text": "Une cada palabra con su traducción."}`,
    correctAnswerExample: `{"pairs": [{"en": "cat", "es": "gato"}, {"en": "dog", "es": "perro"}, {"en": "bird", "es": "pájaro"}, {"en": "fish", "es": "pez"}]}`,
    distractorsExample: `null`,
    needsDistractors: false,
  },
  reorder_words: {
    label: "Ordenar palabras",
    description: "Banco de palabras revuelto, arma la oración en orden.",
    promptExample: `{"text": "Ordena la oración: I / have / a / cat"}`,
    correctAnswerExample: `{"text": "I have a cat"}`,
    distractorsExample: `null`,
    needsDistractors: false,
  },
  word_bank_fill: {
    label: "Banco de palabras (huecos)",
    description: "1+ espacios ___ en la oración, se llenan con fichas clicables (correctas + distractores).",
    promptExample: `{"text": "She ___ a doctor."}`,
    correctAnswerExample: `{"answers": ["is"]}`,
    distractorsExample: `["are", "am"]`,
    needsDistractors: true,
  },
  error_correction: {
    label: "Encuentra el error",
    description: "Oración con una palabra marcada como incorrecta; elige su forma correcta.",
    promptExample: `{"text": "She go to school every day.", "error_word": "go"}`,
    correctAnswerExample: `{"text": "goes"}`,
    distractorsExample: `["going", "gone"]`,
    needsDistractors: true,
  },
  dialogue_fill: {
    label: "Diálogo (completar línea)",
    description: "3 líneas de conversación (speaker A/B), la línea del medio es '___'.",
    promptExample: `{"lines": [{"speaker": "A", "text": "Hi! What's your name?"}, {"speaker": "B", "text": "___"}, {"speaker": "A", "text": "Nice to meet you!"}]}`,
    correctAnswerExample: `{"text": "My name is Ana."}`,
    distractorsExample: `["I am fine, thanks.", "It's Monday.", "I like pizza."]`,
    needsDistractors: true,
  },
  listening: {
    label: "Escucha (con o sin opciones)",
    description: "TTS reproduce audio_text. Con distractores = multiple choice; sin ellos = respuesta libre.",
    promptExample: `{"text": "Escucha y elige lo correcto.", "audio_text": "Good morning"}`,
    correctAnswerExample: `{"text": "Buenos días", "accepted": ["Buenos días"]}`,
    distractorsExample: `["Buenas noches", "Buenas tardes", "Adiós"]`,
    needsDistractors: false,
  },
  dictation: {
    label: "Dictado",
    description: "TTS reproduce audio_text, se escribe exactamente lo que se oyó (sin opciones).",
    promptExample: `{"text": "Escucha y escribe la frase.", "audio_text": "My name is Ana."}`,
    correctAnswerExample: `{"accepted": ["My name is Ana.", "My name is Ana"]}`,
    distractorsExample: `null`,
    needsDistractors: false,
  },
  minimal_pairs: {
    label: "Pares mínimos",
    description: "TTS reproduce audio_text (una de dos palabras parecidas); elige cuál se oyó.",
    promptExample: `{"text": "Escucha y elige la palabra que oíste.", "audio_text": "ship"}`,
    correctAnswerExample: `{"text": "ship"}`,
    distractorsExample: `["sheep"]`,
    needsDistractors: true,
  },
  speaking: {
    label: "Habla",
    description: "Se muestra targetText, el navegador reconoce la voz y la compara.",
    promptExample: `{"text": "Di la frase en voz alta."}`,
    correctAnswerExample: `{"text": "My name is Ana.", "accepted": ["My name is Ana."]}`,
    distractorsExample: `null`,
    needsDistractors: false,
  },
};

export const EXERCISE_TYPES = Object.keys(EXERCISE_TYPE_REFERENCE);
