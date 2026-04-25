export type OpportunityStatus = "hot" | "new" | "rising";

export interface Opportunity {
  id: number;
  rank: number;
  status: OpportunityStatus;
  title: string;
  tags: string[];
  quote: string;
  mentions: number;
  score: number;
  painScore: number;
  competitionScore: number;
  monetizationScore: number;
  competitionLabel: string;
  stack: string;
  revenueEstimate: string;
  locked: boolean;
}

export const opportunities: Opportunity[] = [
  {
    id: 1,
    rank: 1,
    status: "hot",
    title: "Onboarding de clientes para freelancers brasileiros",
    tags: ["Freelancers", "B2B"],
    quote:
      "Perco horas toda semana mandando os mesmos documentos pro cliente novo.",
    mentions: 834,
    score: 91,
    painScore: 88,
    competitionScore: 18,
    monetizationScore: 75,
    competitionLabel: "Baixa",
    stack: "React + Supabase",
    revenueEstimate: "R$15k–40k/mês",
    locked: false,
  },
  {
    id: 2,
    rank: 2,
    status: "new",
    title: "Controle de estoque para restaurantes pequenos",
    tags: ["Restaurantes", "PME"],
    quote:
      "Todos os sistemas são caros demais ou complexos demais pra minha realidade.",
    mentions: 612,
    score: 84,
    painScore: 79,
    competitionScore: 42,
    monetizationScore: 82,
    competitionLabel: "Média",
    stack: "React Native + Firebase",
    revenueEstimate: "R$10k–25k/mês",
    locked: false,
  },
  {
    id: 3,
    rank: 3,
    status: "rising",
    title: "Agendamento para profissionais autônomos de saúde",
    tags: ["Saúde", "Autônomos"],
    quote:
      "Meus pacientes somem porque não tenho como mandar lembrete automático.",
    mentions: 491,
    score: 79,
    painScore: 74,
    competitionScore: 31,
    monetizationScore: 88,
    competitionLabel: "Baixa",
    stack: "Next.js + Prisma",
    revenueEstimate: "R$8k–20k/mês",
    locked: false,
  },
  {
    id: 4,
    rank: 4,
    status: "new",
    title: "Gestão financeira simplificada para MEI",
    tags: ["MEI", "Finanças"],
    quote: "Conteúdo bloqueado — disponível no plano Pro.",
    mentions: 388,
    score: 76,
    painScore: 71,
    competitionScore: 55,
    monetizationScore: 70,
    competitionLabel: "Média",
    stack: "—",
    revenueEstimate: "—",
    locked: true,
  },
  {
    id: 5,
    rank: 5,
    status: "hot",
    title: "Proposta comercial automatizada para agências",
    tags: ["Agências", "B2B"],
    quote: "Conteúdo bloqueado — disponível no plano Pro.",
    mentions: 301,
    score: 73,
    painScore: 68,
    competitionScore: 28,
    monetizationScore: 77,
    competitionLabel: "Baixa",
    stack: "—",
    revenueEstimate: "—",
    locked: true,
  },
];

export const tickerItems = [
  "Nova dor detectada · Onboarding para freelancers BR · score 91 · 834 menções",
  "Oportunidade em alta · Controle de estoque para restaurantes · score 84",
  "48.320 dores monitoradas esta semana",
  "87 produtos lançados por builders do PainRadar",
  "Nova dor detectada · Lembretes para clínicas autônomas · score 79",
  "1.240 novas menções analisadas nas últimas 24h",
];

export const builders = [
  {
    initials: "RM",
    name: "Rafael Moura",
    role: "Founder · Fluxo.app",
    quote:
      "Lancei meu MVP em 3 semanas a partir de uma oportunidade do PainRadar. Hoje tenho 84 clientes pagantes.",
    opportunity: "Onboarding para freelancers",
  },
  {
    initials: "JC",
    name: "Júlia Carvalho",
    role: "Indie hacker · Mesa.io",
    quote:
      "O score de concorrência me salvou de entrar num mercado saturado. Pivotei e ganhei 6 meses.",
    opportunity: "Controle de estoque · PME",
  },
  {
    initials: "DS",
    name: "Diego Santos",
    role: "Solo founder · Pulso Saúde",
    quote:
      "Encontrei a dor exata, com a stack sugerida pronta. Em 2 meses fechei R$12k MRR.",
    opportunity: "Agendamento · Saúde",
  },
];
