"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

interface WordBankFillProps {
  prompt: string;
  answers: string[];
  distractors: string[];
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

interface Chip {
  word: string;
  id: number;
}

function shuffleChips(words: string[]): Chip[] {
  const chips = words.map((word, id) => ({ word, id }));
  for (let i = chips.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chips[i], chips[j]] = [chips[j], chips[i]];
  }
  return chips;
}

export function WordBankFill({
  prompt,
  answers,
  distractors,
  onAnswer,
  disabled,
}: WordBankFillProps) {
  const segments = useMemo(() => prompt.split("___"), [prompt]);
  const blankCount = segments.length - 1;

  const [bank, setBank] = useState<Chip[]>(() =>
    shuffleChips([...answers, ...distractors])
  );
  const [slots, setSlots] = useState<(Chip | null)[]>(() =>
    Array(blankCount).fill(null)
  );
  const [checked, setChecked] = useState(false);

  const locked = disabled || checked;
  const nextEmptySlot = slots.findIndex((s) => s === null);
  const allFilled = nextEmptySlot === -1;

  function placeInSlot(chip: Chip) {
    if (locked || nextEmptySlot === -1) return;
    setBank((b) => b.filter((c) => c.id !== chip.id));
    setSlots((s) => {
      const next = [...s];
      next[nextEmptySlot] = chip;
      return next;
    });
  }

  function returnToBank(slotIndex: number) {
    if (locked) return;
    const chip = slots[slotIndex];
    if (!chip) return;
    setSlots((s) => {
      const next = [...s];
      next[slotIndex] = null;
      return next;
    });
    setBank((b) => [...b, chip]);
  }

  function handleCheck() {
    if (locked || !allFilled) return;
    setChecked(true);
    const built = slots.map((s) => s!.word);
    const isCorrect = built.every(
      (word, i) => word.toLowerCase() === answers[i].toLowerCase()
    );
    onAnswer(built.join(" "), isCorrect);
  }

  return (
    <div className="w-full">
      <p className="text-[11px] text-[#AAAAAA] uppercase tracking-widest mb-3 text-center">
        Completa con las palabras
      </p>
      <div className="text-[19px] font-semibold text-[#111111] text-center mb-8 leading-relaxed">
        {segments.map((segment, i) => (
          <span key={i}>
            {segment}
            {i < blankCount && (
              <button
                type="button"
                onClick={() => returnToBank(i)}
                disabled={locked || !slots[i]}
                className={cn(
                  "inline-flex items-center justify-center min-w-[70px] mx-1 px-2 py-1 rounded-[4px] border align-middle text-[16px]",
                  slots[i]
                    ? "border-[#1D4ED8] bg-[#EEF2FF] text-[#1D4ED8] font-medium"
                    : "border-dashed border-[#CCCCCC] bg-[#F8F9FA] text-transparent"
                )}
              >
                {slots[i]?.word ?? "___"}
              </button>
            )}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {bank.map((chip) => (
          <button
            key={chip.id}
            onClick={() => placeInSlot(chip)}
            disabled={locked}
            className={cn(
              "px-3 py-1.5 rounded-[4px] border border-[#E5E5E5] bg-white text-[#111111] text-[15px] transition-colors duration-150",
              locked ? "cursor-default" : "hover:bg-[#F8F8F8] cursor-pointer"
            )}
          >
            {chip.word}
          </button>
        ))}
      </div>

      <button
        onClick={handleCheck}
        disabled={locked || !allFilled}
        className="w-full py-2.5 bg-[#1D4ED8] text-white text-[14px] font-medium rounded-[4px] hover:bg-[#1E40AF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Comprobar
      </button>
    </div>
  );
}
