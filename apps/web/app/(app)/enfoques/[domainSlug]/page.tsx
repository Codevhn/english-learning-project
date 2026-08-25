import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { DomainIcon } from "@/lib/domainIcons";
import { isMastered } from "@/lib/mastery";
import type { Tables } from "@/types/database";

interface Props {
  params: Promise<{ domainSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domainSlug } = await params;
  const supabase = await createClient();
  const { data: domain } = await supabase
    .from("domains")
    .select("title")
    .eq("slug", domainSlug)
    .single();
  const titleObj = domain?.title as Record<string, string> | null;
  return { title: `${titleObj?.["es"] ?? "Enfoque"} — Parlo` };
}

export default async function DomainDetailPage({ params }: Props) {
  const { domainSlug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: domain } = await supabase
    .from("domains")
    .select("*")
    .eq("slug", domainSlug)
    .eq("is_published", true)
    .single();

  if (!domain) notFound();

  const { data: modules } = await supabase
    .from("modules")
    .select("id, order_index, title, description")
    .eq("domain_id", domain.id)
    .eq("is_published", true)
    .order("order_index");

  const moduleIds = (modules ?? []).map((m) => m.id);

  const { data: lessons } =
    moduleIds.length > 0
      ? await supabase
          .from("lessons")
          .select("id, module_id, order_index, title, xp_reward, estimated_minutes")
          .in("module_id", moduleIds)
          .eq("is_published", true)
          .order("order_index")
      : { data: [] as Pick<Tables<"lessons">, "id" | "module_id" | "order_index" | "title" | "xp_reward" | "estimated_minutes">[] };

  const lessonIds = (lessons ?? []).map((l) => l.id);

  const { data: progressData } =
    user && lessonIds.length > 0
      ? await supabase
          .from("user_progress")
          .select("lesson_id, status, score")
          .eq("user_id", user.id)
          .in("lesson_id", lessonIds)
      : { data: [] as Pick<Tables<"user_progress">, "lesson_id" | "status" | "score">[] };

  const progressMap = new Map(
    (progressData ?? []).map((p) => [p.lesson_id, p])
  );

  const lessonsByModule = new Map<string, typeof lessons>();
  for (const l of lessons ?? []) {
    if (!lessonsByModule.has(l.module_id!)) lessonsByModule.set(l.module_id!, []);
    lessonsByModule.get(l.module_id!)!.push(l);
  }

  const titleObj = domain.title as Record<string, string> | null;
  const descObj = domain.description as Record<string, string> | null;
  const title = titleObj?.["es"] ?? titleObj?.["en"] ?? "";
  const desc = descObj?.["es"] ?? descObj?.["en"] ?? "";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href="/enfoques"
          className="text-[13px] text-[#AAAAAA] hover:text-[#555555] transition-colors mb-3 inline-block"
        >
          ← Rutas de Enfoque
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#EFF2FF] flex items-center justify-center shrink-0">
            <DomainIcon name={domain.icon} className="w-5 h-5 text-[#1D4ED8]" />
          </div>
          <h1 className="text-[28px] font-semibold text-[#111111] tracking-tight">
            {title}
          </h1>
        </div>
        {desc && (
          <p className="text-[15px] text-[#555555] mt-2 max-w-xl">{desc}</p>
        )}
      </div>

      <div className="flex flex-col gap-8">
        {(modules ?? []).map((mod) => {
          const modTitleObj = mod.title as Record<string, string> | null;
          const modTitle = modTitleObj?.["es"] ?? modTitleObj?.["en"] ?? "";
          const modLessons = lessonsByModule.get(mod.id) ?? [];

          return (
            <div key={mod.id}>
              <h2 className="text-[15px] font-semibold text-[#555555] uppercase tracking-wide mb-3">
                {modTitle}
              </h2>
              <div className="flex flex-col gap-2">
                {modLessons.map((lesson) => {
                  const lessonTitleObj = lesson.title as Record<string, string> | null;
                  const lessonTitle =
                    lessonTitleObj?.["es"] ?? lessonTitleObj?.["en"] ?? "";
                  const progress = progressMap.get(lesson.id);
                  const isCompleted = progress?.status === "completed";
                  const mastered = isCompleted && isMastered(progress?.score);

                  return (
                    <Card key={lesson.id}>
                      <CardContent className="py-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[12px] font-semibold ${
                              mastered
                                ? "bg-[#ECFDF5] text-[#16A34A]"
                                : "bg-[#F3F4F6] text-[#9CA3AF]"
                            }`}
                          >
                            {mastered ? (
                              <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                            ) : (
                              lesson.order_index
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[15px] font-medium text-[#111111] truncate">
                              {lessonTitle}
                            </p>
                            <p className="text-[12px] text-[#999999]">
                              {lesson.estimated_minutes ?? 10} min ·{" "}
                              {lesson.xp_reward ?? 10} XP
                            </p>
                          </div>
                        </div>
                        <Link
                          href={`/enfoques/${domainSlug}/modules/${mod.order_index}/lessons/${lesson.order_index}`}
                          className="shrink-0"
                        >
                          <Button variant={mastered ? "secondary" : "primary"} size="sm">
                            {mastered ? "Repasar" : isCompleted ? "Reforzar" : "Comenzar"}
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
