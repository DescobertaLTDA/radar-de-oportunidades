/* ═══════════════════════════════════════════════════════════════
   PainRadar — Mock Analysis Engine
   Generates realistic, nicho-specific analysis data
═══════════════════════════════════════════════════════════════ */

export interface Competitor {
  name: string;
  icon: string;
  playRating: number;
  appStoreRating: number;
  playReviews: number;
  appStoreReviews: number;
  gap: string;
  gapColor: "danger" | "warning" | "neutral";
  topComplaints: string[];
}

export interface Complaint {
  text: string;
  frequency: number;
  sources: string[];
}

export interface RedditPost {
  subreddit: string;
  upvotes: number;
  text: string;
  gap: string;
  translated?: boolean;
}

export interface MVPFeature {
  title: string;
  description: string;
  solves: string;
}

export interface AnalysisResult {
  niche: string;
  score: number;
  scoreLabel: string;
  saturation: "Baixa" | "Média" | "Alta";
  competition: "Baixa" | "Média" | "Alta";
  sourcesAnalyzed: string[];
  opportunityText: string;
  competitors: Competitor[];
  topComplaints: Complaint[];
  redditPosts: RedditPost[];
  iosComplaints: string[];
  androidComplaints: string[];
  platformInsight: string;
  mvp: {
    description: string;
    features: MVPFeature[];
    stack: string;
  };
}

