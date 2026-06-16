"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Tables } from "@/types/database";
import { MultipleChoice } from "@/components/exercises/MultipleChoice";
import { Flashcard } from "@/components/exercises/Flashcard";
import { FillBlank } from "@/components/exercises/FillBlank";
import { Translation } from "@/components/exercises/Translation";
import { LessonComplete } from "@/components/lesson/LessonComplete";
import { Button } from "@/components/ui/Button";

type Exercise = Tables<"exercises">;

type Phase =
  | { name: "exercising" }
  | {
      name: "feedback";
      isCorrect: boolean;
      correctAnswer: string;
      explanation?: string;
      isFlashcard: boolean;
    }
  | { name: "completed"; score: number; xpEarned: number };

interface LessonPlayerProps {
  lessonId: string;
  lessonTitle: string;
  xpReward: number;
  exercises: Exercise[];
  courseSlug: string;
}

export function LessonPlayer({
  lessonId,
  lessonTitle,
  xpReward,
  exercises,
  courseSlug,
}: LessonPlayerProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>({ name: "exercising" });
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  const currentExercise = exercises[currentIndex];
  const progressPct = (currentIndex / exercises.length) * 100;

  const handleAnswer = useCallback(
    (answer: string, isCorrect: boolean) => {
      if (isCorrect) setCorrectCount((c) => c + 1);

      const explanationObj = currentExercise.explanation as Record<
        string,
        string
      > | null;
      const correctAnswerObj = currentExercise.correct_answer as {
        text: string;
      };

      setPhase({
        name: "feedback",
        isCorrect,
        correctAnswer: correctAnswerObj.text,
        explanation: explanationObj?.es,
        isFlashcard: currentExercise.exercise_type === "flashcard",
      });

      fetch("/api/progress/submit-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId: currentExercise.id,
          isCorrect,
        }),
      }).catch(() => {});
    },
    [currentExercise]
  );

  const handleNext = useCallback(async () => {
    const isLast = currentIndex >= exercises.length - 1;

    if (isLast) {
      setIsCompleting(true);
      const finalScore = Math.round((correctCount / exercises.length) * 100);
      let xpEarned = xpReward;

      try {
        const res = await fetch("/api/progress/complete-lesson", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lessonId, score: finalScore }),
        });
        if (res.ok) {
          const data = await res.json();
          xpEarned = data.xpEarned ?? xpReward;
        }
      } catch {}

      setPhase({ name: "completed", score: finalScore, xpEarned });
      setIsCompleting(false);
    } else {
      setCurrentIndex((i) => i + 1);
      setPhase({ name: "exercising" });
    }
  }, [currentIndex, exercises.length, correctCount, lessonId, xpReward]);

  if (phase.name === "completed") {
    return (
      <LessonComplete
        score={phase.score}
        xpEarned={phase.xpEarned}
        courseSlug={courseSlug}
      />
    );
  }

  const prompt = currentExercise.prompt as {
    text: string;
    subtext?: string;
  };
  const correctAnswer = currentExercise.correct_answer as {
    text: string;
    accepted?: string[];
    phonetic?: string;
    note?: string;
  };
  const distractors = currentExercise.distractors as string[] | null;
  const isDisabled = phase.name === "feedback";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Progress bar */}
      <div className="h-[3px] bg-[#E9ECEF]">
        <div
          className="h-full bg-[#3730A3] transition-all duration-300 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => router.back()}
          className="text-[14px] text-[#AAAAAA] hover:text-[#555555] transition-colors"
        >
          ← Salir
        </button>
        <span className="text-[13px] text-[#AAAAAA]">
          {currentIndex + 1} / {exercises.length}
        </span>
      </div>

      {/* Exercise */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <div className="w-full max-w-lg">
          {currentExercise.exercise_type === "multiple_choice" && (
            <MultipleChoice
              key={currentIndex}
              prompt={prompt.text}
              correctAnswer={correctAnswer.text}
              distractors={distractors ?? []}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}

          {currentExercise.exercise_type === "flashcard" && (
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

          {currentExercise.exercise_type === "fill_blank" && (
            <FillBlank
              key={currentIndex}
              sentence={prompt.text}
              accepted={correctAnswer.accepted ?? [correctAnswer.text]}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}

          {currentExercise.exercise_type === "translation" && (
            <Translation
              key={currentIndex}
              prompt={prompt.text}
              accepted={correctAnswer.accepted ?? [correctAnswer.text]}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}

          {!["multiple_choice", "flashcard", "fill_blank", "translation"].includes(
            currentExercise.exercise_type
          ) && (
            <div className="text-center">
              <p className="text-[15px] text-[#555555] mb-6">
                Este tipo de ejercicio aún no está disponible.
              </p>
              <Button onClick={() => handleAnswer("", false)}>Continuar</Button>
            </div>
          )}
        </div>
      </div>

      {/* Feedback panel */}
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
            <Button
              onClick={handleNext}
              loading={isCompleting}
              className="w-full"
              size="lg"
            >
              Continuar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
