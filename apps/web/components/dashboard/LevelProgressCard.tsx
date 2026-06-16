import { xpToLevel } from "@/lib/levels";

export function LevelProgressCard({ totalXp }: { totalXp: number }) {
  const { level, label, nextLevelXp, progress, colors } = xpToLevel(totalXp);

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[6px] p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[12px] text-[#999999] uppercase tracking-wide mb-1.5">
            Nivel
          </p>
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
              style={{ color: colors.text, backgroundColor: colors.bg }}
            >
              {level}
            </span>
            <span className="text-[20px] font-semibold text-[#111111]">
              {label}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p
            className="text-[28px] font-semibold tabular-nums leading-none"
            style={{ color: colors.text }}
          >
            {totalXp.toLocaleString()}
          </p>
          <p className="text-[12px] text-[#999999] mt-0.5">XP total</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-[4px] bg-[#E9ECEF] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: colors.text }}
          />
        </div>
        <span className="text-[12px] text-[#999999] whitespace-nowrap tabular-nums">
          {nextLevelXp.toLocaleString()} XP
        </span>
      </div>
    </div>
  );
}
