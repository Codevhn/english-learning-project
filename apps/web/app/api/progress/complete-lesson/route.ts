import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { passedLevelExam } from "@/lib/mastery";

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
      .select("status, score")
      .eq("user_id", user.id)
      .eq("lesson_id", lessonId)
      .single(),
    supabase.from("lessons").select("xp_reward, unit_id, lesson_type").eq("id", lessonId).single(),
    supabase
      .from("user_stats")
      .select("total_xp, total_lessons_completed, current_streak, longest_streak, last_activity_date")
      .eq("user_id", user.id)
      .single(),
  ]);

  // Rutas de Enfoque (domain) lessons have no unit_id — they're supplementary
  // practice and must never feed XP, streak, or achievements, or they'd
  // inflate progress on the core CEFR path they're explicitly meant not to
  // touch.
  const isCorePathLesson = lessonResult.data?.unit_id != null;

  // Atomic path: the complete_lesson_secure RPC derives xp_reward from
  // the lessons row server-side (client can't forge XP) and does the
  // progress upsert + XP/streak update in one DB transaction, immune
  // to concurrent double-submits. Falls back to the legacy JS flow if
  // the RPC isn't deployed yet.
  if (isCorePathLesson) {
    const { error: rpcError } = await supabase.rpc("complete_lesson_secure", {
      p_lesson_id: lessonId,
      p_score: score ?? 0,
    });

    if (!rpcError) {
      return NextResponse.json({ xpEarned: 0, newAchievements: [] });
    }
    // else: fall through to legacy path below
  }

  const isFirstCompletion =
    !existingResult.data || existingResult.data.status !== "completed";
  const xpEarned =
    isFirstCompletion && isCorePathLesson ? (lessonResult.data?.xp_reward ?? 10) : 0;
  const stats = statsResult.data;

  // On replay, keep the best score ever achieved so a bad replay session
  // can't regress mastery and re-lock the next lesson.
  const savedScore = isFirstCompletion
    ? (score ?? 0)
    : Math.max(existingResult.data?.score ?? 0, score ?? 0);

  await supabase.from("user_progress").upsert(
    {
      user_id: user.id,
      lesson_id: lessonId,
      status: "completed",
      score: savedScore,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lesson_id" }
  );

  if (!isCorePathLesson) {
    return NextResponse.json({ xpEarned: 0, newAchievements: [] });
  }

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
      case "level_exam_passed":
        return lessonResult.data?.lesson_type === "level_exam" && passedLevelExam(score);
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
