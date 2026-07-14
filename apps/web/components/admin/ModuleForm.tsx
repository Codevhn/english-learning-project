"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface ParentOption {
  id: string;
  title: string;
}

interface ModuleFormProps {
  moduleId: string | null;
  initial: {
    slug: string;
    titleEs: string;
    titleEn: string;
    descriptionEs: string;
    descriptionEn: string;
    canDoStatements: string;
    orderIndex: number;
    isPublished: boolean;
    unitId: string | null;
    domainId: string | null;
  };
  units: ParentOption[];
  domains: ParentOption[];
}

export function ModuleForm({ moduleId, initial, units, domains }: ModuleFormProps) {
  const router = useRouter();
  const [parentType, setParentType] = useState<"unit" | "domain">(
    initial.domainId ? "domain" : "unit"
  );
  const [parentId, setParentId] = useState(
    initial.unitId ?? initial.domainId ?? units[0]?.id ?? ""
  );
  const [slug, setSlug] = useState(initial.slug);
  const [titleEs, setTitleEs] = useState(initial.titleEs);
  const [titleEn, setTitleEn] = useState(initial.titleEn);
  const [descriptionEs, setDescriptionEs] = useState(initial.descriptionEs);
  const [descriptionEn, setDescriptionEn] = useState(initial.descriptionEn);
  const [canDoStatements, setCanDoStatements] = useState(initial.canDoStatements);
  const [orderIndex, setOrderIndex] = useState(initial.orderIndex);
  const [isPublished, setIsPublished] = useState(initial.isPublished);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setError(null);
    if (!slug.trim() || !titleEs.trim() || !parentId) {
      setError("Slug, título en español y padre (unidad o dominio) son obligatorios.");
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const payload = {
      slug: slug.trim(),
      title: { es: titleEs, en: titleEn },
      description: { es: descriptionEs, en: descriptionEn },
      can_do_statements: canDoStatements
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      order_index: orderIndex,
      is_published: isPublished,
      unit_id: parentType === "unit" ? parentId : null,
      domain_id: parentType === "domain" ? parentId : null,
    };

    if (moduleId) {
      const { error: err } = await supabase
        .from("modules")
        .update(payload)
        .eq("id", moduleId);
      setSaving(false);
      if (err) {
        setError(err.message);
        return;
      }
      router.refresh();
    } else {
      const { data, error: err } = await supabase
        .from("modules")
        .insert(payload)
        .select("id")
        .single();
      setSaving(false);
      if (err || !data) {
        setError(err?.message ?? "No se pudo crear el módulo.");
        return;
      }
      router.push(`/admin/modules/${data.id}`);
    }
  }

  async function handleDelete() {
    if (!moduleId) return;
    if (!confirm("¿Eliminar este módulo? Se borrarán también sus lecciones y ejercicios.")) return;
    setSaving(true);
    const supabase = createClient();
    const { error: err } = await supabase.from("modules").delete().eq("id", moduleId);
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.push("/admin/modules");
  }

  return (
    <div className="flex flex-col gap-4 max-w-xl">
      {error && (
        <p className="text-[13px] text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] rounded-[6px] px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#111111]">Pertenece a</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setParentType("unit");
              setParentId(units[0]?.id ?? "");
            }}
            className={`flex-1 py-2 rounded-[4px] border text-[13px] font-medium transition-colors ${
              parentType === "unit"
                ? "border-[#1D4ED8] bg-[#EEF2FF] text-[#1D4ED8]"
                : "border-[#E5E5E5] bg-white text-[#555555]"
            }`}
          >
            Unidad (camino CEFR)
          </button>
          <button
            type="button"
            onClick={() => {
              setParentType("domain");
              setParentId(domains[0]?.id ?? "");
            }}
            className={`flex-1 py-2 rounded-[4px] border text-[13px] font-medium transition-colors ${
              parentType === "domain"
                ? "border-[#1D4ED8] bg-[#EEF2FF] text-[#1D4ED8]"
                : "border-[#E5E5E5] bg-white text-[#555555]"
            }`}
          >
            Dominio (Ruta de Enfoque)
          </button>
        </div>
        <select
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          className="h-10 rounded-[6px] border border-[#D1D1D1] px-3 text-[14px] text-[#111111]"
        >
          {(parentType === "unit" ? units : domains).map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.title}
            </option>
          ))}
        </select>
      </div>

      <Input label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="mi-modulo" />
      <Input label="Título (español)" value={titleEs} onChange={(e) => setTitleEs(e.target.value)} />
      <Input label="Título (inglés)" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#111111]">Descripción (español)</label>
        <textarea
          value={descriptionEs}
          onChange={(e) => setDescriptionEs(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 rounded-[6px] border border-[#D1D1D1] text-[14px] text-[#111111]"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#111111]">Descripción (inglés)</label>
        <textarea
          value={descriptionEn}
          onChange={(e) => setDescriptionEn(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 rounded-[6px] border border-[#D1D1D1] text-[14px] text-[#111111]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#111111]">
          Puedo hacer (una afirmación por línea)
        </label>
        <textarea
          value={canDoStatements}
          onChange={(e) => setCanDoStatements(e.target.value)}
          rows={4}
          placeholder={"Puedo presentarme usando am/is/are.\nPuedo describir cómo es alguien o algo."}
          className="w-full px-3 py-2 rounded-[6px] border border-[#D1D1D1] text-[14px] text-[#111111]"
        />
        <p className="text-[12px] text-[#999999]">
          Solo relevante para módulos de una Unidad (CEFR) — se muestran en el
          perfil del estudiante al dominar este módulo.
        </p>
      </div>

      <Input
        label="Orden (order_index)"
        type="number"
        value={orderIndex}
        onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)}
      />

      <label className="flex items-center gap-2 text-[14px] text-[#111111]">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="w-4 h-4"
        />
        Publicado (visible para estudiantes)
      </label>

      <div className="flex gap-3 mt-2">
        <Button onClick={handleSave} loading={saving}>
          {moduleId ? "Guardar cambios" : "Crear módulo"}
        </Button>
        {moduleId && (
          <Button variant="danger" onClick={handleDelete} disabled={saving}>
            Eliminar
          </Button>
        )}
      </div>
    </div>
  );
}
