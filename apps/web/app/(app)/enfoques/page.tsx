import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { DomainCard } from "@/components/domains/DomainCard";
import { MASTERY_THRESHOLD } from "@/lib/mastery";
import { DOMAIN_UNLOCK_MASTERED_LESSONS } from "@/lib/domains";

export const metadata: Metadata = { title: "Rutas de Enfoque — Parlo" };

export default async function EnfoquesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [masteredResult, domainsResult, selectionsResult] = await Promise.all([
    // Rutas de Enfoque lessons (lessons.unit_id is null) must never count
    // toward unlocking Rutas de Enfoque — filtered in JS below.
    supabase
      .from("user_progress")
      .select("id, score, lessons(unit_id)")
      .eq("user_id", user!.id)
      .eq("status", "completed")
      .gte("score", MASTERY_THRESHOLD),
    supabase
      .from("domains")
      .select("id, slug, title, description, icon")
      .eq("is_published", true)
      .order("order_index"),
    supabase.from("user_domains").select("domain_id").eq("user_id", user!.id),
  ]);

  const masteredProgress = (masteredResult.data ?? []) as {
    lessons: { unit_id: string | null } | null;
  }[];
  const masteredCount = masteredProgress.filter(
    (p) => p.lessons?.unit_id != null
  ).length;
  const unlocked = masteredCount >= DOMAIN_UNLOCK_MASTERED_LESSONS;
  const domains = (domainsResult.data ?? []) as {
    id: string;
    slug: string;
    title: Record<string, string>;
    description: Record<string, string>;
    icon: string;
  }[];
  const selectedIds = new Set(
    (selectionsResult.data ?? []).map((d) => d.domain_id)
  );

  // Which domains actually have published lessons yet — the rest render
  // as "Próximamente" even once the feature itself is unlocked.
  const domainIds = domains.map((d) => d.id);
  const { data: domainModules } =
    domainIds.length > 0
      ? await supabase
          .from("modules")
          .select("id, domain_id")
          .in("domain_id", domainIds)
          .eq("is_published", true)
      : { data: [] };
  const moduleIds = (domainModules ?? []).map((m) => m.id);
  const { data: domainLessons } =
    moduleIds.length > 0
      ? await supabase
          .from("lessons")
          .select("module_id")
          .in("module_id", moduleIds)
          .eq("is_published", true)
      : { data: [] };
  const modulesWithLessons = new Set(
    (domainLessons ?? []).map((l) => l.module_id)
  );
  const domainsWithContent = new Set(
    (domainModules ?? [])
      .filter((m) => modulesWithLessons.has(m.id))
      .map((m) => m.domain_id)
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[28px] font-semibold text-[#111111] tracking-tight">
          Rutas de Enfoque
        </h1>
        <p className="text-[15px] text-[#555555] mt-1 max-w-xl">
          Vocabulario extra para tu profesión o intereses, en paralelo a tu
          curso principal. Elige uno o varios — no bloquean ni reemplazan tu
          progreso en el camino de niveles.
        </p>
        {!unlocked && (
          <p className="text-[13px] text-[#999999] mt-2">
            Se desbloquean con {DOMAIN_UNLOCK_MASTERED_LESSONS} lecciones
            dominadas en tu curso principal — llevas {masteredCount}/
            {DOMAIN_UNLOCK_MASTERED_LESSONS}.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {domains.map((domain) => {
          const title = domain.title?.["es"] ?? domain.title?.["en"] ?? "";
          const description =
            domain.description?.["es"] ?? domain.description?.["en"] ?? "";
          return (
            <DomainCard
              key={domain.id}
              domainId={domain.id}
              slug={domain.slug}
              title={title}
              description={description}
              icon={domain.icon}
              initiallySelected={selectedIds.has(domain.id)}
              globallyUnlocked={unlocked}
              hasContent={domainsWithContent.has(domain.id)}
              masteredCount={masteredCount}
              requiredCount={DOMAIN_UNLOCK_MASTERED_LESSONS}
            />
          );
        })}
      </div>
    </div>
  );
}
