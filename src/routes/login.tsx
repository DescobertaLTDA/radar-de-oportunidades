import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/layout/Logo";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

const schema = z.object({
  email: z.string().trim().email("Email inválido").max(255),
  password: z.string().min(6, "Mínimo 6 caracteres").max(72),
});

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/dashboard" });
  },
  head: () => ({
    meta: [{ title: "Entrar — PainRadar" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setLoading(false);
    if (error) {
      toast.error(
        error.message === "Invalid login credentials"
          ? "Email ou senha incorretos"
          : error.message
      );
      return;
    }
    toast.success("Bem-vindo de volta!");
    navigate({ to: "/dashboard" });
  };

  const onGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/dashboard`,
    });
    if (result.error) toast.error(result.error.message);
    else if (!result.redirected) navigate({ to: "/dashboard" });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute inset-0 radial-glow" />

      <div className="relative w-full max-w-[400px]">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
          <h1 className="text-2xl font-semibold text-foreground">
            Bem-vindo de volta
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Acesse sua conta para ver o ranking.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-md border border-border bg-input px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                placeholder="voce@empresa.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-xs font-medium text-foreground">
                  Senha
                </label>
                <a href="#" className="text-xs text-[var(--text-secondary)] hover:text-primary">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-md border border-border bg-input px-3 pr-10 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Entrar
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">ou continue com</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            onClick={onGoogle}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-border bg-transparent text-sm font-medium text-foreground transition-colors hover:bg-[var(--bg-secondary)]"
          >
            <GoogleIcon className="h-4 w-4" />
            Entrar com Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Não tem conta?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Criar conta grátis
          </Link>
        </p>
      </div>
    </div>
  );
}
