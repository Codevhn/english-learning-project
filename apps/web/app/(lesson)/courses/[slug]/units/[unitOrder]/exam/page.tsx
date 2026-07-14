import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";
import type { Tables } from "@/types/database";
import { LEVEL_EXAM_SAMPLE_SIZE } from "@/lib/mastery";

interface Props {
  params: Promise<{ slug: string; unitOrder: string }>;
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, unitOrder } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase.from("courses").select("id").eq("slug", slug).single();
  if (!course) return { title: "Examen" };

  const { data: unit } = await supabase
    .from("units").select("cefr_level").eq("course_id", course.id).eq("order_index", parseInt(unitOrder)).single();

  return { title: unit ? `Examen de Nivel ${unit.cefr_level}` : "Examen" };
}

export default async function LevelExamPage({ params }: Props) {
  const { slug, unitOrder } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses").select("id, slug").eq("slug", slug).single();
  if (!course) notFound();

  const { data: unit } = await supabase
    .from("units").select("id, cefr_level").eq("course_id", course.id).eq("order_index", parseInt(unitOrder)).single();
  if (!unit) notFound();

  const { data: lesson } = await supabase
    .from("lessons")
    .select("id, xp_reward")
    .eq("unit_id", unit.id)
    .eq("lesson_type", "level_exam")
    .eq("is_published", true)
    .single();
  if (!lesson) notFound();

  const { data: bank } = await supabase
    .from("exercises")
    .select("*")
    .eq("lesson_id", lesson.id);

  if (!bank || bank.length === 0) notFound();

  const sample = shuffle(bank).slice(0, LEVEL_EXAM_SAMPLE_SIZE);

  return (
    <LessonPlayer
      lessonId={lesson.id}
      lessonTitle={`Examen de Nivel ${unit.cefr_level}`}
      xpReward={lesson.xp_reward ?? 50}
      exercises={sample as Tables<"exercises">[]}
      moreLessonsHref={`/courses/${slug}`}
      lessonHref={`/courses/${slug}/units/${unitOrder}/exam`}
      isLevelExam
    />
  );
}
