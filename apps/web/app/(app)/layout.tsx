import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppNav } from "@/components/layout/AppNav";
import type { Tables } from "@/types/database";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profileResult = await supabase
    .from("profiles")
    .select("display_name, avatar_url, is_admin")
    .eq("id", user.id)
    .single();

  const profile = profileResult.data as Pick<
    Tables<"profiles">,
    "display_name" | "avatar_url" | "is_admin"
  > | null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <AppNav
        displayName={profile?.display_name ?? user.email ?? ""}
        avatarUrl={profile?.avatar_url}
        isAdmin={profile?.is_admin ?? false}
      />
      <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}
