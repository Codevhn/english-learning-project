import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

  // Check if already completed (to avoid double XP)
  const { data: existing } = await supabase
    .from("user_progress")
    .select("status")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .single();

  const isFirstCompletion = !existing || existing.status !== "completed";

  // Get lesson xp_reward
  const { data: lesson } = await supabase
    .from("lessons")
    .select("xp_reward")
    .eq("id", lessonId)
    .single();

  const xpEarned = isFirstCompletion ? (lesson?.xp_reward ?? 10) : 0;

  // Upsert progress
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

  // Award XP on first completion
  if (isFirstCompletion) {
    const { data: stats } = await supabase
      .from("user_stats")
      .select("total_xp, total_lessons_completed")
      .eq("user_id", user.id)
      .single();

    if (stats) {
      await supabase
        .from("user_stats")
        .update({
          total_xp: stats.total_xp + xpEarned,
          total_lessons_completed: stats.total_lessons_completed + 1,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);
    }
  }

  return NextResponse.json({ xpEarned });
}
