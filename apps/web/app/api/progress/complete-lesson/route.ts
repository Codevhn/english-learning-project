import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function calcStreak(
  lastActivityDate: string | null,
  currentStreak: number,
  longestStreak: number
): { current_streak: number; longest_streak: number; last_activity_date: string } {
  const today = new Date().toISOString().split("T")[0];

  if (lastActivityDate === today) {
    return {
      current_streak: currentStreak,
      longest_streak: longestStreak,
      last_activity_date: today,
    };
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const newStreak = lastActivityDate === yesterday ? currentStreak + 1 : 1;
  const newLongest = Math.max(longestStreak, newStreak);

  return {
    current_streak: newStreak,
    longest_streak: newLongest,
    last_activity_date: today,
  };
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { lessonId, score } = await request.json();

  if (!lessonId) {
    return NextResponse.json({ error: "Missing lessonId" }, { status: 400 });
  }

  const [existingResult, lessonResult, statsResult] = await Promise.all([
    supabase
      .from("user_progress")
      .select("status")
      .eq("user_id", user.id)
      .eq("lesson_id", lessonId)
      .single(),
    supabase.from("lessons").select("xp_reward").eq("id", lessonId).single(),
    supabase
      .from("user_stats")
      .select("total_xp, total_lessons_completed, current_streak, longest_streak, last_activity_date")
      .eq("user_id", user.id)
      .single(),
  ]);

  const isFirstCompletion =
    !existingResult.data || existingResult.data.status !== "completed";
  const xpEarned = isFirstCompletion ? (lessonResult.data?.xp_reward ?? 10) : 0;
  const stats = statsResult.data;

  await supabase.from("user_progress").upsert(
    {
      user_id: user.id,
      lesson_id: lessonId,
      status: "completed",
      score: score ?? 0,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lesson_id" }
  );

  const streakUpdate = stats
    ? calcStreak(stats.last_activity_date, stats.current_streak, stats.longest_streak)
    : { current_streak: 1, longest_streak: 1, last_activity_date: new Date().toISOString().split("T")[0] };

  if (stats) {
    await supabase
      .from("user_stats")
      .update({
        total_xp: stats.total_xp + xpEarned,
        ...(isFirstCompletion && {
          total_lessons_completed: stats.total_lessons_completed + 1,
        }),
        ...streakUpdate,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);
  }

  // Check and award achievements
  const newTotalXp = (stats?.total_xp ?? 0) + xpEarned;
  const newLessonsCompleted = isFirstCompletion
    ? (stats?.total_lessons_completed ?? 0) + 1
    : (stats?.total_lessons_completed ?? 0);
  const newStreak = streakUpdate.current_streak;

  const [achievementsResult, earnedResult] = await Promise.all([
    supabase.from("achievements").select("id, slug, title, icon, condition_type, condition_value"),
    supabase.from("user_achievements").select("achievement_id").eq("user_id", user.id),
  ]);

  const earnedIds = new Set((earnedResult.data ?? []).map((a) => a.achievement_id));

  const toAward = (achievementsResult.data ?? []).filter((a) => {
    if (earnedIds.has(a.id)) return false;
    switch (a.condition_type) {
      case "lessons_completed": return newLessonsCompleted >= a.condition_value;
      case "streak":            return newStreak >= a.condition_value;
      case "total_xp":          return newTotalXp >= a.condition_value;
      case "perfect_lesson":    return (score ?? 0) === 100;
      default:                  return false;
    }
  });

  if (toAward.length > 0) {
    await supabase
      .from("user_achievements")
      .insert(toAward.map((a) => ({ user_id: user.id, achievement_id: a.id })));
  }

  const newAchievements = toAward.map((a) => ({
    slug: a.slug,
    title: (a.title as Record<string, string>)?.es ?? a.slug,
    icon: a.icon,
  }));

  return NextResponse.json({ xpEarned, newAchievements });
}
