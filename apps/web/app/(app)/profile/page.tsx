import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Check, Lock } from "lucide-react";
import { xpToLevel } from "@/lib/levels";
import { getAchievementIcon } from "@/lib/achievementIcons";
import { isMastered } from "@/lib/mastery";

export const metadata: Metadata = {
  title: "Perfil",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [
    profileResult,
    statsResult,
    recentResult,
    achievementsResult,
    unitsResult,
    modulesResult,
  ] = await Promise.all([
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
    supabase
      .from("user_achievements")
      .select("achievement_id, earned_at, achievements(slug, title, description, icon)")
      .eq("user_id", user!.id)
      .order("earned_at", { ascending: false }),
    supabase.from("units").select("id, cefr_level, order_index").order("order_index"),
    // Only CEFR-path modules (unit_id not null) — Rutas de Enfoque modules
    // don't carry can-do statements.
    supabase
      .from("modules")
      .select("id, unit_id, order_index, title, can_do_statements")
      .not("unit_id", "is", null)
      .eq("is_published", true)
      .order("order_index"),
  ]);

  const profile = profileResult.data;
  const stats = statsResult.data;
  const recent = recentResult.data ?? [];
  const achievements = achievementsResult.data ?? [];
  const units = unitsResult.data ?? [];
  const modules = modulesResult.data ?? [];

  const moduleIds = modules.map((m) => m.id);
  const { data: moduleLessons } =
    moduleIds.length > 0
      ? await supabase
          .from("lessons")
          .select("id, module_id")
          .in("module_id", moduleIds)
          .eq("is_published", true)
      : { data: [] };
  const lessonIds = (moduleLessons ?? []).map((l) => l.id);
  const { data: lessonProgress } =
    lessonIds.length > 0
      ? await supabase
          .from("user_progress")
          .select("lesson_id, status, score")
          .eq("user_id", user!.id)
          .in("lesson_id", lessonIds)
      : { data: [] };

  const progressByLesson = new Map(
    (lessonProgress ?? []).map((p) => [p.lesson_id, p])
  );
  const lessonsByModule = new Map<string, string[]>();
  for (const l of moduleLessons ?? []) {
    if (!lessonsByModule.has(l.module_id!)) lessonsByModule.set(l.module_id!, []);
    lessonsByModule.get(l.module_id!)!.push(l.id);
  }

  const cefrLevelByUnit = new Map(units.map((u) => [u.id, u.cefr_level]));
  const modulesByLevel = new Map<
    string,
    { title: string; statements: string[]; unlocked: boolean }[]
  >();
  for (const mod of modules) {
    const level = cefrLevelByUnit.get(mod.unit_id!) ?? "?";
    const statements = (mod.can_do_statements as string[] | null) ?? [];
    if (statements.length === 0) continue;
    const modLessonIds = lessonsByModule.get(mod.id) ?? [];
    const unlocked =
      modLessonIds.length > 0 &&
      modLessonIds.every((lid) => {
        const p = progressByLesson.get(lid);
        return p?.status === "completed" && isMastered(p.score);
      });
    const title = (mod.title as Record<string, string> | null)?.["es"] ?? "";
    if (!modulesByLevel.has(level)) modulesByLevel.set(level, []);
    modulesByLevel.get(level)!.push({ title, statements, unlocked });
  }

  const totalXp = stats?.total_xp ?? 0;
  const { level, label, nextLevelXp, progress, colors } = xpToLevel(totalXp);
  const streak = stats?.current_streak ?? 0;
  const longestStreak = stats?.longest_streak ?? 0;
  const lessonsCompleted = stats?.total_lessons_completed ?? 0;
  const joinDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("es-ES", {
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-semibold text-[#111111] tracking-tight">
            {profile?.display_name ?? "Estudiante"}
          </h1>
          <p className="text-[14px] text-[#999999] mt-0.5">
            @{profile?.username} · Se unió en {joinDate}
          </p>
        </div>
        <Badge
          style={{ backgroundColor: colors.bg, color: colors.text }}
          className="border-0"
        >
          {label}
        </Badge>
      </div>

      {/* Level + XP */}
      <Card>
        <CardContent className="py-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[13px] text-[#999999]">Nivel {level}</p>
              <p
                className="text-[17px] font-semibold"
                style={{ color: colors.text }}
              >
                {label}
              </p>
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
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: colors.text }}
            />
          </div>
          <p className="text-[12px] text-[#AAAAAA] mt-2">
            {totalXp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP para nivel {level + 1}
          </p>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Racha actual"
          value={`${streak} día${streak === 1 ? "" : "s"}`}
          valueBg="#FFF7ED"
          valueColor="#C2410C"
        />
        <StatCard
          label="Mejor racha"
          value={`${longestStreak} día${longestStreak === 1 ? "" : "s"}`}
          valueBg="#FFFBEB"
          valueColor="#92400E"
        />
        <StatCard
          label="Lecciones"
          value={lessonsCompleted.toString()}
          valueBg="#ECFDF5"
          valueColor="#059669"
        />
        <StatCard
          label="XP total"
          value={totalXp.toLocaleString()}
          valueBg="#EFF6FF"
          valueColor="#1D4ED8"
        />
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-[17px] font-semibold text-[#111111] mb-3">
          Logros{achievements.length > 0 ? ` (${achievements.length})` : ""}
        </h2>
        {achievements.length === 0 ? (
          <div className="rounded-[6px] border border-[#E5E5E5] bg-[#FAFAFA] py-8 text-center">
            <p className="text-[14px] text-[#999999]">
              Completa lecciones para desbloquear logros.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {achievements.map((ua) => {
              const ach = ua.achievements as any;
              const title = (ach?.title as Record<string, string>)?.es ?? "";
              const desc = (ach?.description as Record<string, string>)?.es ?? "";
              const Icon = getAchievementIcon(ach?.icon as string | undefined);
              const date = new Date(ua.earned_at).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
              });
              return (
                <div
                  key={ua.achievement_id}
                  className="rounded-[6px] border border-[#E5E5E5] bg-white px-4 py-3"
                  title={desc}
                >
                  <div className="w-9 h-9 rounded-full bg-[#FFFBEB] flex items-center justify-center mb-2">
                    <Icon className="w-[18px] h-[18px] text-[#D97706]" strokeWidth={2} />
                  </div>
                  <p className="text-[13px] font-semibold text-[#111111] leading-tight mb-0.5">
                    {title}
                  </p>
                  <p className="text-[11px] text-[#AAAAAA]">{date}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Can-do statements */}
      {modulesByLevel.size > 0 && (
        <div>
          <h2 className="text-[17px] font-semibold text-[#111111] mb-1">
            Lo que puedes hacer en inglés
          </h2>
          <p className="text-[13px] text-[#999999] mb-4">
            Se desbloquean al dominar cada módulo — así vas viendo tu progreso
            en habilidades reales, no solo en porcentajes.
          </p>
          <div className="flex flex-col gap-6">
            {Array.from(modulesByLevel.entries()).map(([level, mods]) => (
              <div key={level}>
                <div className="flex items-center gap-2 mb-2.5">
                  <Badge variant="outline">{level}</Badge>
                </div>
                <div className="flex flex-col gap-1.5">
                  {mods.flatMap((mod) =>
                    mod.statements.map((statement, i) => (
                      <div
                        key={`${mod.title}-${i}`}
                        className="flex items-center gap-2.5 py-1"
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            mod.unlocked
                              ? "bg-[#ECFDF5] text-[#16A34A]"
                              : "bg-[#F3F4F6] text-[#BBBBBB]"
                          }`}
                        >
                          {mod.unlocked ? (
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                          ) : (
                            <Lock className="w-2.5 h-2.5" strokeWidth={2.5} />
                          )}
                        </div>
                        <span
                          className={`text-[14px] ${
                            mod.unlocked ? "text-[#111111]" : "text-[#AAAAAA]"
                          }`}
                        >
                          {statement}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent activity */}
      {recent.length > 0 && (
        <div>
          <h2 className="text-[17px] font-semibold text-[#111111] mb-3">
            Actividad reciente
          </h2>
          <div className="flex flex-col gap-2">
            {recent.map((item) => {
              const titleObj = (item.lessons as any)?.title as Record<
                string,
                string
              > | null;
              const title = titleObj?.["es"] ?? titleObj?.["en"] ?? "Lección";
              const date = item.completed_at
                ? new Date(item.completed_at).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                  })
                : "";
              const score = item.score ?? 0;
              const scoreColor =
                score >= 80
                  ? "#059669"
                  : score >= 60
                  ? "#D97706"
                  : "#B91C1C";

              return (
                <Card key={item.lesson_id}>
                  <CardContent className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#16A34A] shrink-0" />
                      <p className="text-[14px] text-[#111111]">{title}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className="text-[13px] font-medium tabular-nums"
                        style={{ color: scoreColor }}
                      >
                        {score}%
                      </span>
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

function StatCard({
  label,
  value,
  valueBg,
  valueColor,
}: {
  label: string;
  value: string;
  valueBg: string;
  valueColor: string;
}) {
  return (
    <Card style={{ backgroundColor: valueBg, borderColor: "transparent" }}>
      <CardContent className="py-4">
        <p className="text-[12px] text-[#777777] mb-1">{label}</p>
        <p
          className="text-[22px] font-semibold tabular-nums"
          style={{ color: valueColor }}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
