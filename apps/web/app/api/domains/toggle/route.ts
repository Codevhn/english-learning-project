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

  const { domainId, selected } = await request.json();

  if (!domainId) {
    return NextResponse.json({ error: "Missing domainId" }, { status: 400 });
  }

  if (selected) {
    await supabase
      .from("user_domains")
      .upsert(
        { user_id: user.id, domain_id: domainId },
        { onConflict: "user_id,domain_id" }
      );
  } else {
    await supabase
      .from("user_domains")
      .delete()
      .eq("user_id", user.id)
      .eq("domain_id", domainId);
  }

  return NextResponse.json({ ok: true });
}
