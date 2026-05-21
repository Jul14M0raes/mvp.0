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
  
  // Função para calcular os dias da semana e o status de conclusão
  const getWeeklyDays = () => {
    const today = new Date();
    const currentDayOfWeek = today.getDay(); 
    
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - currentDayOfWeek);

    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return Array.from({ length: 7 }).map((_, index) => {
      const currentDate = new Date(sunday);
      currentDate.setDate(sunday.getDate() + index);
      
      const currentMidnight = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

      const dayNum = currentDate.getDate();
      const isCurrentDay = currentMidnight.getTime() === todayMidnight.getTime();
      
      const label = currentDate.toLocaleDateString("pt-BR", { weekday: "short" })
        .replace(".", "")
        .substring(0, 3);
      
      let completed = false;

      if (isCurrentDay) {
        completed = completedToday;
      } else if (currentMidnight < todayMidnight && progress.lastCompletedDate) {
        const lastCompleted = new Date(progress.lastCompletedDate);
        const lastCompletedMidnight = new Date(lastCompleted.getFullYear(), lastCompleted.getMonth(), lastCompleted.getDate());
        
        const diffTime = lastCompletedMidnight.getTime() - currentMidnight.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= 0 && diffDays < progress.streak) {
          completed = true;
        }
      }

      return {
        dayNumber: dayNum,
        label: label.charAt(0).toUpperCase() + label.slice(1),
        completed,
        isToday: isCurrentDay,
      };
    });
  };

  const weekDays = getWeeklyDays();

  const currentMonthName = new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const formattedMonth = currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1);

  return (
    <section className="flex flex-1 flex-col overflow-y-auto pb-6">
      
      {/* SEÇÃO UNIFICADA: CABEÇALHO ROSA + CALENDÁRIO */}
      <div className="bg-white rounded-t-[32px] overflow-hidden flex flex-col">
        
        {/* Retângulo Rosa do Topo */}
        <div className="bg-brand-pink px-6 pt-10 pb-8 text-white">
          <h1 className="text-3xl font-black tracking-wide">
            Olá!
          </h1>
          <p className="text-sm font-medium opacity-90 mt-1">
            Está pronto para aprender?
          </p>
        </div>

  {/* Bloco do Calendário semanal*/}
<div className="px-6 pt-5 pb-6 border-b border-slate-100">
  {/* Título do Mês */}
  <h3 className="text-xl font-black text-brand-navy mb-2 tracking-tight">
    {formattedMonth}
  </h3>
  
  {/* Grid dos dias da semana */}
  <div className="flex justify-between items-end gap-1 h-26 pt-2">
    {weekDays.map((day, index) => {
      const bgClass = day.completed 
        ? "bg-brand-green text-white" 
        : "bg-slate-200 text-slate-500";

      const todayClass = day.isToday
        ? "transform -translate-y-1 scale-105 shadow-md shadow-emerald-500/20 z-10 h-24 w-[15%]"
        : "h-20 w-[13%]";

      return (
        <div
          key={index}
          className={`
            flex flex-col items-center justify-center 
            rounded-2xl transition-all duration-300 ease-in-out
            ${bgClass} ${todayClass}
          `}
        >
          <span className="text-base font-black block leading-none mb-1.5">
            {day.dayNumber}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-tight opacity-80">
            {day.label}
          </span>
        </div>
      );
    })}
  </div>
</div>

      </div>


      <div className="px-5 mt-6">
        

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-navy/55">
            Atividade diária • Dia {dayNumber}/5
          </p>
        </div>


        <div className="mt-6 grid grid-cols-2 gap-3">
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
          className="mt-10 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-brand-navy px-5 text-base font-black text-white shadow-lg shadow-brand-navy/20 transition active:scale-[0.98]"
          onClick={onStart}
        >
          {completedToday
            ? "Refazer atividade do dia"
            : "Fazer atividade do dia"}

          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}