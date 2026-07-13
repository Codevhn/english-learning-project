"use client";

import { useState } from "react";

interface ReverseTranslationProps {
  prompt: string;
  accepted: string[];
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

export function ReverseTranslation({
  prompt,
  accepted,
  onAnswer,
  disabled,
}: ReverseTranslationProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    const trimmed = value.trim();
    const isCorrect = accepted.some(
      (a) => a.toLowerCase() === trimmed.toLowerCase()
    );
    onAnswer(trimmed, isCorrect);
  }

  return (
    <div className="w-full">
      <p className="text-[11px] text-[#AAAAAA] uppercase tracking-widest mb-3">
        Traduce al español
      </p>
      <p className="text-[20px] font-semibold text-[#111111] mb-8 leading-snug">
        {prompt}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          placeholder="Escribe tu traducción en español..."
          rows={3}
          className="w-full px-4 py-3 rounded-[4px] border border-[#D1D1D1] text-[15px] text-[#111111] placeholder:text-[#BBBBBB] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent disabled:opacity-60 resize-none"
        />
        <button
          type="submit"
          disabled={!value.trim() || !!disabled}
          className="w-full py-2.5 bg-[#1D4ED8] text-white text-[14px] font-medium rounded-[4px] hover:bg-[#1E40AF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Comprobar
        </button>
      </form>
    </div>
  );
}
