import { motion } from "framer-motion";
import { SCRAPED_APPS } from "@/data/apps";

const totalReviews = SCRAPED_APPS.reduce((s, a) => s + a.reviews, 0);

const STATS = [
  { value: "10.000+",                                     label: "ideias analisadas",    sub: "por founders como você" },
  { value: (totalReviews / 1_000_000).toFixed(1) + "M",  label: "reviews processadas",  sub: "Play Store & App Store" },
  { value: "3.000+",                                      label: "oportunidades mapeadas", sub: "atualizadas toda semana" },
  { value: "12",                                          label: "nichos monitorados",   sub: "de finanças a saúde" },
];

export function Metrics() {
  return (
    <section className="section-divider bg-[#0E1311] py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-3xl font-extrabold tabular-nums text-[#00FF88] sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#E6F1EC]">{s.label}</p>
              <p className="mt-0.5 text-xs text-[#5A7A6A]">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
