"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface AppNavProps {
  displayName: string;
  avatarUrl?: string | null;
}

const navItems = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/courses", label: "Cursos" },
  { href: "/practice", label: "Practicar" },
  { href: "/leaderboard", label: "Ranking" },
];

export function AppNav({ displayName, avatarUrl }: AppNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E5E5] bg-white">
      <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/dashboard"
            className="text-[17px] font-semibold text-[#111111] tracking-tight"
          >
            Parlo
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-1.5 text-[14px] rounded-[4px] transition-colors duration-150",
                    isActive
                      ? "text-[#111111] font-medium"
                      : "text-[#555555] hover:text-[#111111] hover:bg-[#F0F0F0]"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#3730A3] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className={cn(
              "text-[14px] transition-colors duration-150",
              pathname === "/profile"
                ? "text-[#111111] font-medium"
                : "text-[#555555] hover:text-[#111111]"
            )}
          >
            {displayName.split(" ")[0]}
          </Link>
          <button
            onClick={handleSignOut}
            className="text-[14px] text-[#999999] hover:text-[#555555] transition-colors duration-150"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
