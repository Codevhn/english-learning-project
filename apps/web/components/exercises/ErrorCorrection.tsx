"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

interface ErrorCorrectionProps {
  sentence: string;
  errorWord: string;
  correctWord: string;
  distractors: string[];
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

export function ErrorCorrection({
  sentence,
  errorWord,
  correctWord,
  distractors,
  onAnswer,
  disabled,
}: ErrorCorrectionProps) {
  const options = useMemo(
    () => shuffle([correctWord, ...distractors]),
    [correctWord, distractors]
  );
  const [selected, setSelected] = useState<string | null>(null);

  const parts = sentence.split(errorWord);

  function handleSelect(option: string) {
    if (disabled || selected) return;
    setSelected(option);
    onAnswer(option, option === correctWord);
  }

  return (
    <div className="w-full">
      <p className="text-[11px] text-[#AAAAAA] uppercase tracking-widest mb-3 text-center">
        Encuentra el error
      </p>
      <p className="text-[19px] font-semibold text-center mb-2 leading-snug">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < parts.length - 1 && (
              <span className="text-[#DC2626] underline decoration-wavy decoration-2 underline-offset-4">
                {errorWord}
              </span>
            )}
          </span>
        ))}
      </p>
      <p className="text-[13px] text-[#AAAAAA] text-center mb-8">
        ¿Cuál es la forma correcta de la palabra subrayada?
      </p>

      <div className="grid grid-cols-1 gap-3">
        {options.map((option) => {
          const isSelected = selected === option;
          const isCorrect = option === correctWord;
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={!!selected || !!disabled}
              className={cn(
                "w-full text-left px-4 py-3 rounded-[6px] border text-[15px] transition-colors duration-150",
                !isSelected && "border-[#E5E5E5] bg-white hover:bg-[#F8F8F8] text-[#111111]",
                isSelected && isCorrect && "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A]",
                isSelected && !isCorrect && "border-[#DC2626] bg-[#FEF2F2] text-[#DC2626]",
                selected ? "cursor-default" : "cursor-pointer"
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
