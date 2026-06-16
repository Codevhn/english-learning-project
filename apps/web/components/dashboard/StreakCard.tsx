import { Flame } from "lucide-react";

export function StreakCard({
  currentStreak,
  longestStreak,
}: {
  currentStreak: number;
  longestStreak: number;
}) {
  const active = currentStreak > 0;

  return (
    <div
      className={`rounded-[6px] border p-5 ${
        active
          ? "bg-[#FFF7ED] border-[#FED7AA]"
          : "bg-white border-[#E5E5E5]"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12px] text-[#999999] uppercase tracking-wide mb-1.5">
            Racha
          </p>
          <div className="flex items-baseline gap-1">
            <span
              className={`text-[32px] font-semibold tabular-nums leading-none ${
                active ? "text-[#C2410C]" : "text-[#111111]"
              }`}
            >
              {currentStreak}
            </span>
            <span className="text-[14px] text-[#777777] ml-1">
              día{currentStreak !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            active ? "bg-[#FFEDD5]" : "bg-[#F1F3F5]"
          }`}
        >
          <Flame
            className={`w-5 h-5 ${active ? "text-[#C2410C]" : "text-[#AAAAAA]"}`}
            strokeWidth={2}
          />
        </div>
      </div>
      <p className="text-[12px] text-[#999999] mt-3">
        Mejor: {longestStreak} día{longestStreak !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
