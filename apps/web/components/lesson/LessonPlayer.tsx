"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Tables } from "@/types/database";
import { MultipleChoice } from "@/components/exercises/MultipleChoice";
import { Flashcard } from "@/components/exercises/Flashcard";
import { FillBlank } from "@/components/exercises/FillBlank";
import { Translation } from "@/components/exercises/Translation";
import { WordMatch } from "@/components/exercises/WordMatch";
import { ReorderWords } from "@/components/exercises/ReorderWords";
import { Listening } from "@/components/exercises/Listening";
import { Speaking } from "@/components/exercises/Speaking";
import { Dictation } from "@/components/exercises/Dictation";
import { ReverseTranslation } from "@/components/exercises/ReverseTranslation";
import { WordBankFill } from "@/components/exercises/WordBankFill";
import { ErrorCorrection } from "@/components/exercises/ErrorCorrection";
import { DialogueFill } from "@/components/exercises/DialogueFill";
import { MinimalPairs } from "@/components/exercises/MinimalPairs";
import { LessonComplete } from "@/components/lesson/LessonComplete";
import { LessonLearnScreen, type TheoryContent } from "@/components/lesson/LessonLearnScreen";
import { Button } from "@/components/ui/Button";

type Exercise = Tables<"exercises">;

interface NewAchievement {
  slug: string;
  title: string;
  icon: string;
}

type Phase =
  | { name: "learning" }
  | { name: "exercising" }
  | {
      name: "feedback";
      isCorrect: boolean;
      correctAnswer: string;
      explanation?: string;
      isFlashcard: boolean;
      isMatch: boolean;
    }
  | {
      name: "completed";
      score: number;
      xpEarned: number;
      newAchievements: NewAchievement[];
      saveFailed?: boolean;
    };

interface LessonPlayerProps {
  lessonId: string;
  lessonTitle: string;
  xpReward: number;
  exercises: Exercise[];
  moreLessonsHref: string;
  lessonHref: string;
  theoryContent?: TheoryContent | null;
}

