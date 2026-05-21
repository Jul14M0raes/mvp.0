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
      
      // Abrevia o dia da semana (ex: "seg")
      const label = currentDate.toLocaleDateString("pt-BR", { weekday: "short" })
        .replace(".", "")
        .substring(0, 3);
      
      // conclusão baseada na data atual e na ofensiva
      let completed = false;

      if (isCurrentDay) {
        completed = completedToday;
      } else if (currentMidnight < todayMidnight && progress.lastCompletedDate) {
        const lastCompleted = new Date(progress.lastCompletedDate);
        const lastCompletedMidnight = new Date(lastCompleted.getFullYear(), lastCompleted.getMonth(), lastCompleted.getDate());
        
        const diffTime = lastCompletedMidnight.getTime() - currentMidnight.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Se a diferença for positiva e menor que o streak acumulado, significa que o dia foi concluído
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

  // Tratamento de string para exibir o mês/ano atual no topo do calendário
  const currentMonthName = new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const formattedMonth = currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1);

  return (
    <section className="flex flex-1 flex-col overflow-y-auto px-5 pb-6 pt-8">
      {/* Cabeçalho */}
      <div className="mt-10">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-navy/55">
          Atividade diaria
        </p>

      </div>

        {/* Calendário de ofensiva Semanal */}
      <div className="mt-8 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy mb-4">
          {formattedMonth}
        </h3>
        
        <div className="flex justify-between items-end gap-1 h-24">
          {weekDays.map((day, index) => {
            const bgClass = day.completed 
              ? "bg-brand-green text-white" 
              : "bg-slate-200 text-slate-500";

            // Se for o dia atual, ele ganha um efeito de destaque (levemente maior e com sombra)
            const todayClass = day.isToday
              ? "transform -translate-y-2 scale-105 shadow-md shadow-emerald-500/20 z-10 h-22 w-[15%]"
              : "h-18 w-[13%]";

            return (
              <div
                key={index}
                className={`
                  flex flex-col items-center justify-center 
                  rounded-2xl transition-all duration-300 ease-in-out
                  ${bgClass} ${todayClass}
                `}
              >
                <span className="text-base font-black block leading-none mb-1">
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