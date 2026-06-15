import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[#E5E5E5] bg-white">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center">
          <Link
            href="/"
            className="text-[17px] font-semibold text-[#111111] tracking-tight"
          >
            Polyglot
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        {children}
      </main>
    </div>
  );
}
