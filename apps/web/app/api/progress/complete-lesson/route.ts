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

  if (stats) {
    const streakUpdate = calcStreak(
      stats.last_activity_date,
      stats.current_streak,
      stats.longest_streak
    );

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

  return NextResponse.json({ xpEarned });
}
