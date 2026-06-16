import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sm2, DEFAULT_CARD } from "@/lib/srs/sm2";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { exerciseId, isCorrect } = await request.json();

  if (!exerciseId) {
    return NextResponse.json({ error: "Missing exerciseId" }, { status: 400 });
  }

  // Initialize SM-2 state so the exercise appears in the practice queue
  const result = sm2(DEFAULT_CARD, isCorrect ? 4 : 1);

  await supabase.from("user_exercise_history").insert({
    user_id: user.id,
    exercise_id: exerciseId,
    was_correct: isCorrect,
    ease_factor: result.easeFactor,
    interval_days: result.intervalDays,
    repetitions: result.repetitions,
    next_review_at: result.nextReviewAt.toISOString(),
    answered_at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
