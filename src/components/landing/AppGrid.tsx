import { motion } from "framer-motion";
import { Star, TrendingUp, TrendingDown, Minus } from "lucide-react";

/* coloque os logos reais em /public/apps/<nome>.png e substitua o AppIcon abaixo */
function AppIcon({ name, color, img }: { name: string; color: string; img?: string }) {
  if (img) {
    return (
      <img
        src={img}
        alt={name}
        className="h-12 w-12 rounded-2xl object-cover shadow-sm"
      />
    );
  }
  return (
    <div
      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-sm"
      style={{ background: color }}
    >
      {name[0]}
    </div>
  );
}

function TrendBadge({ value }: { value: string }) {
  const positive = value.startsWith("+");
  const neutral = value === "—";
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
        neutral
          ? "bg-muted text-muted-foreground"
          : positive
          ? "bg-green-50 text-green-700"
          : "bg-red-50 text-red-600"
      }`}
    >
      {neutral ? (
        <Minus className="h-2.5 w-2.5" />
      ) : positive ? (
        <TrendingUp className="h-2.5 w-2.5" />
      ) : (
        <TrendingDown className="h-2.5 w-2.5" />
      )}
      {value}
    </span>
  );
}

const APPS = [
  /* Substitua img por: img: "/apps/notion.png" quando tiver os assets */
  { name: "Notion",      color: "#000000", category: "Produtividade", rating: 3.8, downloads: "12M+", pain: 91, trend: "+18%" },
  { name: "Robinhood",   color: "#00C805", category: "Finanças",       rating: 3.2, downloads: "8.4M+", pain: 87, trend: "+9%"  },
  { name: "Headspace",   color: "#FF6B35", category: "Bem-estar",      rating: 4.1, downloads: "5.1M+", pain: 79, trend: "+6%"  },
  { name: "Duolingo",    color: "#58CC02", category: "Educação",        rating: 4.6, downloads: "20M+", pain: 74, trend: "-2%"  },
  { name: "Calm",        color: "#0B4FFF", category: "Saúde mental",   rating: 4.4, downloads: "4.8M+", pain: 71, trend: "+3%"  },
  { name: "Airbnb",      color: "#FF385C", category: "Viagem",         rating: 3.5, downloads: "15M+", pain: 88, trend: "+14%" },
  { name: "Spotify",     color: "#1DB954", category: "Música",         rating: 4.2, downloads: "50M+", pain: 65, trend: "—"    },
  { name: "Discord",     color: "#5865F2", category: "Social",         rating: 4.0, downloads: "10M+", pain: 70, trend: "+5%"  },
  { name: "Figma",       color: "#A259FF", category: "Design",         rating: 4.3, downloads: "2.1M+", pain: 58, trend: "+1%"  },
  { name: "Linear",      color: "#5E6AD2", category: "Gestão",         rating: 4.7, downloads: "800K+", pain: 52, trend: "+8%"  },
  { name: "Todoist",     color: "#DB4035", category: "Tarefas",        rating: 4.4, downloads: "3.2M+", pain: 67, trend: "+4%"  },
  { name: "Bumble",      color: "#FFD93D", category: "Social",         rating: 3.6, downloads: "6M+",  pain: 83, trend: "+11%" },
];

export function AppGrid() {
  return (
    <section id="features" className="border-b border-border py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="label-caps text-primary">Radar de apps</span>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            Encontre a brecha antes de todo mundo
          </h2>
          <p className="mt-3 text-muted-foreground">
            Rastreamos downloads, ratings e reclamações de milhares de apps.
            O <strong>Score Dor</strong> revela onde usuários estão mais insatisfeitos — e onde
            cabe um produto melhor.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {APPS.map((app, i) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-glow)]"
            >
              <AppIcon name={app.name} color={app.color} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-foreground">{app.name}</p>
                  <TrendBadge value={app.trend} />
                </div>
                <p className="text-[11px] text-muted-foreground">{app.category}</p>
                <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {app.rating}
                  </span>
                  <span>{app.downloads} downloads</span>
                </div>
              </div>

              {/* Pain score */}
              <div className="flex flex-col items-center">
                <span
                  className={`text-xl font-bold tabular-nums ${
                    app.pain >= 85
                      ? "text-red-500"
                      : app.pain >= 70
                      ? "text-amber-500"
                      : "text-primary"
                  }`}
                >
                  {app.pain}
                </span>
                <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                  score
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            Score 85+ · Oportunidade crítica
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            Score 70–84 · Alta insatisfação
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            Score &lt;70 · Em observação
          </span>
        </div>
      </div>
    </section>
  );
}
