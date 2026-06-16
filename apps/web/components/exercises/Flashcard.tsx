"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface FlashcardProps {
  word: string;
  subtext?: string;
  translation: string;
  phonetic?: string;
  note?: string;
  onAnswer: (answer: string, isCorrect: boolean) => void;
}

export function Flashcard({
  word,
  subtext,
  translation,
  phonetic,
  note,
  onAnswer,
}: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full">
      <div
        onClick={() => !flipped && setFlipped(true)}
        className={`w-full min-h-[260px] rounded-[8px] border border-[#E5E5E5] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center p-8 select-none ${!flipped ? "cursor-pointer hover:border-[#D0D0D0] transition-colors" : ""}`}
      >
        {!flipped ? (
          <div className="text-center">
            <p className="text-[36px] font-semibold text-[#111111] mb-2">
              {word}
            </p>
            {subtext && (
              <p className="text-[14px] text-[#999999]">{subtext}</p>
            )}
            <p className="text-[12px] text-[#CCCCCC] mt-6 uppercase tracking-wide">
              Toca para revelar
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-[32px] font-semibold text-[#111111] mb-1">
              {translation}
            </p>
            {phonetic && (
              <p className="text-[15px] text-[#777777] mb-3">{phonetic}</p>
            )}
            {note && (
              <p className="text-[13px] text-[#999999] max-w-xs leading-relaxed">
                {note}
              </p>
            )}
          </div>
        )}
      </div>

      {flipped && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => onAnswer(translation, false)}
            className="flex-1 py-3 rounded-[4px] border border-[#E5E5E5] text-[14px] text-[#555555] hover:bg-[#F8F8F8] transition-colors"
          >
            No lo sabía
          </button>
          <Button
            onClick={() => onAnswer(translation, true)}
            className="flex-1"
            size="lg"
          >
            Lo sabía
          </Button>
        </div>
      )}
    </div>
  );
}
