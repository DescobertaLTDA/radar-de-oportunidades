import type { LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

interface Props {
  icon: LucideIcon;
  value: number;
  label: string;
  suffix?: string;
}

export function MetricCard({ icon: Icon, value, label, suffix = "" }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const display = useCountUp(value, 1500, inView);

  return (
    <div
      ref={ref}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-muted text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-3xl font-bold tabular-nums text-foreground">
        {display.toLocaleString("pt-BR")}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
