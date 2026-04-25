import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/layout/Logo";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

const schema = z.object({
  name: z.string().trim().min(2, "Mínimo 2 caracteres").max(80),
  email: z.string().trim().email("Email inválido").max(255),
  password: z.string().min(8, "Mínimo 8 caracteres").max(72),
  accept: z.literal(true, { message: "Aceite os termos" }),
});

function passwordStrength(p: string): { score: 0 | 1 | 2 | 3; label: string } {
  if (p.length < 6) return { score: 0, label: "Muito fraca" };
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
  if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) score++;
  const labels = ["Fraca", "Média", "Forte", "Muito forte"];
  return { score: score as 0 | 1 | 2 | 3, label: labels[score] };
}

export const Route = createFileRoute("/register")({
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/dashboard" });
  },
  head: () => ({
    meta: [{ title: "Criar conta — PainRadar" }],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => passwordStrength(password), [password]);
  const strengthColor = ["bg-destructive", "bg-[var(--warning)]", "bg-primary", "bg-[var(--success)]"][
    strength.score
  ];

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse({ name, email, password, accept });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: parsed.data.name },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(
        error.message === "User already registered"
          ? "Este email já está cadastrado"
          : error.message
      );
      return;
    }
    toast.success("Conta criada! Bem-vindo ao PainRadar.");
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
            Crie sua conta grátis
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Veja o ranking ao vivo em menos de 1 minuto.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Nome completo
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="h-11 w-full rounded-md border border-border bg-input px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                placeholder="Seu nome"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">{errors.name}</p>
              )}
            </div>

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
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-md border border-border bg-input px-3 pr-10 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  placeholder="Mínimo 8 caracteres"
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
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className={`h-1 flex-1 rounded-full ${
                          i <= strength.score ? strengthColor : "bg-border"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Força: <span className="text-foreground">{strength.label}</span>
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="mt-1 text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={accept}
                onChange={(e) => setAccept(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border accent-[var(--primary)]"
              />
              <span>
                Concordo com os{" "}
                <a href="#" className="text-foreground underline-offset-2 hover:underline">
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a href="#" className="text-foreground underline-offset-2 hover:underline">
                  Política de Privacidade
                </a>
              </span>
            </label>
            {errors.accept && (
              <p className="-mt-2 text-xs text-destructive">{errors.accept}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Criar conta grátis
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
            Continuar com Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
