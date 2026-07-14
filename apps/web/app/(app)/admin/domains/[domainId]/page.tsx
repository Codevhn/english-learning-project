import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DomainForm } from "@/components/admin/DomainForm";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Props {
  params: Promise<{ domainId: string }>;
}

export const metadata: Metadata = { title: "Dominio — Admin" };

export default async function AdminDomainDetailPage({ params }: Props) {
  const { domainId } = await params;
  const isNew = domainId === "new";
  const supabase = await createClient();

  const domainResult = isNew
    ? { data: null }
    : await supabase.from("domains").select("*").eq("id", domainId).single();

  if (!isNew && !domainResult.data) notFound();

  const domain = domainResult.data as {
    id: string;
    slug: string;
    title: Record<string, string> | null;
    description: Record<string, string> | null;
    icon: string;
    order_index: number;
    is_published: boolean;
  } | null;

  const initial = {
    slug: domain?.slug ?? "",
    titleEs: domain?.title?.["es"] ?? "",
    titleEn: domain?.title?.["en"] ?? "",
    descriptionEs: domain?.description?.["es"] ?? "",
    descriptionEn: domain?.description?.["en"] ?? "",
    icon: domain?.icon ?? "Code2",
    orderIndex: domain?.order_index ?? 1,
    isPublished: domain?.is_published ?? false,
  };

  const { data: modules } = !isNew
    ? await supabase
        .from("modules")
        .select("id, title, order_index, is_published")
        .eq("domain_id", domainId)
        .order("order_index")
    : { data: [] };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href="/admin/domains"
          className="text-[13px] text-[#AAAAAA] hover:text-[#555555] transition-colors mb-3 inline-block"
        >
          ← Dominios
        </Link>
        <h1 className="text-[22px] font-semibold text-[#111111]">
          {isNew ? "Nuevo dominio" : "Editar dominio"}
        </h1>
      </div>

      <DomainForm domainId={isNew ? null : domainId} initial={initial} />

      {!isNew && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-semibold text-[#111111]">Módulos</h2>
            <Link href="/admin/modules/new">
              <Button size="sm">+ Nuevo módulo</Button>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {(modules ?? []).map((mod) => {
              const title = (mod.title as Record<string, string> | null)?.["es"] ?? "";
              return (
                <Link key={mod.id} href={`/admin/modules/${mod.id}`}>
                  <Card className="hover:shadow-md transition-shadow duration-150">
                    <CardContent className="py-3 flex items-center justify-between gap-4">
                      <p className="text-[14px] font-medium text-[#111111]">
                        {mod.order_index}. {title}
                      </p>
                      <Badge variant={mod.is_published ? "success" : "warning"}>
                        {mod.is_published ? "Publicado" : "Borrador"}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
            {(modules ?? []).length === 0 && (
              <Card>
                <CardContent className="text-center py-8 text-[14px] text-[#999999]">
                  Este dominio todavía no tiene módulos.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
