"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { JsonField } from "@/components/admin/JsonField";
import { ExercisePreview } from "@/components/admin/ExercisePreview";
import { EXERCISE_TYPE_REFERENCE, EXERCISE_TYPES } from "@/lib/exerciseTypeReference";
import type { ExerciseType, Json } from "@/types/database";

interface ExerciseFormProps {
  exerciseId: string | null;
  lessonId: string;
  initial: {
    orderIndex: number;
    exerciseType: string;
    promptJson: string;
    correctAnswerJson: string;
    distractorsJson: string;
    explanationJson: string;
    tags: string;
  };
}

function tryParse(text: string): { value: unknown; error: string | null } {
  if (!text.trim()) return { value: null, error: null };
  try {
    return { value: JSON.parse(text), error: null };
  } catch (e) {
    return { value: null, error: e instanceof Error ? e.message : "JSON inválido" };
  }
}

export function ExerciseForm({ exerciseId, lessonId, initial }: ExerciseFormProps) {
  const router = useRouter();
  const [orderIndex, setOrderIndex] = useState(initial.orderIndex);
  const [exerciseType, setExerciseType] = useState(initial.exerciseType);
  const [promptJson, setPromptJson] = useState(initial.promptJson);
  const [correctAnswerJson, setCorrectAnswerJson] = useState(initial.correctAnswerJson);
  const [distractorsJson, setDistractorsJson] = useState(initial.distractorsJson);
  const [explanationJson, setExplanationJson] = useState(initial.explanationJson);
  const [tags, setTags] = useState(initial.tags);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const spec = EXERCISE_TYPE_REFERENCE[exerciseType];

  const prompt = useMemo(() => tryParse(promptJson), [promptJson]);
  const correctAnswer = useMemo(() => tryParse(correctAnswerJson), [correctAnswerJson]);
  const distractors = useMemo(() => tryParse(distractorsJson), [distractorsJson]);
  const explanation = useMemo(() => tryParse(explanationJson), [explanationJson]);

  const previewKey = `${exerciseType}:${promptJson}:${correctAnswerJson}:${distractorsJson}`;

  function loadExample() {
    setPromptJson(spec.promptExample);
    setCorrectAnswerJson(spec.correctAnswerExample);
    setDistractorsJson(spec.distractorsExample === "null" ? "" : spec.distractorsExample);
  }

  async function handleSave() {
    setFormError(null);
    if (prompt.error || correctAnswer.error || distractors.error || explanation.error) {
      setFormError("Corrige los errores de JSON antes de guardar.");
      return;
    }
    if (!prompt.value || !correctAnswer.value) {
      setFormError("prompt y correct_answer no pueden estar vacíos.");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const payload = {
      lesson_id: lessonId,
      order_index: orderIndex,
      exercise_type: exerciseType as ExerciseType,
      prompt: prompt.value as Json,
      correct_answer: correctAnswer.value as Json,
      distractors: distractors.value as Json | null,
      explanation: explanation.value as Json | null,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    if (exerciseId) {
      const { error: err } = await supabase.from("exercises").update(payload).eq("id", exerciseId);
      setSaving(false);
      if (err) {
        setFormError(err.message);
        return;
      }
      router.refresh();
    } else {
      const { error: err } = await supabase.from("exercises").insert(payload);
      setSaving(false);
      if (err) {
        setFormError(err.message);
        return;
      }
      router.push(`/admin/lessons/${lessonId}`);
    }
  }

  async function handleDelete() {
    if (!exerciseId) return;
    if (!confirm("¿Eliminar este ejercicio?")) return;
    setSaving(true);
    const supabase = createClient();
    const { error: err } = await supabase.from("exercises").delete().eq("id", exerciseId);
    setSaving(false);
    if (err) {
      setFormError(err.message);
      return;
    }
    router.push(`/admin/lessons/${lessonId}`);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col gap-4">
        {formError && (
          <p className="text-[13px] text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] rounded-[6px] px-3 py-2">
            {formError}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#111111]">Tipo de ejercicio</label>
            <select
              value={exerciseType}
              onChange={(e) => setExerciseType(e.target.value)}
              className="h-10 rounded-[6px] border border-[#D1D1D1] px-3 text-[14px] text-[#111111]"
            >
              {EXERCISE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {EXERCISE_TYPE_REFERENCE[t].label}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Orden"
            type="number"
            value={orderIndex}
            onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="bg-[#F8F9FA] border border-[#E5E5E5] rounded-[6px] px-3 py-2.5 flex items-center justify-between gap-3">
          <p className="text-[12px] text-[#777777]">{spec.description}</p>
          <button
            type="button"
            onClick={loadExample}
            className="shrink-0 text-[12px] font-medium text-[#1D4ED8] hover:underline"
          >
            Cargar ejemplo
          </button>
        </div>

        <JsonField
          label="prompt"
          value={promptJson}
          onChange={setPromptJson}
          error={prompt.error}
          hint={spec.promptExample}
        />
        <JsonField
          label="correct_answer"
          value={correctAnswerJson}
          onChange={setCorrectAnswerJson}
          error={correctAnswer.error}
          hint={spec.correctAnswerExample}
        />
        <JsonField
          label={`distractors${spec.needsDistractors ? "" : " (opcional)"}`}
          value={distractorsJson}
          onChange={setDistractorsJson}
          error={distractors.error}
          hint={spec.distractorsExample}
          rows={2}
        />
        <JsonField
          label="explanation (opcional)"
          value={explanationJson}
          onChange={setExplanationJson}
          error={explanation.error}
          hint={`{"es": "..."}`}
          rows={2}
        />

        <Input
          label="Etiquetas / tags (separadas por coma, opcional)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="grammar:present_simple, vocab:family"
        />
        <p className="text-[12px] text-[#999999] -mt-3">
          Usadas por el examen de fin de nivel para agrupar los fallos por
          tema. No afectan a lecciones normales.
        </p>

        <div className="flex gap-3 mt-2">
          <Button onClick={handleSave} loading={saving}>
            {exerciseId ? "Guardar cambios" : "Crear ejercicio"}
          </Button>
          {exerciseId && (
            <Button variant="danger" onClick={handleDelete} disabled={saving}>
              Eliminar
            </Button>
          )}
        </div>
      </div>

      <div className="lg:sticky lg:top-6 self-start">
        <p className="text-[12px] text-[#999999] uppercase tracking-wide mb-2">
          Vista previa en vivo
        </p>
        <ExercisePreview
          exerciseType={exerciseType}
          prompt={prompt.value as Record<string, unknown> | null}
          correctAnswer={correctAnswer.value as Record<string, unknown> | null}
          distractors={distractors.value}
          previewKey={previewKey}
        />
      </div>
    </div>
  );
}
