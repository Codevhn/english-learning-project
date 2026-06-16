import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LevelProgressCard } from "@/components/dashboard/LevelProgressCard";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { ReviewCard } from "@/components/dashboard/ReviewCard";
import type { Tables } from "@/types/database";

export const metadata: Metadata = { title: "Inicio — Parlo" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [profileResult, statsResult, reviewResult, progressResult, coursesResult] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user!.id)
        .single(),
      supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", user!.id)
        .single(),
      supabase
        .from("user_exercise_history")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user!.id)
        .lte("next_review_at", new Date().toISOString()),
      supabase
        .from("user_progress")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user!.id)
        .eq("status", "completed"),
      supabase
        .from("courses")
        .select("id, slug, title, description, source_language, target_language")
        .eq("is_published", true)
        .limit(3),
    ]);

  const profile = profileResult.data as Pick<Tables<"profiles">, "display_name"> | null;
  const stats = statsResult.data as Tables<"user_stats"> | null;
  const courses = coursesResult.data as Pick<
    Tables<"courses">,
    "id" | "slug" | "title" | "description" | "source_language" | "target_language"
  >[] | null;

  const reviewCount = reviewResult.count ?? 0;
  const lessonsCompleted = progressResult.count ?? 0;

  const firstName = profile?.display_name?.split(" ")[0] ?? "Estudiante";
  const totalXp = stats?.total_xp ?? 0;
  const currentStreak = stats?.current_streak ?? 0;
  const longestStreak = stats?.longest_streak ?? 0;

  const mainCourse = courses?.[0];
  const mainCourseTitle = mainCourse
    ? ((mainCourse.title as Record<string, string> | null)?.["es"] ??
       (mainCourse.title as Record<string, string> | null)?.["en"] ?? "")
    : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Greeting */}
      <div>
        <h1 className="text-[28px] font-semibold text-[#111111] tracking-tight">
          Hola, {firstName}
        </h1>
        <p className="text-[15px] text-[#555555] mt-1">
          {currentStreak > 0
            ? `${currentStreak} día${currentStreak === 1 ? "" : "s"} de racha — ¡sigue así!`
            : reviewCount > 0
            ? `Tienes ${reviewCount} ejercicio${reviewCount === 1 ? "" : "s"} listos para repasar.`
            : "Completa una lección para empezar tu racha."}
        </p>
      </div>

      {/* Level progress */}
      <LevelProgressCard totalXp={totalXp} />

      {/* Streak + Reviews */}
      <div className="grid grid-cols-2 gap-4">
        <StreakCard currentStreak={currentStreak} longestStreak={longestStreak} />
        <ReviewCard reviewCount={reviewCount} />
      </div>

      {/* Continue learning */}
      {mainCourse && (
        <div className="bg-white border border-[#E5E5E5] rounded-[6px] p-5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[12px] text-[#999999] uppercase tracking-wide mb-1">
              Seguir aprendiendo
            </p>
            <p className="text-[16px] font-semibold text-[#111111] truncate">
              {mainCourseTitle}
            </p>
            <p className="text-[13px] text-[#777777] mt-0.5">
              {lessonsCompleted} lección{lessonsCompleted !== 1 ? "es" : ""} completada
              {lessonsCompleted !== 1 ? "s" : ""}
            </p>
          </div>
          <Link href={`/courses/${mainCourse.slug}`} className="shrink-0">
            <Button size="sm">Continuar →</Button>
          </Link>
        </div>
      )}

      {/* Courses */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] font-semibold text-[#111111]">Cursos</h2>
          <Link
            href="/courses"
            className="text-[14px] text-[#1D4ED8] hover:underline"
          >
            Ver todos
          </Link>
        </div>

        {courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => {
              const titleObj = course.title as Record<string, string> | null;
              const descObj = course.description as Record<string, string> | null;
              const title = titleObj?.["es"] ?? titleObj?.["en"] ?? "";
              const description = descObj?.["es"] ?? descObj?.["en"] ?? "";

              return (
                <Card
                  key={course.id}
                  className="hover:shadow-md transition-shadow duration-150"
                >
                  <CardContent className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[16px] font-semibold text-[#111111] leading-tight">
                        {title}
                      </p>
                      <Badge variant="outline" className="shrink-0">
                        {course.target_language.toUpperCase()}
                      </Badge>
                    </div>
                    {description && (
                      <p className="text-[14px] text-[#555555] leading-relaxed line-clamp-2">
                        {description}
                      </p>
                    )}
                    <Link href={`/courses/${course.slug}`} className="mt-1">
                      <Button variant="secondary" size="sm" className="w-full">
                        Ir al curso
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-10">
              <p className="text-[15px] text-[#555555] mb-1">
                Todavía no hay cursos disponibles.
              </p>
              <p className="text-[13px] text-[#999999]">
                Vuelve pronto — estamos preparando el contenido.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
