"use client";

import {
  Award,
  Ban,
  BookOpenCheck,
  Check,
  ChevronRight,
  Clock,
  Flame,
  Goal,
  Home,
  Lock,
  RotateCcw,
  Sparkles,
  Trophy,
  Volume2,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Screen = "home" | "quiz" | "result";

type Question = {
  prompt: string;
  options: AnswerOption[];
  answer: number;
};

type AnswerOption = {
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

type UserProgress = {
  xp: number;
  streak: number;
  lastCompletedDate: string | null;
};

const STORAGE_KEY = "daily-quiz-progress";
const XP_PER_CORRECT = 25;
const CYCLE_START_DATE = "2026-05-17";

function option(label: string, visual: AnswerOption["visual"]): AnswerOption {
  return { label, visual };
}

const dailyQuestionSets: Question[][] = [
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

const defaultProgress: UserProgress = {
  xp: 0,
  streak: 0,
  lastCompletedDate: null,
};

function dateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function dateFromKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function previousDateKey(key: string) {
  const date = dateFromKey(key);
  date.setDate(date.getDate() - 1);

  return dateKey(date);
}

function daysBetween(startKey: string, endKey: string) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  return Math.round((dateFromKey(endKey).getTime() - dateFromKey(startKey).getTime()) / millisecondsPerDay);
}

function positiveModulo(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor;
}

function questionsForDate(key: string) {
  const cycleIndex = positiveModulo(daysBetween(CYCLE_START_DATE, key), dailyQuestionSets.length);

  return dailyQuestionSets[cycleIndex];
}

function speakText(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

export default function DailyQuizApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [currentDateKey, setCurrentDateKey] = useState(dateKey());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setProgress({ ...defaultProgress, ...JSON.parse(saved) });
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentDateKey(dateKey());
    }, 60 * 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [hydrated, progress]);

  const questions = questionsForDate(currentDateKey);
  const completedToday = progress.lastCompletedDate === currentDateKey;
  const dailyCompletion = completedToday ? 100 : Math.round((currentQuestion / questions.length) * 100);

  const answerSummary = useMemo(() => {
    const accuracy = Math.round((correctAnswers / questions.length) * 100);
    return { accuracy };
  }, [correctAnswers, questions.length]);

  function startQuiz() {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setCorrectAnswers(0);
    setEarnedXp(0);
    setScreen("quiz");
  }

  function handleAnswer(optionIndex: number) {
    if (selectedOption !== null) return;

    const isCorrect = optionIndex === questions[currentQuestion].answer;
    const nextCorrectAnswers = correctAnswers + (isCorrect ? 1 : 0);

    setSelectedOption(optionIndex);
    setCorrectAnswers(nextCorrectAnswers);

    window.setTimeout(() => {
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
        return;
      }

      finishQuiz(nextCorrectAnswers);
    }, 650);
  }

  function finishQuiz(finalCorrectAnswers: number) {
    const today = currentDateKey;
    const xpGained = completedToday ? 0 : Math.max(20, finalCorrectAnswers * XP_PER_CORRECT);

    setEarnedXp(xpGained);
    setProgress((current) => {
      const alreadyCompletedToday = current.lastCompletedDate === today;
      const streak =
        alreadyCompletedToday
          ? current.streak
          : current.lastCompletedDate === previousDateKey(today)
            ? current.streak + 1
            : 1;

      return {
        xp: current.xp + xpGained,
        streak,
        lastCompletedDate: today,
      };
    });
    setScreen("result");
  }

  function goHome() {
    setScreen("home");
    setSelectedOption(null);
  }

  return (
<main className="px-4 py-5 text-brand-ink sm:px-6">
      <div
        className="mx-auto flex min-h-[680px] w-full max-w-[430px] flex-col overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-soft"
        style={{ height: "min(760px, calc(100svh - 40px))" }}
      >
        <StatusBar />

        {screen === "home" && (
          <HomeScreen
            completedToday={completedToday}
            dailyCompletion={dailyCompletion}
            dayNumber={positiveModulo(daysBetween(CYCLE_START_DATE, currentDateKey), dailyQuestionSets.length) + 1}
            progress={progress}
            onStart={startQuiz}
          />
        )}

        {screen === "quiz" && (
          <QuizScreen
            currentQuestion={currentQuestion}
            onAnswer={handleAnswer}
            question={questions[currentQuestion]}
            totalQuestions={questions.length}
            selectedOption={selectedOption}
          />
        )}

        {screen === "result" && (
          <ResultScreen
            accuracy={answerSummary.accuracy}
            correctAnswers={correctAnswers}
            earnedXp={earnedXp}
            progress={progress}
            onHome={goHome}
            onRestart={startQuiz}
          />
        )}
      </div>
    </main>
  );
}

