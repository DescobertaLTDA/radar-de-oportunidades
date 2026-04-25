import { createFileRoute, redirect } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BarChart2,
  Bell,
  Database,
  Filter,
  Package,
  Sparkles,
  Users,
} from "lucide-react";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { OpportunityCard } from "@/components/dashboard/OpportunityCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { opportunities } from "@/data/mockOpportunities";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ location }) => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  head: () => ({
    meta: [{ title: "Dashboard — PainRadar" }],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNavbar plan="Free" />

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Ranking de oportunidades
            </h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Atualizado há 3 horas · 1.240 dores analisadas esta semana
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm text-foreground hover:bg-[var(--bg-secondary)]">
              <Filter className="h-4 w-4" />
              Todos os nichos
            </button>
            <button className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm text-foreground hover:bg-[var(--bg-secondary)]">
              Esta semana
            </button>
          </div>
        </div>

        {/* Metric cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricCard icon={Database} value={48320} label="dores monitoradas" />
          <MetricCard icon={BarChart2} value={1240} label="novas esta semana" />
          <MetricCard icon={Package} value={87} label="produtos lançados" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Opportunities */}
          <div className="space-y-5">
            {opportunities.map((o, i) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <OpportunityCard opportunity={o} featured={i === 0} />
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="hidden flex-col gap-4 lg:flex">
            <div className="rounded-xl border border-primary bg-card p-5 shadow-[var(--shadow-glow)]">
              <span className="label-caps text-[var(--text-secondary)]">Seu plano</span>
              <p className="mt-1 text-xl font-semibold text-foreground">Free</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Top 2 oportunidades · Score parcial
              </p>
              <button className="mt-4 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-[var(--primary-hover)]">
                <Sparkles className="h-3.5 w-3.5" />
                Fazer upgrade
              </button>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                <span className="label-caps text-foreground">Alertas ativos</span>
              </div>
              <p className="text-3xl font-bold text-foreground">0</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Você ainda não configurou alertas.
              </p>
              <button className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-md border border-border bg-transparent text-sm text-foreground hover:bg-[var(--bg-secondary)]">
                Configurar alerta
              </button>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="label-caps text-foreground">Builders online</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--success)]" />
                </span>
                <p className="text-3xl font-bold text-foreground">147</p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                construindo agora mesmo.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