/* ── Nicho-specific data ─────────────────────────────────────── */
const NICHO_DATA: Record<string, Omit<AnalysisResult, "niche">> = {
  fitness: {
    score: 88,
    scoreLabel: "Excelente",
    saturation: "Baixa",
    competition: "Baixa",
    sourcesAnalyzed: ["Play Store", "App Store"],
    opportunityText: "Apps de fitness têm UX complexa e onboarding lento. 68% das reclamações mencionam abandono no primeiro uso — um app com onboarding em 60s e personalização por histórico de lesões capturaria esse gap com baixa concorrência direta.",
    competitors: [
      { name: "MyFitnessPal", icon: "M", playRating: 4.5, appStoreRating: 4.6, playReviews: 250000, appStoreReviews: 180000, gap: "Complexo e caro", gapColor: "warning", topComplaints: ["UI confusa para novos usuários", "Paywall agressivo desde o 2º dia", "Sync com wearables quebra frequentemente", "Banco de dados de alimentos desatualizado", "Notificações não configuráveis"] },
      { name: "Nike Training Club", icon: "N", playRating: 4.2, appStoreRating: 4.3, playReviews: 90000, appStoreReviews: 120000, gap: "UX desatualizada", gapColor: "warning", topComplaints: ["App trava no meio dos treinos", "Sem personalização por limitação física", "Planos genéricos sem adaptação", "Vídeos de baixa qualidade no Android", "Falta modo offline completo"] },
      { name: "Freeletics", icon: "F", playRating: 4.0, appStoreRating: 4.1, playReviews: 28000, appStoreReviews: 35000, gap: "Pouco conteúdo grátis", gapColor: "danger", topComplaints: ["Quase tudo bloqueado no free tier", "Progressão muito agressiva para iniciantes", "Sem opção de treinos curtos (< 15min)", "Coach AI dá feedbacks genéricos", "Preço alto sem trial adequado"] },
    ],
    topComplaints: [
      { text: "Usuários abandonam o app na tela de configuração de metas — mencionado em 41% dos reviews 1★ nos últimos 30 dias", frequency: 41, sources: ["Play Store", "App Store"] },
      { text: "Falta de personalização por histórico de lesões — pedido recorrente em 28% dos reviews negativos", frequency: 28, sources: ["App Store", "Reddit"] },
      { text: "Sem versão offline funcional para treinos sem internet", frequency: 22, sources: ["Play Store"] },
      { text: "Suporte ao cliente demora mais de 48h para responder em situações críticas", frequency: 18, sources: ["Play Store", "App Store"] },
      { text: "Paywall agressivo logo no segundo dia de uso sem demonstrar valor primeiro", frequency: 15, sources: ["App Store"] },
    ],
    redditPosts: [
      { subreddit: "r/fitness", upvotes: 2400, text: "Por que nenhum app de fitness lembra do meu histórico de lesões e ajusta os treinos automaticamente? Já testei 6 apps e todos ignoram isso completamente.", gap: "Personalização por limitação física", translated: true },
      { subreddit: "r/loseit", upvotes: 1800, text: "Queria que os apps de fitness tivessem um modo iniciante de verdade — não só treinos 'fáceis', mas um acompanhamento real para quem nunca treinou na vida.", gap: "Onboarding para iniciantes reais", translated: true },
      { subreddit: "r/bodyweightfitness", upvotes: 956, text: "Todo app de treino assume que você tem academia. Cadê o app para quem só tem 20 minutos e um chão?", gap: "Treinos sem equipamento com restrição de tempo", translated: true },
    ],
    iosComplaints: ["Paywall agressivo na App Store (3× mais reclamações que Android)", "App consome bateria excessiva no iOS 17+", "Integração com Apple Health instável"],
    androidComplaints: ["App trava em dispositivos mid-range", "Notificações param de funcionar após atualização do Android", "Sync com Google Fit quebrado desde v3.2"],
    platformInsight: "Usuários iOS reclamam 3× mais de paywall agressivo que usuários Android. Um app com freemium generoso teria vantagem competitiva clara na App Store.",
    mvp: {
      description: "App de fitness mobile-first com onboarding em 60 segundos, personalização por histórico de lesões e modo offline completo — os 3 gaps mais recorrentes nos dados analisados.",
      features: [
        { title: "Onboarding em 60s", description: "3 perguntas apenas: objetivo, disponibilidade e limitações físicas. App configurado e primeiro treino iniciado em menos de 1 minuto.", solves: "41% das reclamações de abandono" },
        { title: "Perfil de lesões", description: "Usuário cadastra lesões e restrições. Todos os treinos são filtrados automaticamente e adaptados ao histórico.", solves: "Gap ausente em 100% dos concorrentes analisados" },
        { title: "Modo offline total", description: "Treinos baixados automaticamente no Wi-Fi. App funciona 100% sem internet, sincroniza quando conectar.", solves: "22% das reclamações da Play Store" },
      ],
      stack: "React Native + Supabase — ideal para app mobile com perfis de usuário, sincronização offline e dados estruturados de treino.",
    },
  },

  finanças: {
    score: 81,
    scoreLabel: "Boa oportunidade",
    saturation: "Baixa",
    competition: "Média",
    sourcesAnalyzed: ["Play Store", "App Store"],
    opportunityText: "Apps de finanças pessoais focam em controle de gastos mas ignoram educação financeira contextual. 52% das reclamações são de jovens (18–25) que não entendem as funcionalidades — um app gamificado para a geração Z brasileira teria mercado aberto.",
    competitors: [
      { name: "Mobills", icon: "Mo", playRating: 4.4, appStoreRating: 4.2, playReviews: 320000, appStoreReviews: 95000, gap: "Interface complexa para jovens", gapColor: "warning", topComplaints: ["Curva de aprendizado muito alta", "Categorias de gastos confusas", "Relatórios difíceis de interpretar", "Sync bancário quebra frequentemente", "Versão gratuita muito limitada"] },
      { name: "Organizze", icon: "Or", playRating: 4.5, appStoreRating: 4.4, playReviews: 180000, appStoreReviews: 72000, gap: "Sem gamificação ou engajamento", gapColor: "warning", topComplaints: ["App entediante para usar no dia a dia", "Sem metas visuais motivadoras", "Notificações inúteis e não personalizáveis", "Falta de comparativo com mês anterior", "Sem dicas financeiras contextuais"] },
      { name: "GuiaBolso", icon: "Gu", playRating: 4.2, appStoreRating: 4.0, playReviews: 290000, appStoreReviews: 88000, gap: "Foco em controle, não educação", gapColor: "danger", topComplaints: ["Não explica por que o usuário está no vermelho", "Sugestões de melhoria genéricas", "Integração bancária instável", "Sem tutorial para iniciantes", "Alertas chegam tarde demais"] },
    ],
    topComplaints: [
      { text: "App não explica o que as categorias de gasto significam — 52% dos reviews negativos de usuários 18–25 anos na Play Store", frequency: 52, sources: ["Play Store"] },
      { text: "Falta de metas visuais e gamificação para manter o engajamento no longo prazo", frequency: 38, sources: ["App Store", "Reddit"] },
      { text: "Integração bancária via Open Finance instável e com erros frequentes", frequency: 31, sources: ["Play Store", "App Store"] },
      { text: "Sem educação financeira contextual — o app mostra dados mas não ensina o que fazer", frequency: 24, sources: ["App Store"] },
      { text: "Versão gratuita bloqueada demais para ser útil como trial", frequency: 19, sources: ["Play Store", "App Store"] },
    ],
    redditPosts: [
      { subreddit: "r/financaspessoais", upvotes: 1900, text: "Por que nenhum app de finanças me explica O QUE FAZER com os dados? Sei que gastei demais mas o app não me diz como melhorar.", gap: "Educação financeira contextual e acionável" },
      { subreddit: "r/investimentos", upvotes: 1200, text: "Queria um app que me ensinasse finanças enquanto registro meus gastos. Tipo Duolingo mas para dinheiro.", gap: "Gamificação de educação financeira" },
      { subreddit: "r/brdev", upvotes: 780, text: "Existe algum app de finanças pessoais que funcione sem vincular conta bancária? Não confio em dar acesso aos meus dados.", gap: "App de finanças sem integração bancária obrigatória" },
    ],
    iosComplaints: ["App crashes ao tentar importar extrato bancário no iOS 16+", "Widget de resumo não atualiza no StandBy mode", "Integração com Apple Pay inconsistente"],
    androidComplaints: ["Permissões de acessibilidade confusas para o Autofill bancário", "App consome 800MB+ de RAM em dispositivos entry-level", "Notificações duplicadas após atualização"],
    platformInsight: "Usuários Android reclamam 2× mais de performance do que usuários iOS. Um app leve (<50MB) teria vantagem competitiva clara no segmento Android mid-range, que representa 78% do mercado BR.",
    mvp: {
      description: "App de educação financeira gamificado para jovens brasileiros — sem integração bancária obrigatória, com metas visuais e lições contextuais baseadas nos gastos reais do usuário.",
      features: [
        { title: "Registro sem banco vinculado", description: "Usuário registra gastos manualmente com 2 toques. Sem Open Finance, sem permissões bancárias. Simples como anotar num caderno.", solves: "Elimina barreira de confiança de 100% dos usuários sem conta digital" },
        { title: "Metas visuais gamificadas", description: "Cada meta vira uma barra de progresso colorida com XP. Usuário ganha badges ao atingir objetivos mensais.", solves: "38% das reclamações de falta de engajamento" },
        { title: "Insight contextual pós-registro", description: "Após registrar gasto, o app mostra: 'Você gastou 40% do seu lazer este mês. Que tal um jantar em casa desta vez?' — educação no momento certo.", solves: "52% das reclamações de falta de orientação" },
      ],
      stack: "React Native + Supabase + Expo — stack enxuta para app mobile leve, sem backend complexo, ideal para MVP com equipe pequena.",
    },
  },

  meditação: {
    score: 74,
    scoreLabel: "Boa oportunidade",
    saturation: "Média",
    competition: "Alta",
    sourcesAnalyzed: ["Play Store", "App Store"],
    opportunityText: "Apps de meditação dominantes (Headspace, Calm) são caros e em inglês. 71% das buscas por apps de meditação no Brasil buscam conteúdo em PT-BR com preço acessível — mercado sub-servido com concorrência local fraca.",
    competitors: [
      { name: "Headspace", icon: "H", playRating: 4.7, appStoreRating: 4.8, playReviews: 1200000, appStoreReviews: 890000, gap: "Apenas inglês, assinatura cara", gapColor: "danger", topComplaints: ["Sem conteúdo em português", "US$12.99/mês é caro para BR", "Trial de 7 dias insuficiente", "Conteúdo cultural americano não ressoa", "Sem sessões de emergência rápidas"] },
      { name: "Calm", icon: "C", playRating: 4.8, appStoreRating: 4.7, playReviews: 890000, appStoreReviews: 650000, gap: "Sem conteúdo cultural brasileiro", gapColor: "danger", topComplaints: ["Storytelling americano sem contexto BR", "Interface em inglês dificulta uso", "Preço em dólar inacessível", "Falta de vozes brasileiras", "Conteúdo de sono muito genérico"] },
      { name: "Lojong", icon: "L", playRating: 4.3, appStoreRating: 4.2, playReviews: 42000, appStoreReviews: 18000, gap: "Biblioteca pequena e sem atualização", gapColor: "warning", topComplaints: ["Pouco conteúdo novo nos últimos 6 meses", "App desatualizado visualmente", "Sem personalização por objetivo", "Meditações muito longas para o dia a dia", "Falta de comunidade ou social features"] },
    ],
    topComplaints: [
      { text: "Conteúdo majoritariamente em inglês — barreira crítica para 71% dos usuários brasileiros que buscam meditação", frequency: 71, sources: ["Play Store", "App Store"] },
      { text: "Preço em dólar inacessível para a realidade brasileira (US$12.99 = R$65/mês)", frequency: 48, sources: ["App Store", "Reddit"] },
      { text: "Sessões muito longas (20–30 min) sem opções rápidas para o dia a dia corrido", frequency: 35, sources: ["Play Store"] },
      { text: "Falta de contextualização cultural brasileira nas meditações", frequency: 27, sources: ["App Store"] },
      { text: "Sem modo de emergência para crises de ansiedade em menos de 3 minutos", frequency: 21, sources: ["Play Store", "App Store"] },
    ],
    redditPosts: [
      { subreddit: "r/meditacao", upvotes: 1450, text: "Alguém conhece app de meditação BR que não seja aquelas traduções horríveis do Headspace? Preciso de algo que entenda a ansiedade brasileira.", gap: "App de meditação culturalmente brasileiro" },
      { subreddit: "r/ansiedade", upvotes: 1100, text: "Em crise de ansiedade agora. Nenhum app tem uma opção de emergência que funcione em menos de 5 minutos sem precisar de conta.", gap: "Modo emergência sem fricção" },
      { subreddit: "r/saude", upvotes: 680, text: "Por que não existe app de meditação BR por R$9.90/mês? Todos os bons são em dólar ou muito caros.", gap: "Preço acessível para o mercado brasileiro" },
    ],
    iosComplaints: ["App drena bateria excessivamente em sessões longas no iPhone", "Integração com Saúde Apple inconsistente para dados de mindfulness", "Widget não funciona no iOS 17 StandBy"],
    androidComplaints: ["Áudio corta quando app vai para background no Android 13+", "Notificações de lembrete param após 3 dias", "App não funciona offline (conteúdo não faz cache)"],
    platformInsight: "Android representa 87% do mercado mobile brasileiro. Um app que funcione offline e em dispositivos entry-level tem vantagem enorme sobre concorrentes que exigem boa conexão.",
    mvp: {
      description: "App de meditação 100% em PT-BR com sessões de 3–7 minutos, modo emergência para ansiedade, conteúdo offline e preço acessível ao mercado brasileiro.",
      features: [
        { title: "Sessões curtas (3–7 min)", description: "15 meditações curtas em PT-BR com vozes brasileiras. Foco em pessoas com rotina corrida que têm exatos 5 minutos.", solves: "35% das reclamações de sessões longas demais" },
        { title: "Modo emergência (SOS ansiedade)", description: "1 botão na tela inicial. Ativa respiração guiada imediatamente sem login, sem escolhas. Funciona offline.", solves: "21% das reclamações + gap ausente em TODOS os concorrentes" },
        { title: "Preço BR-friendly", description: "R$9,90/mês ou R$79/ano. Freemium generoso com 5 sessões grátis por semana sem paywall agressivo.", solves: "48% das reclamações de preço inacessível" },
      ],
      stack: "React Native + Expo + Supabase — permite distribuição offline de áudio, baixo consumo de bateria e build para iOS + Android com código único.",
    },
  },
};

