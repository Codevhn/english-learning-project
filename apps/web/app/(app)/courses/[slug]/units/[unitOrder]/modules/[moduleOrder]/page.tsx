import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { isMastered } from "@/lib/mastery";

interface Props {
  params: Promise<{
    slug: string;
    unitOrder: string;
    moduleOrder: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, unitOrder, moduleOrder } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses").select("id").eq("slug", slug).single();
  if (!course) return { title: "Módulo" };

  const { data: unit } = await supabase
    .from("units").select("id").eq("course_id", course.id).eq("order_index", parseInt(unitOrder)).single();
  if (!unit) return { title: "Módulo" };

  const { data: mod } = await supabase
    .from("modules").select("title").eq("unit_id", unit.id).eq("order_index", parseInt(moduleOrder)).single();

  const titleObj = mod?.title as Record<string, string> | null;
  return { title: titleObj?.["es"] ?? "Módulo" };
}

export default async function ModulePage({ params }: Props) {
  const { slug, unitOrder, moduleOrder } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: course } = await supabase
    .from("courses").select("id, slug").eq("slug", slug).eq("is_published", true).single();
  if (!course) notFound();

  const { data: unit } = await supabase
    .from("units").select("id, title, cefr_level").eq("course_id", course.id).eq("order_index", parseInt(unitOrder)).single();
  if (!unit) notFound();

  const { data: mod } = await supabase
    .from("modules").select("id, title, description, order_index").eq("unit_id", unit.id).eq("order_index", parseInt(moduleOrder)).eq("is_published", true).single();
  if (!mod) notFound();

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, order_index, title, lesson_type, xp_reward, estimated_minutes, is_published")
    .eq("module_id", mod.id)
    .eq("is_published", true)
    .order("order_index");

  const lessonIds = (lessons ?? []).map((l) => l.id);

  const { data: progressData } =
    user && lessonIds.length > 0
      ? await supabase
          .from("user_progress")
          .select("lesson_id, status, score")
          .eq("user_id", user.id)
          .in("lesson_id", lessonIds)
      : { data: [] };

  const progressMap = new Map((progressData ?? []).map((p) => [p.lesson_id, p]));

  const modTitleObj = mod.title as Record<string, string> | null;
  const modDescObj = mod.description as Record<string, string> | null;
  const modTitle = modTitleObj?.["es"] ?? modTitleObj?.["en"] ?? "";
  const modDesc = modDescObj?.["es"] ?? modDescObj?.["en"] ?? "";

  const masteredCount = (lessons ?? []).filter((l) => {
    const p = progressMap.get(l.id);
    return p?.status === "completed" && isMastered(p.score);
  }).length;
  const total = (lessons ?? []).length;

  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
      <div>
        <Link
          href={`/courses/${slug}`}
          className="text-[13px] text-[#AAAAAA] hover:text-[#555555] transition-colors mb-3 inline-block"
        >
          ← Volver al curso
        </Link>
        <h1 className="text-[28px] font-semibold text-[#111111] tracking-tight">
          {modTitle}
        </h1>
        {modDesc && (
          <p className="text-[15px] text-[#555555] mt-1 max-w-xl">{modDesc}</p>
        )}
        {total > 0 && (
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 max-w-xs h-[3px] bg-[#E9ECEF] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1D4ED8] transition-all"
                style={{ width: `${Math.round((masteredCount / total) * 100)}%` }}
              />
            </div>
            <span className="text-[13px] text-[#AAAAAA]">
              {masteredCount} / {total} lecciones
            </span>
          </div>
        )}
      </div>

      {/* Lesson list */}
      <div className="flex flex-col gap-2">
        {(lessons ?? []).map((lesson, idx) => {
          const lessonTitleObj = lesson.title as Record<string, string> | null;
          const lessonTitle = lessonTitleObj?.["es"] ?? lessonTitleObj?.["en"] ?? "";
          const progress = progressMap.get(lesson.id);
          const isCompleted = progress?.status === "completed";
          const mastered = isCompleted && isMastered(progress?.score);
          const prevProgress =
            idx > 0 ? progressMap.get((lessons ?? [])[idx - 1]?.id) : undefined;
          const prevMastered =
            idx === 0 ||
            (prevProgress?.status === "completed" && isMastered(prevProgress.score));
          const isLocked = !isCompleted && !prevMastered && idx > 0;

          return (
            <Card key={lesson.id} className={isLocked ? "opacity-50" : ""}>
              <CardContent className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[12px] font-semibold ${
                      mastered
                        ? "bg-[#ECFDF5] text-[#16A34A]"
                        : "bg-[#F3F4F6] text-[#9CA3AF]"
                    }`}
                  >
                    {mastered ? (
                      <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[15px] font-medium text-[#111111] truncate">
                      {lessonTitle}
                    </p>
                    <p className="text-[12px] text-[#999999]">
                      {lesson.estimated_minutes ?? 10} min · {lesson.xp_reward ?? 10} XP
                    </p>
                  </div>
                </div>
                {!isLocked && (
                  <Link
                    href={`/courses/${slug}/units/${unitOrder}/modules/${moduleOrder}/lessons/${lesson.order_index}`}
                    className="shrink-0"
                  >
                    <Button variant={mastered ? "secondary" : "primary"} size="sm">
                      {mastered ? "Repasar" : isCompleted ? "Reforzar" : "Comenzar"}
                    </Button>
                  </Link>
                )}
                {isLocked && (
                  <span className="text-[13px] text-[#CCCCCC] shrink-0">Bloqueada</span>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
