import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DomainIcon } from "@/lib/domainIcons";

export const metadata: Metadata = { title: "Dominios — Admin" };

export default async function AdminDomainsPage() {
  const supabase = await createClient();
  const { data: domains } = await supabase
    .from("domains")
    .select("id, slug, title, icon, order_index, is_published")
    .order("order_index");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-semibold text-[#111111]">
          Dominios (Rutas de Enfoque)
        </h1>
        <Link href="/admin/domains/new">
          <Button size="sm">+ Nuevo dominio</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {(domains ?? []).map((domain) => {
          const title = (domain.title as Record<string, string> | null)?.["es"] ?? "";
          return (
            <Link key={domain.id} href={`/admin/domains/${domain.id}`}>
              <Card className="hover:shadow-md transition-shadow duration-150">
                <CardContent className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#EFF2FF] flex items-center justify-center shrink-0">
                      <DomainIcon name={domain.icon} className="w-4 h-4 text-[#1D4ED8]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-medium text-[#111111] truncate">
                        {title || domain.slug}
                      </p>
                      <p className="text-[12px] text-[#999999]">orden {domain.order_index}</p>
                    </div>
                  </div>
                  <Badge variant={domain.is_published ? "success" : "warning"}>
                    {domain.is_published ? "Publicado" : "Borrador"}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          );
        })}
        {(domains ?? []).length === 0 && (
          <Card>
            <CardContent className="text-center py-10 text-[14px] text-[#999999]">
              No hay dominios todavía.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
