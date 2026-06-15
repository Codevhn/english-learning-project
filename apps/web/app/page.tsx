import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="border-b border-[#E5E5E5] bg-white">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          <span className="text-[17px] font-semibold text-[#111111] tracking-tight">
            Polyglot
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-[14px] text-[#555555] hover:text-[#111111] transition-colors"
            >
              Iniciar sesión
            </Link>
            <Link href="/register">
              <Button size="sm">Comenzar gratis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-2xl">
          <p className="text-[13px] font-medium text-[#2D4A7A] tracking-widest uppercase mb-6">
            Plataforma de aprendizaje de idiomas
          </p>
          <h1 className="text-[48px] font-semibold text-[#111111] leading-[1.15] tracking-tight mb-6">
            Aprende inglés de forma{" "}
            <span className="text-[#2D4A7A]">estructurada y efectiva</span>
          </h1>
          <p className="text-[18px] text-[#555555] leading-relaxed mb-10 max-w-xl mx-auto">
            Lecciones progresivas, repetición espaciada y seguimiento de progreso.
            Diseñado para hispanohablantes que aprenden en serio.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg">Comenzar gratis</Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Ya tengo cuenta
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="border-t border-[#E5E5E5] bg-white py-16 px-6">
        <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div>
            <p className="text-[22px] font-semibold text-[#111111] mb-2">
              Repetición espaciada
            </p>
            <p className="text-[15px] text-[#555555] leading-relaxed">
              El algoritmo SM-2 determina cuándo repasar cada palabra para maximizar la retención a largo plazo.
            </p>
          </div>
          <div>
            <p className="text-[22px] font-semibold text-[#111111] mb-2">
              Contenido CEFR
            </p>
            <p className="text-[15px] text-[#555555] leading-relaxed">
              Currículo alineado al Marco Europeo: desde A1 hasta B2, con progresión clara y medible.
            </p>
          </div>
          <div>
            <p className="text-[22px] font-semibold text-[#111111] mb-2">
              Tu progreso, siempre visible
            </p>
            <p className="text-[15px] text-[#555555] leading-relaxed">
              XP, rachas y estadísticas detalladas para mantenerte motivado sin distracciones innecesarias.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E5E5E5] py-6 px-6">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <span className="text-[13px] text-[#999999]">
            © 2026 Polyglot
          </span>
          <span className="text-[13px] text-[#999999]">
            Hecho con cuidado
          </span>
        </div>
      </footer>
    </div>
  );
}
