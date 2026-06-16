"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

interface MultipleChoiceProps {
  prompt: string;
  correctAnswer: string;
  distractors: string[];
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

export function MultipleChoice({
  prompt,
  correctAnswer,
  distractors,
  onAnswer,
  disabled,
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const options = useMemo(() => {
    const all = [correctAnswer, ...distractors];
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
  }, [correctAnswer, distractors]);

  function handleSelect(option: string) {
    if (disabled || selected) return;
    setSelected(option);
    const isCorrect =
      option.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    onAnswer(option, isCorrect);
  }

  return (
    <div className="w-full">
      <p className="text-[20px] font-semibold text-[#111111] text-center mb-8 leading-snug">
        {prompt}
      </p>
      <div className="grid grid-cols-1 gap-3">
        {options.map((option) => {
          const isSelected = selected === option;
          const isCorrect =
            option.toLowerCase().trim() === correctAnswer.toLowerCase().trim();

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={!!selected}
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
