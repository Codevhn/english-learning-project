"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Lock, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { DomainIcon } from "@/lib/domainIcons";

interface DomainCardProps {
  domainId: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  initiallySelected: boolean;
  globallyUnlocked: boolean;
  hasContent: boolean;
  masteredCount: number;
  requiredCount: number;
}

export function DomainCard({
  domainId,
  slug,
  title,
  description,
  icon,
  initiallySelected,
  globallyUnlocked,
  hasContent,
  masteredCount,
  requiredCount,
}: DomainCardProps) {
  const [selected, setSelected] = useState(initiallySelected);
  const [saving, setSaving] = useState(false);

  const locked = !globallyUnlocked;
  const comingSoon = globallyUnlocked && !hasContent;
  const available = globallyUnlocked && hasContent;

  async function handleToggle() {
    if (saving) return;
    const next = !selected;
    setSelected(next);
    setSaving(true);
    try {
      await fetch("/api/domains/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domainId, selected: next }),
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className={cn(!available && "bg-[#FAFAFA]")}>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
              available ? "bg-[#EFF2FF]" : "bg-[#EEEEEE]"
            )}
          >
            <DomainIcon
              name={icon}
              className={cn(
                "w-5 h-5",
                available ? "text-[#1D4ED8]" : "text-[#AAAAAA]"
              )}
            />
          </div>
          {locked && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-[#999999]">
              <Lock className="w-3 h-3" strokeWidth={2.5} />
              Bloqueado
            </span>
          )}
          {comingSoon && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-[#B45309]">
              <Clock className="w-3 h-3" strokeWidth={2.5} />
              Próximamente
            </span>
          )}
          {available && selected && (
            <span className="flex items-center gap-1 text-[12px] font-medium text-[#16A34A]">
              <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
              Elegida
            </span>
          )}
        </div>
        <div>
          <p
            className={cn(
              "text-[16px] font-semibold leading-tight mb-1",
              available ? "text-[#111111]" : "text-[#777777]"
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              "text-[13px] leading-relaxed line-clamp-3",
              available ? "text-[#555555]" : "text-[#999999]"
            )}
          >
            {description}
          </p>
        </div>

        {locked ? (
          <div className="mt-1">
            <div className="h-[3px] bg-[#E9ECEF] rounded-full overflow-hidden mb-1.5">
              <div
                className="h-full bg-[#CCCCCC] transition-all"
                style={{
                  width: `${Math.min(100, (masteredCount / requiredCount) * 100)}%`,
                }}
              />
            </div>
            <p className="text-[12px] text-[#999999]">
              Se desbloquea con {requiredCount} lecciones dominadas — llevas{" "}
              {masteredCount}/{requiredCount}
            </p>
          </div>
        ) : comingSoon ? (
          <p className="text-[12px] text-[#B45309] mt-1">
            Estamos preparando este contenido. Vuelve pronto.
          </p>
        ) : (
          <div className="flex gap-2 mt-1">
            <Button
              variant={selected ? "secondary" : "primary"}
              size="sm"
              className="flex-1"
              onClick={handleToggle}
              disabled={saving}
            >
              {selected ? "Quitar" : "Elegir"}
            </Button>
            {selected && (
              <Link href={`/enfoques/${slug}`} className="flex-1">
                <Button size="sm" className="w-full">
                  Practicar
                </Button>
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
