import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { z } from "zod";
import { Eye, EyeOff, Loader2, Zap } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/layout/Logo";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name:     z.string().trim().min(2, "Mínimo 2 caracteres").max(80),
  email:    z.string().trim().email("Email inválido").max(255),
  password: z.string().min(8, "Mínimo 8 caracteres").max(72),
  accept:   z.literal(true, { message: "Aceite os termos para continuar" }),
});

function passwordStrength(p: string): { score: 0|1|2|3; label: string; color: string } {
  if (p.length < 6) return { score: 0, label: "Muito fraca", color: "#FF4444" };
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) s++;
  const labels = ["Fraca","Média","Forte","Muito forte"];
  const colors = ["#FF6666","#FFAA00","#00CC6A","#00FF88"];
  return { score: s as 0|1|2|3, label: labels[s], color: colors[s] };
}

export const Route = createFileRoute("/register")({
  validateSearch: (s: Record<string, unknown>) => ({
    idea: typeof s.idea === "string" ? s.idea : undefined,
  }),
  beforeLoad: async ({ search }) => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      const idea = search.idea ?? localStorage.getItem("painradar_pending_idea") ?? undefined;
      throw redirect({ to: "/dashboard", search: idea ? { idea } : {} });
    }
  },
  head: () => ({ meta: [{ title: "Criar conta — PainRadar" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate  = useNavigate();
  const { idea: ideaParam } = Route.useSearch();

  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept]   = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors]   = useState<Record<string,string>>({});
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => passwordStrength(password), [password]);

  function getPendingIdea() {
    const idea = ideaParam ?? localStorage.getItem("painradar_pending_idea") ?? undefined;
    if (idea) localStorage.removeItem("painradar_pending_idea");
    return idea;
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse({ name, email, password, accept });
    if (!parsed.success) {
      const errs: Record<string,string> = {};
      parsed.error.issues.forEach(i => (errs[String(i.path[0])] = i.message));
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
      toast.error(error.message === "User already registered"
        ? "Este email já está cadastrado. Faça login."
        : error.message);
      return;
    }
    const idea = getPendingIdea();
    toast.success("Conta criada! Bem-vindo ao PainRadar.");
    navigate({ to: "/dashboard", search: idea ? { idea } : {} });
  };

  const displayIdea = ideaParam ?? localStorage.getItem("painradar_pending_idea");

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0B0F0C] px-4 py-10">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute inset-0 radial-glow" />

      <div className="relative w-full max-w-[420px]">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        {/* Pending idea banner */}
        {displayIdea && (
          <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-[#00FF88]/20
                          bg-[#00FF88]/8 px-4 py-3">
            <Zap className="h-4 w-4 flex-shrink-0 text-[#00FF88]" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#00FF88]">
                Ideia salva
              </p>
              <p className="text-xs text-[#7A9E8E]">
                "{displayIdea}" — analisaremos após o cadastro
              </p>
            </div>
          </div>
        )}

        {/* Card */}
        <div className="rounded-2xl border border-[#1F2A27] bg-[#111615] p-8
                        shadow-[var(--shadow-card)]">
          <h1 className="text-2xl font-bold text-[#E6F1EC]">Crie sua conta grátis</h1>
          <p className="mt-1 text-sm text-[#5A7A6A]">
            Sem cartão de crédito. Resultado em segundos.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#B0C8BC]">
                Nome completo
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
                placeholder="Seu nome"
                className="h-11 w-full rounded-xl border border-[#1F2A27] bg-[#0D1210] px-3.5
                           text-sm text-[#E6F1EC] placeholder:text-[#3A5A4A] outline-none
                           transition-colors focus:border-[#00FF88]/50"
              />
              {errors.name && <p className="mt-1 text-xs text-[#FF6666]">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#B0C8BC]">Email</label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="voce@empresa.com"
                className="h-11 w-full rounded-xl border border-[#1F2A27] bg-[#0D1210] px-3.5
                           text-sm text-[#E6F1EC] placeholder:text-[#3A5A4A] outline-none
                           transition-colors focus:border-[#00FF88]/50"
              />
              {errors.email && <p className="mt-1 text-xs text-[#FF6666]">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#B0C8BC]">Senha</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="h-11 w-full rounded-xl border border-[#1F2A27] bg-[#0D1210] px-3.5 pr-11
                             text-sm text-[#E6F1EC] placeholder:text-[#3A5A4A] outline-none
                             transition-colors focus:border-[#00FF88]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3A5A4A] hover:text-[#E6F1EC]"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[0,1,2,3].map(i => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ background: i <= strength.score ? strength.color : "#1F2A27" }}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-[11px] text-[#5A7A6A]">
                    Força: <span style={{ color: strength.color }}>{strength.label}</span>
                  </p>
                </div>
              )}
              {errors.password && <p className="mt-1 text-xs text-[#FF6666]">{errors.password}</p>}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 text-xs text-[#5A7A6A]">
              <input
                type="checkbox"
                checked={accept}
                onChange={e => setAccept(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[#1F2A27] accent-[#00FF88]"
              />
              <span>
                Concordo com os{" "}
                <a href="#" className="text-[#00FF88] hover:underline">Termos de Uso</a>
                {" "}e{" "}
                <a href="#" className="text-[#00FF88] hover:underline">Política de Privacidade</a>
              </span>
            </label>
            {errors.accept && <p className="-mt-2 text-xs text-[#FF6666]">{errors.accept}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-neon inline-flex h-12 w-full items-center justify-center gap-2
                         rounded-xl text-sm disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Criar conta grátis
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-[#5A7A6A]">
          Já tem conta?{" "}
          <Link to="/login" className="font-semibold text-[#00FF88] hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