export function LessonPlayer({
  lessonId,
  lessonTitle,
  xpReward,
  exercises,
  moreLessonsHref,
  lessonHref,
  theoryContent,
}: LessonPlayerProps) {
  const router = useRouter();
  // Failed exercises are pushed to the back of the queue instead of being
  // skipped, so the lesson only ends once every exercise has been answered
  // correctly at least once.
  const [queue, setQueue] = useState<number[]>(() =>
    exercises.map((_, i) => i)
  );
  const [masteredCount, setMasteredCount] = useState(0);
  const [attemptedOnce, setAttemptedOnce] = useState<Set<number>>(new Set());
  const [firstAttemptCorrect, setFirstAttemptCorrect] = useState(0);
  const [phase, setPhase] = useState<Phase>(
    theoryContent ? { name: "learning" } : { name: "exercising" }
  );
  const [isCompleting, setIsCompleting] = useState(false);

  const currentExercise = exercises[queue[0]];
  const progressPct = (masteredCount / exercises.length) * 100;

  const handleAnswer = useCallback(
    (answer: string, isCorrect: boolean) => {
      const idx = queue[0];

      // Score reflects first-attempt accuracy only — once a wrong exercise
      // is requeued, getting it right on a later attempt no longer counts
      // toward the score, otherwise every session would end at 100%.
      if (!attemptedOnce.has(idx)) {
        setAttemptedOnce((s) => new Set(s).add(idx));
        if (isCorrect) setFirstAttemptCorrect((c) => c + 1);
      }

      const explanationObj = currentExercise.explanation as Record<
        string,
        string
      > | null;
      const correctAnswerObj = currentExercise.correct_answer as {
        text?: string;
      };

      setPhase({
        name: "feedback",
        isCorrect,
        correctAnswer: correctAnswerObj.text ?? "",
        explanation: explanationObj?.es,
        isFlashcard: currentExercise.exercise_type === "flashcard",
        isMatch: currentExercise.exercise_type === "word_match",
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
    [queue, attemptedOnce, currentExercise]
  );

  const submitCompletion = useCallback(
    async (finalScore: number) => {
      const res = await fetch("/api/progress/complete-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, score: finalScore }),
      });
      if (!res.ok) throw new Error("complete-lesson request failed");
      return res.json() as Promise<{
        xpEarned?: number;
        newAchievements?: NewAchievement[];
      }>;
    },
    [lessonId]
  );

  const handleNext = useCallback(async () => {
    if (phase.name !== "feedback") return;

    const idx = queue[0];
    const rest = queue.slice(1);
    const nextQueue = phase.isCorrect ? rest : [...rest, idx];
    if (phase.isCorrect) setMasteredCount((c) => c + 1);

    if (nextQueue.length === 0) {
      setIsCompleting(true);
      const finalScore = Math.round(
        (firstAttemptCorrect / exercises.length) * 100
      );

      try {
        const data = await submitCompletion(finalScore);
        setPhase({
          name: "completed",
          score: finalScore,
          xpEarned: data.xpEarned ?? xpReward,
          newAchievements: data.newAchievements ?? [],
        });
      } catch {
        setPhase({
          name: "completed",
          score: finalScore,
          xpEarned: 0,
          newAchievements: [],
          saveFailed: true,
        });
      }
      setIsCompleting(false);
    } else {
      setQueue(nextQueue);
      setPhase({ name: "exercising" });
    }
  }, [phase, queue, firstAttemptCorrect, exercises.length, submitCompletion, xpReward]);

  const handleRetrySave = useCallback(async () => {
    if (phase.name !== "completed") return;
    try {
      const data = await submitCompletion(phase.score);
      setPhase({
        name: "completed",
        score: phase.score,
        xpEarned: data.xpEarned ?? xpReward,
        newAchievements: data.newAchievements ?? [],
      });
    } catch {
      // still failing — leave saveFailed banner up for another retry
    }
  }, [phase, submitCompletion, xpReward]);

  if (phase.name === "learning" && theoryContent) {
    return (
      <LessonLearnScreen
        lessonTitle={lessonTitle}
        theoryContent={theoryContent}
        onComplete={() => setPhase({ name: "exercising" })}
        onExit={() => router.back()}
      />
    );
  }

  if (phase.name === "completed") {
    return (
      <LessonComplete
        score={phase.score}
        xpEarned={phase.xpEarned}
        moreLessonsHref={moreLessonsHref}
        lessonHref={lessonHref}
        newAchievements={phase.newAchievements}
        saveFailed={phase.saveFailed}
        onRetrySave={handleRetrySave}
      />
    );
  }

  const prompt = currentExercise.prompt as {
    text: string;
    subtext?: string;
    audio_text?: string;
    error_word?: string;
    lines?: { speaker: string; text: string }[];
  };
  const correctAnswer = currentExercise.correct_answer as {
    text?: string;
    accepted?: string[];
    phonetic?: string;
    note?: string;
    pairs?: { en: string; es: string }[];
    answers?: string[];
  };
  const distractors = currentExercise.distractors as string[] | null;
  const isDisabled = phase.name === "feedback";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Progress bar */}
      <div className="h-[3px] bg-[#E9ECEF]">
        <div
          className="h-full bg-[#1D4ED8] transition-all duration-300 ease-out"
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
          {masteredCount} / {exercises.length}
        </span>
      </div>

      {/* Exercise */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <div className="w-full max-w-lg">
          {currentExercise.exercise_type === "multiple_choice" && (
            <MultipleChoice
              key={queue[0]}
              prompt={prompt.text}
              correctAnswer={correctAnswer.text ?? ""}
              distractors={distractors ?? []}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}

          {currentExercise.exercise_type === "flashcard" && (
            <Flashcard
              key={queue[0]}
              word={prompt.text}
              subtext={prompt.subtext}
              translation={correctAnswer.text ?? ""}
              phonetic={correctAnswer.phonetic}
              note={correctAnswer.note}
              onAnswer={handleAnswer}
            />
          )}

          {currentExercise.exercise_type === "fill_blank" && (
            <FillBlank
              key={queue[0]}
              sentence={prompt.text}
              accepted={correctAnswer.accepted ?? [correctAnswer.text ?? ""]}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}

          {currentExercise.exercise_type === "translation" && (
            <Translation
              key={queue[0]}
              prompt={prompt.text}
              accepted={correctAnswer.accepted ?? [correctAnswer.text ?? ""]}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}

          {currentExercise.exercise_type === "word_match" && (
            <WordMatch
              key={queue[0]}
              prompt={prompt.text}
              pairs={correctAnswer.pairs ?? []}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}

          {currentExercise.exercise_type === "reorder_words" && (
            <ReorderWords
              key={queue[0]}
              prompt={prompt.text}
              correctAnswer={correctAnswer.text ?? ""}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}

          {currentExercise.exercise_type === "listening" && (
            <Listening
              key={queue[0]}
              instruction={prompt.text}
              audioText={prompt.audio_text ?? ""}
              correctAnswer={correctAnswer.text ?? ""}
              distractors={distractors}
              accepted={correctAnswer.accepted}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}

          {currentExercise.exercise_type === "speaking" && (
            <Speaking
              key={queue[0]}
              instruction={prompt.text}
              targetText={correctAnswer.text ?? ""}
              accepted={correctAnswer.accepted}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}

          {currentExercise.exercise_type === "dictation" && (
            <Dictation
              key={queue[0]}
              instruction={prompt.text}
              audioText={prompt.audio_text ?? correctAnswer.text ?? ""}
              accepted={correctAnswer.accepted ?? [correctAnswer.text ?? ""]}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}

          {currentExercise.exercise_type === "reverse_translation" && (
            <ReverseTranslation
              key={queue[0]}
              prompt={prompt.text}
              accepted={correctAnswer.accepted ?? [correctAnswer.text ?? ""]}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}

          {currentExercise.exercise_type === "word_bank_fill" && (
            <WordBankFill
              key={queue[0]}
              prompt={prompt.text}
              answers={correctAnswer.answers ?? []}
              distractors={distractors ?? []}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}

          {currentExercise.exercise_type === "error_correction" && (
            <ErrorCorrection
              key={queue[0]}
              sentence={prompt.text}
              errorWord={prompt.error_word ?? ""}
              correctWord={correctAnswer.text ?? ""}
              distractors={distractors ?? []}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}

          {currentExercise.exercise_type === "dialogue_fill" && (
            <DialogueFill
              key={queue[0]}
              lines={prompt.lines ?? []}
              correctAnswer={correctAnswer.text ?? ""}
              distractors={distractors ?? []}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}

          {currentExercise.exercise_type === "minimal_pairs" && (
            <MinimalPairs
              key={queue[0]}
              instruction={prompt.text}
              audioText={prompt.audio_text ?? correctAnswer.text ?? ""}
              correctAnswer={correctAnswer.text ?? ""}
              distractor={distractors?.[0] ?? ""}
              onAnswer={handleAnswer}
              disabled={isDisabled}
            />
          )}

          {![
            "multiple_choice",
            "flashcard",
            "fill_blank",
            "translation",
            "word_match",
            "reorder_words",
            "listening",
            "speaking",
            "dictation",
            "reverse_translation",
            "word_bank_fill",
            "error_correction",
            "dialogue_fill",
            "minimal_pairs",
          ].includes(currentExercise.exercise_type) && (
            <div className="text-center">
              <p className="text-[15px] text-[#555555] mb-6">
                Este tipo de ejercicio aún no está disponible.
              </p>
              {/* Mark as correct so an unrenderable exercise can't get stuck
                  retrying forever in the requeue loop below. */}
              <Button onClick={() => handleAnswer("", true)}>Continuar</Button>
            </div>
          )}
        </div>
      </div>

      {/* Feedback panel */}
      {phase.name === "feedback" && (
        <div
          className={`border-t-[3px] ${
            phase.isCorrect
              ? "border-[#16A34A] bg-[#F0FDF4]"
              : "border-[#DC2626] bg-[#FEF2F2]"
          } px-6 py-6`}
        >
          <div className="max-w-lg mx-auto">
            <p
              className={`text-[22px] font-bold mb-2 ${
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
            {!phase.isCorrect && !phase.isFlashcard && !phase.isMatch && (
              <p className="text-[15px] text-[#444444] mb-2">
                Respuesta correcta:{" "}
                <span className="font-semibold text-[#111111]">
                  {phase.correctAnswer}
                </span>
              </p>
            )}
            {phase.explanation && (
              <p className="text-[14px] text-[#555555] mb-4">
                {phase.explanation}
              </p>
            )}
            {!phase.isCorrect && (
              <p className="text-[13px] text-[#888888] mb-4">
                Este ejercicio volverá a aparecer más adelante — tienes que
                resolverlo bien para terminar la lección.
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
