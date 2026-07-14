import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) redirect("/dashboard");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-1 border-b border-[#E5E5E5] pb-3">
        <Link
          href="/admin"
          className="px-3 py-1.5 text-[14px] text-[#555555] hover:text-[#111111] hover:bg-[#F0F0F0] rounded-[4px] transition-colors"
        >
          Resumen
        </Link>
        <Link
          href="/admin/modules"
          className="px-3 py-1.5 text-[14px] text-[#555555] hover:text-[#111111] hover:bg-[#F0F0F0] rounded-[4px] transition-colors"
        >
          Módulos
        </Link>
        <Link
          href="/admin/domains"
          className="px-3 py-1.5 text-[14px] text-[#555555] hover:text-[#111111] hover:bg-[#F0F0F0] rounded-[4px] transition-colors"
        >
          Dominios
        </Link>
      </div>
      {children}
    </div>
  );
}
