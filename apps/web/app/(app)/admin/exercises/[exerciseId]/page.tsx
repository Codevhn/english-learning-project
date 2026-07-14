import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ExerciseForm } from "@/components/admin/ExerciseForm";

interface Props {
  params: Promise<{ exerciseId: string }>;
  searchParams: Promise<{ lessonId?: string }>;
}

export const metadata: Metadata = { title: "Ejercicio — Admin" };

export default async function AdminExerciseDetailPage({ params, searchParams }: Props) {
  const { exerciseId } = await params;
  const { lessonId: lessonIdParam } = await searchParams;
  const isNew = exerciseId === "new";
  const supabase = await createClient();

  const exerciseResult = isNew
    ? { data: null }
    : await supabase.from("exercises").select("*").eq("id", exerciseId).single();

  if (!isNew && !exerciseResult.data) notFound();

  const exercise = exerciseResult.data as {
    id: string;
    lesson_id: string;
    order_index: number;
    exercise_type: string;
    prompt: unknown;
    correct_answer: unknown;
    distractors: unknown;
    explanation: unknown;
  } | null;

  const lessonId = isNew ? lessonIdParam : exercise?.lesson_id;
  if (!lessonId) notFound();

  const { data: lesson } = await supabase
    .from("lessons")
    .select("id, title")
    .eq("id", lessonId)
    .single();
  if (!lesson) notFound();

  const lessonTitle = (lesson.title as Record<string, string> | null)?.["es"] ?? "";

  const initial = {
    orderIndex: exercise?.order_index ?? 1,
    exerciseType: exercise?.exercise_type ?? "multiple_choice",
    promptJson: exercise?.prompt ? JSON.stringify(exercise.prompt, null, 2) : "",
    correctAnswerJson: exercise?.correct_answer
      ? JSON.stringify(exercise.correct_answer, null, 2)
      : "",
    distractorsJson: exercise?.distractors
      ? JSON.stringify(exercise.distractors, null, 2)
      : "",
    explanationJson: exercise?.explanation
      ? JSON.stringify(exercise.explanation, null, 2)
      : "",
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href={`/admin/lessons/${lessonId}`}
          className="text-[13px] text-[#AAAAAA] hover:text-[#555555] transition-colors mb-3 inline-block"
        >
          ← {lessonTitle || "Lección"}
        </Link>
        <h1 className="text-[22px] font-semibold text-[#111111]">
          {isNew ? "Nuevo ejercicio" : "Editar ejercicio"}
        </h1>
      </div>

      <ExerciseForm exerciseId={isNew ? null : exerciseId} lessonId={lessonId} initial={initial} />
    </div>
  );
}
