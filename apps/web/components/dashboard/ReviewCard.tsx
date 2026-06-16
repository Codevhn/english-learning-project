import Link from "next/link";

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
        <span className="text-[32px] leading-none mt-1">
          {active ? "📚" : "✅"}
        </span>
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
