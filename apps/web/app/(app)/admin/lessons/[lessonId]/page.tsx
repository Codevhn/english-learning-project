import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LessonForm } from "@/components/admin/LessonForm";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Props {
  params: Promise<{ lessonId: string }>;
  searchParams: Promise<{ moduleId?: string }>;
}

export const metadata: Metadata = { title: "Lección — Admin" };

export default async function AdminLessonDetailPage({ params, searchParams }: Props) {
  const { lessonId } = await params;
  const { moduleId: moduleIdParam } = await searchParams;
  const isNew = lessonId === "new";
  const supabase = await createClient();

  const lessonResult = isNew
    ? { data: null }
    : await supabase.from("lessons").select("*").eq("id", lessonId).single();

  if (!isNew && !lessonResult.data) notFound();

  const lesson = lessonResult.data as {
    id: string;
    module_id: string;
    unit_id: string | null;
    slug: string;
    title: Record<string, string> | null;
    description: Record<string, string> | null;
    lesson_type: string;
    xp_reward: number;
    estimated_minutes: number;
    theory_content: unknown;
    order_index: number;
    is_published: boolean;
  } | null;

  const moduleId = isNew ? moduleIdParam : lesson?.module_id;
  if (!moduleId) notFound();

  const { data: mod } = await supabase
    .from("modules")
    .select("id, unit_id, title")
    .eq("id", moduleId)
    .single();
  if (!mod) notFound();

  const moduleTitle = (mod.title as Record<string, string> | null)?.["es"] ?? "";

  const initial = {
    slug: lesson?.slug ?? "",
    titleEs: lesson?.title?.["es"] ?? "",
    titleEn: lesson?.title?.["en"] ?? "",
    descriptionEs: lesson?.description?.["es"] ?? "",
    descriptionEn: lesson?.description?.["en"] ?? "",
    lessonType: lesson?.lesson_type ?? "vocabulary",
    xpReward: lesson?.xp_reward ?? 20,
    estimatedMinutes: lesson?.estimated_minutes ?? 12,
    theoryContent: lesson?.theory_content
      ? JSON.stringify(lesson.theory_content, null, 2)
      : "",
    orderIndex: lesson?.order_index ?? 1,
    isPublished: lesson?.is_published ?? false,
  };

  const { data: exercises } = !isNew
    ? await supabase
        .from("exercises")
        .select("id, order_index, exercise_type, prompt")
        .eq("lesson_id", lessonId)
        .order("order_index")
    : { data: [] };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href={`/admin/modules/${moduleId}`}
          className="text-[13px] text-[#AAAAAA] hover:text-[#555555] transition-colors mb-3 inline-block"
        >
          ← {moduleTitle || "Módulo"}
        </Link>
        <h1 className="text-[22px] font-semibold text-[#111111]">
          {isNew ? "Nueva lección" : "Editar lección"}
        </h1>
      </div>

      <LessonForm
        lessonId={isNew ? null : lessonId}
        moduleId={moduleId}
        moduleUnitId={mod.unit_id}
        initial={initial}
      />

      {!isNew && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-semibold text-[#111111]">Ejercicios</h2>
            <Link href={`/admin/exercises/new?lessonId=${lessonId}`}>
              <Button size="sm">+ Nuevo ejercicio</Button>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {(exercises ?? []).map((ex) => {
              const promptText =
                (ex.prompt as { text?: string } | null)?.text ?? "(sin texto)";
              return (
                <Link key={ex.id} href={`/admin/exercises/${ex.id}`}>
                  <Card className="hover:shadow-md transition-shadow duration-150">
                    <CardContent className="py-3 flex items-center justify-between gap-4">
                      <div className="min-w-0 flex items-center gap-3">
                        <Badge variant="outline">{ex.exercise_type}</Badge>
                        <p className="text-[13px] text-[#555555] truncate">
                          {ex.order_index}. {promptText}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
            {(exercises ?? []).length === 0 && (
              <Card>
                <CardContent className="text-center py-8 text-[14px] text-[#999999]">
                  No hay ejercicios todavía.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
