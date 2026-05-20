"use client";

import { Award, Flame, Home, RotateCcw, Trophy } from "lucide-react";

import { MetricCard } from "@/components/ui/MetricCard";
import { ProgressBarr } from "@/components/ui/ProgressBar";

type UserProgress = {
  xp: number;
  streak: number;
  lastCompletedDate: string | null;
};

type ResultScreenProps = {
  accuracy: number;
  correctAnswers: number;
  earnedXp: number;
  progress: UserProgress;
  onHome: () => void;
  onRestart: () => void;
};

export function ResultScreen({
  accuracy,
  correctAnswers,
  earnedXp,
  progress,
  onHome,
  onRestart,
}: ResultScreenProps) {
  return (
    <section className="flex flex-1 flex-col overflow-y-auto px-5 pb-6 pt-10">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-green text-white shadow-lg shadow-brand-green/25">
        <Trophy size={44} />
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-pink">
          Parabens!
        </p>

        <h2 className="mt-2 text-3xl font-black text-brand-navy">
          Atividade concluida
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {earnedXp > 0
            ? `Voce acertou ${correctAnswers} de 4 perguntas e somou mais experiencia.`
            : `Voce acertou ${correctAnswers} de 4 perguntas. O XP de hoje ja foi recebido.`}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <MetricCard
          icon={<Award size={20} />}
          label="XP ganho"
          value={`+${earnedXp}`}
          tone="pink"
        />

        <MetricCard
          icon={<Flame size={20} />}
          label="Ofensiva"
          value={`${progress.streak} dia${
            progress.streak === 1 ? "" : "s"
          }`}
          tone="green"
        />
      </div>

      <div className="mt-4 rounded-[22px] bg-brand-mist p-4">
        <div className="flex items-center justify-between text-sm font-bold text-brand-navy">
          <span>Aproveitamento</span>
          <span>{accuracy}%</span>
        </div>

        <ProgressBarr value={accuracy} className="mt-3" />
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