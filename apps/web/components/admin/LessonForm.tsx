"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { JsonField } from "@/components/admin/JsonField";
import type { Json } from "@/types/database";

const LESSON_TYPES = [
  "vocabulary",
  "grammar",
  "listening",
  "reading",
  "speaking",
  "mixed",
  "theory_practice",
  "conversation",
];

interface LessonFormProps {
  lessonId: string | null;
  moduleId: string;
  moduleUnitId: string | null;
  initial: {
    slug: string;
    titleEs: string;
    titleEn: string;
    descriptionEs: string;
    descriptionEn: string;
    lessonType: string;
    xpReward: number;
    estimatedMinutes: number;
    theoryContent: string;
    orderIndex: number;
    isPublished: boolean;
  };
}

export function LessonForm({ lessonId, moduleId, moduleUnitId, initial }: LessonFormProps) {
  const router = useRouter();
  const [slug, setSlug] = useState(initial.slug);
  const [titleEs, setTitleEs] = useState(initial.titleEs);
  const [titleEn, setTitleEn] = useState(initial.titleEn);
  const [descriptionEs, setDescriptionEs] = useState(initial.descriptionEs);
  const [descriptionEn, setDescriptionEn] = useState(initial.descriptionEn);
  const [lessonType, setLessonType] = useState(initial.lessonType);
  const [xpReward, setXpReward] = useState(initial.xpReward);
  const [estimatedMinutes, setEstimatedMinutes] = useState(initial.estimatedMinutes);
  const [theoryContent, setTheoryContent] = useState(initial.theoryContent);
  const [orderIndex, setOrderIndex] = useState(initial.orderIndex);
  const [isPublished, setIsPublished] = useState(initial.isPublished);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theoryError, setTheoryError] = useState<string | null>(null);

  async function handleSave() {
    setError(null);
    setTheoryError(null);
    if (!slug.trim() || !titleEs.trim()) {
      setError("Slug y título en español son obligatorios.");
      return;
    }

    let theoryJson: unknown = null;
    if (theoryContent.trim()) {
      try {
        theoryJson = JSON.parse(theoryContent);
      } catch {
        setTheoryError("JSON inválido en theory_content.");
        return;
      }
    }

    setSaving(true);
    const supabase = createClient();
    const payload = {
      module_id: moduleId,
      unit_id: moduleUnitId,
      slug: slug.trim(),
      title: { es: titleEs, en: titleEn },
      description: { es: descriptionEs, en: descriptionEn },
      lesson_type: lessonType,
      xp_reward: xpReward,
      estimated_minutes: estimatedMinutes,
      theory_content: theoryJson as Json | null,
      order_index: orderIndex,
      is_published: isPublished,
    };

    if (lessonId) {
      const { error: err } = await supabase.from("lessons").update(payload).eq("id", lessonId);
      setSaving(false);
      if (err) {
        setError(err.message);
        return;
      }
      router.refresh();
    } else {
      const { data, error: err } = await supabase
        .from("lessons")
        .insert(payload)
        .select("id")
        .single();
      setSaving(false);
      if (err || !data) {
        setError(err?.message ?? "No se pudo crear la lección.");
        return;
      }
      router.push(`/admin/lessons/${data.id}`);
    }
  }

  async function handleDelete() {
    if (!lessonId) return;
    if (!confirm("¿Eliminar esta lección? Se borrarán también sus ejercicios.")) return;
    setSaving(true);
    const supabase = createClient();
    const { error: err } = await supabase.from("lessons").delete().eq("id", lessonId);
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.push(`/admin/modules/${moduleId}`);
  }

  return (
    <div className="flex flex-col gap-4 max-w-xl">
      {error && (
        <p className="text-[13px] text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] rounded-[6px] px-3 py-2">
          {error}
        </p>
      )}

      <Input label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="mi-leccion" />
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

      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-[#111111]">Tipo</label>
          <select
            value={lessonType}
            onChange={(e) => setLessonType(e.target.value)}
            className="h-10 rounded-[6px] border border-[#D1D1D1] px-3 text-[14px] text-[#111111]"
          >
            {LESSON_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="XP"
          type="number"
          value={xpReward}
          onChange={(e) => setXpReward(parseInt(e.target.value) || 0)}
        />
        <Input
          label="Minutos"
          type="number"
          value={estimatedMinutes}
          onChange={(e) => setEstimatedMinutes(parseInt(e.target.value) || 0)}
        />
      </div>

      <JsonField
        label="Teoría (theory_content) — opcional, deja vacío para omitir"
        value={theoryContent}
        onChange={setTheoryContent}
        error={theoryError}
        rows={6}
        hint={`{"intro": "...", "sections": [{"type": "explanation"|"table"|"examples"|"note", ...}]}`}
      />

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
        Publicada (visible para estudiantes)
      </label>

      <div className="flex gap-3 mt-2">
        <Button onClick={handleSave} loading={saving}>
          {lessonId ? "Guardar cambios" : "Crear lección"}
        </Button>
        {lessonId && (
          <Button variant="danger" onClick={handleDelete} disabled={saving}>
            Eliminar
          </Button>
        )}
      </div>
    </div>
  );
}
