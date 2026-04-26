import { createFileRoute, redirect, useNavigate, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  LayoutGrid, Search, FileText, Settings, LogOut, Plus, Download,
  Star, AlertTriangle, Lightbulb, ChevronDown, ChevronUp,
  Lock, Smartphone, MessageCircle, ArrowRight, Sparkles,
  CheckCircle2, Zap, ChevronRight, BarChart3,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/layout/Logo";
import {
  generateAnalysis, scoreColor, satColor,
  type AnalysisResult, type Competitor,
} from "@/lib/mockAnalysis";

/* ═════════════════════════════════════ Route ══ */
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

/* ═════════════════════════════════════ Canvas steps ══ */
const STEPS = [
  { id: "idea",    icon: Zap,           title: "Ideia recebida",           sub: "Processando input",            color: "#00FF88" },
  { id: "play",    icon: Smartphone,    title: "Play Store",                sub: "Top 10 + reviews negativos",   color: "#00CC6A" },
  { id: "apple",   icon: Star,          title: "App Store",                 sub: "Comparativo iOS × Android",    color: "#FFAA00" },
  { id: "reddit",  icon: MessageCircle, title: "Reddit",                    sub: "Posts de dor e pedidos",       color: "#FF6633" },
  { id: "insight", icon: Lightbulb,     title: "Gerando insights",          sub: "Score · MVP · Brechas",        color: "#00FF88" },
];

type StepState = "idle" | "active" | "done";

/* ═════════════════════════════════════ Score gauge ══ */
function ScoreGauge({ score, animate }: { score: number; animate: boolean }) {
  const color = scoreColor(score);
  const label = score >= 86 ? "Excelente" : score >= 66 ? "Boa oportunidade" : score >= 41 ? "Moderado" : "Saturado";

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-32 w-32 items-center justify-center">
        <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1F2A27" strokeWidth="2.8" />
          <motion.circle
            cx="18" cy="18" r="15.9" fill="none"
            stroke={color} strokeWidth="2.8" strokeLinecap="round"
            strokeDasharray="100"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: animate ? 100 - score : 100 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        <div className="text-center">
          <motion.p
            className="text-4xl font-black tabular-nums"
            style={{ color }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: animate ? 1 : 0, scale: animate ? 1 : 0.8 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            {score}
          </motion.p>
          <p className="text-[10px] text-[#5A7A6A]">/100</p>
        </div>
      </div>
      <p className="mt-1 text-sm font-bold" style={{ color }}>{label}</p>
      <p className="text-[10px] text-[#5A7A6A]">Opportunity Score</p>
    </div>
  );
}

/* ═════════════════════════════════════ Frequency bar ══ */
function FrequencyBar({ value, color = "#00FF88" }: { value: number; color?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="h-1.5 w-full overflow-hidden rounded-full bg-[#1F2A27]">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: inView ? `${value}%` : 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      />
    </div>
  );
}

/* ═════════════════════════════════════ Canvas block ══ */
function CanvasBlock({ step, state, isLast }: { step: typeof STEPS[0]; state: StepState; isLast: boolean }) {
  const Icon = step.icon;
  return (
    <div className="flex items-center">
      <motion.div
        animate={{
          borderColor: state !== "idle" ? `${step.color}50` : "#1F2A27",
          boxShadow: state === "active" ? `0 0 20px -4px ${step.color}40` : "none",
        }}
        className="relative flex w-36 flex-col items-center rounded-2xl border
                   bg-[#111615] px-3 py-4 text-center transition-colors"
      >
        <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full"
          style={{ background: state === "done" ? step.color : "#0D1210", border: `2px solid ${state !== "idle" ? step.color : "#1F2A27"}` }}>
          {state === "done" && <CheckCircle2 className="h-3 w-3 text-[#0B0F0C]" />}
          {state === "active" && <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: step.color }} />}
        </div>

        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl transition-all"
          style={{ background: state !== "idle" ? `${step.color}15` : "#1A2420" }}>
          <Icon className="h-5 w-5" style={{ color: state !== "idle" ? step.color : "#3A5A4A" }} />
        </div>
        <p className="text-[11px] font-bold leading-tight" style={{ color: state !== "idle" ? "#E6F1EC" : "#5A7A6A" }}>{step.title}</p>
        <p className="mt-0.5 text-[10px]" style={{ color: state !== "idle" ? "#7A9E8E" : "#3A5A4A" }}>{step.sub}</p>
      </motion.div>

      {!isLast && (
        <div className="mx-2 flex items-center">
          <motion.div className="h-px w-6 bg-[#1F2A27]" animate={{ background: state === "done" ? "#00FF8840" : "#1F2A27" }} />
          <ChevronRight className="h-3 w-3 text-[#1F2A27]" />
        </div>
      )}
    </div>
  );
}

