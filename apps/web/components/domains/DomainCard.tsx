"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DomainIcon } from "@/lib/domainIcons";

interface DomainCardProps {
  domainId: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  initiallySelected: boolean;
}

export function DomainCard({
  domainId,
  slug,
  title,
  description,
  icon,
  initiallySelected,
}: DomainCardProps) {
  const [selected, setSelected] = useState(initiallySelected);
  const [saving, setSaving] = useState(false);

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
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-full bg-[#EFF2FF] flex items-center justify-center shrink-0">
            <DomainIcon name={icon} className="w-5 h-5 text-[#1D4ED8]" />
          </div>
          {selected && (
            <span className="flex items-center gap-1 text-[12px] font-medium text-[#16A34A]">
              <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
              Elegida
            </span>
          )}
        </div>
        <div>
          <p className="text-[16px] font-semibold text-[#111111] leading-tight mb-1">
            {title}
          </p>
          <p className="text-[13px] text-[#555555] leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
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
      </CardContent>
    </Card>
  );
}
