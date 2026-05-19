
"use client";

import { ChevronRight, Flame, Zap } from "lucide-react";

import { MetricCard } from "@/components/ui/MetricCard";

type UserProgress = {
  xp: number;
  streak: number;
  lastCompletedDate: string | null;
};

type HomeScreenProps = {
  completedToday: boolean;
  dailyCompletion: number;
  dayNumber: number;
  progress: UserProgress;
  onStart: () => void;
};

export function HomeScreen({
  completedToday,
  dailyCompletion,
  dayNumber,
  progress,
  onStart,
}: HomeScreenProps) {
  return (
    <section className="flex flex-1 flex-col overflow-y-auto px-5 pb-6 pt-8">
      <div className="mt-10">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-navy/55">
          Atividade diaria
        </p>

        <h1 className="mt-2 text-3xl font-black leading-tight text-brand-navy">
          Dia {dayNumber}/5
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Volte amanhã para coletar mais xp!
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <MetricCard
          icon={<Zap size={20} />}
          label="XP total"
          value={progress.xp.toString()}
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

      <button
        className="mt-12 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-brand-navy px-5 text-base font-black text-white shadow-lg shadow-brand-navy/20 transition active:scale-[0.98]"
        onClick={onStart}
      >
        {completedToday
          ? "Refazer atividade do dia"
          : "Fazer atividade do dia"}

        <ChevronRight size={20} />
      </button>
    </section>
  );
}