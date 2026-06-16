import Link from "next/link";
import { BookOpen, CheckCircle2 } from "lucide-react";

export function ReviewCard({ reviewCount }: { reviewCount: number }) {
  const active = reviewCount > 0;

  return (
    <div
      className={`rounded-[6px] border p-5 ${
        active
          ? "bg-[#EFF6FF] border-[#BFDBFE]"
          : "bg-white border-[#E5E5E5]"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12px] text-[#999999] uppercase tracking-wide mb-1.5">
            Repasos
          </p>
          <div className="flex items-baseline gap-1">
            <span
              className={`text-[32px] font-semibold tabular-nums leading-none ${
                active ? "text-[#1D4ED8]" : "text-[#111111]"
              }`}
            >
              {reviewCount}
            </span>
            <span className="text-[14px] text-[#777777] ml-1">
              {reviewCount !== 1 ? "pendientes" : "pendiente"}
            </span>
          </div>
        </div>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            active ? "bg-[#DBEAFE]" : "bg-[#F1F3F5]"
          }`}
        >
          {active ? (
            <BookOpen className="w-5 h-5 text-[#1D4ED8]" strokeWidth={2} />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-[#AAAAAA]" strokeWidth={2} />
          )}
        </div>
      </div>
      {active ? (
        <Link
          href="/practice"
          className="mt-3 block text-[13px] font-medium text-[#1D4ED8] hover:underline"
        >
          Ir a practicar →
        </Link>
      ) : (
        <p className="text-[12px] text-[#999999] mt-3">Todo al día</p>
      )}
    </div>
  );
}
