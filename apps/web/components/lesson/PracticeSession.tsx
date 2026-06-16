"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Tables } from "@/types/database";
import { MultipleChoice } from "@/components/exercises/MultipleChoice";
import { Flashcard } from "@/components/exercises/Flashcard";
import { FillBlank } from "@/components/exercises/FillBlank";
import { Translation } from "@/components/exercises/Translation";
import { Button } from "@/components/ui/Button";

export type PracticeItem = {
  historyId: string;
  exercise: Tables<"exercises">;
};

type Phase =
  | { name: "exercising" }
  | {
      name: "feedback";
      isCorrect: boolean;
      correctAnswer: string;
      explanation?: string;
      isFlashcard: boolean;
    }
  | { name: "completed"; correctCount: number; total: number };

interface PracticeSessionProps {
  items: PracticeItem[];
}

export function PracticeSession({ items }: PracticeSessionProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>({ name: "exercising" });
  const [correctCount, setCorrectCount] = useState(0);

  const currentItem = items[currentIndex];
  const exercise = currentItem.exercise;
  const progressPct = (currentIndex / items.length) * 100;

  const handleAnswer = useCallback(
    (answer: string, isCorrect: boolean) => {
      if (isCorrect) setCorrectCount((c) => c + 1);

      const explanationObj = exercise.explanation as Record<
        string,
        string
      > | null;
      const correctAnswerObj = exercise.correct_answer as { text: string };

      setPhase({
        name: "feedback",
        isCorrect,
        correctAnswer: correctAnswerObj.text,
        explanation: explanationObj?.es,
        isFlashcard: exercise.exercise_type === "flashcard",
      });

      fetch("/api/progress/update-srs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          historyId: currentItem.historyId,
          isCorrect,
        }),
      }).catch(() => {});
    },
    [exercise, currentItem.historyId]
  );

  const handleNext = useCallback(() => {
    const isLast = currentIndex >= items.length - 1;
    if (isLast) {
      setPhase({
        name: "completed",
        correctCount,
        total: items.length,
      });
    } else {
      setCurrentIndex((i) => i + 1);
      setPhase({ name: "exercising" });
    }
  }, [currentIndex, items.length, correctCount]);

  if (phase.name === "completed") {
    const score = Math.round((phase.correctCount / phase.total) * 100);
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center max-w-sm w-full">
          <div className="w-16 h-16 rounded-full bg-[#EFF6FF] flex items-center justify-center mx-auto mb-6">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1D4ED8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-[26px] font-semibold text-[#111111] mb-2">
            Repaso completado
          </h1>
          <p className="text-[15px] text-[#555555] mb-8">
            Has repasado {phase.total} ejercicio
            {phase.total === 1 ? "" : "s"} pendientes.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#F8F9FA] rounded-[6px] p-4 text-center">
              <p className="text-[12px] text-[#999999] mb-1">Precisión</p>
              <p className="text-[26px] font-semibold text-[#111111]">
                {score}%
              </p>
            </div>
            <div className="bg-[#F8F9FA] rounded-[6px] p-4 text-center">
              <p className="text-[12px] text-[#999999] mb-1">Correctos</p>
              <p className="text-[26px] font-semibold text-[#111111]">
                {phase.correctCount}/{phase.total}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={() => router.push("/dashboard")} className="w-full" size="lg">
              Ir al dashboard
            </Button>
            <Button
              onClick={() => router.push("/courses")}
              variant="secondary"
              className="w-full"
              size="lg"
            >
              Ver cursos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const prompt = exercise.prompt as { text: string; subtext?: string };
  const correctAnswer = exercise.correct_answer as {
    text: string;
    accepted?: string[];
    phonetic?: string;
    note?: string;
  };
  const distractors = exercise.distractors as string[] | null;
  const isDisabled = phase.name === "feedback";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-[3px] bg-[#E9ECEF]">
        <div
          className="h-full bg-[#1D4ED8] transition-all duration-300 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => router.push("/practice")}
          className="text-[14px] text-[#AAAAAA] hover:text-[#555555] transition-colors"
        >
          ← Salir
        </button>
        <span className="text-[13px] text-[#AAAAAA]">
          {currentIndex + 1} / {items.length}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <div className="w-full max-w-lg">
          {exercise.exercise_type === "multiple_choice" && (
            <MultipleChoice
              key={currentIndex}
              prompt={prompt.text}
              correctAnswer={correctAnswer.text}
              distractors={distractors ?? []}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}
          {exercise.exercise_type === "flashcard" && (
            <Flashcard
              key={currentIndex}
              word={prompt.text}
              subtext={prompt.subtext}
              translation={correctAnswer.text}
              phonetic={correctAnswer.phonetic}
              note={correctAnswer.note}
              onAnswer={handleAnswer}
            />
          )}
          {exercise.exercise_type === "fill_blank" && (
            <FillBlank
              key={currentIndex}
              sentence={prompt.text}
              accepted={correctAnswer.accepted ?? [correctAnswer.text]}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}
          {exercise.exercise_type === "translation" && (
            <Translation
              key={currentIndex}
              prompt={prompt.text}
              accepted={correctAnswer.accepted ?? [correctAnswer.text]}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}
        </div>
      </div>

      {phase.name === "feedback" && (
        <div
          className={`border-t-[3px] ${
            phase.isCorrect ? "border-[#16A34A]" : "border-[#DC2626]"
          } bg-white px-6 py-5`}
        >
          <div className="max-w-lg mx-auto">
            <p
              className={`text-[15px] font-semibold mb-1 ${
                phase.isCorrect ? "text-[#16A34A]" : "text-[#DC2626]"
              }`}
            >
              {phase.isCorrect
                ? phase.isFlashcard
                  ? "¡Bien hecho!"
                  : "¡Correcto!"
                : phase.isFlashcard
                ? "Sigue practicando."
                : "Incorrecto"}
            </p>
            {!phase.isCorrect && !phase.isFlashcard && (
              <p className="text-[14px] text-[#555555] mb-1">
                Respuesta:{" "}
                <span className="font-medium text-[#111111]">
                  {phase.correctAnswer}
                </span>
              </p>
            )}
            {phase.explanation && (
              <p className="text-[13px] text-[#777777] mb-4">
                {phase.explanation}
              </p>
            )}
            <Button onClick={handleNext} className="w-full" size="lg">
              Continuar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
