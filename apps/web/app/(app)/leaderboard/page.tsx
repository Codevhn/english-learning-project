import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Ranking",
};

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: entries } = await supabase
    .from("user_stats")
    .select("user_id, total_xp, current_streak, profiles(display_name, username)")
    .order("total_xp", { ascending: false })
    .limit(50);

  const ranked = (entries ?? []).map((entry, i) => ({
    rank: i + 1,
    userId: entry.user_id,
    xp: entry.total_xp,
    streak: entry.current_streak,
    displayName:
      (entry.profiles as any)?.display_name ??
      (entry.profiles as any)?.username ??
      "Estudiante",
    isCurrentUser: entry.user_id === user?.id,
  }));

  const currentUserEntry = ranked.find((e) => e.isCurrentUser);
  const RANK_COLORS: Record<number, { bg: string; text: string }> = {
    1: { bg: "#FEF3C7", text: "#92400E" },
    2: { bg: "#F1F5F9", text: "#475569" },
    3: { bg: "#FFEDD5", text: "#C2410C" },
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[28px] font-semibold text-[#111111] tracking-tight">
          Ranking
        </h1>
        <p className="text-[15px] text-[#555555] mt-1">
          Clasificación por XP acumulado.
        </p>
      </div>

      {currentUserEntry && currentUserEntry.rank > 10 && (
        <Card className="border-[#1D4ED8] bg-[#EFF6FF]">
          <CardContent className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-semibold text-[#1D4ED8] tabular-nums w-6">
                #{currentUserEntry.rank}
              </span>
              <p className="text-[14px] font-medium text-[#1D4ED8]">
                {currentUserEntry.displayName} (tú)
              </p>
            </div>
            <div className="flex items-center gap-4">
              {currentUserEntry.streak > 0 && (
                <span className="text-[13px] text-[#555555]">
                  {currentUserEntry.streak}d
                </span>
              )}
              <span className="text-[14px] font-semibold text-[#1D4ED8] tabular-nums">
                {currentUserEntry.xp.toLocaleString()} XP
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {ranked.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-[15px] text-[#555555]">
              Aún no hay datos de ranking. Completa tu primera lección.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-2">
          {ranked.slice(0, 50).map((entry) => (
            <Card
              key={entry.userId}
              className={
                entry.isCurrentUser
                  ? "border-[#1D4ED8] bg-[#EFF6FF]"
                  : ""
              }
            >
              <CardContent className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {entry.rank <= 3 ? (
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[13px] font-semibold tabular-nums"
                      style={{
                        backgroundColor: RANK_COLORS[entry.rank].bg,
                        color: RANK_COLORS[entry.rank].text,
                      }}
                    >
                      {entry.rank}
                    </span>
                  ) : (
                    <span className="text-[14px] tabular-nums w-8 shrink-0 text-center text-[#999999]">
                      #{entry.rank}
                    </span>
                  )}
                  <p
                    className={`text-[14px] font-medium ${
                      entry.isCurrentUser ? "text-[#1D4ED8]" : "text-[#111111]"
                    }`}
                  >
                    {entry.displayName}
                    {entry.isCurrentUser && (
                      <span className="ml-1 text-[#1D4ED8] font-normal">(tú)</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {entry.streak > 0 && (
                    <span className="text-[13px] text-[#999999] tabular-nums">
                      {entry.streak}d racha
                    </span>
                  )}
                  <span
                    className={`text-[14px] font-semibold tabular-nums ${
                      entry.isCurrentUser ? "text-[#1D4ED8]" : "text-[#111111]"
                    }`}
                  >
                    {entry.xp.toLocaleString()} XP
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
