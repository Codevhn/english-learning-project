import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Tables } from "@/types/database";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select("title")
    .eq("slug", slug)
    .single();
  const titleObj = course?.title as Record<string, string> | null;
  return { title: titleObj?.["es"] ?? "Curso" };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!course) notFound();

  const { data: units } = await supabase
    .from("units")
    .select(
      "id, order_index, title, cefr_level, lessons(id, order_index, title, lesson_type, xp_reward, estimated_minutes, is_published)"
    )
    .eq("course_id", course.id)
    .eq("is_published", true)
    .order("order_index");

  const lessonIds =
    units?.flatMap((u) =>
      (u.lessons as Tables<"lessons">[]).map((l) => l.id)
    ) ?? [];

  const { data: progressData } =
    user && lessonIds.length > 0
      ? await supabase
          .from("user_progress")
          .select("lesson_id, status, score")
          .eq("user_id", user.id)
          .in("lesson_id", lessonIds)
      : { data: [] };

  const progressMap = new Map(
    (progressData ?? []).map((p) => [p.lesson_id, p])
  );

  const titleObj = course.title as Record<string, string> | null;
  const descObj = course.description as Record<string, string> | null;
  const courseTitle = titleObj?.["es"] ?? titleObj?.["en"] ?? "";
  const courseDesc = descObj?.["es"] ?? descObj?.["en"] ?? "";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href="/courses"
          className="text-[13px] text-[#AAAAAA] hover:text-[#555555] transition-colors mb-3 inline-block"
        >
          ← Cursos
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-semibold text-[#111111] tracking-tight">
              {courseTitle}
            </h1>
            {courseDesc && (
              <p className="text-[15px] text-[#555555] mt-1 max-w-xl">
                {courseDesc}
              </p>
            )}
          </div>
          <Badge variant="outline" className="shrink-0 mt-1">
            {(course.target_language as string).toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {(units ?? []).map((unit) => {
          const unitTitleObj = unit.title as Record<string, string> | null;
          const unitTitle = unitTitleObj?.["es"] ?? unitTitleObj?.["en"] ?? "";
          const lessons = (unit.lessons as Tables<"lessons">[])
            .filter((l) => l.is_published)
            .sort((a, b) => a.order_index - b.order_index);

          return (
            <div key={unit.id}>
              <div className="flex items-center gap-3 mb-3">
                <Badge>{unit.cefr_level}</Badge>
                <h2 className="text-[17px] font-semibold text-[#111111]">
                  {unitTitle}
                </h2>
              </div>

              <div className="flex flex-col gap-2">
                {lessons.map((lesson) => {
                  const lessonTitleObj = lesson.title as Record<
                    string,
                    string
                  > | null;
                  const lessonTitle =
                    lessonTitleObj?.["es"] ?? lessonTitleObj?.["en"] ?? "";
                  const progress = progressMap.get(lesson.id);
                  const isCompleted = progress?.status === "completed";

                  return (
                    <Card key={lesson.id}>
                      <CardContent className="py-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              isCompleted ? "bg-[#16A34A]" : "bg-[#E5E5E5]"
                            }`}
                          />
                          <div className="min-w-0">
                            <p className="text-[15px] font-medium text-[#111111] truncate">
                              {lessonTitle}
                            </p>
                            <p className="text-[12px] text-[#999999]">
                              {lesson.estimated_minutes} min · {lesson.xp_reward}{" "}
                              XP
                            </p>
                          </div>
                        </div>
                        <Link
                          href={`/courses/${slug}/units/${unit.order_index}/lessons/${lesson.order_index}`}
                          className="shrink-0"
                        >
                          <Button
                            variant={isCompleted ? "secondary" : "primary"}
                            size="sm"
                          >
                            {isCompleted ? "Repasar" : "Comenzar"}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
