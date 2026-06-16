import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CEFR_COLORS } from "@/lib/levels";

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

  // Fetch units with their modules
  const { data: units } = await supabase
    .from("units")
    .select("id, order_index, title, cefr_level")
    .eq("course_id", course.id)
    .eq("is_published", true)
    .order("order_index");

  const unitIds = (units ?? []).map((u) => u.id);

  // Fetch all published modules for these units
  const { data: modules } =
    unitIds.length > 0
      ? await supabase
          .from("modules")
          .select("id, unit_id, order_index, title, description")
          .in("unit_id", unitIds)
          .eq("is_published", true)
          .order("order_index")
      : { data: [] };

  const moduleIds = (modules ?? []).map((m) => m.id);

  // Fetch all published lessons for these modules (just for counts + progress)
  const { data: lessons } =
    moduleIds.length > 0
      ? await supabase
          .from("lessons")
          .select("id, module_id, is_published")
          .in("module_id", moduleIds)
          .eq("is_published", true)
      : { data: [] };

  const lessonIds = (lessons ?? []).map((l) => l.id);

  const { data: progressData } =
    user && lessonIds.length > 0
      ? await supabase
          .from("user_progress")
          .select("lesson_id, status")
          .eq("user_id", user.id)
          .in("lesson_id", lessonIds)
      : { data: [] };

  const progressMap = new Map(
    (progressData ?? []).map((p) => [p.lesson_id, p.status])
  );

  // Group lessons by module_id
  const lessonsByModule = new Map<string, { id: string; is_published: boolean }[]>();
  for (const l of lessons ?? []) {
    if (!lessonsByModule.has(l.module_id!)) lessonsByModule.set(l.module_id!, []);
    lessonsByModule.get(l.module_id!)!.push(l);
  }

  // Group modules by unit_id
  const modulesByUnit = new Map<string, typeof modules>();
  for (const m of modules ?? []) {
    if (!modulesByUnit.has(m.unit_id)) modulesByUnit.set(m.unit_id, []);
    modulesByUnit.get(m.unit_id)!.push(m);
  }

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

      <div className="flex flex-col gap-8">
        {(units ?? []).map((unit) => {
          const unitTitleObj = unit.title as Record<string, string> | null;
          const unitTitle = unitTitleObj?.["es"] ?? unitTitleObj?.["en"] ?? "";
          const unitModules = modulesByUnit.get(unit.id) ?? [];

          return (
            <div key={unit.id}>
              <div className="flex items-center gap-3 mb-4">
                <Badge
                  style={{
                    backgroundColor:
                      CEFR_COLORS[unit.cefr_level ?? ""]?.bg ?? "#F3F4F6",
                    color:
                      CEFR_COLORS[unit.cefr_level ?? ""]?.text ?? "#6B7280",
                    borderColor: "transparent",
                  }}
                >
                  {unit.cefr_level}
                </Badge>
                <h2 className="text-[17px] font-semibold text-[#111111]">
                  {unitTitle}
                </h2>
              </div>

              {unitModules.length === 0 && (
                <p className="text-[14px] text-[#AAAAAA] pl-2">
                  No hay módulos publicados en esta unidad.
                </p>
              )}

              <div className="flex flex-col gap-3">
                {unitModules.map((mod) => {
                  const modTitleObj = mod.title as Record<string, string> | null;
                  const modTitle = modTitleObj?.["es"] ?? modTitleObj?.["en"] ?? "";
                  const modLessons = lessonsByModule.get(mod.id) ?? [];
                  const completedCount = modLessons.filter(
                    (l) => progressMap.get(l.id) === "completed"
                  ).length;
                  const totalLessons = modLessons.length;
                  const isModuleComplete =
                    totalLessons > 0 && completedCount === totalLessons;
                  const progressPct =
                    totalLessons > 0
                      ? Math.round((completedCount / totalLessons) * 100)
                      : 0;

                  return (
                    <Card key={mod.id}>
                      <CardContent className="py-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[13px] font-semibold ${
                              isModuleComplete
                                ? "bg-[#ECFDF5] text-[#16A34A]"
                                : "bg-[#EFF6FF] text-[#1D4ED8]"
                            }`}
                          >
                            {isModuleComplete ? (
                              <Check className="w-4 h-4" strokeWidth={2.5} />
                            ) : (
                              mod.order_index
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[15px] font-medium text-[#111111] truncate">
                              {modTitle}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-24 h-[2px] bg-[#E9ECEF] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#1D4ED8] transition-all"
                                  style={{ width: `${progressPct}%` }}
                                />
                              </div>
                              <span className="text-[12px] text-[#AAAAAA]">
                                {completedCount}/{totalLessons} lecciones
                              </span>
                            </div>
                          </div>
                        </div>
                        <Link
                          href={`/courses/${slug}/units/${unit.order_index}/modules/${mod.order_index}`}
                          className="shrink-0"
                        >
                          <Button
                            variant={isModuleComplete ? "secondary" : "primary"}
                            size="sm"
                          >
                            {isModuleComplete ? "Repasar" : completedCount > 0 ? "Continuar" : "Comenzar"}
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
