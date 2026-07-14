"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { DomainIcon } from "@/lib/domainIcons";

const DOMAIN_ICON_NAMES = ["Code2", "Briefcase", "Plane", "ChefHat", "Network"];

interface DomainFormProps {
  domainId: string | null;
  initial: {
    slug: string;
    titleEs: string;
    titleEn: string;
    descriptionEs: string;
    descriptionEn: string;
    icon: string;
    orderIndex: number;
    isPublished: boolean;
  };
}

export function DomainForm({ domainId, initial }: DomainFormProps) {
  const router = useRouter();
  const [slug, setSlug] = useState(initial.slug);
  const [titleEs, setTitleEs] = useState(initial.titleEs);
  const [titleEn, setTitleEn] = useState(initial.titleEn);
  const [descriptionEs, setDescriptionEs] = useState(initial.descriptionEs);
  const [descriptionEn, setDescriptionEn] = useState(initial.descriptionEn);
  const [icon, setIcon] = useState(initial.icon || DOMAIN_ICON_NAMES[0]);
  const [orderIndex, setOrderIndex] = useState(initial.orderIndex);
  const [isPublished, setIsPublished] = useState(initial.isPublished);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setError(null);
    if (!slug.trim() || !titleEs.trim()) {
      setError("Slug y título en español son obligatorios.");
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const payload = {
      slug: slug.trim(),
      title: { es: titleEs, en: titleEn },
      description: { es: descriptionEs, en: descriptionEn },
      icon,
      order_index: orderIndex,
      is_published: isPublished,
    };

    if (domainId) {
      const { error: err } = await supabase.from("domains").update(payload).eq("id", domainId);
      setSaving(false);
      if (err) {
        setError(err.message);
        return;
      }
      router.refresh();
    } else {
      const { data, error: err } = await supabase
        .from("domains")
        .insert(payload)
        .select("id")
        .single();
      setSaving(false);
      if (err || !data) {
        setError(err?.message ?? "No se pudo crear el dominio.");
        return;
      }
      router.push(`/admin/domains/${data.id}`);
    }
  }

  async function handleDelete() {
    if (!domainId) return;
    if (!confirm("¿Eliminar este dominio? Se borrarán también sus módulos, lecciones y ejercicios.")) return;
    setSaving(true);
    const supabase = createClient();
    const { error: err } = await supabase.from("domains").delete().eq("id", domainId);
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.push("/admin/domains");
  }

  return (
    <div className="flex flex-col gap-4 max-w-xl">
      {error && (
        <p className="text-[13px] text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] rounded-[6px] px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#111111]">Ícono</label>
        <div className="flex gap-2">
          {DOMAIN_ICON_NAMES.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setIcon(name)}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                icon === name
                  ? "border-[#1D4ED8] bg-[#EEF2FF]"
                  : "border-[#E5E5E5] bg-white hover:bg-[#F8F8F8]"
              }`}
            >
              <DomainIcon name={name} className={`w-5 h-5 ${icon === name ? "text-[#1D4ED8]" : "text-[#777777]"}`} />
            </button>
          ))}
        </div>
      </div>

      <Input label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="mi-dominio" />
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
        Publicado (visible en el grid de Enfoques)
      </label>

      <div className="flex gap-3 mt-2">
        <Button onClick={handleSave} loading={saving}>
          {domainId ? "Guardar cambios" : "Crear dominio"}
        </Button>
        {domainId && (
          <Button variant="danger" onClick={handleDelete} disabled={saving}>
            Eliminar
          </Button>
        )}
      </div>
    </div>
  );
}
