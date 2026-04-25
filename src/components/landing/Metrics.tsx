import { motion } from "framer-motion";
import { SCRAPED_APPS } from "@/data/apps";

const totalReviews = SCRAPED_APPS.reduce((s, a) => s + a.reviews, 0);

const STATS = [
  { value: SCRAPED_APPS.length + "+",                    label: "apps monitorados",      sub: "Google Play & App Store" },
  { value: (totalReviews / 1_000_000).toFixed(1) + "M", label: "reviews analisadas",    sub: "toda semana, automaticamente" },
  { value: "12",                                          label: "nichos mapeados",       sub: "de finanças a medicina" },
  { value: "2.400+",                                      label: "founders usando",       sub: "plano gratuito disponível" },
];

export function Metrics() {
  return (
    <section className="border-b border-border bg-card py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-3xl font-extrabold tabular-nums text-foreground sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">{s.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
