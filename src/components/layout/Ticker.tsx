import { Radio } from "lucide-react";
import { SCRAPED_APPS } from "@/data/apps";

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

const items = [...SCRAPED_APPS]
  .sort((a, b) => b.reviews - a.reviews)
  .slice(0, 16)
  .map(a => `${a.name} · ${fmt(a.reviews)} reviews · score ${a.pain} · ${a.downloads}`);

const doubled = [...items, ...items];

export function Ticker() {
  return (
    <div className="relative h-10 w-full overflow-hidden border-b border-border bg-[var(--bg-secondary)]">
      {/* left fade + label */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center gap-2
                      bg-gradient-to-r from-[var(--bg-secondary)] via-[var(--bg-secondary)] to-transparent
                      pl-4 pr-8">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <Radio className="h-3.5 w-3.5 text-primary" />
        <span className="label-caps text-[var(--text-secondary)]">Ao vivo</span>
      </div>

      {/* right fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16
                      bg-gradient-to-l from-[var(--bg-secondary)] to-transparent" />

      <div className="flex h-full items-center whitespace-nowrap will-change-transform
                      [animation:ticker_55s_linear_infinite]">
        {doubled.map((it, i) => (
          <span key={i} className="mx-8 text-xs text-muted-foreground">
            {it}
            <span className="ml-8 text-border">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
