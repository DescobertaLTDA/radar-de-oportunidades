import { Radio } from "lucide-react";
import { tickerItems } from "@/data/mockOpportunities";

export function Ticker() {
  // duplicar os itens para loop infinito sem corte
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="relative h-10 w-full overflow-hidden border-b border-border bg-[var(--bg-secondary)]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center gap-2 bg-gradient-to-r from-[var(--bg-secondary)] via-[var(--bg-secondary)] to-transparent pl-4 pr-8">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <Radio className="h-3.5 w-3.5 text-primary" />
        <span className="label-caps text-[var(--text-secondary)]">Ao vivo</span>
      </div>
      <div className="flex h-full items-center whitespace-nowrap will-change-transform [animation:ticker_45s_linear_infinite]">
        {items.map((it, i) => (
          <span
            key={i}
            className="mx-8 text-sm text-[var(--text-secondary)]"
          >
            {it}
            <span className="ml-8 text-muted-foreground">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
