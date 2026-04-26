import { motion } from "framer-motion";
import { Star, Users, ArrowRight, Lightbulb, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { SCRAPED_APPS, type AppEntry } from "@/data/apps";

const ALL_CATS = ["Todos", ...Array.from(new Set(SCRAPED_APPS.map(a => a.category)))];

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

/* ── Saturation derived from pain score (inverse) ── */
function saturation(pain: number): { label: string; color: string; bg: string } {
  if (pain >= 50) return { label: "Saturação: Baixa",  color: "#00FF88", bg: "rgba(0,255,136,0.08)"  };
  if (pain >= 38) return { label: "Saturação: Média",  color: "#FFAA00", bg: "rgba(255,170,0,0.08)"  };
  return              { label: "Saturação: Alta",   color: "#FF6666", bg: "rgba(255,68,68,0.08)"   };
}

/* ── Estimated strong competitors from download tier ── */
function competitors(downloads: string): string {
  if (downloads.includes("10B") || downloads.includes("5B")) return "5+ apps dominantes";
  if (downloads.includes("1B"))  return "3–5 apps dominantes";
  if (downloads.includes("500M")) return "2–3 apps dominantes";
  if (downloads.includes("100M")) return "1–2 apps dominantes";
  return "< 1 app dominante";
}

/* ── Innovation level based on pain + rating ── */
function innovation(pain: number, rating: number): { label: string; color: string } {
  const score = pain + (5 - rating) * 5;
  if (score >= 45) return { label: "Alto potencial",  color: "#00FF88" };
  if (score >= 30) return { label: "Médio potencial", color: "#FFAA00" };
  return               { label: "Baixo potencial",  color: "#FF6666" };
}

/* ── One-line insight per category × saturation level ── */
const INSIGHTS: Record<string, [string, string, string]> = {
  "Finanças":      ["Nicho aberto para app de finanças sem banco vinculado", "Oportunidade em educação financeira prática", "Mercado maduro — diferencie com UX ou nicho específico"],
  "Produtividade": ["Alta demanda por foco sem distrações em mobile", "Usuários pedem integração nativa entre apps", "Nicho consolidado — explore vertical específica"],
  "Social":        ["Crescimento em comunidades de nicho e interesse", "Usuários buscam privacidade e menos algoritmo", "Saturado — forte diferenciação necessária"],
  "Saúde":         ["Espaço para app sem paywall em monitoramento básico", "Demanda por integração com wearables simples", "Nicho competitivo — foque em segmento específico"],
  "Educação":      ["Alta procura por aprendizado microconteúdo em PT", "Gamificação ainda pouco explorada fora do inglês", "Mercado estável — especialização é o caminho"],
  "Compras":       ["Oportunidade em cashback localizado e regional", "Usuários pedem menos popups e mais clareza de preço", "Segmento dominado — explore nicho geográfico"],
  "Alimentação":   ["Espaço para cardápios locais sem taxa exorbitante", "Demanda por dietas específicas não atendida", "Mercado consolidado — diferenciação por nicho alimentar"],
  "Jogos":         ["Hipercasual sem ads invasivos tem alta retenção", "Jogos locais e temáticos BR crescendo", "Altamente competitivo — monetização criativa é chave"],
  "Viagem":        ["Oportunidade em roteiros off-the-beaten-path BR", "Demanda por app de viagem sem plano premium forçado", "Segmento recuperando — foque em experiência local"],
  "Transporte":    ["Espaço para mobilidade compartilhada em cidades médias", "Usuários reclamam de preços imprevisíveis", "Mercado regulado — oportunidade em nicho específico"],
  "Música":        ["Oportunidade em criação musical sem assinatura", "Alta demanda por descoberta local de artistas BR", "Dominado por big tech — foque em criadores independentes"],
  "Fotografia":    ["Edição offline sem nuvem tem alta demanda", "Usuários pedem templates sem marca d'água grátis", "Nicho maduro — ferramentas pro sem assinatura se destacam"],
};

function getInsight(app: AppEntry): string {
  const bucket = app.pain >= 50 ? 0 : app.pain >= 38 ? 1 : 2;
  const row = INSIGHTS[app.category] ?? ["Oportunidade detectada neste nicho", "Análise detalhada disponível", "Mercado estabelecido — diferenciação necessária"];
  return row[bucket];
}

/* ── Score color ── */
function scoreColor(pain: number) {
  if (pain >= 50) return "text-[#00FF88]";
  if (pain >= 38) return "text-[#FFAA00]";
  return "text-[#FF6666]";
}

/* ─────────────────────────────────────────── AppCard ── */
function AppCard({ app, i }: { app: AppEntry; i: number }) {
  const [err, setErr] = useState(false);
  const sat  = saturation(app.pain);
  const inno = innovation(app.pain, app.rating);
  const insight = getInsight(app);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: (i % 12) * 0.03 }}
      className="card-hover group flex flex-col rounded-2xl border border-[#1F2A27]
                 bg-[#111615] p-4 shadow-[var(--shadow-card)]"
    >
      {/* ── Header ── */}
      <div className="flex items-start gap-3">
        {!err ? (
          <img
            src={app.icon}
            alt={app.name}
            className="h-11 w-11 flex-shrink-0 rounded-2xl object-cover"
            onError={() => setErr(true)}
          />
        ) : (
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center
                          rounded-2xl bg-[#1F2A27] text-lg font-bold text-[#00FF88]">
            {app.name[0]}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-bold text-[#E6F1EC]">{app.name}</p>
          <p className="text-[11px] text-[#5A7A6A]">{app.category}</p>
          <div className="mt-1.5 flex items-center gap-2.5 text-[11px] text-[#3A5A4A]">
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
          className="flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
          style={{ color: sat.color, background: sat.bg }}
        >
          {sat.label}
        </span>
      </div>

      {/* ── Analysis block ── */}
      <div className="mt-3 rounded-xl border border-[#1F2A27] bg-[#0D1210] p-3 space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#5A7A6A]">Concorrentes fortes</span>
          <span className="font-medium text-[#B0C8BC]">{competitors(app.downloads)}</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#5A7A6A]">Média de avaliação</span>
          <span className="font-medium text-[#B0C8BC]">{app.rating} ★</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#5A7A6A]">Nível de inovação</span>
          <span className="font-medium" style={{ color: inno.color }}>{inno.label}</span>
        </div>
      </div>

      {/* ── Opportunity insight ── */}
      <div className="mt-3 flex items-start gap-2 rounded-xl border border-[#00FF88]/15
                      bg-[#00FF88]/5 p-3">
        <Lightbulb className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#00FF88]" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#00FF88]">
            Oportunidade detectada
          </p>
          <p className="mt-0.5 text-[11px] leading-snug text-[#7A9E8E]">{insight}</p>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="mt-3 flex items-center justify-between border-t border-[#1F2A27] pt-3">
        <div className="flex items-center gap-1.5">
          <ShieldAlert className={`h-3.5 w-3.5 ${scoreColor(app.pain)}`} />
          <div>
            <p className="text-[9px] uppercase tracking-widest text-[#3A5A4A]">Opportunity Score</p>
            <p className={`text-sm font-extrabold leading-none tabular-nums ${scoreColor(app.pain)}`}>
              {app.pain}<span className="text-[10px] font-normal text-[#3A5A4A]">/100</span>
            </p>
          </div>
        </div>

        <Link
          to="/register"
          className="inline-flex items-center gap-1 rounded-lg border border-[#1F2A27]
                     bg-[#111615] px-3 py-1.5 text-[11px] font-medium text-[#5A9E7A]
                     transition-all hover:border-[#00FF88]/40 hover:text-[#00FF88]"
        >
          Ver análise completa
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────── AppGrid ── */
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

        {/* filter */}
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
