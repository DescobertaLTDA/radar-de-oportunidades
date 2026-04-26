import { createFileRoute, redirect, useNavigate, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  LayoutGrid, Search, FileText, Settings, LogOut, Plus, Download,
  Star, AlertTriangle, Lightbulb, Users, ChevronRight, Lock,
  Smartphone, Globe, MessageCircle, Twitter, Zap, CheckCircle2,
  TrendingUp, BarChart2, ArrowRight, Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/layout/Logo";

/* ═══════════════════════════════════ Route ══ */
export const Route = createFileRoute("/dashboard")({
  validateSearch: (s: Record<string, unknown>) => ({
    idea: typeof s.idea === "string" ? s.idea : undefined,
  }),
  beforeLoad: async ({ location }) => {
    const { data } = await supabase.auth.getSession();
    if (!data.session)
      throw redirect({ to: "/login", search: { redirect: location.href } });
  },
  head: () => ({ meta: [{ title: "Dashboard — PainRadar" }] }),
  component: DashboardPage,
});

/* ═══════════════════════════════════ Mock generator ══ */
interface AnalysisResult {
  score: number;
  saturation: "Alta" | "Média" | "Baixa";
  competition: "Alta" | "Média" | "Baixa";
  painPoints: string[];
  opportunity: string;
  mvp: string;
  competitors: { name: string; rating: number; reviews: string; gap: string }[];
}

const MOCK_DATA: Record<string, Partial<AnalysisResult>> = {
  treino: {
    score: 72,
    saturation: "Média",
    competition: "Alta",
    painPoints: ["Treinos genéricos sem personalização", "Excesso de anúncios interruptivos", "Falta de plano para iniciantes absolutos", "Linguagem técnica inacessível"],
    opportunity: "App de treino simples para iniciantes com adaptação automática e linguagem sem termos técnicos.",
    mvp: "Onboarding com 5 perguntas → plano de 4 semanas adaptativo → sem anúncios no primeiro mês.",
    competitors: [
      { name: "Nike Training Club", rating: 4.6, reviews: "280K", gap: "Sem plano para sedentários" },
      { name: "Freeletics", rating: 4.5, reviews: "460K", gap: "Muito complexo para iniciantes" },
      { name: "Daily Workout", rating: 4.3, reviews: "190K", gap: "UX desatualizada e ads invasivos" },
    ],
  },
  finanças: {
    score: 81,
    saturation: "Baixa",
    competition: "Média",
    painPoints: ["Falta de educação financeira contextual", "Integração bancária complexa", "Sem foco em público jovem BR", "Alertas de gastos ineficazes"],
    opportunity: "App de educação financeira gamificado focado na geração Z brasileira sem vínculo bancário obrigatório.",
    mvp: "Simulador de orçamento gamificado → metas visuais → sem integração bancária no MVP.",
    competitors: [
      { name: "Mobills", rating: 4.4, reviews: "320K", gap: "Interface complexa para jovens" },
      { name: "Organizze", rating: 4.5, reviews: "180K", gap: "Sem gamificação ou engajamento" },
      { name: "GuiaBolso", rating: 4.2, reviews: "290K", gap: "Foco em controle, não educação" },
    ],
  },
  meditação: {
    score: 68,
    saturation: "Média",
    competition: "Alta",
    painPoints: ["Conteúdo apenas em inglês", "Preços de assinatura altos", "Falta de conteúdo cultural BR", "Sessões muito longas para rotina corrida"],
    opportunity: "App de meditação e mindfulness 100% em português com sessões de 3-7min adaptadas à rotina brasileira.",
    mvp: "15 meditações curtas em PT-BR → sem assinatura no primeiro mês → conteúdo offline.",
    competitors: [
      { name: "Headspace", rating: 4.7, reviews: "1.2M", gap: "Apenas inglês, caro" },
      { name: "Calm", rating: 4.8, reviews: "890K", gap: "Sem conteúdo cultural BR" },
      { name: "Lojong", rating: 4.3, reviews: "42K", gap: "Biblioteca pequena" },
    ],
  },
};

function getMockAnalysis(idea: string): AnalysisResult {
  const lower = idea.toLowerCase();
  for (const [key, data] of Object.entries(MOCK_DATA)) {
    if (lower.includes(key)) return { score: 65, saturation: "Média", competition: "Alta", painPoints: [], opportunity: "", mvp: "", competitors: [], ...data } as AnalysisResult;
  }
  const hash = idea.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const score = 44 + (hash % 45);
  return {
    score,
    saturation: score >= 70 ? "Baixa" : score >= 55 ? "Média" : "Alta",
    competition: score >= 70 ? "Baixa" : score >= 50 ? "Média" : "Alta",
    painPoints: [
      "Interface com curva de aprendizado elevada",
      "Falta de personalização por perfil de usuário",
      "Sem versão offline funcional",
      "Suporte ao cliente lento e pouco útil",
    ],
    opportunity: `Oportunidade detectada em "${idea}" com foco em experiência simplificada e onboarding inteligente.`,
    mvp: "MVP enxuto com 3 funcionalidades-core → onboarding em 60s → sem fricção no primeiro uso.",
    competitors: [
      { name: "Player #1 dominante", rating: 4.5, reviews: "250K", gap: "Complexo e caro" },
      { name: "Player #2 intermediário", rating: 4.2, reviews: "90K", gap: "UX desatualizada" },
      { name: "Player #3 emergente", rating: 4.0, reviews: "28K", gap: "Pouco conteúdo" },
    ],
  };
}

/* ═══════════════════════════════════ Canvas blocks ══ */
const CANVAS_STEPS = [
  { id: "idea",        icon: Zap,           title: "Ideia recebida",               sub: "Processando input",             color: "#00FF88" },
  { id: "stores",      icon: Smartphone,    title: "Buscando concorrentes",         sub: "Play Store · App Store",        color: "#00CC6A" },
  { id: "reviews",     icon: Star,          title: "Analisando avaliações",         sub: "Reviews · Reclamações · Bugs",  color: "#FFAA00" },
  { id: "communities", icon: MessageCircle, title: "Lendo comunidades",             sub: "Reddit · X/Twitter",            color: "#00AAFF" },
  { id: "insights",    icon: Lightbulb,     title: "Gerando oportunidades",         sub: "Score · MVP · Brechas",         color: "#00FF88" },
];

type StepState = "idle" | "active" | "done";

function CanvasBlock({ step, state, isLast }: { step: typeof CANVAS_STEPS[0]; state: StepState; isLast: boolean }) {
  const Icon = step.icon;
  return (
    <div className="flex items-center">
      <motion.div
        animate={{
          borderColor: state === "done" ? `${step.color}50` : state === "active" ? `${step.color}80` : "#1F2A27",
          boxShadow: state === "active" ? `0 0 20px -4px ${step.color}40` : "none",
        }}
        transition={{ duration: 0.4 }}
        className="relative flex w-40 flex-col items-center rounded-2xl border
                   bg-[#111615] px-4 py-4 text-center transition-all"
      >
        {/* State indicator */}
        <div
          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full"
          style={{ background: state === "done" ? step.color : state === "active" ? "#0D1210" : "#1F2A27", border: `2px solid ${state !== "idle" ? step.color : "#1F2A27"}` }}
        >
          {state === "done" && <CheckCircle2 className="h-3 w-3 text-[#0B0F0C]" />}
          {state === "active" && (
            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: step.color }} />
          )}
        </div>

        {/* Icon */}
        <div
          className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl transition-all"
          style={{ background: state !== "idle" ? `${step.color}15` : "#1A2420" }}
        >
          <Icon className="h-5 w-5" style={{ color: state !== "idle" ? step.color : "#3A5A4A" }} />
        </div>

        <p className="text-[12px] font-bold leading-tight" style={{ color: state !== "idle" ? "#E6F1EC" : "#5A7A6A" }}>
          {step.title}
        </p>
        <p className="mt-0.5 text-[10px]" style={{ color: state !== "idle" ? "#7A9E8E" : "#3A5A4A" }}>
          {step.sub}
        </p>
      </motion.div>

      {/* Connector */}
      {!isLast && (
        <div className="relative mx-2 flex items-center">
          <div className="h-px w-8 bg-[#1F2A27]" />
          <ChevronRight className="h-3 w-3 text-[#1F2A27]" />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════ Score gauge ══ */
function ScoreGauge({ score }: { score: number }) {
  const color = score >= 70 ? "#00FF88" : score >= 55 ? "#FFAA00" : "#FF6666";
  const label = score >= 70 ? "Excelente" : score >= 55 ? "Moderado" : "Baixo";
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1F2A27" strokeWidth="2.5" />
          <motion.circle
            cx="18" cy="18" r="15.9" fill="none"
            stroke={color} strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="100"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 100 - score }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="text-center">
          <motion.p
            className="text-3xl font-black tabular-nums"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.p>
          <p className="text-[10px] text-[#5A7A6A]">/100</p>
        </div>
      </div>
      <p className="mt-1 text-xs font-semibold" style={{ color }}>{label}</p>
      <p className="text-[10px] text-[#5A7A6A]">Opportunity Score</p>
    </div>
  );
}

/* ═══════════════════════════════════ Badge ══ */
function Badge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#1F2A27]
                    bg-[#0D1210] px-3 py-2">
      <span className="text-xs text-[#5A7A6A]">{label}</span>
      <span className="text-xs font-bold" style={{ color }}>{value}</span>
    </div>
  );
}

/* ═══════════════════════════════════ Nav item ══ */
function NavItem({ icon: Icon, label, active = false }: { icon: React.ElementType; label: string; active?: boolean }) {
  return (
    <button className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium
                        transition-all ${active
                          ? "bg-[#00FF88]/10 text-[#00FF88]"
                          : "text-[#5A7A6A] hover:bg-[#1A2420] hover:text-[#E6F1EC]"
                        }`}>
      <Icon className="h-4 w-4 flex-shrink-0" />
      {label}
    </button>
  );
}

/* ═══════════════════════════════════ Main page ══ */
function DashboardPage() {
  const { idea } = Route.useSearch();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [stepStates, setStepStates] = useState<StepState[]>(["idle","idle","idle","idle","idle"]);
  const [analysisState, setAnalysisState] = useState<"idle"|"loading"|"done">("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [newIdeaInput, setNewIdeaInput] = useState("");

  // Start analysis when idea is present
  useEffect(() => {
    if (!idea) return;
    setAnalysisState("loading");
    setStepStates(["idle","idle","idle","idle","idle"]);
    setResult(null);

    const delays = [0, 900, 1800, 2700, 3600];
    const timers = delays.map((d, i) =>
      setTimeout(() => {
        setStepStates(prev => prev.map((s, j) =>
          j < i ? "done" : j === i ? "active" : s
        ));
      }, d)
    );

    const doneTimer = setTimeout(() => {
      setStepStates(["done","done","done","done","done"]);
      setResult(getMockAnalysis(idea));
      setAnalysisState("done");
    }, 4800);

    return () => { timers.forEach(clearTimeout); clearTimeout(doneTimer); };
  }, [idea]);

  const handleNewAnalysis = () => {
    if (!newIdeaInput.trim()) return;
    navigate({ to: "/dashboard", search: { idea: newIdeaInput.trim() } });
    setNewIdeaInput("");
  };

  const satColor = (v: string) => v === "Baixa" ? "#00FF88" : v === "Média" ? "#FFAA00" : "#FF6666";

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0F0C]">

      {/* ══ SIDEBAR ════════════════════════════════════════════════ */}
      <aside className="hidden w-56 flex-shrink-0 flex-col border-r border-[#1F2A27]
                        bg-[#0E1311] lg:flex">
        <div className="flex h-14 items-center border-b border-[#1F2A27] px-4">
          <Logo />
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          <NavItem icon={LayoutGrid} label="Análises" active />
          <NavItem icon={Search} label="Nova análise" />
          <NavItem icon={TrendingUp} label="Oportunidades" />
          <NavItem icon={FileText} label="Relatórios" />
          <NavItem icon={Settings} label="Configurações" />
        </nav>

        {/* Plan */}
        <div className="border-t border-[#1F2A27] p-3">
          <div className="rounded-xl border border-[#00FF88]/20 bg-[#00FF88]/5 p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#00FF88]">Plano Grátis</p>
            <p className="mt-0.5 text-xs text-[#5A7A6A]">3 análises/mês</p>
            <Link
              to="/register"
              className="mt-2.5 flex items-center justify-center gap-1 rounded-lg bg-[#00FF88]
                         px-3 py-1.5 text-[11px] font-bold text-[#0B0F0C] hover:bg-[#00CC6A]
                         transition-colors"
            >
              <Sparkles className="h-3 w-3" />
              Fazer upgrade
            </Link>
          </div>

          <button
            onClick={signOut}
            className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs
                       text-[#5A7A6A] hover:text-[#FF6666] transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sair
          </button>
        </div>
      </aside>

      {/* ══ MAIN ═══════════════════════════════════════════════════ */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top bar */}
        <header className="flex h-14 flex-shrink-0 items-center justify-between
                           border-b border-[#1F2A27] bg-[#0E1311] px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <div className="lg:hidden"><Logo /></div>
            {idea && (
              <div className="hidden items-center gap-2 sm:flex">
                <span className="text-[11px] text-[#5A7A6A]">Analisando:</span>
                <span className="rounded-full border border-[#1F2A27] bg-[#111615] px-2.5 py-0.5
                                 text-xs font-semibold text-[#00FF88]">
                  {idea}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {result && (
              <button className="btn-ghost inline-flex h-8 items-center gap-1.5 rounded-lg
                                 px-3 text-xs font-medium">
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Exportar</span>
                <Lock className="h-3 w-3 text-[#3A5A4A]" />
              </button>
            )}
            <button
              onClick={() => navigate({ to: "/dashboard" })}
              className="btn-neon inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-bold"
            >
              <Plus className="h-3.5 w-3.5" />
              Nova análise
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full
                            bg-[#00FF88]/20 text-xs font-bold text-[#00FF88]">
              {user?.email?.[0]?.toUpperCase() ?? "U"}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── Canvas area ────────────────────────────────────────── */}
          <div className="flex flex-1 flex-col overflow-auto p-4 lg:p-6">

            {/* ═══ EMPTY STATE ════════════════════════════ */}
            {analysisState === "idle" && !idea && (
              <div className="flex flex-1 items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-md text-center"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center
                                  rounded-2xl border border-[#1F2A27] bg-[#111615]">
                    <Search className="h-7 w-7 text-[#00FF88]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#E6F1EC]">
                    Digite uma ideia para começar
                  </h2>
                  <p className="mt-2 text-sm text-[#5A7A6A]">
                    Nossa IA analisa Play Store, App Store, Reddit e X para encontrar
                    oportunidades reais no seu nicho.
                  </p>

                  <div className="mt-8 flex items-center gap-2 rounded-xl border border-[#1F2A27]
                                  bg-[#111615] p-2">
                    <input
                      type="text"
                      value={newIdeaInput}
                      onChange={e => setNewIdeaInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleNewAnalysis()}
                      placeholder="Ex: app de treino para iniciantes"
                      className="flex-1 bg-transparent px-2 text-sm text-[#E6F1EC]
                                 placeholder:text-[#3A5A4A] outline-none"
                    />
                    <button
                      onClick={handleNewAnalysis}
                      className="btn-neon inline-flex h-9 items-center gap-1.5 rounded-lg
                                 px-4 text-sm"
                    >
                      Analisar
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {["app de treino","finanças pessoais","app de meditação"].map(s => (
                      <button
                        key={s}
                        onClick={() => setNewIdeaInput(s)}
                        className="rounded-full border border-[#1F2A27] px-3 py-1 text-xs
                                   text-[#5A7A6A] hover:border-[#00FF88]/30 hover:text-[#00FF88]
                                   transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {/* ═══ CANVAS (loading + done) ═══════════════ */}
            {(analysisState === "loading" || analysisState === "done") && (
              <div className="space-y-6">
                {/* Idea label */}
                <div>
                  <p className="text-xs text-[#5A7A6A]">Analisando</p>
                  <h2 className="mt-0.5 text-xl font-bold text-[#E6F1EC] capitalize">{idea}</h2>
                </div>

                {/* Canvas blocks */}
                <div className="overflow-x-auto pb-2">
                  <div className="flex min-w-max items-center gap-0">
                    {CANVAS_STEPS.map((step, i) => (
                      <CanvasBlock
                        key={step.id}
                        step={step}
                        state={stepStates[i]}
                        isLast={i === CANVAS_STEPS.length - 1}
                      />
                    ))}
                  </div>
                </div>

                {/* Loading progress text */}
                <AnimatePresence>
                  {analysisState === "loading" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm text-[#5A7A6A]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                      {stepStates.filter(s => s === "done").length} de {CANVAS_STEPS.length} etapas concluídas…
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ═══ RESULTS ════════════════════════════ */}
                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-4"
                    >
                      {/* Competitors */}
                      <div className="rounded-2xl border border-[#1F2A27] bg-[#111615] p-5">
                        <div className="mb-4 flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#00FF88]" />
                          <h3 className="text-sm font-bold text-[#E6F1EC]">Principais concorrentes</h3>
                          <span className="ml-auto text-[10px] text-[#3A5A4A]">Plano Grátis · 3 de N</span>
                        </div>
                        <div className="space-y-2">
                          {result.competitors.map((c, i) => (
                            <div key={i} className="flex items-center gap-3 rounded-xl border
                                                    border-[#1F2A27] bg-[#0D1210] p-3">
                              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center
                                              rounded-lg bg-[#1F2A27] text-sm font-black text-[#E6F1EC]">
                                {c.name[0]}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#E6F1EC] truncate">{c.name}</p>
                                <p className="text-xs text-[#5A7A6A]">★ {c.rating} · {c.reviews} reviews</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] text-[#3A5A4A]">Gap</p>
                                <p className="text-[11px] font-medium text-[#FFAA00]">{c.gap}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pain points */}
                      <div className="rounded-2xl border border-[#1F2A27] bg-[#111615] p-5">
                        <div className="mb-4 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-[#FFAA00]" />
                          <h3 className="text-sm font-bold text-[#E6F1EC]">Reclamações mais comuns</h3>
                        </div>
                        <div className="space-y-2">
                          {result.painPoints.map((p, i) => (
                            <div key={i} className="flex items-start gap-2.5 rounded-xl
                                                    border border-[#1F2A27] bg-[#0D1210] px-3 py-2.5">
                              <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center
                                               rounded-full bg-[#FFAA00]/15 text-[9px] font-black text-[#FFAA00]">
                                {i+1}
                              </span>
                              <p className="text-sm text-[#B0C8BC]">{p}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* MVP */}
                      <div className="rounded-2xl border border-[#00FF88]/20 bg-[#00FF88]/5 p-5">
                        <div className="mb-2 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-[#00FF88]" />
                          <h3 className="text-sm font-bold text-[#00FF88]">Sugestão de MVP</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-[#7A9E8E]">{result.mvp}</p>
                      </div>

                      {/* Upgrade CTA */}
                      <div className="rounded-2xl border border-[#00FF88]/30
                                      bg-gradient-to-r from-[#00FF88]/10 to-transparent p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-bold text-[#E6F1EC]">Desbloquear análise completa</p>
                            <p className="mt-0.5 text-sm text-[#5A7A6A]">
                              Reddit + X · Exportar PDF · Histórico ilimitado
                            </p>
                          </div>
                          <Link
                            to="/register"
                            className="btn-neon inline-flex flex-shrink-0 items-center gap-1.5
                                       rounded-xl px-4 py-2.5 text-sm"
                          >
                            R$39/mês
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* ── Right panel ──────────────────────────────────────── */}
          {(analysisState === "loading" || analysisState === "done") && (
            <aside className="hidden w-72 flex-shrink-0 overflow-y-auto border-l
                              border-[#1F2A27] bg-[#0E1311] p-4 lg:block">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#3A5A4A]">
                Resumo da análise
              </p>

              {/* Score */}
              <div className="mb-4 flex justify-center rounded-2xl border border-[#1F2A27]
                              bg-[#111615] py-5">
                {result ? (
                  <ScoreGauge score={result.score} />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-28 w-28 rounded-full border-4 border-[#1F2A27]
                                    animate-pulse bg-[#111615]" />
                    <p className="text-xs text-[#3A5A4A]">Calculando…</p>
                  </div>
                )}
              </div>

              {/* Metrics */}
              <div className="space-y-2">
                {result ? (
                  <>
                    <Badge label="Saturação do nicho" value={result.saturation} color={satColor(result.saturation)} />
                    <Badge label="Concorrência" value={result.competition} color={satColor(result.competition)} />
                    <Badge label="Fontes analisadas" value="Play Store + App Store" color="#7A9E8E" />
                    <Badge label="Dados Reddit/X" value="🔒 Plano Validar" color="#3A5A4A" />
                  </>
                ) : (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-9 animate-pulse rounded-lg bg-[#111615]" />
                  ))
                )}
              </div>

              {/* Opportunity */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 rounded-xl border border-[#00FF88]/20 bg-[#00FF88]/8 p-4"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#00FF88]">
                    💡 Oportunidade
                  </p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-[#7A9E8E]">
                    {result.opportunity}
                  </p>
                </motion.div>
              )}

              {/* Locked data */}
              {result && (
                <div className="mt-4 rounded-xl border border-[#1F2A27] bg-[#111615] p-4">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[#3A5A4A]">
                    🔒 Dados bloqueados
                  </p>
                  {["Análise Reddit (234 posts)", "X/Twitter sentiment", "Exportar PDF"].map(item => (
                    <div key={item} className="flex items-center gap-2 py-1">
                      <Lock className="h-3 w-3 text-[#3A5A4A]" />
                      <span className="text-[11px] text-[#3A5A4A]">{item}</span>
                    </div>
                  ))}
                  <Link
                    to="/register"
                    className="mt-3 flex items-center justify-center gap-1 rounded-lg
                               bg-[#00FF88] py-2 text-[11px] font-bold text-[#0B0F0C]
                               hover:bg-[#00CC6A] transition-colors"
                  >
                    Desbloquear por R$39
                  </Link>
                </div>
              )}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
