import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Cursos",
};

export default async function CoursesPage() {
  const supabase = await createClient();

  const { data: courses } = await supabase
    .from("courses")
    .select(
      "id, slug, title, description, source_language, target_language"
    )
    .eq("is_published", true)
    .order("created_at");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[28px] font-semibold text-[#111111] tracking-tight">
          Cursos
        </h1>
        <p className="text-[15px] text-[#555555] mt-1">
          Elige el idioma que quieres aprender.
        </p>
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
                    <p className="text-[14px] text-[#555555] leading-relaxed line-clamp-3">
                      {description}
                    </p>
                  )}
                  <Link href={`/courses/${course.slug}`} className="mt-1">
                    <Button variant="secondary" size="sm" className="w-full">
                      Ver curso
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-[15px] text-[#555555] mb-2">
              Todavía no hay cursos disponibles.
            </p>
            <p className="text-[13px] text-[#999999]">
              Vuelve pronto — estamos preparando el contenido.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
