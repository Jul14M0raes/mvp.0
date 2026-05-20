
export type AnswerOptionn = {
  label: string;
  visual:
    | "study"
    | "focus"
    | "done"
    | "short"
    | "repeat"
    | "xp"
    | "streak"
    | "wait"
    | "block"
    | "wrong"
    | "sparkles";
};

export type Question = {
  prompt: string;
  options: AnswerOptionn[];
  answer: number;
};

function option(
  label: string,
  visual: AnswerOptionn["visual"]
): AnswerOptionn {
  return { label, visual };
}

export const dailyQuestionSets: Question[][] = [
  [
    {
      prompt: "O cachorro está__",
      options: [
        option("correndo", "repeat"),
        option("correu", "study"),
        option("corre", "wrong"),
        option("irá correr", "wait"),
      ],
      answer: 0,
    },
    {
      prompt: "O que e XP?",
      options: [
        option("Pontos", "xp"),
        option("Tempo", "wait"),
        option("Nivel travado", "block"),
        option("Compra", "wrong"),
      ],
      answer: 0,
    },
    {
      prompt: "Como manter a ofensiva?",
      options: [
        option("Concluir hoje", "done"),
        option("Trocar tema", "study"),
        option("Fechar", "wrong"),
        option("Errar", "wrong"),
      ],
      answer: 0,
    },
    {
      prompt: "Uma atividade curta precisa de:",
      options: [
        option("Clareza", "short"),
        option("Muitas telas", "block"),
        option("Cadastro", "wait"),
        option("Ranking", "streak"),
      ],
      answer: 0,
    },
  ],
  [
    {
      prompt: "Antes de estudar, o que ajuda?",
      options: [
        option("Meta pequena", "focus"),
        option("Muitas abas", "wrong"),
        option("Sem tempo", "wait"),
        option("Sem plano", "block"),
      ],
      answer: 0,
    },
    {
      prompt: "Qual sinal mostra progresso?",
      options: [
        option("Concluir", "done"),
        option("Trocar sempre", "wrong"),
        option("Sem retorno", "block"),
        option("Parar", "wrong"),
      ],
      answer: 0,
    },
    {
      prompt: "O que deixa o quiz facil?",
      options: [
        option("Pergunta curta", "short"),
        option("Texto longo", "wait"),
        option("Cadastro", "block"),
        option("Muitas regras", "wrong"),
      ],
      answer: 0,
    },
    {
      prompt: "Se errar, o que fazer?",
      options: [
        option("Revisar", "repeat"),
        option("Desistir", "wrong"),
        option("Pular", "wrong"),
        option("Apagar", "block"),
      ],
      answer: 0,
    },
  ],
  [
    {
      prompt: "O que ajuda a memoria?",
      options: [
        option("Repetir", "repeat"),
        option("Uma vez", "study"),
        option("Sem teste", "block"),
        option("So ler", "wait"),
      ],
      answer: 0,
    },
    {
      prompt: "A ofensiva incentiva:",
      options: [
        option("Todo dia", "streak"),
        option("Competir", "wrong"),
        option("Comprar", "wrong"),
        option("Senha", "block"),
      ],
      answer: 0,
    },
    {
      prompt: "A recompensa deve ser:",
      options: [
        option("Clara", "sparkles"),
        option("Escondida", "block"),
        option("Demorada", "wait"),
        option("Travada", "block"),
      ],
      answer: 0,
    },
    {
      prompt: "O que mostra engajamento?",
      options: [
        option("Voltar todo dia", "streak"),
        option("Cor do icone", "wrong"),
        option("Logo grande", "wrong"),
        option("Mais menus", "block"),
      ],
      answer: 0,
    },
  ],
  [
    {
      prompt: "Para manter ritmo, precisa ser:",
      options: [
        option("Rapida", "short"),
        option("Cheia de etapas", "block"),
        option("Dificil", "wrong"),
        option("Sem retorno", "wait"),
      ],
      answer: 0,
    },
    {
      prompt: "Aprender ativo e:",
      options: [
        option("Responder", "done"),
        option("So assistir", "wait"),
        option("Fechar", "wrong"),
        option("Ignorar", "wrong"),
      ],
      answer: 0,
    },
    {
      prompt: "XP total mostra:",
      options: [
        option("Soma de dias", "xp"),
        option("So hoje", "wait"),
        option("Aleatorio", "wrong"),
        option("Offline", "block"),
      ],
      answer: 0,
    },
    {
      prompt: "O que reduz dificuldade?",
      options: [
        option("Poucas telas", "short"),
        option("Login longo", "block"),
        option("Ranking", "streak"),
        option("Chat obrigatorio", "wrong"),
      ],
      answer: 0,
    },
  ],
  [
    {
      prompt: "Depois de 5 dias, o conteudo deve:",
      options: [
        option("Voltar ao dia 1", "repeat"),
        option("Apagar XP", "wrong"),
        option("Parar", "block"),
        option("Bloquear", "block"),
      ],
      answer: 0,
    },
    {
      prompt: "O que protege o XP?",
      options: [
        option("Somar 1 vez", "xp"),
        option("Sem limite", "wrong"),
        option("Zerar", "block"),
        option("Ignorar", "wrong"),
      ],
      answer: 0,
    },
    {
      prompt: "O que salva a conclusao?",
      options: [
        option("Data do dia", "done"),
        option("Cor do botao", "wrong"),
        option("Tela", "block"),
        option("Navegador", "wait"),
      ],
      answer: 0,
    },
    {
      prompt: "Depois de concluir, o melhor e:",
      options: [
        option("Voltar amanha", "streak"),
        option("Criar conta", "block"),
        option("Limpar dados", "wrong"),
        option("Fechar sem ver", "wait"),
      ],
      answer: 0,
    },
  ],
];
