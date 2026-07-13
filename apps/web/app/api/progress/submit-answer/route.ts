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

  // Continue this exercise's existing SM-2 schedule if one exists, so the
  // review interval actually grows across sessions instead of resetting
  // to day-1 every time the exercise is answered inside a lesson.
  const { data: existing } = await supabase
    .from("user_exercise_history")
    .select("ease_factor, interval_days, repetitions")
    .eq("user_id", user.id)
    .eq("exercise_id", exerciseId)
    .single();

  const card = existing
    ? {
        easeFactor: Number(existing.ease_factor),
        intervalDays: existing.interval_days,
        repetitions: existing.repetitions,
      }
    : DEFAULT_CARD;

  const result = sm2(card, isCorrect ? 4 : 1);

  await supabase.from("user_exercise_history").upsert(
    {
      user_id: user.id,
      exercise_id: exerciseId,
      was_correct: isCorrect,
      ease_factor: result.easeFactor,
      interval_days: result.intervalDays,
      repetitions: result.repetitions,
      next_review_at: result.nextReviewAt.toISOString(),
      answered_at: new Date().toISOString(),
    },
    { onConflict: "user_id,exercise_id" }
  );

  return NextResponse.json({ ok: true });
}