/* ═════════════════════════════════════ Competitor card ══ */
function CompetitorCard({ c, i }: { c: Competitor; i: number }) {
  const [open, setOpen] = useState(false);
  const gapStyle = {
    danger:  { color: "#FF6666", bg: "rgba(255,68,68,0.08)",  border: "rgba(255,68,68,0.25)"  },
    warning: { color: "#FFAA00", bg: "rgba(255,170,0,0.08)", border: "rgba(255,170,0,0.25)" },
    neutral: { color: "#7A9E8E", bg: "rgba(122,158,142,0.08)", border: "rgba(122,158,142,0.25)" },
  }[c.gapColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="rounded-xl border border-[#1F2A27] bg-[#0D1210] overflow-hidden"
    >
      <button onClick={() => setOpen(v => !v)} className="flex w-full items-center gap-3 p-4 text-left hover:bg-[#111615] transition-colors">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#1F2A27] text-base font-black text-[#E6F1EC]">
          {c.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#E6F1EC]">{c.name}</p>
          <div className="mt-0.5 flex flex-wrap gap-3 text-[11px] text-[#5A7A6A]">
            <span>★ {c.playRating} Play · {(c.playReviews / 1000).toFixed(0)}K reviews</span>
            <span>★ {c.appStoreRating} iOS · {(c.appStoreReviews / 1000).toFixed(0)}K reviews</span>
          </div>
        </div>
        <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
          <span className="rounded-full border px-2.5 py-0.5 text-[10px] font-bold"
            style={{ color: gapStyle.color, background: gapStyle.bg, borderColor: gapStyle.border }}>
            {c.gap}
          </span>
          {open ? <ChevronUp className="h-4 w-4 text-[#3A5A4A]" /> : <ChevronDown className="h-4 w-4 text-[#3A5A4A]" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#1F2A27]"
          >
            <div className="p-4 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#3A5A4A] mb-3">
                Top reclamações deste app
              </p>
              {c.topComplaints.map((complaint, j) => (
                <div key={j} className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#FFAA00]/15 text-[9px] font-black text-[#FFAA00]">{j+1}</span>
                  <p className="text-[12px] text-[#7A9E8E] leading-snug">{complaint}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═════════════════════════════════════ Section header ══ */
function SectionHeader({ icon: Icon, title, badge, color = "#00FF88" }: { icon: React.ElementType; title: string; badge?: string; color?: string }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${color}15` }}>
        <Icon className="h-4 w-4" style={{ color }} />
      </div>
      <h3 className="text-sm font-bold text-[#E6F1EC]">{title}</h3>
      {badge && (
        <span className="ml-auto rounded-full border border-[#1F2A27] bg-[#0D1210] px-2.5 py-0.5 text-[10px] text-[#5A7A6A]">
          {badge}
        </span>
      )}
    </div>
  );
}

/* ═════════════════════════════════════ Nav item ══ */
function NavItem({ icon: Icon, label, active = false }: { icon: React.ElementType; label: string; active?: boolean }) {
  return (
    <button className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${active ? "bg-[#00FF88]/10 text-[#00FF88]" : "text-[#5A7A6A] hover:bg-[#1A2420] hover:text-[#E6F1EC]"}`}>
      <Icon className="h-4 w-4 flex-shrink-0" />
      {label}
    </button>
  );
}

/* ═════════════════════════════════════ Main page ══ */
function DashboardPage() {
  const { idea } = Route.useSearch();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [stepStates, setStepStates]     = useState<StepState[]>(["idle","idle","idle","idle","idle"]);
  const [phase, setPhase]               = useState<"idle"|"loading"|"done">("idle");
  const [result, setResult]             = useState<AnalysisResult | null>(null);
  const [newIdea, setNewIdea]           = useState("");
  const [showBanner, setShowBanner]     = useState(false);
  const [loadingText, setLoadingText]   = useState("Iniciando análise…");

  const LOADING_TEXTS = [
    "Buscando concorrentes na Play Store…",
    "Analisando reviews da App Store…",
    "Lendo posts do Reddit…",
    "Calculando Opportunity Score…",
    "Gerando insights de MVP…",
  ];

  useEffect(() => {
    if (!idea) return;
    setPhase("loading");
    setStepStates(["idle","idle","idle","idle","idle"]);
    setResult(null);
    setShowBanner(false);

    const delays = [0, 800, 1600, 2400, 3200];
    const timers = delays.map((d, i) =>
      setTimeout(() => {
        setStepStates(prev => prev.map((s, j) => j < i ? "done" : j === i ? "active" : s));
        setLoadingText(LOADING_TEXTS[i]);
      }, d)
    );

    const doneTimer = setTimeout(() => {
      setStepStates(["done","done","done","done","done"]);
      setResult(generateAnalysis(idea));
      setPhase("done");
    }, 4200);

    const bannerTimer = setTimeout(() => setShowBanner(true), 4200 + 3000);

    return () => { timers.forEach(clearTimeout); clearTimeout(doneTimer); clearTimeout(bannerTimer); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idea]);

  const go = (i: string) => navigate({ to: "/dashboard", search: { idea: i.trim() } });

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0F0C]">

      {/* ══ SIDEBAR ═════════════════════════════════════════════ */}
      <aside className="hidden w-56 flex-shrink-0 flex-col border-r border-[#1F2A27] bg-[#0E1311] lg:flex">
        <div className="flex h-14 items-center border-b border-[#1F2A27] px-4"><Logo /></div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          <NavItem icon={LayoutGrid} label="Análises" active />
          <NavItem icon={Search}     label="Nova análise" />
          <NavItem icon={BarChart3}  label="Oportunidades" />
          <NavItem icon={FileText}   label="Relatórios" />
          <NavItem icon={Settings}   label="Configurações" />
        </nav>

        <div className="border-t border-[#1F2A27] p-3">
          <div className="rounded-xl border border-[#00FF88]/20 bg-[#00FF88]/5 p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#00FF88]">Plano Grátis</p>
            <p className="mt-0.5 text-xs text-[#5A7A6A]">3 análises/mês · Score básico</p>
            <Link to="/register" className="mt-2.5 flex items-center justify-center gap-1 rounded-lg bg-[#00FF88] px-3 py-1.5 text-[11px] font-bold text-[#0B0F0C] hover:bg-[#00CC6A] transition-colors">
              <Sparkles className="h-3 w-3" /> Fazer upgrade
            </Link>
          </div>
          <button onClick={signOut} className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-[#5A7A6A] hover:text-[#FF6666] transition-colors">
            <LogOut className="h-3.5 w-3.5" /> Sair
          </button>
        </div>
      </aside>

      {/* ══ MAIN ═════════════════════════════════════════════════ */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top bar */}
        <header className="flex h-14 flex-shrink-0 items-center justify-between border-b border-[#1F2A27] bg-[#0E1311] px-4 lg:px-6">
          {/* Progress bar */}
          {phase === "loading" && (
            <motion.div
              className="absolute left-0 top-14 h-0.5 bg-[#00FF88]"
              initial={{ width: "0%" }}
              animate={{ width: `${(stepStates.filter(s => s !== "idle").length / STEPS.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          )}

          <div className="flex items-center gap-3">
            <div className="lg:hidden"><Logo /></div>
            {idea && (
              <div className="hidden items-center gap-2 sm:flex">
                <span className="text-[11px] text-[#5A7A6A]">Analisando:</span>
                <span className="rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 px-2.5 py-0.5 text-xs font-semibold text-[#00FF88]">{idea}</span>
                {phase === "loading" && <span className="text-[11px] text-[#5A7A6A] animate-pulse">{loadingText}</span>}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {result && (
              <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#1F2A27] px-3 text-xs font-medium text-[#5A7A6A] hover:border-[#1F2A27]/80 transition-colors">
                <Download className="h-3.5 w-3.5" /><span className="hidden sm:inline">Exportar</span>
                <Lock className="h-3 w-3 text-[#3A5A4A]" />
              </button>
            )}
            <button onClick={() => navigate({ to: "/dashboard" })} className="btn-neon inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-bold">
              <Plus className="h-3.5 w-3.5" /> Nova análise
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00FF88]/20 text-xs font-bold text-[#00FF88]">
              {user?.email?.[0]?.toUpperCase() ?? "U"}
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── Left / Center ─────────────────────────────────── */}
          <div className="flex flex-1 flex-col overflow-y-auto">

            {/* ═══ EMPTY STATE ══════════════════════════════════ */}
            {phase === "idle" && !idea && (
              <div className="flex flex-1 items-center justify-center p-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#1F2A27] bg-[#111615]">
                    <Search className="h-7 w-7 text-[#00FF88]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#E6F1EC]">Digite uma ideia para começar</h2>
                  <p className="mt-2 text-sm text-[#5A7A6A]">Nossa IA analisa Play Store, App Store e Reddit para encontrar oportunidades reais no seu nicho.</p>

                  <div className="mt-8 flex items-center gap-2 rounded-xl border border-[#1F2A27] bg-[#111615] p-2">
                    <input type="text" value={newIdea} onChange={e => setNewIdea(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && newIdea.trim() && go(newIdea)}
                      placeholder="Ex: app de treino para iniciantes"
                      className="flex-1 bg-transparent px-2 text-sm text-[#E6F1EC] placeholder:text-[#3A5A4A] outline-none" />
                    <button onClick={() => newIdea.trim() && go(newIdea)} className="btn-neon inline-flex h-9 items-center gap-1.5 rounded-lg px-4 text-sm">
                      Analisar <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {["app de treino","finanças pessoais","meditação"].map(s => (
                      <button key={s} onClick={() => go(s)} className="rounded-full border border-[#1F2A27] px-3 py-1 text-xs text-[#5A7A6A] hover:border-[#00FF88]/30 hover:text-[#00FF88] transition-all">{s}</button>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {/* ═══ ANALYSIS (loading + done) ════════════════════ */}
            {(phase === "loading" || phase === "done") && (
              <div className="space-y-0 p-4 lg:p-6">
                {/* Pipeline canvas */}
                <div className="mb-6">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-[#5A7A6A]">Análise em andamento</p>
                      <h2 className="text-lg font-bold capitalize text-[#E6F1EC]">{idea}</h2>
                    </div>
                    {phase === "loading" && (
                      <p className="text-[11px] text-[#5A7A6A] animate-pulse">{loadingText}</p>
                    )}
                    {phase === "done" && (
                      <span className="flex items-center gap-1.5 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 px-3 py-1 text-[11px] font-semibold text-[#00FF88]">
                        <CheckCircle2 className="h-3 w-3" /> Análise completa
                      </span>
                    )}
                  </div>

                  <div className="overflow-x-auto pb-2">
                    <div className="flex min-w-max items-center gap-0">
                      {STEPS.map((s, i) => (
                        <CanvasBlock key={s.id} step={s} state={stepStates[i]} isLast={i === STEPS.length - 1} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results */}
                <AnimatePresence>
                  {result && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pb-24">

                      {/* ── Seção 1: Concorrentes ─────────────── */}
                      <div className="rounded-2xl border border-[#1F2A27] bg-[#111615] p-5">
                        <SectionHeader icon={Smartphone} title="Principais concorrentes analisados" badge="Play Store + App Store · 3 de 10 (grátis)" />
                        <div className="space-y-2">
                          {result.competitors.map((c, i) => <CompetitorCard key={i} c={c} i={i} />)}
                        </div>
                        <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-[#1F2A27] bg-[#0D1210] px-4 py-3">
                          <Lock className="h-4 w-4 flex-shrink-0 text-[#3A5A4A]" />
                          <p className="text-xs text-[#3A5A4A]">+ 7 concorrentes encontrados com histórico de rating — disponível no <span className="text-[#FFAA00]">Plano Validar</span></p>
                          <Link to="/register" className="ml-auto flex-shrink-0 rounded-lg border border-[#FFAA00]/30 px-2.5 py-1 text-[10px] font-bold text-[#FFAA00] hover:bg-[#FFAA00]/10 transition-colors">Desbloquear</Link>
                        </div>
                      </div>

                      {/* ── Seção 2: Reclamações ──────────────── */}
                      <div className="rounded-2xl border border-[#1F2A27] bg-[#111615] p-5">
                        <SectionHeader icon={AlertTriangle} title="Reclamações mais comuns" badge="Play Store + App Store combinadas" color="#FFAA00" />
                        <div className="space-y-3">
                          {result.topComplaints.map((c, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                              className="rounded-xl border border-[#1F2A27] bg-[#0D1210] p-3.5">
                              <div className="flex items-start gap-2.5">
                                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#FFAA00]/15 text-[10px] font-black text-[#FFAA00]">{i+1}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm leading-snug text-[#B0C8BC]">{c.text}</p>
                                  <div className="mt-2 flex items-center gap-3">
                                    <div className="flex-1">
                                      <FrequencyBar value={c.frequency} color={c.frequency >= 40 ? "#FF4444" : c.frequency >= 25 ? "#FFAA00" : "#00FF88"} />
                                    </div>
                                    <span className="text-[10px] font-bold text-[#FFAA00] whitespace-nowrap">{c.frequency}% dos reviews</span>
                                  </div>
                                  <div className="mt-1.5 flex gap-1.5">
                                    {c.sources.map(s => (
                                      <span key={s} className="rounded-full border border-[#1F2A27] px-2 py-0.5 text-[9px] text-[#5A7A6A]">{s}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* ── Seção 3: Reddit ───────────────────── */}
                      <div className="rounded-2xl border border-[#1F2A27] bg-[#111615] p-5">
                        <SectionHeader icon={MessageCircle} title="O que as pessoas estão pedindo no Reddit" badge="3 de 10 posts (grátis)" color="#FF6633" />
                        <div className="space-y-3">
                          {result.redditPosts.map((p, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                              className="rounded-xl border border-[#1F2A27] bg-[#0D1210] p-4">
                              <div className="mb-2 flex items-center justify-between">
                                <span className="rounded-full bg-[#FF6633]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#FF6633]">{p.subreddit}</span>
                                <span className="text-[11px] text-[#5A7A6A]">↑ {p.upvotes.toLocaleString()} upvotes</span>
                              </div>
                              <p className="text-sm italic text-[#B0C8BC] leading-relaxed">"{p.text}"</p>
                              <div className="mt-2.5 flex items-center gap-1.5">
                                <ArrowRight className="h-3 w-3 text-[#00FF88]" />
                                <p className="text-[11px] font-semibold text-[#00FF88]">Gap: {p.gap}</p>
                              </div>
                            </motion.div>
                          ))}

                          {/* Locked posts */}
                          <div className="relative rounded-xl border border-[#1F2A27] bg-[#0D1210] p-4">
                            <div className="absolute inset-0 rounded-xl backdrop-blur-[2px] bg-[#0B0F0C]/60 flex items-center justify-center">
                              <div className="text-center">
                                <Lock className="mx-auto mb-1.5 h-5 w-5 text-[#3A5A4A]" />
                                <p className="text-xs text-[#5A7A6A]">+ 7 posts encontrados com dores similares</p>
                                <Link to="/register" className="mt-2 inline-flex items-center gap-1 rounded-lg bg-[#00FF88] px-3 py-1.5 text-[11px] font-bold text-[#0B0F0C] hover:bg-[#00CC6A] transition-colors">
                                  Desbloquear com Pro
                                </Link>
                              </div>
                            </div>
                            <p className="text-sm text-transparent select-none">Post sobre dores no nicho com análise de gap...</p>
                            <p className="text-xs text-transparent select-none">Conteúdo bloqueado do post Reddit aqui...</p>
                          </div>
                        </div>
                      </div>

                      {/* ── Seção 4: iOS vs Android ───────────── */}
                      <div className="rounded-2xl border border-[#1F2A27] bg-[#111615] p-5">
                        <SectionHeader icon={Smartphone} title="Gaps exclusivos por plataforma" color="#00AAFF" />
                        <p className="mb-4 text-xs text-[#5A7A6A]">O que usuários de cada plataforma reclamam de forma diferente</p>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {/* iOS */}
                          <div className="rounded-xl border border-[#1F2A27] bg-[#0D1210] p-4">
                            <div className="mb-3 flex items-center gap-2">
                              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1F2A27]">
                                <span className="text-sm">🍎</span>
                              </div>
                              <p className="text-xs font-bold text-[#E6F1EC]">iOS — App Store</p>
                              <span className="ml-auto rounded-full bg-[#00FF88]/10 px-2 py-0.5 text-[9px] font-bold text-[#00FF88]">Oportunidade iOS</span>
                            </div>
                            <ul className="space-y-1.5">
                              {result.iosComplaints.map((c, i) => (
                                <li key={i} className="flex items-start gap-1.5 text-[12px] text-[#7A9E8E]">
                                  <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00FF88]" />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                          {/* Android */}
                          <div className="rounded-xl border border-[#1F2A27] bg-[#0D1210] p-4">
                            <div className="mb-3 flex items-center gap-2">
                              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1F2A27]">
                                <span className="text-sm">🤖</span>
                              </div>
                              <p className="text-xs font-bold text-[#E6F1EC]">Android — Play Store</p>
                            </div>
                            <ul className="space-y-1.5">
                              {result.androidComplaints.map((c, i) => (
                                <li key={i} className="flex items-start gap-1.5 text-[12px] text-[#7A9E8E]">
                                  <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFAA00]" />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-3 rounded-xl border border-[#00AAFF]/20 bg-[#00AAFF]/5 p-3">
                          <p className="text-[12px] leading-relaxed text-[#7A9E8E]">
                            💡 <span className="font-semibold text-[#00AAFF]">Insight de plataforma:</span> {result.platformInsight}
                          </p>
                        </div>
                      </div>

                      {/* ── Seção 5: MVP ──────────────────────── */}
                      <div className="rounded-2xl border border-[#00FF88]/20 bg-[#00FF88]/5 p-5">
                        <SectionHeader icon={Lightbulb} title="Sugestão de MVP" color="#00FF88" />
                        <p className="mb-4 text-sm leading-relaxed text-[#7A9E8E]">{result.mvp.description}</p>

                        <div className="space-y-3">
                          {result.mvp.features.map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                              className="rounded-xl border border-[#00FF88]/15 bg-[#0D1210] p-4">
                              <div className="flex items-start gap-3">
                                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#00FF88]/20 text-xs font-black text-[#00FF88]">{i+1}</div>
                                <div>
                                  <p className="text-sm font-bold text-[#E6F1EC]">{f.title}</p>
                                  <p className="mt-0.5 text-xs text-[#7A9E8E]">{f.description}</p>
                                  <p className="mt-1.5 text-[11px] font-semibold text-[#00FF88]">✓ Resolve: {f.solves}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-4 rounded-xl border border-[#1F2A27] bg-[#0D1210] p-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#3A5A4A] mb-1">Stack sugerida</p>
                          <p className="text-sm text-[#7A9E8E]">{result.mvp.stack}</p>
                        </div>
                      </div>

                      {/* ── Seção 6: Bloqueados ───────────────── */}
                      <div className="rounded-2xl border border-[#1F2A27] bg-[#111615] p-5">
                        <SectionHeader icon={Lock} title="Dados disponíveis no plano Pro" color="#FFAA00" />
                        <div className="space-y-2">
                          {[
                            "Análise completa Reddit (234 posts encontrados)",
                            "Menções X/Twitter · análise de sentimento em tempo real",
                            "Top 10 concorrentes com histórico de rating 12 meses",
                            "Exportar PDF da análise completa",
                            "Salvar e comparar análises no histórico",
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 rounded-xl border border-[#1F2A27] bg-[#0D1210] px-4 py-3">
                              <Lock className="h-3.5 w-3.5 flex-shrink-0 text-[#3A5A4A]" />
                              <p className="text-xs text-[#5A7A6A]">{item}</p>
                              <span className="ml-auto rounded-full border border-[#FFAA00]/30 px-2 py-0.5 text-[9px] font-bold text-[#FFAA00]">Pro</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Loading skeletons */}
                {phase === "loading" && (
                  <div className="space-y-4 pb-6">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-40 animate-pulse rounded-2xl border border-[#1F2A27] bg-[#111615]" />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Right panel ──────────────────────────────────── */}
          {(phase === "loading" || phase === "done") && (
            <aside className="hidden w-72 flex-shrink-0 overflow-y-auto border-l border-[#1F2A27] bg-[#0E1311] p-4 lg:block">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#3A5A4A]">Resumo da análise</p>

              {/* Score */}
              <div className="mb-4 flex justify-center rounded-2xl border border-[#1F2A27] bg-[#111615] py-6">
                {result
                  ? <ScoreGauge score={result.score} animate={true} />
                  : <div className="flex flex-col items-center gap-3">
                      <div className="h-32 w-32 animate-pulse rounded-full border-4 border-[#1F2A27] bg-[#111615]" />
                      <p className="text-xs text-[#3A5A4A]">Calculando…</p>
                    </div>
                }
              </div>

              {/* Metrics */}
              <div className="space-y-2">
                {result ? (
                  <>
                    {[
                      { label: "Saturação do nicho", value: result.saturation, color: satColor(result.saturation) },
                      { label: "Concorrência",        value: result.competition, color: satColor(result.competition) },
                    ].map(m => (
                      <div key={m.label} className="flex items-center justify-between rounded-lg border border-[#1F2A27] bg-[#0D1210] px-3 py-2">
                        <span className="text-xs text-[#5A7A6A]">{m.label}</span>
                        <span className="text-xs font-bold" style={{ color: m.color }}>{m.value}</span>
                      </div>
                    ))}
                    <div className="rounded-lg border border-[#1F2A27] bg-[#0D1210] px-3 py-2">
                      <p className="text-xs text-[#5A7A6A] mb-1">Fontes analisadas</p>
                      <div className="flex gap-1.5">
                        {result.sourcesAnalyzed.map(s => (
                          <span key={s} className="rounded-full border border-[#1F2A27] px-2 py-0.5 text-[9px] text-[#7A9E8E]">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-[#1F2A27] bg-[#0D1210] px-3 py-2">
                      <span className="text-xs text-[#5A7A6A]">Reddit + X/Twitter</span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[#3A5A4A]">
                        <Lock className="h-3 w-3" /> Pro
                      </span>
                    </div>
                  </>
                ) : Array.from({length: 4}).map((_, i) => (
                  <div key={i} className="h-9 animate-pulse rounded-lg bg-[#111615]" />
                ))}
              </div>

              {/* Opportunity */}
              {result && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="mt-4 rounded-xl border border-[#00FF88]/20 bg-[#00FF88]/8 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#00FF88]">💡 Oportunidade detectada</p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-[#7A9E8E]">{result.opportunityText}</p>
                </motion.div>
              )}

              {/* Locked */}
              {result && (
                <div className="mt-4 rounded-xl border border-[#1F2A27] bg-[#111615] p-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#3A5A4A]">🔒 Desbloqueie mais</p>
                  {["Reddit completo","X/Twitter sentiment","Exportar PDF"].map(item => (
                    <div key={item} className="flex items-center gap-2 py-1">
                      <Lock className="h-3 w-3 text-[#3A5A4A]" />
                      <span className="text-[11px] text-[#3A5A4A]">{item}</span>
                    </div>
                  ))}
                  <Link to="/register" className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-[#00FF88] py-2 text-[11px] font-bold text-[#0B0F0C] hover:bg-[#00CC6A] transition-colors">
                    Desbloquear por R$39
                  </Link>
                </div>
              )}
            </aside>
          )}
        </div>
      </div>

      {/* ══ STICKY UPGRADE BANNER ════════════════════════════════ */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#1F2A27]
                       bg-[#0E1311]/95 backdrop-blur-md px-4 py-3"
          >
            <div className="mx-auto flex max-w-5xl items-center gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#00FF88]/15">
                <Lock className="h-4 w-4 text-[#00FF88]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#E6F1EC]">Desbloquear análise completa</p>
                <p className="text-xs text-[#5A7A6A]">Reddit · X/Twitter · 10 concorrentes · Exportar PDF · Histórico ilimitado — menos que um café por semana</p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                <Link to="/register" className="btn-neon inline-flex h-9 items-center gap-1.5 rounded-xl px-4 text-sm">
                  R$39/mês <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <button onClick={() => setShowBanner(false)} className="text-xs text-[#3A5A4A] hover:text-[#5A7A6A] whitespace-nowrap">Ver mais</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
