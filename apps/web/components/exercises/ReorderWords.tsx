"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

interface ReorderWordsProps {
  prompt: string;
  correctAnswer: string;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

interface Token {
  word: string;
  id: number;
}

function shuffleTokens(words: string[]): Token[] {
  const tokens = words.map((word, id) => ({ word, id }));
  for (let i = tokens.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tokens[i], tokens[j]] = [tokens[j], tokens[i]];
  }
  return tokens;
}

export function ReorderWords({ prompt, correctAnswer, onAnswer, disabled }: ReorderWordsProps) {
  const words = useMemo(() => correctAnswer.trim().split(/\s+/), [correctAnswer]);
  const [bank, setBank] = useState<Token[]>(() => shuffleTokens(words));
  const [answer, setAnswer] = useState<Token[]>([]);
  const [checked, setChecked] = useState(false);

  const locked = disabled || checked;

  function moveToAnswer(token: Token) {
    if (locked) return;
    setBank((b) => b.filter((t) => t.id !== token.id));
    setAnswer((a) => [...a, token]);
  }

  function moveToBank(token: Token) {
    if (locked) return;
    setAnswer((a) => a.filter((t) => t.id !== token.id));
    setBank((b) => [...b, token]);
  }

  function handleCheck() {
    if (locked || bank.length > 0) return;
    setChecked(true);
    const built = answer.map((t) => t.word).join(" ");
    const isCorrect = built.toLowerCase() === correctAnswer.trim().toLowerCase();
    onAnswer(built, isCorrect);
  }

  return (
    <div className="w-full">
      <p className="text-[20px] font-semibold text-[#111111] text-center mb-8 leading-snug">
        {prompt}
      </p>

      <div className="min-h-[60px] rounded-[6px] border border-[#E5E5E5] bg-[#F8F9FA] px-3 py-2.5 flex flex-wrap items-center gap-2 mb-4">
        {answer.length === 0 && (
          <span className="text-[13px] text-[#BBBBBB] py-1.5">
            Toca las palabras en orden...
          </span>
        )}
        {answer.map((token) => (
          <button
            key={token.id}
            onClick={() => moveToBank(token)}
            disabled={locked}
            className="px-3 py-1.5 rounded-[4px] border border-[#1D4ED8] bg-[#EEF2FF] text-[#1D4ED8] text-[15px] font-medium disabled:cursor-default"
          >
            {token.word}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {bank.map((token) => (
          <button
            key={token.id}
            onClick={() => moveToAnswer(token)}
            disabled={locked}
            className={cn(
              "px-3 py-1.5 rounded-[4px] border border-[#E5E5E5] bg-white text-[#111111] text-[15px] transition-colors duration-150",
              locked ? "cursor-default" : "hover:bg-[#F8F8F8] cursor-pointer"
            )}
          >
            {token.word}
          </button>
        ))}
      </div>

      <button
        onClick={handleCheck}
        disabled={locked || bank.length > 0}
        className="w-full py-2.5 bg-[#1D4ED8] text-white text-[14px] font-medium rounded-[4px] hover:bg-[#1E40AF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Comprobar
      </button>
    </div>
  );
}
