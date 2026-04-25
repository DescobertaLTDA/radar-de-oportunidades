import { Download, MessageSquare, Star, Smartphone } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";

export function Metrics() {
  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="label-caps text-primary">Cobertura em tempo real</span>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            Um motor que nunca dorme
          </h2>
          <p className="mt-3 text-muted-foreground">
            Monitoramos App Store e Google Play continuamente para você não perder nenhuma oportunidade.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <MetricCard icon={Smartphone} value={4800}  label="apps monitorados"    />
          <MetricCard icon={MessageSquare} value={48320} label="reviews analisadas" />
          <MetricCard icon={Star}       value={1240}  label="brechas mapeadas"    />
          <MetricCard icon={Download}   value={2400}  label="founders usando"     />
        </div>
      </div>
    </section>
  );
}
