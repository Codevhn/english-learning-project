import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Módulos — Admin" };

export default async function AdminModulesPage() {
  const supabase = await createClient();

  const [modulesResult, unitsResult, domainsResult] = await Promise.all([
    supabase
      .from("modules")
      .select("id, slug, title, order_index, is_published, unit_id, domain_id")
      .order("unit_id")
      .order("domain_id")
      .order("order_index"),
    supabase.from("units").select("id, title"),
    supabase.from("domains").select("id, title"),
  ]);

  const modules = modulesResult.data ?? [];
  const unitTitles = new Map(
    (unitsResult.data ?? []).map((u) => [
      u.id,
      (u.title as Record<string, string> | null)?.["es"] ?? "",
    ])
  );
  const domainTitles = new Map(
    (domainsResult.data ?? []).map((d) => [
      d.id,
      (d.title as Record<string, string> | null)?.["es"] ?? "",
    ])
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-semibold text-[#111111]">Módulos</h1>
        <Link href="/admin/modules/new">
          <Button size="sm">+ Nuevo módulo</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {modules.map((mod) => {
          const title = (mod.title as Record<string, string> | null)?.["es"] ?? "";
          const parent = mod.unit_id
            ? unitTitles.get(mod.unit_id) ?? "Unidad"
            : domainTitles.get(mod.domain_id ?? "") ?? "Dominio";
          return (
            <Link key={mod.id} href={`/admin/modules/${mod.id}`}>
              <Card className="hover:shadow-md transition-shadow duration-150">
                <CardContent className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <Badge variant={mod.unit_id ? "outline" : "default"}>
                      {mod.unit_id ? "CEFR" : "Enfoque"}
                    </Badge>
                    <div className="min-w-0">
                      <p className="text-[14px] font-medium text-[#111111] truncate">
                        {title || mod.slug}
                      </p>
                      <p className="text-[12px] text-[#999999]">
                        {parent} · orden {mod.order_index}
                      </p>
                    </div>
                  </div>
                  <Badge variant={mod.is_published ? "success" : "warning"}>
                    {mod.is_published ? "Publicado" : "Borrador"}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          );
        })}
        {modules.length === 0 && (
          <Card>
            <CardContent className="text-center py-10 text-[14px] text-[#999999]">
              No hay módulos todavía.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