function StatusBar() {
  return (
    <div className="flex h-8 items-center justify-between px-5 text-[11px] font-bold text-black">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <span className="h-2.5 w-3 rounded-sm bg-black" />
        <span className="h-2.5 w-3 rounded-sm bg-black/80" />
        <span className="h-2.5 w-5 rounded-full border border-black p-0.5">
          <span className="block h-full w-3 rounded-full bg-black" />
        </span>
      </div>
    </div>
  );
}

function HomeScreen({
  completedToday,
  dailyCompletion,
  dayNumber,
  progress,
  onStart,
}: {
  completedToday: boolean;
  dailyCompletion: number;
  dayNumber: number;
  progress: UserProgress;
  onStart: () => void;
}) {
  return (
        <section className="flex flex-1 flex-col overflow-y-auto px-5 pb-6 pt-8">


      <div className="mt-10">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-navy/55">Atividade diaria</p>
        <h1 className="mt-2 text-3xl font-black leading-tight text-brand-navy">
          Dia {dayNumber}/5
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Volte amanhã para coletar mais xp!
        </p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3">
        <MetricCard icon={<Zap size={20} />} label="XP total" value={progress.xp.toString()} tone="pink" />
        <MetricCard icon={<Flame size={20} />} label="Ofensiva" value={`${progress.streak} dia${progress.streak === 1 ? "" : "s"}`} tone="green" />
      </div>
   

      <button
        className="mt-12 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-brand-navy px-5 text-base font-black text-white shadow-lg shadow-brand-navy/20 transition active:scale-[0.98]"
        onClick={onStart}
      >
        {completedToday ? "Refazer atividade do dia" : "Fazer atividade do dia"}
        <ChevronRight size={20} />
      </button>
    </section>
  );
}

function QuizScreen({
  currentQuestion,
  onAnswer,
  question,
  selectedOption,
  totalQuestions,
}: {
  currentQuestion: number;
  onAnswer: (optionIndex: number) => void;
  question: Question;
  selectedOption: number | null;
  totalQuestions: number;
}) {
  const progress = Math.round(((currentQuestion + (selectedOption === null ? 0 : 1)) / totalQuestions) * 100);

  return (
      <section className="flex flex-1 flex-col overflow-y-auto px-5 pb-6 pt-3">
      <ProgressBar value={progress} />

      <div className="mt-10 flex items-center justify-between">
        <span className="rounded-full bg-brand-pink/10 px-3 py-1 text-xs font-black text-brand-pink">
          Questao {currentQuestion + 1}/{totalQuestions}
        </span>
        <span className="text-xs font-bold text-slate-400">+{XP_PER_CORRECT} XP</span>
      </div>

      <div className="mt-8 flex min-h-[96px] items-start gap-3">
        <h2 className="flex-1 text-center text-2xl font-black leading-tight text-brand-navy">
          {question.prompt}
        </h2>
        <AudioButton label="Ouvir pergunta" text={question.prompt} />
      </div>

      <div className="mt-7 grid grid-cols-1 gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = question.answer === index;
          const showCorrect = selectedOption !== null && isCorrect;
          const showWrong = isSelected && !isCorrect;

          return (
            <div
              className={`grid min-h-20 grid-cols-[64px_1fr_48px] items-stretch overflow-hidden rounded-lg border-2 transition ${
                showCorrect
                  ? "border-brand-green bg-brand-green text-white"
                  : showWrong
                    ? "border-brand-pink bg-brand-pink text-white"
                    : isSelected
                      ? "border-brand-navy bg-brand-navy text-white"
                      : "border-slate-200 bg-white text-brand-ink shadow-sm"
              }`}
              key={option.label}
            >
              <div className={`flex items-center justify-center ${showCorrect || showWrong || isSelected ? "bg-white/15" : "bg-brand-mist"}`}>
                <VisualIcon visual={option.visual} />
              </div>
              <button
                className="flex h-full items-center justify-between px-4 text-left text-lg font-black transition active:scale-[0.99]"
                disabled={selectedOption !== null}
                onClick={() => onAnswer(index)}
                type="button"
              >
                <span>{option.label}</span>
                {showCorrect && <Check size={20} />}
              </button>
              <AudioButton compact label={`Ouvir resposta: ${option.label}`} text={option.label} />
            </div>
          );
        })}
      </div>

      <div className="mt-auto flex justify-end">
        <div className="h-10 w-24 rounded-lg bg-fffff" />
      </div>
    </section>
  );
}

