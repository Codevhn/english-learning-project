import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ModuleForm } from "@/components/admin/ModuleForm";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Props {
  params: Promise<{ moduleId: string }>;
}

export const metadata: Metadata = { title: "Módulo — Admin" };

export default async function AdminModuleDetailPage({ params }: Props) {
  const { moduleId } = await params;
  const isNew = moduleId === "new";
  const supabase = await createClient();

  const [unitsResult, domainsResult, moduleResult] = await Promise.all([
    supabase.from("units").select("id, title").order("order_index"),
    supabase.from("domains").select("id, title").order("order_index"),
    isNew
      ? Promise.resolve({ data: null })
      : supabase.from("modules").select("*").eq("id", moduleId).single(),
  ]);

  if (!isNew && !moduleResult.data) notFound();

  const units = (unitsResult.data ?? []).map((u) => ({
    id: u.id,
    title: (u.title as Record<string, string> | null)?.["es"] ?? u.id,
  }));
  const domains = (domainsResult.data ?? []).map((d) => ({
    id: d.id,
    title: (d.title as Record<string, string> | null)?.["es"] ?? d.id,
  }));

  const mod = moduleResult.data as {
    id: string;
    slug: string;
    title: Record<string, string> | null;
    description: Record<string, string> | null;
    can_do_statements: string[] | null;
    order_index: number;
    is_published: boolean;
    unit_id: string | null;
    domain_id: string | null;
  } | null;

  const initial = {
    slug: mod?.slug ?? "",
    titleEs: mod?.title?.["es"] ?? "",
    titleEn: mod?.title?.["en"] ?? "",
    descriptionEs: mod?.description?.["es"] ?? "",
    descriptionEn: mod?.description?.["en"] ?? "",
    canDoStatements: (mod?.can_do_statements ?? []).join("\n"),
    orderIndex: mod?.order_index ?? 1,
    isPublished: mod?.is_published ?? false,
    unitId: mod?.unit_id ?? null,
    domainId: mod?.domain_id ?? null,
  };

  const { data: lessons } = !isNew
    ? await supabase
        .from("lessons")
        .select("id, slug, title, order_index, is_published")
        .eq("module_id", moduleId)
        .order("order_index")
    : { data: [] };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href="/admin/modules"
          className="text-[13px] text-[#AAAAAA] hover:text-[#555555] transition-colors mb-3 inline-block"
        >
          ← Módulos
        </Link>
        <h1 className="text-[22px] font-semibold text-[#111111]">
          {isNew ? "Nuevo módulo" : "Editar módulo"}
        </h1>
      </div>

      <ModuleForm moduleId={isNew ? null : moduleId} initial={initial} units={units} domains={domains} />

      {!isNew && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-semibold text-[#111111]">Lecciones</h2>
            <Link href={`/admin/lessons/new?moduleId=${moduleId}`}>
              <Button size="sm">+ Nueva lección</Button>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {(lessons ?? []).map((lesson) => {
              const title = (lesson.title as Record<string, string> | null)?.["es"] ?? "";
              return (
                <Link key={lesson.id} href={`/admin/lessons/${lesson.id}`}>
                  <Card className="hover:shadow-md transition-shadow duration-150">
                    <CardContent className="py-3 flex items-center justify-between gap-4">
                      <p className="text-[14px] font-medium text-[#111111]">
                        {lesson.order_index}. {title || lesson.slug}
                      </p>
                      <Badge variant={lesson.is_published ? "success" : "warning"}>
                        {lesson.is_published ? "Publicado" : "Borrador"}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
            {(lessons ?? []).length === 0 && (
              <Card>
                <CardContent className="text-center py-8 text-[14px] text-[#999999]">
                  No hay lecciones todavía.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
