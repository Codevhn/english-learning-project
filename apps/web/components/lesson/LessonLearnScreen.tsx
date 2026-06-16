"use client";

import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ExampleItem {
  label?: string;
  en: string;
  es: string;
}

interface Section {
  type: "explanation" | "table" | "examples" | "note";
  title?: string;
  text?: string;
  variant?: "info" | "warning" | "tip";
  headers?: string[];
  rows?: string[][];
  items?: ExampleItem[];
}

export interface TheoryContent {
  intro: string;
  sections: Section[];
}

interface Props {
  lessonTitle: string;
  theoryContent: TheoryContent;
  onComplete: () => void;
  onExit: () => void;
}

export function LessonLearnScreen({ lessonTitle, theoryContent, onComplete, onExit }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#F1F3F5] px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={onExit}
            className="text-[14px] text-[#AAAAAA] hover:text-[#555555] transition-colors"
          >
            ← Salir
          </button>
          <span className="text-[14px] font-medium text-[#111111]">{lessonTitle}</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 px-6 py-10">
        <div className="max-w-2xl mx-auto flex flex-col gap-8 font-serif">
          {/* Intro */}
          <p className="text-[18px] text-[#222222] leading-relaxed">
            {theoryContent.intro}
          </p>

          {/* Sections */}
          {theoryContent.sections.map((section, i) => (
            <div key={i} className="flex flex-col gap-3">
              {section.title && (
                <h3 className="text-[21px] font-semibold text-[#111111] tracking-tight">
                  {section.title}
                </h3>
              )}

              {section.type === "explanation" && (
                <p className="text-[16px] text-[#222222] leading-relaxed">
                  {section.text}
                </p>
              )}

              {section.type === "table" && section.headers && section.rows && (
                <div className="rounded-[8px] border border-[#E5E5E5] overflow-hidden font-sans">
                  <table className="w-full text-[14px]">
                    <thead>
                      <tr className="bg-[#F8F9FA] border-b border-[#E5E5E5]">
                        {section.headers.map((h, j) => (
                          <th
                            key={j}
                            className="px-4 py-3 text-left text-[11px] font-semibold text-[#999999] uppercase tracking-wide"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.rows.map((row, j) => (
                        <tr
                          key={j}
                          className="border-b border-[#F1F3F5] last:border-0 hover:bg-[#FAFAFA] transition-colors"
                        >
                          {row.map((cell, k) => (
                            <td
                              key={k}
                              className={`px-4 py-3 ${
                                k === 0
                                  ? "text-[13px] text-[#999999]"
                                  : k === 1
                                  ? "font-semibold text-[#111111]"
                                  : "text-[#1D4ED8] font-medium"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.type === "examples" && section.items && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {section.items.map((item, j) => (
                    <div
                      key={j}
                      className="rounded-[10px] border border-[#E9E9E9] bg-white px-5 py-4"
                    >
                      {item.label && (
                        <span className="inline-block font-sans text-[10px] font-semibold text-[#1D4ED8] bg-[#EEF2FF] rounded-full px-2.5 py-1 uppercase tracking-wide mb-2.5">
                          {item.label}
                        </span>
                      )}
                      <p className="text-[18px] text-[#111111] leading-snug">
                        {item.en}
                      </p>
                      <p className="font-sans text-[13px] text-[#999999] mt-2 pt-2 border-t border-[#F2F2F2]">
                        {item.es}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {section.type === "note" && section.text && (
                <div
                  className={`rounded-[10px] border px-4 py-3.5 flex items-start gap-3 ${
                    section.variant === "warning"
                      ? "bg-[#FFF7ED] border-[#FBDDB3]"
                      : section.variant === "tip"
                      ? "bg-[#EFF6FF] border-[#BFDBFE]"
                      : "bg-[#F8F9FA] border-[#E9E9E9]"
                  }`}
                >
                  {section.variant === "warning" ? (
                    <AlertTriangle
                      className="w-[18px] h-[18px] mt-0.5 shrink-0 text-[#C2410C]"
                      strokeWidth={2}
                    />
                  ) : section.variant === "tip" ? (
                    <Lightbulb
                      className="w-[18px] h-[18px] mt-0.5 shrink-0 text-[#1D4ED8]"
                      strokeWidth={2}
                    />
                  ) : (
                    <Info
                      className="w-[18px] h-[18px] mt-0.5 shrink-0 text-[#999999]"
                      strokeWidth={2}
                    />
                  )}
                  <p
                    className={`font-sans text-[14px] leading-relaxed ${
                      section.variant === "warning"
                        ? "text-[#92400E]"
                        : section.variant === "tip"
                        ? "text-[#1D4ED8]"
                        : "text-[#555555]"
                    }`}
                  >
                    {section.text}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Bottom spacer so content isn't hidden behind sticky button */}
          <div className="h-24" />
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 bg-white border-t border-[#F1F3F5] px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <Button onClick={onComplete} size="lg" className="w-full">
            Entendido — A practicar →
          </Button>
        </div>
      </div>
    </div>
  );
}
