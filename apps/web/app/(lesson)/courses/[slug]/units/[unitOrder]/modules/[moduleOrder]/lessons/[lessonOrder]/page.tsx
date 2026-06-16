import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";
import type { Tables } from "@/types/database";
import type { TheoryContent } from "@/components/lesson/LessonLearnScreen";

interface Props {
  params: Promise<{
    slug: string;
    unitOrder: string;
    moduleOrder: string;
    lessonOrder: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, unitOrder, moduleOrder, lessonOrder } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses").select("id").eq("slug", slug).single();
  if (!course) return { title: "Lección" };

  const { data: unit } = await supabase
    .from("units").select("id").eq("course_id", course.id).eq("order_index", parseInt(unitOrder)).single();
  if (!unit) return { title: "Lección" };

  const { data: mod } = await supabase
    .from("modules").select("id").eq("unit_id", unit.id).eq("order_index", parseInt(moduleOrder)).single();
  if (!mod) return { title: "Lección" };

  const { data: lesson } = await supabase
    .from("lessons").select("title").eq("module_id", mod.id).eq("order_index", parseInt(lessonOrder)).single();

  const titleObj = lesson?.title as Record<string, string> | null;
  return { title: titleObj?.["es"] ?? "Lección" };
}

export default async function LessonPage({ params }: Props) {
  const { slug, unitOrder, moduleOrder, lessonOrder } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses").select("id, slug").eq("slug", slug).single();
  if (!course) notFound();

  const { data: unit } = await supabase
    .from("units").select("id").eq("course_id", course.id).eq("order_index", parseInt(unitOrder)).single();
  if (!unit) notFound();

  const { data: mod } = await supabase
    .from("modules").select("id").eq("unit_id", unit.id).eq("order_index", parseInt(moduleOrder)).single();
  if (!mod) notFound();

  const { data: lesson } = await supabase
    .from("lessons")
    .select("id, title, xp_reward, theory_content")
    .eq("module_id", mod.id)
    .eq("order_index", parseInt(lessonOrder))
    .single();
  if (!lesson) notFound();

  const { data: exercises } = await supabase
    .from("exercises")
    .select("*")
    .eq("lesson_id", lesson.id)
    .order("order_index");

  if (!exercises || exercises.length === 0) notFound();

  const titleObj = lesson.title as Record<string, string> | null;
  const title = titleObj?.["es"] ?? titleObj?.["en"] ?? "Lección";

  return (
    <LessonPlayer
      lessonId={lesson.id}
      lessonTitle={title}
      xpReward={lesson.xp_reward ?? 10}
      exercises={exercises as Tables<"exercises">[]}
      courseSlug={slug}
      theoryContent={lesson.theory_content as TheoryContent | null}
    />
  );
}
