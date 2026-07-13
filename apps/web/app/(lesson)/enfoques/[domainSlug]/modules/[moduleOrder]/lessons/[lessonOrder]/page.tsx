import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";
import type { Tables } from "@/types/database";
import type { TheoryContent } from "@/components/lesson/LessonLearnScreen";

interface Props {
  params: Promise<{
    domainSlug: string;
    moduleOrder: string;
    lessonOrder: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domainSlug, moduleOrder, lessonOrder } = await params;
  const supabase = await createClient();

  const { data: domain } = await supabase
    .from("domains").select("id").eq("slug", domainSlug).single();
  if (!domain) return { title: "Lección" };

  const { data: mod } = await supabase
    .from("modules").select("id").eq("domain_id", domain.id).eq("order_index", parseInt(moduleOrder)).single();
  if (!mod) return { title: "Lección" };

  const { data: lesson } = await supabase
    .from("lessons").select("title").eq("module_id", mod.id).eq("order_index", parseInt(lessonOrder)).single();

  const titleObj = lesson?.title as Record<string, string> | null;
  return { title: titleObj?.["es"] ?? "Lección" };
}

export default async function DomainLessonPage({ params }: Props) {
  const { domainSlug, moduleOrder, lessonOrder } = await params;
  const supabase = await createClient();

  const { data: domain } = await supabase
    .from("domains").select("id, slug").eq("slug", domainSlug).eq("is_published", true).single();
  if (!domain) notFound();

  const { data: mod } = await supabase
    .from("modules").select("id").eq("domain_id", domain.id).eq("order_index", parseInt(moduleOrder)).eq("is_published", true).single();
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
      moreLessonsHref={`/enfoques/${domainSlug}`}
      lessonHref={`/enfoques/${domainSlug}/modules/${moduleOrder}/lessons/${lessonOrder}`}
      theoryContent={lesson.theory_content as TheoryContent | null}
    />
  );
}