/* ── Generic fallback generator ──────────────────────────────── */
function generateGeneric(idea: string): Omit<AnalysisResult, "niche"> {
  const hash  = idea.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const score = 44 + (hash % 44);
  const sat   = score >= 70 ? "Baixa" : score >= 55 ? "Média" : "Alta";
  const comp  = score >= 65 ? "Baixa" : score >= 50 ? "Média" : "Alta";

  return {
    score,
    scoreLabel: score >= 66 ? "Boa oportunidade" : score >= 41 ? "Oportunidade moderada" : "Saturado",
    saturation: sat,
    competition: comp,
    sourcesAnalyzed: ["Play Store", "App Store"],
    opportunityText: `Apps de "${idea}" têm UX pouco intuitiva e onboarding lento. Reclamações concentradas em falta de personalização e ausência de versão offline — gaps não resolvidos pelos concorrentes atuais.`,
    competitors: [
      { name: `Líder do nicho ${idea}`, icon: "L", playRating: 4.4, appStoreRating: 4.5, playReviews: 180000, appStoreReviews: 120000, gap: "UX complexa", gapColor: "warning", topComplaints: ["Interface confusa para novos usuários", "Onboarding longo e desmotivador", "Paywall premature sem demonstração de valor", "Sem personalização por perfil", "Suporte lento"] },
      { name: `Segundo player`, icon: "S", playRating: 4.1, appStoreRating: 4.2, playReviews: 65000, appStoreReviews: 48000, gap: "Falta de conteúdo", gapColor: "warning", topComplaints: ["Pouco conteúdo atualizado", "App para no Android 12+", "Notificações não chegam", "Sem modo offline", "Bugs frequentes na tela principal"] },
      { name: `Player emergente`, icon: "P", playRating: 3.9, appStoreRating: 4.0, playReviews: 18000, appStoreReviews: 12000, gap: "Sem suporte", gapColor: "danger", topComplaints: ["Suporte inexistente", "App não funciona offline", "Crashes frequentes", "Interface desatualizada", "Sem novidades há 8 meses"] },
    ],
    topComplaints: [
      { text: `Interface com curva de aprendizado elevada — mencionada em 38% dos reviews 1★ da Play Store nos últimos 30 dias`, frequency: 38, sources: ["Play Store", "App Store"] },
      { text: "Falta de personalização por perfil de usuário e histórico de uso", frequency: 29, sources: ["App Store", "Reddit"] },
      { text: "Sem versão offline funcional — app inutilizável sem conexão estável", frequency: 23, sources: ["Play Store"] },
      { text: "Suporte ao cliente não responde ou demora mais de 72h", frequency: 17, sources: ["Play Store", "App Store"] },
      { text: "Paywall agressivo antes de o usuário entender o valor do produto", frequency: 13, sources: ["App Store"] },
    ],
    redditPosts: [
      { subreddit: `r/${idea.replace(/\s+/g, "")}`, upvotes: 1200, text: `Por que não existe um app de ${idea} que funcione para iniciantes sem precisar de manual para entender?`, gap: "Onboarding simplificado para iniciantes", translated: true },
      { subreddit: "r/apps", upvotes: 890, text: `Já testei todos os apps de ${idea} e nenhum funciona offline. Meu trajeto não tem sinal e preciso disso sem internet.`, gap: "Modo offline completo", translated: true },
      { subreddit: "r/startups", upvotes: 540, text: `O mercado de ${idea} é dominado por apps pesados e cheios de features desnecessárias. Alguém precisa construir uma alternativa simples e focada.`, gap: "App focado sem feature bloat", translated: true },
    ],
    iosComplaints: ["Crashes frequentes após atualização do iOS", "Integração com Apple Health instável", "Widget não atualiza em background"],
    androidComplaints: ["Performance ruim em dispositivos entry-level", "Notificações param após reinicialização", "App consome dados em excesso em segundo plano"],
    platformInsight: `Usuários Android representam 82% dos reviews analisados. Um app leve e otimizado para dispositivos mid-range teria vantagem competitiva significativa no mercado BR.`,
    mvp: {
      description: `App de "${idea}" mobile-first com onboarding em 60s, modo offline completo e freemium generoso — os 3 gaps mais recorrentes nos dados analisados.`,
      features: [
        { title: "Onboarding em 60s", description: "3 perguntas de setup. Usuário no fluxo principal em menos de 1 minuto, sem telas desnecessárias.", solves: "38% das reclamações de curva de aprendizado" },
        { title: "Modo offline completo", description: "Funcionalidades core disponíveis sem conexão. Sincroniza automaticamente quando conectar ao Wi-Fi.", solves: "23% das reclamações da Play Store" },
        { title: "Freemium generoso", description: "Trial real de 14 dias sem pedido de cartão. Plano gratuito com valor suficiente para gerar retenção.", solves: "Gap de paywall agressivo vs. todos os concorrentes" },
      ],
      stack: "React Native + Supabase + Expo — stack enxuta para MVP mobile com suporte offline e deploy rápido para iOS e Android.",
    },
  };
}

/* ── Main export ─────────────────────────────────────────────── */
export function generateAnalysis(idea: string): AnalysisResult {
  const lower = idea.toLowerCase();

  const key = Object.keys(NICHO_DATA).find(k => lower.includes(k));
  const data = key ? NICHO_DATA[key] : generateGeneric(idea);

  return { niche: idea, ...data };
}

export function scoreColor(score: number): string {
  if (score >= 86) return "#00FF88";
  if (score >= 66) return "#00CC6A";
  if (score >= 41) return "#FFAA00";
  return "#FF4444";
}

export function satColor(v: string): string {
  if (v === "Baixa") return "#00FF88";
  if (v === "Média") return "#FFAA00";
  return "#FF4444";
}
