"use client";

import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface WordMatchPair {
  en: string;
  es: string;
}

interface WordMatchProps {
  prompt: string;
  pairs: WordMatchPair[];
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

function shuffleWords(words: string[]): string[] {
  const result = [...words];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function WordMatch({ prompt, pairs, onAnswer, disabled }: WordMatchProps) {
  const enWords = useMemo(() => shuffleWords(pairs.map((p) => p.en)), [pairs]);
  const esWords = useMemo(() => shuffleWords(pairs.map((p) => p.es)), [pairs]);
  const pairMap = useMemo(() => new Map(pairs.map((p) => [p.en, p.es])), [pairs]);
  const mistakesRef = useRef(0);

  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [selectedEs, setSelectedEs] = useState<string | null>(null);
  const [wrongPair, setWrongPair] = useState<{ en: string; es: string } | null>(null);
  const [complete, setComplete] = useState(false);

  const locked = disabled || complete || !!wrongPair;

  function evaluate(en: string, es: string) {
    if (pairMap.get(en) === es) {
      const next = new Set(matched);
      next.add(en);
      setMatched(next);
      setSelectedEn(null);
      setSelectedEs(null);
      if (next.size === pairs.length) {
        setComplete(true);
        onAnswer(
          pairs.map((p) => `${p.en}-${p.es}`).join(", "),
          mistakesRef.current === 0
        );
      }
    } else {
      mistakesRef.current += 1;
      setWrongPair({ en, es });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedEn(null);
        setSelectedEs(null);
      }, 500);
    }
  }

  function handleSelectEn(word: string) {
    if (locked || matched.has(word)) return;
    if (selectedEs) {
      evaluate(word, selectedEs);
    } else {
      setSelectedEn(word);
    }
  }

  function handleSelectEs(word: string) {
    if (locked) return;
    const enForEs = pairs.find((p) => p.es === word)?.en;
    if (enForEs && matched.has(enForEs)) return;
    if (selectedEn) {
      evaluate(selectedEn, word);
    } else {
      setSelectedEs(word);
    }
  }

  return (
    <div className="w-full">
      <p className="text-[16px] text-[#555555] text-center mb-8 leading-relaxed">
        {prompt}
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          {enWords.map((word) => {
            const isMatched = matched.has(word);
            const isSelected = selectedEn === word;
            const isWrong = wrongPair?.en === word;
            return (
              <button
                key={word}
                onClick={() => handleSelectEn(word)}
                disabled={disabled || isMatched || complete}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-[6px] border text-[15px] transition-colors duration-150",
                  isMatched && "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A] cursor-default",
                  !isMatched && isWrong && "border-[#DC2626] bg-[#FEF2F2] text-[#DC2626]",
                  !isMatched && !isWrong && isSelected && "border-[#1D4ED8] bg-[#EEF2FF] text-[#1D4ED8]",
                  !isMatched && !isWrong && !isSelected && "border-[#E5E5E5] bg-white hover:bg-[#F8F8F8] text-[#111111]"
                )}
              >
                {word}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 font-sans">
          {esWords.map((word) => {
            const enForEs = pairs.find((p) => p.es === word)?.en;
            const isMatched = !!enForEs && matched.has(enForEs);
            const isSelected = selectedEs === word;
            const isWrong = wrongPair?.es === word;
            return (
              <button
                key={word}
                onClick={() => handleSelectEs(word)}
                disabled={disabled || isMatched || complete}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-[6px] border text-[15px] transition-colors duration-150",
                  isMatched && "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A] cursor-default",
                  !isMatched && isWrong && "border-[#DC2626] bg-[#FEF2F2] text-[#DC2626]",
                  !isMatched && !isWrong && isSelected && "border-[#1D4ED8] bg-[#EEF2FF] text-[#1D4ED8]",
                  !isMatched && !isWrong && !isSelected && "border-[#E5E5E5] bg-white hover:bg-[#F8F8F8] text-[#111111]"
                )}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
