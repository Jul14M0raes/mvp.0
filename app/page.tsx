"use client";

import { useEffect, useMemo, useState } from "react";

import {
  dailyQuestionSets,
  dadosDasLicoes,
} from "./data/questions";

import { HomeScreen } from "@/components/screens/HomeScreen";
import { QuizScreen } from "@/components/screens/QuizScreen";
import { ResultScreen } from "@/components/screens/ResultsScreen";
import { ProgressBarr } from "@/components/ui/ProgressBar";
import { MetricCard } from "@/components/ui/MetricCard";

// Certifique-se de alinhar o nome exato do arquivo (NavegationScreen ou NavigationScreen)
import { NavigationScreen, TabOption } from "@/components/screens/NavegationScreen";

type Screen = "home" | "quiz" | "result";

type UserProgress = {
  xp: number;
  streak: number;
  completedDates: string[];
};

const STORAGE_KEY = "daily-quiz-progress";
const XP_PER_CORRECT = 25;
const CYCLE_START_DATE = "2026-05-17";

const defaultProgress: UserProgress = {
  xp: 0,
  streak: 0,
  completedDates: [],
};

function dateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateFromKey(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function previousDateKey(key: string) {
  const d = dateFromKey(key);
  d.setDate(d.getDate() - 1);
  return dateKey(d);
}

function daysBetween(start: string, end: string) {
  const ms = 24 * 60 * 60 * 1000;
  return Math.round((dateFromKey(end).getTime() - dateFromKey(start).getTime()) / ms);
}

function positiveModulo(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor;
}

function questionsForDate(key: string) {
  const index = positiveModulo(
    daysBetween(CYCLE_START_DATE, key),
    dailyQuestionSets.length
  );
  return dailyQuestionSets[index];
}

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home");
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [currentDateKey, setCurrentDateKey] = useState(dateKey());

  // Novo estado para controlar a aba selecionada na barra de navegação inferior
  const [activeTab, setActiveTab] = useState<TabOption>("home");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);

  const questions = questionsForDate(currentDateKey);

  const completedToday = progress.completedDates.includes(currentDateKey);

  const dailyCompletion = completedToday
    ? 100
    : Math.round((currentQuestion / questions.length) * 100);

  const accuracy = useMemo(() => {
    return Math.round((correctAnswers / questions.length) * 100);
  }, [correctAnswers, questions.length]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.lastCompletedDate && !parsed.completedDates) {
          parsed.completedDates = [parsed.lastCompletedDate];
          delete parsed.lastCompletedDate;
        }
        setProgress({ ...defaultProgress, ...parsed });
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateKey(dateKey());
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

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
    setSelectedOption(optionIndex);
    setCorrectAnswers((prev) => prev + (isCorrect ? 1 : 0));

    setTimeout(() => {
      const next = currentQuestion + 1;
      if (next < questions.length) {
        setCurrentQuestion(next);
        setSelectedOption(null);
        return;
      }
      finishQuiz();
    }, 650);
  }

  function finishQuiz() {
    const today = currentDateKey;
    const yesterday = previousDateKey(today);

    const xpGained = completedToday
      ? 0
      : Math.max(20, correctAnswers * XP_PER_CORRECT);

    setEarnedXp(xpGained);

    setProgress((prev) => {
      if (prev.completedDates.includes(today)) return prev;

      const fezOntem = prev.completedDates.includes(yesterday);
      const streak = fezOntem ? prev.streak + 1 : 1;
      const completedDates = [...prev.completedDates, today];

      return {
        xp: prev.xp + xpGained,
        streak,
        completedDates,
      };
    });

    setScreen("result");
  }
  
  function goHome() {
    setScreen("home");
    setSelectedOption(null);
    setActiveTab("home"); // Garante que volta para a aba inicial visualmente
  }

  const legacyProgressAdapter = {
    xp: progress.xp,
    streak: progress.streak,
    lastCompletedDate: progress.completedDates[progress.completedDates.length - 1] || null
  };

  return (
    <main className="px-4 py-5 text-brand-ink sm:px-6">
      <div className="mx-auto flex min-h-[680px] w-full max-w-[430px] flex-col overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-soft">

        {/* CASO 1: Se estiver jogando o Quiz, exibe a tela de quiz pura (sem navbar inferior) */}
        {screen === "quiz" && (
          <QuizScreen
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            question={questions[currentQuestion]}
            selectedOption={selectedOption}
            onAnswer={handleAnswer}
            xpPerCorrect={XP_PER_CORRECT}
          />
        )}

        {/* CASO 2: Se NÃO estiver no quiz, renderiza a moldura de navegação global */}
        {screen !== "quiz" && (
          <NavigationScreen currentTab={activeTab} onTabChange={setActiveTab}>
            
            {/* Sub-telas pertencentes à aba 'Início' */}
            {activeTab === "home" && screen === "home" && (
              <HomeScreen
                completedToday={completedToday}
                dailyCompletion={dailyCompletion}
                lessons={dadosDasLicoes}
                dayNumber={
                  positiveModulo(
                    daysBetween(CYCLE_START_DATE, currentDateKey),
                    dailyQuestionSets.length
                  ) + 1
                }
                progress={progress}
                onStart={startQuiz}
              />
            )}

            {activeTab === "home" && screen === "result" && (
              <ResultScreen
                accuracy={accuracy}
                correctAnswers={correctAnswers}
                earnedXp={earnedXp}
                progress={{
                  ...legacyProgressAdapter,
                  ...({ completedDates: progress.completedDates } as any)
                }}
                onHome={goHome}
                onRestart={startQuiz}
              />
            )}

            {/* Sub-tela pertencente à aba 'Ranking' */}
            {activeTab === "leaderboard" && (
              <div className="flex flex-1 flex-col items-center justify-center p-5 text-center">
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400">Em Breve</p>
                <h3 className="text-xl font-black text-brand-navy mt-1">Classificação Global</h3>
              </div>
            )}

            {/* Sub-tela pertencente à aba 'Perfil' */}
            {activeTab === "profile" && (
              <div className="flex flex-1 flex-col items-center justify-center p-5 text-center">
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400">Em Breve</p>
                <h3 className="text-xl font-black text-brand-navy mt-1">Seu Perfil</h3>
              </div>
            )}

          </NavigationScreen>
        )}
        
      </div>
    </main>
  );
}