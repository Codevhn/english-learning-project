import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Admin — Parlo" };

export default async function AdminPage() {
  const supabase = await createClient();

  const [modulesResult, lessonsResult, exercisesResult, domainsResult] =
    await Promise.all([
      supabase.from("modules").select("id", { count: "exact", head: true }),
      supabase.from("lessons").select("id", { count: "exact", head: true }),
      supabase.from("exercises").select("id", { count: "exact", head: true }),
      supabase.from("domains").select("id", { count: "exact", head: true }),
    ]);

  const stats = [
    { label: "Módulos", count: modulesResult.count ?? 0 },
    { label: "Lecciones", count: lessonsResult.count ?? 0 },
    { label: "Ejercicios", count: exercisesResult.count ?? 0 },
    { label: "Dominios", count: domainsResult.count ?? 0 },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[28px] font-semibold text-[#111111] tracking-tight">
          Panel de administración
        </h1>
        <p className="text-[15px] text-[#555555] mt-1">
          Crea y edita módulos, lecciones, ejercicios y rutas de enfoque sin
          escribir SQL.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="text-center py-5">
              <p className="text-[26px] font-semibold text-[#111111]">
                {s.count}
              </p>
              <p className="text-[12px] text-[#999999] uppercase tracking-wide mt-1">
                {s.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Link href="/admin/modules/new">
          <Button>+ Nuevo módulo</Button>
        </Link>
        <Link href="/admin/domains/new">
          <Button variant="secondary">+ Nuevo dominio</Button>
        </Link>
      </div>
    </div>
  );
}
