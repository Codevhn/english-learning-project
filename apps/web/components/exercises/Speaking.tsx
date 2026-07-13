"use client";

import { useRef, useState } from "react";
import { Mic, Square, Volume2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

function speakModel(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

interface SpeakingProps {
  instruction: string;
  targetText: string;
  accepted?: string[];
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?¿¡]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(0));
  for (let i = 0; i < rows; i++) matrix[i][0] = i;
  for (let j = 0; j < cols; j++) matrix[0][j] = j;
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      matrix[i][j] =
        a[i - 1] === b[j - 1]
          ? matrix[i - 1][j - 1]
          : 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
    }
  }
  return matrix[rows - 1][cols - 1];
}

function matches(transcript: string, accepted: string[]): boolean {
  const normTranscript = normalize(transcript);
  return accepted.some((candidate) => {
    const normCandidate = normalize(candidate);
    if (normTranscript === normCandidate) return true;
    const tolerance = Math.max(1, Math.floor(normCandidate.length * 0.15));
    return levenshtein(normTranscript, normCandidate) <= tolerance;
  });
}

export function Speaking({
  instruction,
  targetText,
  accepted,
  onAnswer,
  disabled,
}: SpeakingProps) {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [modelPlayed, setModelPlayed] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const Ctor =
    typeof window !== "undefined"
      ? window.SpeechRecognition ?? window.webkitSpeechRecognition
      : undefined;
  const supported = !!Ctor;
  const ttsSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;
  const canRecord = modelPlayed || !ttsSupported;
  const acceptedList = accepted ?? [targetText];

  function handlePlayModel() {
    setModelPlayed(true);
    speakModel(targetText);
  }

  function handleStart() {
    if (!Ctor || disabled || transcript || !canRecord) return;
    const recognition = new Ctor();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const heard = event.results[0]?.[0]?.transcript ?? "";
      setTranscript(heard);
      onAnswer(heard, matches(heard, acceptedList));
    };
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setPermissionDenied(true);
      }
      setRecording(false);
    };
    recognition.onend = () => setRecording(false);

    recognitionRef.current = recognition;
    setRecording(true);
    recognition.start();
  }

  function handleStop() {
    recognitionRef.current?.stop();
  }

  function handleSelfReport(isCorrect: boolean) {
    onAnswer(targetText, isCorrect);
    setTranscript(targetText);
  }

  return (
    <div className="w-full">
      <p className="text-[11px] text-[#AAAAAA] uppercase tracking-widest mb-3 text-center">
        Habla
      </p>
      <p className="text-[15px] text-[#555555] text-center mb-4">{instruction}</p>
      <p className="text-[22px] font-semibold text-[#111111] text-center mb-8 leading-snug">
        {targetText}
      </p>

      {supported ? (
        <>
          <div className="flex justify-center items-center gap-4 mb-6">
            {ttsSupported && (
              <button
                type="button"
                onClick={handlePlayModel}
                disabled={disabled}
                className="flex items-center justify-center size-11 rounded-full border border-[#D1D1D1] bg-white text-[#555555] hover:bg-[#F8F8F8] transition-colors duration-150"
                aria-label="Escuchar pronunciación modelo"
                title="Escuchar pronunciación modelo"
              >
                <Volume2 className="size-5" strokeWidth={2} />
              </button>
            )}
            <button
              type="button"
              onClick={recording ? handleStop : handleStart}
              disabled={disabled || !!transcript || !canRecord}
              className={cn(
                "flex items-center justify-center size-16 rounded-full border transition-colors duration-150",
                recording
                  ? "border-[#DC2626] bg-[#FEF2F2] text-[#DC2626] animate-pulse"
                  : "border-[#1D4ED8] bg-[#EEF2FF] text-[#1D4ED8] hover:bg-[#E0E7FF]",
                (disabled || !!transcript || !canRecord) && "opacity-50 cursor-not-allowed"
              )}
            >
              {recording ? (
                <Square className="size-6" strokeWidth={2} />
              ) : (
                <Mic className="size-7" strokeWidth={2} />
              )}
            </button>
          </div>

          <p className="text-[13px] text-[#AAAAAA] text-center mb-4">
            {permissionDenied
              ? "Permite el acceso al micrófono para grabar tu voz."
              : !canRecord
              ? "Escucha primero la pronunciación modelo."
              : recording
              ? "Escuchando... toca de nuevo para detener."
              : transcript
              ? "Esto entendimos:"
              : "Toca el micrófono y di la frase en voz alta."}
          </p>

          {transcript && (
            <p className="text-[16px] text-center text-[#111111] font-medium">
              “{transcript}”
            </p>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-[13px] text-[#AAAAAA] text-center">
            Tu navegador no soporta reconocimiento de voz. Di la frase en voz alta y luego marca si la dijiste correctamente.
          </p>
          {!transcript && (
            <div className="flex gap-3 w-full">
              <button
                onClick={() => handleSelfReport(false)}
                disabled={disabled}
                className="flex-1 py-3 rounded-[4px] border border-[#E5E5E5] text-[14px] text-[#555555] hover:bg-[#F8F8F8] transition-colors"
              >
                No pude decirla
              </button>
              <Button onClick={() => handleSelfReport(true)} className="flex-1" size="lg" disabled={disabled}>
                La dije bien
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
