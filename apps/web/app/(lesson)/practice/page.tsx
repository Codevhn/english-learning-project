import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PracticeSession, type PracticeItem } from "@/components/lesson/PracticeSession";
import type { Tables } from "@/types/database";

export const metadata: Metadata = {
  title: "Practicar",
};

export default async function PracticePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: historyItems } = await supabase
    .from("user_exercise_history")
    .select(
      "id, ease_factor, interval_days, repetitions, exercise_id, exercises(*)"
    )
    .eq("user_id", user!.id)
    .lte("next_review_at", new Date().toISOString())
    .order("answered_at", { ascending: false })
    .limit(100);

  // user_exercise_history has a unique(user_id, exercise_id) constraint,
  // so each exercise can only appear once here already.
  const practiceItems: PracticeItem[] = (historyItems ?? [])
    .slice(0, 20)
    .flatMap((item) => {
      const exercise = item.exercises as unknown as Tables<"exercises"> | null;
      if (!exercise) return [];
      return [{ historyId: item.id, exercise }];
    });

  if (practiceItems.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-[#F0FDF4] flex items-center justify-center mx-auto mb-5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16A34A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-[22px] font-semibold text-[#111111] mb-2">
            Todo al día
          </h1>
          <p className="text-[15px] text-[#555555] mb-8 leading-relaxed">
            No tienes ejercicios pendientes. Completa más lecciones para
            generar repasos, o vuelve mañana.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/courses"
              className="block w-full py-2.5 bg-[#1D4ED8] text-white text-[14px] font-medium rounded-[4px] hover:bg-[#1E40AF] transition-colors text-center"
            >
              Ver cursos
            </Link>
            <Link
              href="/dashboard"
              className="block w-full py-2.5 bg-white text-[#111111] border border-[#E5E5E5] text-[14px] rounded-[4px] hover:bg-[#F8F8F8] transition-colors text-center"
            >
              Ir al dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <PracticeSession items={practiceItems} />;
}
