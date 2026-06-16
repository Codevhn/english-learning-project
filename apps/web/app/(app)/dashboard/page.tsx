import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Tables } from "@/types/database";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [profileResult, statsResult, coursesResult] = await Promise.all([
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

  const firstName = profile?.display_name?.split(" ")[0] ?? "Estudiante";
  const totalXp = stats?.total_xp ?? 0;
  const streak = stats?.current_streak ?? 0;
  const lessonsCompleted = stats?.total_lessons_completed ?? 0;
  const wordsLearned = stats?.total_words_learned ?? 0;

  return (
    <div className="flex flex-col gap-8">
      {/* Greeting */}
      <div>
        <h1 className="text-[28px] font-semibold text-[#111111] tracking-tight">
          Hola, {firstName}
        </h1>
        <p className="text-[15px] text-[#555555] mt-1">
          {streak > 0
            ? `Llevas ${streak} día${streak === 1 ? "" : "s"} de racha. ¡Sigue así!`
            : "Completa tu primera lección para iniciar tu racha."}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="XP total" value={totalXp.toLocaleString()} />
        <StatCard
          label="Racha actual"
          value={`${streak} día${streak === 1 ? "" : "s"}`}
        />
        <StatCard label="Lecciones" value={lessonsCompleted.toString()} />
        <StatCard label="Palabras" value={wordsLearned.toString()} />
      </div>

      {/* Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[17px] font-semibold text-[#111111]">
            Cursos disponibles
          </h2>
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
              <p className="text-[15px] text-[#555555] mb-4">
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

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="py-4">
        <p className="text-[13px] text-[#999999] mb-1">{label}</p>
        <p className="text-[24px] font-semibold text-[#111111] tabular-nums">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
