import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const SUGGESTIONS = [
  "app de treino",
  "app de finanças pessoais",
  "app para afiliados",
  "app de delivery local",
  "app de meditação",
  "app de gestão de tarefas",
  "app para freelancers",
  "app de receitas saudáveis",
];

export function SearchBar() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = () => {
    const idea = value.trim();
    if (idea) localStorage.setItem("painradar_pending_idea", idea);
    navigate({ to: "/register" });
  };

  return (
    <section id="buscar" className="section-divider bg-[#0E1311] py-20">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="label-caps text-[#00FF88]">Análise instantânea</span>
          <h2 className="mt-3 text-2xl font-bold text-[#E6F1EC] sm:text-3xl">
            Digite sua ideia. Receba dados reais.
          </h2>
          <p className="mt-2 text-sm text-[#5A7A6A]">
            Em segundos você descobre se vale a pena construir.
          </p>

          <div className="mt-8 flex items-center gap-3 rounded-xl border border-[#1F2A27]
                          bg-[#111615] p-2 shadow-[var(--shadow-card)]
                          focus-within:border-[#00FF88]/40 focus-within:shadow-[var(--shadow-glow)]
                          transition-all duration-200">
            <Search className="ml-2 h-5 w-5 flex-shrink-0 text-[#3A5A4A]" />
            <input
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAnalyze()}
              placeholder="Digite sua ideia de app..."
              className="flex-1 bg-transparent text-base text-[#E6F1EC] placeholder:text-[#3A5A4A]
                         outline-none"
            />
            <button
              onClick={handleAnalyze}
              className="btn-neon inline-flex h-10 items-center gap-2 rounded-lg px-5 text-sm"
            >
              Analisar ideia
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => setValue(s)}
                className="rounded-full border border-[#1F2A27] bg-[#111615] px-3.5 py-1.5
                           text-xs text-[#5A7A6A] transition-all
                           hover:border-[#00FF88]/30 hover:text-[#00FF88]"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
