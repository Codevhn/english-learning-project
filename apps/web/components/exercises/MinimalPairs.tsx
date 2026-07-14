"use client";

import { useMemo, useState } from "react";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/cn";

interface MinimalPairsProps {
  instruction: string;
  audioText: string;
  correctAnswer: string;
  distractor: string;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

export function MinimalPairs({
  instruction,
  audioText,
  correctAnswer,
  distractor,
  onAnswer,
  disabled,
}: MinimalPairsProps) {
  const options = useMemo(
    () => shuffle([correctAnswer, distractor]),
    [correctAnswer, distractor]
  );
  const [played, setPlayed] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const speechSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;
  const canAnswer = played || !speechSupported;

  function handleSelect(option: string) {
    if (disabled || selected || !canAnswer) return;
    setSelected(option);
    onAnswer(option, option === correctAnswer);
  }

  return (
    <div className="w-full">
      <p className="text-[11px] text-[#AAAAAA] uppercase tracking-widest mb-3 text-center">
        Pares Mínimos
      </p>
      <p className="text-[15px] text-[#555555] text-center mb-6 leading-snug">
        {instruction}
      </p>

      <div className="flex justify-center mb-8">
        <button
          type="button"
          onClick={() => {
            setPlayed(true);
            speak(audioText);
          }}
          disabled={!speechSupported}
          className={cn(
            "flex items-center justify-center size-16 rounded-full border transition-colors duration-150",
            speechSupported
              ? "border-[#1D4ED8] bg-[#EEF2FF] text-[#1D4ED8] hover:bg-[#E0E7FF]"
              : "border-[#E5E5E5] bg-[#F8F9FA] text-[#BBBBBB] cursor-not-allowed"
          )}
          aria-label="Escuchar"
        >
          <Volume2 className="size-7" strokeWidth={2} />
        </button>
      </div>

      {!speechSupported && (
        <p className="text-[13px] text-[#DC2626] text-center mb-6">
          Tu navegador no soporta audio. Prueba con Chrome o Edge.
        </p>
      )}
      {speechSupported && !played && (
        <p className="text-[13px] text-[#AAAAAA] text-center mb-6">
          Toca el botón para escuchar la palabra.
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = selected === option;
          const isCorrect = option === correctAnswer;
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={!!selected || !canAnswer || !!disabled}
              className={cn(
                "py-5 rounded-[6px] border text-[18px] font-medium transition-colors duration-150 text-center",
                !isSelected && canAnswer && "border-[#E5E5E5] bg-white hover:bg-[#F8F8F8] text-[#111111]",
                !isSelected && !canAnswer && "border-[#F1F3F5] bg-[#FAFAFA] text-[#CCCCCC]",
                isSelected && isCorrect && "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A]",
                isSelected && !isCorrect && "border-[#DC2626] bg-[#FEF2F2] text-[#DC2626]",
                selected || !canAnswer ? "cursor-default" : "cursor-pointer"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
