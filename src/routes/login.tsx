import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Eye, EyeOff, Loader2, Zap } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/layout/Logo";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  email:    z.string().trim().email("Email inválido").max(255),
  password: z.string().min(6, "Mínimo 6 caracteres").max(72),
});

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    idea:     typeof s.idea === "string"     ? s.idea     : undefined,
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  beforeLoad: async ({ search }) => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      const idea = search.idea ?? localStorage.getItem("painradar_pending_idea") ?? undefined;
      throw redirect({ to: "/dashboard", search: idea ? { idea } : {} });
    }
  },
  head: () => ({ meta: [{ title: "Entrar — PainRadar" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { idea: ideaParam } = Route.useSearch();

  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors]   = useState<Record<string,string>>({});
  const [loading, setLoading] = useState(false);

  function getPendingIdea() {
    const idea = ideaParam ?? localStorage.getItem("painradar_pending_idea") ?? undefined;
    if (idea) localStorage.removeItem("painradar_pending_idea");
    return idea;
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      const errs: Record<string,string> = {};
      parsed.error.issues.forEach(i => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setLoading(false);
    if (error) {
      toast.error(error.message === "Invalid login credentials"
        ? "Email ou senha incorretos"
        : error.message);
      return;
    }
    const idea = getPendingIdea();
    toast.success("Bem-vindo de volta!");
    navigate({ to: "/dashboard", search: idea ? { idea } : {} });
  };

  const displayIdea = ideaParam ?? localStorage.getItem("painradar_pending_idea");

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0B0F0C] px-4 py-10">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute inset-0 radial-glow" />

      <div className="relative w-full max-w-[420px]">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        {displayIdea && (
          <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-[#00FF88]/20
                          bg-[#00FF88]/8 px-4 py-3">
            <Zap className="h-4 w-4 flex-shrink-0 text-[#00FF88]" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#00FF88]">
                Ideia salva
              </p>
              <p className="text-xs text-[#7A9E8E]">
                "{displayIdea}" — analisaremos após o login
              </p>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-[#1F2A27] bg-[#111615] p-8
                        shadow-[var(--shadow-card)]">
          <h1 className="text-2xl font-bold text-[#E6F1EC]">Bem-vindo de volta</h1>
          <p className="mt-1 text-sm text-[#5A7A6A]">
            Acesse sua conta para ver as análises.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
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

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-semibold text-[#B0C8BC]">Senha</label>
                <a href="#" className="text-xs text-[#5A7A6A] hover:text-[#00FF88]">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
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
              {errors.password && <p className="mt-1 text-xs text-[#FF6666]">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-neon inline-flex h-12 w-full items-center justify-center gap-2
                         rounded-xl text-sm disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Entrar
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-[#5A7A6A]">
          Não tem conta?{" "}
          <Link to="/register" className="font-semibold text-[#00FF88] hover:underline">
            Criar conta grátis
          </Link>
        </p>
      </div>
    </div>
  );
}
