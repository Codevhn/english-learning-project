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

  const { exerciseId, isCorrect } = await request.json();

  if (!exerciseId) {
    return NextResponse.json({ error: "Missing exerciseId" }, { status: 400 });
  }

  await supabase.from("user_exercise_history").insert({
    user_id: user.id,
    exercise_id: exerciseId,
    was_correct: isCorrect,
    response_time_ms: 0,
  });

  return NextResponse.json({ ok: true });
}
