"use client";

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
}

export function LessonLearnScreen({ lessonTitle, theoryContent, onComplete }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#F1F3F5] px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#AAAAAA] uppercase tracking-widest">
            Aprender
          </span>
          <span className="text-[14px] font-medium text-[#111111]">{lessonTitle}</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 px-6 py-10">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
          {/* Intro */}
          <p className="text-[17px] text-[#333333] leading-relaxed">
            {theoryContent.intro}
          </p>

          {/* Sections */}
          {theoryContent.sections.map((section, i) => (
            <div key={i} className="flex flex-col gap-3">
              {section.title && (
                <h3 className="text-[11px] font-semibold text-[#AAAAAA] uppercase tracking-widest">
                  {section.title}
                </h3>
              )}

              {section.type === "explanation" && (
                <p className="text-[15px] text-[#333333] leading-relaxed">
                  {section.text}
                </p>
              )}

              {section.type === "table" && section.headers && section.rows && (
                <div className="rounded-[6px] border border-[#E5E5E5] overflow-hidden">
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
                <div className="flex flex-col gap-4">
                  {section.items.map((item, j) => (
                    <div key={j} className="border-l-[3px] border-[#1D4ED8] pl-4">
                      {item.label && (
                        <p className="text-[11px] font-semibold text-[#AAAAAA] uppercase tracking-wide mb-1">
                          {item.label}
                        </p>
                      )}
                      <p className="text-[17px] font-medium text-[#111111] leading-snug">
                        {item.en}
                      </p>
                      <p className="text-[14px] text-[#777777] mt-0.5">{item.es}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.type === "note" && section.text && (
                <div
                  className={`rounded-[6px] px-4 py-3.5 border-l-4 ${
                    section.variant === "warning"
                      ? "bg-[#FFF7ED] border-[#C2410C]"
                      : section.variant === "tip"
                      ? "bg-[#EFF6FF] border-[#1D4ED8]"
                      : "bg-[#F8F9FA] border-[#CCCCCC]"
                  }`}
                >
                  <p
                    className={`text-[14px] leading-relaxed ${
                      section.variant === "warning"
                        ? "text-[#92400E]"
                        : section.variant === "tip"
                        ? "text-[#1D4ED8]"
                        : "text-[#555555]"
                    }`}
                  >
                    <span className="mr-1.5">
                      {section.variant === "warning"
                        ? "⚠"
                        : section.variant === "tip"
                        ? "💡"
                        : "ℹ"}
                    </span>
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
