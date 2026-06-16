import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Perfil",
};

function xpToLevel(xp: number): { level: number; label: string; nextLevelXp: number; progress: number } {
  const thresholds = [0, 100, 250, 500, 1000, 2000, 4000, 7000, 11000, 16000, 22000];
  const labels = ["Principiante", "Explorador", "Estudiante", "Aprendiz", "Practicante",
    "Intermedio", "Avanzado", "Experto", "Maestro", "Leyenda", "Leyenda"];

  let level = 0;
  for (let i = 0; i < thresholds.length - 1; i++) {
    if (xp >= thresholds[i]) level = i + 1;
  }
  level = Math.min(level, 10);

  const currentThreshold = thresholds[level - 1] ?? 0;
  const nextThreshold = thresholds[level] ?? thresholds[thresholds.length - 1];
  const progress = nextThreshold > currentThreshold
    ? Math.round(((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100)
    : 100;

  return { level, label: labels[level - 1] ?? "Principiante", nextLevelXp: nextThreshold, progress };
}

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [profileResult, statsResult, recentResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("display_name, username, created_at")
      .eq("id", user!.id)
      .single(),
    supabase
      .from("user_stats")
      .select("*")
      .eq("user_id", user!.id)
      .single(),
    supabase
      .from("user_progress")
      .select("lesson_id, score, completed_at, lessons(title)")
      .eq("user_id", user!.id)
      .eq("status", "completed")
      .order("completed_at", { ascending: false })
      .limit(5),
  ]);

  const profile = profileResult.data;
  const stats = statsResult.data;
  const recent = recentResult.data ?? [];

  const totalXp = stats?.total_xp ?? 0;
  const { level, label, nextLevelXp, progress } = xpToLevel(totalXp);
  const streak = stats?.current_streak ?? 0;
  const longestStreak = stats?.longest_streak ?? 0;
  const lessonsCompleted = stats?.total_lessons_completed ?? 0;
  const joinDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("es-ES", { month: "long", year: "numeric" })
    : "";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-semibold text-[#111111] tracking-tight">
            {profile?.display_name ?? "Estudiante"}
          </h1>
          <p className="text-[14px] text-[#999999] mt-0.5">
            @{profile?.username} · Se unió en {joinDate}
          </p>
        </div>
        <Badge>{label}</Badge>
      </div>

      {/* Level + XP */}
      <Card>
        <CardContent className="py-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[13px] text-[#999999]">Nivel {level}</p>
              <p className="text-[17px] font-semibold text-[#111111]">{label}</p>
            </div>
            <div className="text-right">
              <p className="text-[13px] text-[#999999]">XP total</p>
              <p className="text-[17px] font-semibold text-[#111111] tabular-nums">
                {totalXp.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="h-[4px] bg-[#F1F3F5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1D4ED8] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[12px] text-[#AAAAAA] mt-2">
            {totalXp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP para nivel {level + 1}
          </p>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Racha actual", value: `${streak} día${streak === 1 ? "" : "s"}` },
          { label: "Mejor racha", value: `${longestStreak} día${longestStreak === 1 ? "" : "s"}` },
          { label: "Lecciones", value: lessonsCompleted.toString() },
          { label: "XP total", value: totalXp.toLocaleString() },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardContent className="py-4">
              <p className="text-[12px] text-[#999999] mb-1">{label}</p>
              <p className="text-[22px] font-semibold text-[#111111] tabular-nums">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent activity */}
      {recent.length > 0 && (
        <div>
          <h2 className="text-[17px] font-semibold text-[#111111] mb-3">
            Actividad reciente
          </h2>
          <div className="flex flex-col gap-2">
            {recent.map((item) => {
              const titleObj = (item.lessons as any)?.title as Record<string, string> | null;
              const title = titleObj?.["es"] ?? titleObj?.["en"] ?? "Lección";
              const date = item.completed_at
                ? new Date(item.completed_at).toLocaleDateString("es-ES", {
                    day: "numeric", month: "short",
                  })
                : "";
              return (
                <Card key={item.lesson_id}>
                  <CardContent className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#16A34A] shrink-0" />
                      <p className="text-[14px] text-[#111111]">{title}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[13px] text-[#999999]">{item.score}%</span>
                      <span className="text-[12px] text-[#CCCCCC]">{date}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
