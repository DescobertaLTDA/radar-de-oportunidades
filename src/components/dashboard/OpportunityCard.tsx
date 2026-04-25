import { Lock, MessageSquareQuote, TrendingUp, Sparkles } from "lucide-react";
import type { Opportunity } from "@/data/mockOpportunities";
import { ScoreBar } from "./ScoreBar";

const statusMeta: Record<
  Opportunity["status"],
  { label: string; className: string }
> = {
  hot: {
    label: "Em alta",
    className: "bg-[oklch(0.62_0.22_22_/_0.15)] text-[var(--danger)]",
  },
  new: {
    label: "Novo",
    className: "bg-primary-muted text-primary",
  },
  rising: {
    label: "Subindo",
    className: "bg-[oklch(0.65_0.14_165_/_0.15)] text-[var(--success)]",
  },
};

interface Props {
  opportunity: Opportunity;
  featured?: boolean;
}

export function OpportunityCard({ opportunity, featured = false }: Props) {
  const meta = statusMeta[opportunity.status];

  return (
    <article
      className={`relative overflow-hidden rounded-xl border bg-card p-6 transition-all ${
        featured
          ? "border-primary shadow-[var(--shadow-glow)]"
          : "border-border hover:border-[oklch(0.40_0.05_285)]"
      } ${opportunity.locked ? "select-none" : ""}`}
    >
      {/* Locked overlay */}
      {opportunity.locked && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-card/80 backdrop-blur-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-muted">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground">
            Disponível no plano Pro
          </p>
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-[var(--primary-hover)]">
            <Sparkles className="h-3.5 w-3.5" />
            Desbloquear
          </button>
        </div>
      )}

      <div className={opportunity.locked ? "blur-sm" : ""}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="label-caps text-muted-foreground">
                #{opportunity.rank}
              </span>
              <span
                className={`label-caps rounded-full px-2 py-0.5 ${meta.className}`}
              >
                {meta.label}
              </span>
              {opportunity.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-[var(--bg-secondary)] px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <h3 className="text-lg font-semibold text-foreground sm:text-xl">
              {opportunity.title}
            </h3>
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-border bg-[var(--bg-secondary)] p-3">
              <MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-secondary)]" />
              <p className="text-sm italic text-muted-foreground">
                "{opportunity.quote}"
              </p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {opportunity.mentions.toLocaleString("pt-BR")} menções analisadas
            </p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-[var(--bg-secondary)] px-4 py-3">
            <span className="label-caps text-muted-foreground">Score</span>
            <span className="text-3xl font-bold text-primary tabular-nums">
              {opportunity.score}
            </span>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <ScoreBar label="Volume de dor" value={opportunity.painScore} tone="primary" />
          <ScoreBar label="Concorrência" value={opportunity.competitionScore} tone="warning" />
          <ScoreBar label="Monetizável" value={opportunity.monetizationScore} tone="success" />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
            <span>
              Stack: <span className="text-foreground">{opportunity.stack}</span>
            </span>
            <span>
              Receita: <span className="text-foreground">{opportunity.revenueEstimate}</span>
            </span>
            <span>
              Concorrência: <span className="text-foreground">{opportunity.competitionLabel}</span>
            </span>
          </div>
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-transparent px-3 text-sm font-medium text-foreground transition-colors hover:bg-[var(--bg-secondary)]">
            <TrendingUp className="h-3.5 w-3.5" />
            Ver análise
          </button>
        </div>
      </div>
    </article>
  );
}
