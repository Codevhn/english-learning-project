"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

interface DialogueLine {
  speaker: string;
  text: string;
}

interface DialogueFillProps {
  lines: DialogueLine[];
  correctAnswer: string;
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

export function DialogueFill({
  lines,
  correctAnswer,
  distractors,
  onAnswer,
  disabled,
}: DialogueFillProps) {
  const options = useMemo(
    () => shuffle([correctAnswer, ...distractors]),
    [correctAnswer, distractors]
  );
  const [selected, setSelected] = useState<string | null>(null);
  const speakers = useMemo(
    () => Array.from(new Set(lines.map((l) => l.speaker))),
    [lines]
  );
  const blankIndex = lines.findIndex((l) => l.text === "___");

  function handleSelect(option: string) {
    if (disabled || selected) return;
    setSelected(option);
    onAnswer(option, option === correctAnswer);
  }

  return (
    <div className="w-full">
      <p className="text-[11px] text-[#AAAAAA] uppercase tracking-widest mb-4 text-center">
        Completa el diálogo
      </p>

      <div className="flex flex-col gap-2.5 mb-8">
        {lines.map((line, i) => {
          const isRight = speakers.indexOf(line.speaker) === 1;
          const isBlank = i === blankIndex;
          return (
            <div
              key={i}
              className={cn("flex flex-col", isRight ? "items-end" : "items-start")}
            >
              <span className="text-[11px] text-[#AAAAAA] mb-0.5 px-1">
                {line.speaker}
              </span>
              <div
                className={cn(
                  "max-w-[80%] px-3.5 py-2 rounded-[10px] text-[14px] leading-snug",
                  isBlank
                    ? selected
                      ? selected === correctAnswer
                        ? "border border-[#16A34A] bg-[#F0FDF4] text-[#16A34A]"
                        : "border border-[#DC2626] bg-[#FEF2F2] text-[#DC2626]"
                      : "border border-dashed border-[#CCCCCC] bg-[#FAFAFA] text-[#BBBBBB]"
                    : isRight
                    ? "bg-[#EEF2FF] text-[#111111]"
                    : "bg-[#F1F3F5] text-[#111111]"
                )}
              >
                {isBlank ? (selected ?? "···") : line.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {options.map((option) => {
          const isSelected = selected === option;
          const isCorrect = option === correctAnswer;
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
