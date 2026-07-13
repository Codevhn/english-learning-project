"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getAchievementIcon } from "@/lib/achievementIcons";
import { MASTERY_THRESHOLD, isMastered } from "@/lib/mastery";

interface NewAchievement {
  slug: string;
  title: string;
  icon: string;
}

interface LessonCompleteProps {
  score: number;
  xpEarned: number;
  moreLessonsHref: string;
  lessonHref: string;
  newAchievements?: NewAchievement[];
  saveFailed?: boolean;
  onRetrySave?: () => Promise<void>;
}

export function LessonComplete({
  score,
  xpEarned,
  moreLessonsHref,
  lessonHref,
  newAchievements = [],
  saveFailed = false,
  onRetrySave,
}: LessonCompleteProps) {
  const router = useRouter();
  const [retrying, setRetrying] = useState(false);
  const mastered = isMastered(score);

  async function handleRetry() {
    if (!onRetrySave || retrying) return;
    setRetrying(true);
    await onRetrySave();
    setRetrying(false);
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center max-w-sm w-full">
        <div className="w-16 h-16 rounded-full bg-[#EFF6FF] flex items-center justify-center mx-auto mb-6">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1D4ED8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-[26px] font-semibold text-[#111111] mb-2">
          {score === 100
            ? "¡Lección perfecta!"
            : mastered
            ? "¡Lección completada!"
            : "Necesitas reforzar esta lección"}
        </h1>
        <p className="text-[15px] text-[#555555] mb-8">
          {score === 100
            ? "Resolviste todos los ejercicios a la primera."
            : mastered
            ? "Buen trabajo. Sigue practicando para reforzar lo aprendido."
            : `Tu precisión a la primera fue del ${score}%. Necesitas al menos ${MASTERY_THRESHOLD}% para desbloquear la siguiente lección.`}
        </p>

        {saveFailed && (
          <div className="flex items-start gap-2.5 bg-[#FEF2F2] border border-[#FECACA] rounded-[6px] px-4 py-3 mb-6 text-left">
            <TriangleAlert className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" strokeWidth={2} />
            <div className="flex-1">
              <p className="text-[13px] font-medium text-[#DC2626] mb-1">
                No se pudo guardar tu progreso
              </p>
              <p className="text-[12px] text-[#991B1B] mb-2">
                Revisa tu conexión e inténtalo de nuevo antes de salir, o tu XP y el avance de esta lección no quedarán registrados.
              </p>
              <button
                onClick={handleRetry}
                disabled={retrying}
                className="text-[12px] font-semibold text-[#DC2626] underline disabled:opacity-50"
              >
                {retrying ? "Reintentando…" : "Reintentar"}
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#F8F9FA] rounded-[6px] p-4 text-center">
            <p className="text-[12px] text-[#999999] mb-1">Precisión</p>
            <p className="text-[26px] font-semibold text-[#111111]">{score}%</p>
          </div>
          <div className="bg-[#EFF6FF] rounded-[6px] p-4 text-center">
            <p className="text-[12px] text-[#3B82F6] mb-1">XP ganado</p>
            <p className="text-[26px] font-semibold text-[#1D4ED8]">+{xpEarned}</p>
          </div>
        </div>

        {newAchievements.length > 0 && (
          <div className="mb-6">
            <p className="text-[12px] text-[#999999] uppercase tracking-wide mb-2">
              Logros desbloqueados
            </p>
            <div className="flex flex-col gap-2">
              {newAchievements.map((a) => {
                const Icon = getAchievementIcon(a.icon);
                return (
                  <div
                    key={a.slug}
                    className="flex items-center gap-3 bg-[#FFFBEB] border border-[#FEF3C7] rounded-[6px] px-3 py-2.5 text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FEF3C7] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#92400E]" strokeWidth={2} />
                    </div>
                    <p className="text-[14px] font-medium text-[#92400E]">{a.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {!mastered && (
            <Button
              onClick={() => router.push(lessonHref)}
              className="w-full"
              size="lg"
            >
              Repetir lección
            </Button>
          )}
          <Button
            onClick={() => router.push(moreLessonsHref)}
            variant={mastered ? "primary" : "secondary"}
            className="w-full"
            size="lg"
          >
            Ver más lecciones
          </Button>
          <Button
            onClick={() => router.push("/dashboard")}
            variant="secondary"
            className="w-full"
            size="lg"
          >
            Ir al dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
