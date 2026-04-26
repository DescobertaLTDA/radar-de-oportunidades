import { motion } from "framer-motion";
import { Star, Users, Zap, TrendingDown, AlertTriangle, Rocket, ArrowRight, BarChart2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { SCRAPED_APPS, type AppEntry } from "@/data/apps";

const ALL_CATS = ["Todos", ...Array.from(new Set(SCRAPED_APPS.map(a => a.category)))];

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

/* ── Saturation ── */
type SatLevel = "alta" | "media" | "baixa";

function getSat(pain: number): SatLevel {
  if (pain >= 50) return "baixa";
  if (pain >= 38) return "media";
  return "alta";
}

const SAT_MAP = {
  alta:  { label: "Saturação: Alta",  text: "#FF6666", border: "rgba(255,68,68,0.30)",  bg: "rgba(255,68,68,0.08)"  },
  media: { label: "Saturação: Média", text: "#FFAA00", border: "rgba(255,170,0,0.30)",  bg: "rgba(255,170,0,0.08)"  },
  baixa: { label: "Saturação: Baixa", text: "#00FF88", border: "rgba(0,255,136,0.30)",  bg: "rgba(0,255,136,0.08)"  },
};

/* ── Score color ── */
function scoreStyle(pain: number): { color: string; glow: string } {
  if (pain >= 50) return { color: "#00FF88", glow: "0 0 24px rgba(0,255,136,0.35)" };
  if (pain >= 38) return { color: "#FFAA00", glow: "0 0 24px rgba(255,170,0,0.25)"  };
  return               { color: "#FF6666", glow: "0 0 24px rgba(255,68,68,0.20)"   };
}

/* ── Quick insight ── */
type Insight = { icon: React.ElementType; text: string; color: string; bg: string };

function getInsight(pain: number, category: string): Insight {
  if (pain >= 50) return {
    icon: Rocket,
    text: "Alta oportunidade de entrada",
    color: "#00FF88",
    bg: "rgba(0,255,136,0.08)",
  };
  if (pain >= 38) return {
    icon: Zap,
    text: "Saturado, mas com brechas",
    color: "#FFAA00",
    bg: "rgba(255,170,0,0.08)",
  };
  return {
    icon: AlertTriangle,
    text: "Mercado dominado — diferenciação necessária",
    color: "#FF6666",
    bg: "rgba(255,68,68,0.08)",
  };
}

/* ── Competition label ── */
function competitionLabel(downloads: string): string {
  if (downloads.includes("10B") || downloads.includes("5B")) return "Muito alta (10+ players)";
  if (downloads.includes("1B"))  return "Alta (5–10 players)";
  if (downloads.includes("500M")) return "Média (3–5 players)";
  if (downloads.includes("100M")) return "Baixa (1–3 players)";
  return "Muito baixa (< 1 player)";
}

/* ── Innovation level ── */
function innovationLabel(pain: number, rating: number): { label: string; color: string } {
  const score = pain + (5 - rating) * 5;
  if (score >= 45) return { label: "Alta",  color: "#00FF88" };
  if (score >= 30) return { label: "Média", color: "#FFAA00" };
  return               { label: "Baixa", color: "#FF6666" };
}

/* ── Opportunity text per category ── */
const OP: Record<string, [string, string, string]> = {
  "Finanças":        ["App de finanças sem banco vinculado", "Educação financeira para jovens", "Nicho específico com UX superior"],
  "Produtividade":   ["Foco sem distrações para mobile", "Integração nativa entre apps", "Vertical específica não atendida"],
  "Social":          ["Comunidades de nicho e interesse", "Privacidade e menos algoritmo", "Diferenciação radical de formato"],
  "Saúde & Fitness": ["Monitoramento básico sem paywall", "Integração com wearables simples", "Segmento específico de saúde"],
  "Educação":        ["Microaprendizado em português", "Gamificação fora do inglês", "Especialização por área"],
  "Compras":         ["Cashback localizado e regional", "Menos popups, mais clareza", "Nicho geográfico específico"],
  "Alimentação":     ["Cardápios locais sem taxa alta", "Dietas específicas não atendidas", "Experiência por nicho alimentar"],
  "Entretenimento":  ["Conteúdo local sem assinatura", "Criadores independentes BR", "Formato não explorado"],
  "Viagem":          ["Roteiros off-the-beaten-path BR", "Sem plano premium forçado", "Experiência local e autêntica"],
  "Negócios":        ["Gestão simples para MEI", "Integração sem burocracia", "Vertical específica de negócio"],
  "Medicina":        ["Saúde sem jargão médico", "Acesso a informação local", "Nicho de especialidade"],
  "Esportes":        ["Esporte local não coberto", "Gamificação de atividade física", "Comunidade de nicho esportivo"],
};

function getOpportunity(app: AppEntry): string {
  const bucket = app.pain >= 50 ? 0 : app.pain >= 38 ? 1 : 2;
  const row = OP[app.category] ?? ["Oportunidade detectada", "Análise disponível", "Diferenciação necessária"];
  return row[bucket];
}

/* ═══════════════════════════════════════ AppCard ══ */
function AppCard({ app, i }: { app: AppEntry; i: number }) {
  const [imgErr, setImgErr] = useState(false);

  const sat     = SAT_MAP[getSat(app.pain)];
  const score   = scoreStyle(app.pain);
  const insight = getInsight(app.pain, app.category);
  const inno    = innovationLabel(app.pain, app.rating);
  const opp     = getOpportunity(app);
  const InsightIcon = insight.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: (i % 12) * 0.04 }}
      className="group flex flex-col rounded-2xl border border-[#1F2A27] bg-[#111615]
                 shadow-[var(--shadow-card)] transition-all duration-200
                 hover:border-[#00FF88]/25 hover:shadow-[var(--shadow-glow)]"
    >

      {/* ══ 1. HEADER ══════════════════════════════════════════════ */}
      <div className="flex items-center gap-3 p-4 pb-3">
        {/* Icon */}
        {!imgErr ? (
          <img
            src={app.icon}
            alt={app.name}
            className="h-14 w-14 flex-shrink-0 rounded-2xl object-cover"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center
                          rounded-2xl bg-[#1F2A27] text-2xl font-black text-[#00FF88]">
            {app.name[0]}
          </div>
        )}

        {/* Name + category */}
        <div className="flex-1 min-w-0">
          <p className="truncate text-[15px] font-bold leading-tight text-[#E6F1EC]">
            {app.name}
          </p>
          <p className="mt-0.5 text-[11px] text-[#5A7A6A]">{app.category}</p>
          <div className="mt-1.5 flex items-center gap-2 text-[11px] text-[#3A5A4A]">
            <span className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              <span className="text-[#7A9E8E]">{app.rating}</span>
            </span>
            <span className="flex items-center gap-0.5">
              <Users className="h-3 w-3" />
              {fmt(app.reviews)}
            </span>
            <span>{app.downloads}</span>
          </div>
        </div>

        {/* Saturation badge */}
        <span
          className="flex-shrink-0 self-start rounded-full border px-2.5 py-1
                     text-[10px] font-bold leading-none"
          style={{ color: sat.text, borderColor: sat.border, background: sat.bg }}
        >
          {sat.label}
        </span>
      </div>

      {/* ══ 2. SCORE BLOCK ══════════════════════════════════════════ */}
      <div className="mx-4 flex items-center justify-between rounded-xl
                      border border-[#1F2A27] bg-[#0D1210] px-4 py-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3A5A4A]">
            Opportunity Score
          </p>
          <div className="mt-0.5 flex items-baseline gap-1">
            <span
              className="text-[42px] font-black leading-none tabular-nums"
              style={{ color: score.color, textShadow: score.glow }}
            >
              {app.pain}
            </span>
            <span className="text-base font-bold text-[#3A5A4A]">/100</span>
          </div>
        </div>

        {/* Mini bar */}
        <div className="flex flex-col items-end gap-1.5">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#1F2A27]">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${app.pain}%`, background: score.color }}
            />
          </div>
          <p className="text-[10px] text-[#3A5A4A]">
            {app.pain >= 50 ? "Excelente" : app.pain >= 38 ? "Moderado" : "Baixo"}
          </p>
        </div>
      </div>

      {/* ══ 3. QUICK INSIGHT ════════════════════════════════════════ */}
      <div
        className="mx-4 mt-2 flex items-center gap-2 rounded-xl px-3 py-2.5"
        style={{ background: insight.bg }}
      >
        <InsightIcon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: insight.color }} />
        <p className="text-[12px] font-semibold" style={{ color: insight.color }}>
          {insight.text}
        </p>
      </div>

      {/* ══ 4. DATA LIST ════════════════════════════════════════════ */}
      <div className="mx-4 mt-3 space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 text-[#5A7A6A]">
            <BarChart2 className="h-3 w-3" />
            Concorrência
          </span>
          <span className="font-medium text-[#B0C8BC]">{competitionLabel(app.downloads)}</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 text-[#5A7A6A]">
            <Star className="h-3 w-3" />
            Nota média
          </span>
          <span className="font-medium text-[#B0C8BC]">{app.rating} ★</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 text-[#5A7A6A]">
            <Sparkles className="h-3 w-3" />
            Inovação
          </span>
          <span className="font-medium" style={{ color: inno.color }}>{inno.label}</span>
        </div>
      </div>

      {/* ══ 5. OPPORTUNITY ══════════════════════════════════════════ */}
      <div className="mx-4 mt-3 rounded-xl border border-[#00FF88]/15
                      bg-[#00FF88]/5 px-3 py-2.5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#00FF88]">
          💡 Oportunidade
        </p>
        <p className="mt-0.5 truncate text-[12px] font-medium text-[#7A9E8E]">{opp}</p>
      </div>

      {/* ══ 6. CTA ══════════════════════════════════════════════════ */}
      <div className="p-4 pt-3">
        <Link
          to="/register"
          className="flex w-full items-center justify-center gap-1.5 rounded-xl
                     border border-[#1F2A27] py-2.5 text-[12px] font-semibold
                     text-[#5A7A6A] transition-all duration-150
                     hover:border-[#00FF88]/40 hover:text-[#00FF88]
                     hover:shadow-[0_0_16px_-4px_rgba(0,255,136,0.30)]"
        >
          Ver análise completa
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════ AppGrid ══ */
const PAGE_SIZE = 12;

export function AppGrid() {
  const [cat, setCat] = useState("Todos");
  const [showAll, setShowAll] = useState(false);

  const filtered = cat === "Todos"
    ? SCRAPED_APPS
    : SCRAPED_APPS.filter(a => a.category === cat);

  const sorted = [...filtered].sort((a, b) => b.reviews - a.reviews);
  const visible = showAll ? sorted : sorted.slice(0, PAGE_SIZE);
  const hasMore = sorted.length > PAGE_SIZE && !showAll;

  function handleCatChange(c: string) {
    setCat(c);
    setShowAll(false);
  }

  return (
    <section id="apps" className="section-divider py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="label-caps text-[#00FF88]">Dados reais · Play Store</span>
          <h2 className="mt-3 text-3xl font-bold text-[#E6F1EC] sm:text-4xl">
            Apps reais. Dores reais.
          </h2>
          <p className="mt-3 text-[#5A7A6A]">
            Cada card é uma mini-consultoria — score, saturação, concorrentes
            e a oportunidade detectada pelo nosso algoritmo.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {ALL_CATS.map(c => (
            <button
              key={c}
              onClick={() => handleCatChange(c)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                cat === c
                  ? "bg-[#00FF88] text-[#0B0F0C] shadow-[var(--shadow-neon-btn)]"
                  : "border border-[#1F2A27] text-[#5A7A6A] hover:border-[#00FF88]/30 hover:text-[#E6F1EC]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((app, i) => <AppCard key={app.id} app={app} i={i} />)}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="btn-ghost rounded-lg px-6 py-2.5 text-sm font-medium"
            >
              Ver todos os {sorted.length} apps
            </button>
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-[#3A5A4A]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#00FF88]" />Score 50+ · Saturação baixa
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FFAA00]" />Score 38–49 · Saturação média
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FF4444]" />Score &lt;38 · Saturação alta
          </span>
        </div>
      </div>
    </section>
  );
}
