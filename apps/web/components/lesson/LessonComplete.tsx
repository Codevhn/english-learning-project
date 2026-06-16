"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface LessonCompleteProps {
  score: number;
  xpEarned: number;
  courseSlug: string;
}

export function LessonComplete({ score, xpEarned, courseSlug }: LessonCompleteProps) {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center max-w-sm w-full">
        <div className="w-16 h-16 rounded-full bg-[#EEF2FF] flex items-center justify-center mx-auto mb-6">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3730A3"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-[26px] font-semibold text-[#111111] mb-2">
          {score === 100 ? "¡Lección perfecta!" : "¡Lección completada!"}
        </h1>
        <p className="text-[15px] text-[#555555] mb-8">
          {score >= 70
            ? "Buen trabajo. Sigue practicando para reforzar lo aprendido."
            : "Sigue practicando para mejorar tu precisión."}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#F8F9FA] rounded-[6px] p-4 text-center">
            <p className="text-[12px] text-[#999999] mb-1">Precisión</p>
            <p className="text-[26px] font-semibold text-[#111111]">{score}%</p>
          </div>
          <div className="bg-[#EEF2FF] rounded-[6px] p-4 text-center">
            <p className="text-[12px] text-[#7C6AD6] mb-1">XP ganado</p>
            <p className="text-[26px] font-semibold text-[#3730A3]">+{xpEarned}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => router.push(`/courses/${courseSlug}`)}
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
