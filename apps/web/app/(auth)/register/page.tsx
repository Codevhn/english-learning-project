import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "Crear cuenta",
};

export default function RegisterPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-[28px] font-semibold text-[#111111] tracking-tight mb-1">
          Crea tu cuenta
        </h1>
        <p className="text-[15px] text-[#555555]">
          Comienza a aprender gratis, sin tarjeta de crédito
        </p>
      </div>
      <RegisterForm />
      <p className="mt-6 text-center text-[14px] text-[#555555]">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="text-[#2D4A7A] font-medium hover:underline"
        >
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