function ResultScreen({
  accuracy,
  correctAnswers,
  earnedXp,
  progress,
  onHome,
  onRestart,
}: {
  accuracy: number;
  correctAnswers: number;
  earnedXp: number;
  progress: UserProgress;
  onHome: () => void;
  onRestart: () => void;
}) {
  return (
    <section className="flex flex-1 flex-col overflow-y-auto px-5 pb-6 pt-10">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-green text-white shadow-lg shadow-brand-green/25">
        <Trophy size={44} />
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-pink">Parabens!</p>
        <h2 className="mt-2 text-3xl font-black text-brand-navy">Atividade concluida</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {earnedXp > 0
            ? `Voce acertou ${correctAnswers} de 4 perguntas e somou mais experiencia.`
            : `Voce acertou ${correctAnswers} de 4 perguntas. O XP de hoje ja foi recebido.`}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <MetricCard icon={<Award size={20} />} label="XP ganho" value={`+${earnedXp}`} tone="pink" />
        <MetricCard icon={<Flame size={20} />} label="Ofensiva" value={`${progress.streak} dia${progress.streak === 1 ? "" : "s"}`} tone="green" />
      </div>

      <div className="mt-4 rounded-[22px] bg-brand-mist p-4">
        <div className="flex items-center justify-between text-sm font-bold text-brand-navy">
          <span>Aproveitamento</span>
          <span>{accuracy}%</span>
        </div>
        <ProgressBar value={accuracy} className="mt-3" />
      </div>

      <div className="mt-auto grid gap-3">
        <button
          className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-brand-navy px-5 text-base font-black text-white shadow-lg shadow-brand-navy/20 transition active:scale-[0.98]"
          onClick={onHome}
        >
          <Home size={19} />
          Voltar para inicio
        </button>
        <button
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-slate-200 bg-white px-5 text-sm font-black text-brand-navy transition active:scale-[0.98]"
          onClick={onRestart}
        >
          <RotateCcw size={17} />
          Refazer quiz
        </button>
      </div>
    </section>
  );
}

function AudioButton({
  compact = false,
  label,
  text,
}: {
  compact?: boolean;
  label: string;
  text: string;
}) {
  return (
    <button
      aria-label={label}
      className={`flex shrink-0 items-center justify-center border-slate-200 bg-white/90 text-brand-navy transition hover:bg-brand-green hover:text-white active:scale-95 ${
        compact ? "h-full w-12 border-l" : "h-11 w-11 rounded-lg border-2 shadow-sm"
      }`}
      onClick={(event) => {
        event.stopPropagation();
        speakText(text);
      }}
      title={label}
      type="button"
    >
      <Volume2 size={compact ? 20 : 22} />
    </button>
  );
}

function VisualIcon({ visual }: { visual: AnswerOption["visual"] }) {
  const className = "h-8 w-8";

  switch (visual) {
    case "study":
      return <BookOpenCheck className={className} />;
    case "focus":
      return <Goal className={className} />;
    case "done":
      return <Check className={className} />;
    case "short":
      return <Clock className={className} />;
    case "repeat":
      return <RotateCcw className={className} />;
    case "xp":
      return <Zap className={className} />;
    case "streak":
      return <Flame className={className} />;
    case "wait":
      return <Clock className={className} />;
    case "block":
      return <Lock className={className} />;
    case "wrong":
      return <X className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    default:
      return <Ban className={className} />;
  }
}

function MetricCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "pink" | "green";
}) {
  const toneClass =
    tone === "pink"
      ? "bg-brand-pink text-white shadow-brand-pink/20"
      : "bg-brand-green text-white shadow-brand-green/20";

  return (
    <div className="rounded-[22px] border border-slate-100 bg-white p-4 shadow-sm">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg shadow-lg ${toneClass}`}>
        {icon}
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-black text-brand-navy">{value}</p>
    </div>
  );
}

function ProgressBar({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`h-2.5 overflow-hidden rounded-full bg-slate-200 ${className}`}>
      <div
        className="h-full rounded-full bg-brand-green transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
