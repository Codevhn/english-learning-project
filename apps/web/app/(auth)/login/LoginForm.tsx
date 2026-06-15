"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        id="email"
        name="email"
        type="email"
        label="Correo electrónico"
        placeholder="tu@email.com"
        autoComplete="email"
        required
      />
      <Input
        id="password"
        name="password"
        type="password"
        label="Contraseña"
        placeholder="Tu contraseña"
        autoComplete="current-password"
        required
      />
      {error && (
        <p className="text-[13px] text-[#DC2626]">{error}</p>
      )}
      <Button type="submit" loading={loading} className="w-full mt-2" size="lg">
        Iniciar sesión
      </Button>
    </form>
  );
}
