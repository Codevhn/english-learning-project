import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sm2 } from "@/lib/srs/sm2";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { historyId, isCorrect } = await request.json();

  if (!historyId) {
    return NextResponse.json({ error: "Missing historyId" }, { status: 400 });
  }

  const { data: history } = await supabase
    .from("user_exercise_history")
    .select("ease_factor, interval_days, repetitions")
    .eq("id", historyId)
    .eq("user_id", user.id)
    .single();

  if (!history) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const result = sm2(
    {
      easeFactor: Number(history.ease_factor),
      intervalDays: history.interval_days,
      repetitions: history.repetitions,
    },
    isCorrect ? 4 : 1
  );

  await supabase
    .from("user_exercise_history")
    .update({
      was_correct: isCorrect,
      ease_factor: result.easeFactor,
      interval_days: result.intervalDays,
      next_review_at: result.nextReviewAt.toISOString(),
      repetitions: result.repetitions,
      answered_at: new Date().toISOString(),
    })
    .eq("id", historyId)
    .eq("user_id", user.id);

  return NextResponse.json({
    nextReviewAt: result.nextReviewAt.toISOString(),
    intervalDays: result.intervalDays,
  });
}
