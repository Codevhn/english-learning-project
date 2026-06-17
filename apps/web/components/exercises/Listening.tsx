"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/cn";

interface ListeningProps {
  instruction: string;
  audioText: string;
  correctAnswer: string;
  distractors?: string[] | null;
  accepted?: string[];
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

export function Listening({
  instruction,
  audioText,
  correctAnswer,
  distractors,
  accepted,
  onAnswer,
  disabled,
}: ListeningProps) {
  const hasOptions = !!distractors && distractors.length > 0;
  const [played, setPlayed] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const speechSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;
  const canAnswer = played || !speechSupported;

  const options = hasOptions
    ? (() => {
        const all = [correctAnswer, ...(distractors ?? [])];
        for (let i = all.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [all[i], all[j]] = [all[j], all[i]];
        }
        return all;
      })()
    : [];

  function handlePlay() {
    setPlayed(true);
    speak(audioText);
  }

  function handleSelect(option: string) {
    if (disabled || selected) return;
    setSelected(option);
    const isCorrect = option.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    onAnswer(option, isCorrect);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    const trimmed = value.trim();
    const list = accepted ?? [correctAnswer];
    const isCorrect = list.some((a) => a.toLowerCase() === trimmed.toLowerCase());
    onAnswer(trimmed, isCorrect);
  }

  return (
    <div className="w-full">
      <p className="text-[11px] text-[#AAAAAA] uppercase tracking-widest mb-3 text-center">
        Escucha
      </p>
      <p className="text-[18px] font-semibold text-[#111111] text-center mb-6 leading-snug">
        {instruction}
      </p>

      <div className="flex justify-center mb-8">
        <button
          type="button"
          onClick={handlePlay}
          disabled={!speechSupported}
          className={cn(
            "flex items-center justify-center size-16 rounded-full border transition-colors duration-150",
            speechSupported
              ? "border-[#1D4ED8] bg-[#EEF2FF] text-[#1D4ED8] hover:bg-[#E0E7FF]"
              : "border-[#E5E5E5] bg-[#F8F9FA] text-[#BBBBBB] cursor-not-allowed"
          )}
        >
          <Volume2 className="size-7" strokeWidth={2} />
        </button>
      </div>

      {!speechSupported && (
        <div className="text-center mb-6">
          <p className="text-[13px] text-[#DC2626] mb-2">
            Tu navegador no soporta audio. Prueba con Chrome o Edge.
          </p>
          <p className="text-[18px] font-medium text-[#111111]">{audioText}</p>
        </div>
      )}

      {speechSupported && !played && (
        <p className="text-[13px] text-[#AAAAAA] text-center mb-6">
          Toca el botón para escuchar.
        </p>
      )}

      {hasOptions ? (
        <div className="grid grid-cols-1 gap-3">
          {options.map((option) => {
            const isSelected = selected === option;
            const isCorrect = option.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                disabled={!!selected || !canAnswer}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-[6px] border text-[15px] transition-colors duration-150",
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
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled || !canAnswer}
            placeholder="Escribe lo que oíste"
            className="flex-1 px-4 py-2.5 rounded-[4px] border border-[#D1D1D1] text-[15px] text-[#111111] placeholder:text-[#BBBBBB] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!value.trim() || !!disabled || !canAnswer}
            className="px-5 py-2.5 bg-[#1D4ED8] text-white text-[14px] font-medium rounded-[4px] hover:bg-[#1E40AF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Comprobar
          </button>
        </form>
      )}
    </div>
  );
}
