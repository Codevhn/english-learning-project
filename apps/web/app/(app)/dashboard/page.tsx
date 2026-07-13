import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Compass } from "lucide-react";
import { LevelProgressCard } from "@/components/dashboard/LevelProgressCard";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { ReviewCard } from "@/components/dashboard/ReviewCard";
import { DomainIcon } from "@/lib/domainIcons";
import { MASTERY_THRESHOLD } from "@/lib/mastery";
import { DOMAIN_UNLOCK_MASTERED_LESSONS } from "@/lib/domains";
import type { Tables } from "@/types/database";

export const metadata: Metadata = { title: "Inicio — Parlo" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [
    profileResult,
    statsResult,
    reviewResult,
    progressResult,
    coursesResult,
    masteredResult,
    selectedDomainsResult,
  ] = await Promise.all([
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
    supabase
      .from("user_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user!.id)
      .eq("status", "completed")
      .gte("score", MASTERY_THRESHOLD),
    supabase
      .from("user_domains")
      .select("domain_id, domains(slug, title, icon)")
      .eq("user_id", user!.id),
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

  const masteredCount = masteredResult.count ?? 0;
  const domainsUnlocked = masteredCount >= DOMAIN_UNLOCK_MASTERED_LESSONS;
  const selectedDomains = (selectedDomainsResult.data ?? []) as {
    domain_id: string;
    domains: { slug: string; title: Record<string, string>; icon: string } | null;
  }[];

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

      {/* Rutas de Enfoque */}
      {domainsUnlocked && (
        <div className="bg-white border border-[#E5E5E5] rounded-[6px] p-5">
          <div className="flex items-center justify-between gap-4 mb-1">
            <p className="text-[12px] text-[#999999] uppercase tracking-wide">
              Rutas de Enfoque
            </p>
            <Link
              href="/enfoques"
              className="text-[13px] text-[#1D4ED8] hover:underline shrink-0"
            >
              {selectedDomains.length > 0 ? "Gestionar" : "Elegir"}
            </Link>
          </div>
          {selectedDomains.length > 0 ? (
            <div className="flex flex-col gap-2 mt-2">
              {selectedDomains.map((sel) => {
                if (!sel.domains) return null;
                const domTitle =
                  sel.domains.title?.["es"] ?? sel.domains.title?.["en"] ?? "";
                return (
                  <Link
                    key={sel.domain_id}
                    href={`/enfoques/${sel.domains.slug}`}
                    className="flex items-center gap-2.5 py-1"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#EFF2FF] flex items-center justify-center shrink-0">
                      <DomainIcon name={sel.domains.icon} className="w-3.5 h-3.5 text-[#1D4ED8]" />
                    </div>
                    <span className="text-[14px] text-[#111111]">{domTitle}</span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-3 mt-2">
              <div className="w-9 h-9 rounded-full bg-[#F3F4F6] flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4 text-[#9CA3AF]" strokeWidth={2} />
              </div>
              <p className="text-[14px] text-[#555555]">
                Elige vocabulario extra para tu profesión o intereses.
              </p>
            </div>
          )}
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
