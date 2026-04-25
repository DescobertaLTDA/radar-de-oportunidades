import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

interface ScoreBarProps {
  label: string;
  value: number; // 0-100
  tone?: "primary" | "success" | "warning";
}

const toneClass = {
  primary: "bg-primary",
  success: "bg-[var(--success)]",
  warning: "bg-[var(--warning)]",
};

export function ScoreBar({ label, value, tone = "primary" }: ScoreBarProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setWidth(value), 60);
    return () => clearTimeout(t);
  }, [inView, value]);

  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-xs font-medium text-foreground">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-secondary)]">
        <div
          className={`h-full rounded-full ${toneClass[tone]} transition-[width] duration-[1200ms] ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
