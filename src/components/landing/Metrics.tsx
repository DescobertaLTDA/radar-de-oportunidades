import { BarChart2, Database, Package, Users } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";

export function Metrics() {
  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="label-caps text-primary">Sinais em tempo real</span>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            Um motor que nunca dorme
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <MetricCard icon={Database} value={48320} label="dores monitoradas" />
          <MetricCard icon={BarChart2} value={1240} label="novas esta semana" />
          <MetricCard icon={Package} value={87} label="produtos lançados" />
          <MetricCard icon={Users} value={2400} label="founders ativos" />
        </div>
      </div>
    </section>
  );
}
