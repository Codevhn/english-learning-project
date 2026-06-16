"use client";

import { useState } from "react";

interface FillBlankProps {
  sentence: string;
  accepted: string[];
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

export function FillBlank({ sentence, accepted, onAnswer, disabled }: FillBlankProps) {
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

  const parts = sentence.split("___");

  return (
    <div className="w-full">
      <div className="text-[22px] text-[#111111] text-center mb-8 leading-relaxed">
        {parts[0]}
        <span className="inline-block min-w-[120px] border-b-2 border-[#3730A3] mx-2 align-bottom pb-0.5 text-[#3730A3] font-medium">
          {value || "          "}
        </span>
        {parts[1]}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          placeholder="Escribe tu respuesta"
          className="flex-1 px-4 py-2.5 rounded-[4px] border border-[#D1D1D1] text-[15px] text-[#111111] placeholder:text-[#BBBBBB] focus:outline-none focus:ring-2 focus:ring-[#3730A3] focus:border-transparent disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!value.trim() || !!disabled}
          className="px-5 py-2.5 bg-[#3730A3] text-white text-[14px] font-medium rounded-[4px] hover:bg-[#312E81] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Comprobar
        </button>
      </form>
    </div>
  );
}
