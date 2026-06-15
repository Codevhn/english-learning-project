import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-[28px] font-semibold text-[#111111] tracking-tight mb-1">
          Bienvenido de vuelta
        </h1>
        <p className="text-[15px] text-[#555555]">
          Ingresa tus datos para continuar
        </p>
      </div>
      <LoginForm />
      <p className="mt-6 text-center text-[14px] text-[#555555]">
        ¿No tienes cuenta?{" "}
        <Link
          href="/register"
          className="text-[#2D4A7A] font-medium hover:underline"
        >
          Regístrate gratis
        </Link>
      </p>
    </div>
  );
}
