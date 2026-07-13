"use client";

import { useState } from "react";
import { Volume2, Turtle } from "lucide-react";
import { cn } from "@/lib/cn";

interface DictationProps {
  instruction: string;
  audioText: string;
  accepted: string[];
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

function speak(text: string, rate: number) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}

export function Dictation({
  instruction,
  audioText,
  accepted,
  onAnswer,
  disabled,
}: DictationProps) {
  const [played, setPlayed] = useState(false);
  const [value, setValue] = useState("");
  const speechSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;
  const canAnswer = played || !speechSupported;

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
      <p className="text-[11px] text-[#AAAAAA] uppercase tracking-widest mb-3 text-center">
        Dictado
      </p>
      <p className="text-[18px] font-semibold text-[#111111] text-center mb-6 leading-snug">
        {instruction}
      </p>

      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => {
            setPlayed(true);
            speak(audioText, 0.9);
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
        <button
          type="button"
          onClick={() => {
            setPlayed(true);
            speak(audioText, 0.5);
          }}
          disabled={!speechSupported}
          className={cn(
            "flex items-center justify-center size-11 rounded-full border transition-colors duration-150",
            speechSupported
              ? "border-[#D1D1D1] bg-white text-[#555555] hover:bg-[#F8F8F8]"
              : "border-[#E5E5E5] bg-[#F8F9FA] text-[#BBBBBB] cursor-not-allowed"
          )}
          aria-label="Escuchar lento"
          title="Reproducir más lento"
        >
          <Turtle className="size-5" strokeWidth={2} />
        </button>
      </div>

      {!speechSupported && (
        <p className="text-[13px] text-[#DC2626] text-center mb-6">
          Tu navegador no soporta audio. Prueba con Chrome o Edge.
        </p>
      )}

      {speechSupported && !played && (
        <p className="text-[13px] text-[#AAAAAA] text-center mb-6">
          Toca el botón para escuchar. Escribe exactamente lo que oigas.
        </p>
      )}

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
    </div>
  );
}
