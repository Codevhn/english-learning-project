import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/Card";
import { DomainCard } from "@/components/domains/DomainCard";
import { MASTERY_THRESHOLD } from "@/lib/mastery";
import { DOMAIN_UNLOCK_MASTERED_LESSONS } from "@/lib/domains";
import { Lock } from "lucide-react";

export const metadata: Metadata = { title: "Rutas de Enfoque — Parlo" };

export default async function EnfoquesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [masteredResult, domainsResult, selectionsResult] = await Promise.all([
    supabase
      .from("user_progress")
      .select("id", { count: "exact", head: true })
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

  const masteredCount = masteredResult.count ?? 0;
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
      </div>

      {!unlocked ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5 text-[#9CA3AF]" strokeWidth={2} />
            </div>
            <p className="text-[16px] font-medium text-[#111111] mb-1">
              Todavía no están disponibles
            </p>
            <p className="text-[14px] text-[#777777] max-w-sm mx-auto">
              Necesitas dominar al menos {DOMAIN_UNLOCK_MASTERED_LESSONS}{" "}
              lecciones de tu curso principal para desbloquear las Rutas de
              Enfoque — así tienes la gramática base para usarlas. Llevas{" "}
              {masteredCount}/{DOMAIN_UNLOCK_MASTERED_LESSONS}.
            </p>
          </CardContent>
        </Card>
      ) : domains.length > 0 ? (
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
              />
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-[15px] text-[#555555]">
              Todavía no hay rutas de enfoque disponibles. Vuelve pronto.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
