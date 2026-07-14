"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { MultipleChoice } from "@/components/exercises/MultipleChoice";
import { Flashcard } from "@/components/exercises/Flashcard";
import { FillBlank } from "@/components/exercises/FillBlank";
import { Translation } from "@/components/exercises/Translation";
import { ReverseTranslation } from "@/components/exercises/ReverseTranslation";
import { WordMatch } from "@/components/exercises/WordMatch";
import { ReorderWords } from "@/components/exercises/ReorderWords";
import { WordBankFill } from "@/components/exercises/WordBankFill";
import { ErrorCorrection } from "@/components/exercises/ErrorCorrection";
import { DialogueFill } from "@/components/exercises/DialogueFill";
import { Listening } from "@/components/exercises/Listening";
import { Dictation } from "@/components/exercises/Dictation";
import { MinimalPairs } from "@/components/exercises/MinimalPairs";
import { Speaking } from "@/components/exercises/Speaking";

interface ExercisePreviewProps {
  exerciseType: string;
  prompt: Record<string, unknown> | null;
  correctAnswer: Record<string, unknown> | null;
  distractors: unknown;
  previewKey: string;
}

export function ExercisePreview({
  exerciseType,
  prompt,
  correctAnswer,
  distractors,
  previewKey,
}: ExercisePreviewProps) {
  const [result, setResult] = useState<boolean | null>(null);

  if (!prompt || !correctAnswer) {
    return (
      <p className="text-[13px] text-[#999999] py-8 text-center">
        Corrige el JSON de prompt/correct_answer para ver la vista previa.
      </p>
    );
  }

  const p = prompt as { text?: string; subtext?: string; audio_text?: string; error_word?: string; lines?: { speaker: string; text: string }[] };
  const c = correctAnswer as { text?: string; accepted?: string[]; phonetic?: string; note?: string; pairs?: { en: string; es: string }[]; answers?: string[] };
  const d = Array.isArray(distractors) ? (distractors as string[]) : null;

  function handleAnswer(_answer: string, isCorrect: boolean) {
    setResult(isCorrect);
  }

  let content: React.ReactNode = (
    <p className="text-[13px] text-[#DC2626] py-8 text-center">
      Tipo de ejercicio no reconocido.
    </p>
  );

  const key = previewKey;

  switch (exerciseType) {
    case "multiple_choice":
      content = (
        <MultipleChoice key={key} prompt={p.text ?? ""} correctAnswer={c.text ?? ""} distractors={d ?? []} onAnswer={handleAnswer} />
      );
      break;
    case "flashcard":
      content = (
        <Flashcard key={key} word={p.text ?? ""} subtext={p.subtext} translation={c.text ?? ""} phonetic={c.phonetic} note={c.note} onAnswer={handleAnswer} />
      );
      break;
    case "fill_blank":
      content = (
        <FillBlank key={key} sentence={p.text ?? ""} accepted={c.accepted ?? [c.text ?? ""]} onAnswer={handleAnswer} />
      );
      break;
    case "translation":
      content = (
        <Translation key={key} prompt={p.text ?? ""} accepted={c.accepted ?? [c.text ?? ""]} onAnswer={handleAnswer} />
      );
      break;
    case "reverse_translation":
      content = (
        <ReverseTranslation key={key} prompt={p.text ?? ""} accepted={c.accepted ?? [c.text ?? ""]} onAnswer={handleAnswer} />
      );
      break;
    case "word_match":
      content = (
        <WordMatch key={key} prompt={p.text ?? ""} pairs={c.pairs ?? []} onAnswer={handleAnswer} />
      );
      break;
    case "reorder_words":
      content = (
        <ReorderWords key={key} prompt={p.text ?? ""} correctAnswer={c.text ?? ""} onAnswer={handleAnswer} />
      );
      break;
    case "word_bank_fill":
      content = (
        <WordBankFill key={key} prompt={p.text ?? ""} answers={c.answers ?? []} distractors={d ?? []} onAnswer={handleAnswer} />
      );
      break;
    case "error_correction":
      content = (
        <ErrorCorrection key={key} sentence={p.text ?? ""} errorWord={p.error_word ?? ""} correctWord={c.text ?? ""} distractors={d ?? []} onAnswer={handleAnswer} />
      );
      break;
    case "dialogue_fill":
      content = (
        <DialogueFill key={key} lines={p.lines ?? []} correctAnswer={c.text ?? ""} distractors={d ?? []} onAnswer={handleAnswer} />
      );
      break;
    case "listening":
      content = (
        <Listening key={key} instruction={p.text ?? ""} audioText={p.audio_text ?? ""} correctAnswer={c.text ?? ""} distractors={d} accepted={c.accepted} onAnswer={handleAnswer} />
      );
      break;
    case "dictation":
      content = (
        <Dictation key={key} instruction={p.text ?? ""} audioText={p.audio_text ?? c.text ?? ""} accepted={c.accepted ?? [c.text ?? ""]} onAnswer={handleAnswer} />
      );
      break;
    case "minimal_pairs":
      content = (
        <MinimalPairs key={key} instruction={p.text ?? ""} audioText={p.audio_text ?? c.text ?? ""} correctAnswer={c.text ?? ""} distractor={d?.[0] ?? ""} onAnswer={handleAnswer} />
      );
      break;
    case "speaking":
      content = (
        <Speaking key={key} instruction={p.text ?? ""} targetText={c.text ?? ""} accepted={c.accepted} onAnswer={handleAnswer} />
      );
      break;
  }

  return (
    <div>
      <div className="bg-white border border-[#E5E5E5] rounded-[6px] p-6">{content}</div>
      {result !== null && (
        <div
          className={`mt-3 flex items-center gap-2 text-[13px] font-medium px-3 py-2 rounded-[4px] ${
            result ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-[#FEF2F2] text-[#DC2626]"
          }`}
        >
          {result ? <Check className="w-4 h-4" strokeWidth={2.5} /> : <X className="w-4 h-4" strokeWidth={2.5} />}
          Vista previa: {result ? "respuesta marcada como correcta" : "respuesta marcada como incorrecta"}
        </div>
      )}
    </div>
  );
}
