"use client";

import { ChevronRight, Flame, Zap } from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";

// Adicionada a tipagem da Lição da Trilha
type Lesson = {
  id: number;
  title: string;
  color: 'magenta' | 'green';
  completed: boolean;
};

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
  lessons: Lesson[];
  onStart: (lessonId: number) => void;
};

export function HomeScreen({
  completedToday,
  dailyCompletion,
  dayNumber,
  progress,
  lessons,
  onStart,
}: HomeScreenProps) {
  

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
    <section className="flex flex-1 flex-col overflow-y-auto pb-12 bg-slate-50">
      
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

      {/* SEÇÃO DA TRILHA DE ATIVIDADES */}
      <div className="w-full max-w-lg mx-auto flex flex-col gap-6 items-center px-4 mt-8 relative">
        
        <div className="absolute top-0 bottom-0 w-[6px] bg-slate-200 left-1/2 -translate-x-1/2 z-0" />

        {lessons.map((lesson, index) => {
          const isEven = index % 2 === 0;

          // Define os tons exatos com base no parâmetro de cor da lição
          const bgColors = lesson.color === 'magenta' 
            ? 'bg-[#c34593] border-[#a13276]' 
            : 'bg-brand-green border-emerald-600';

          return (
            <div
              key={lesson.id}
              className={`w-full flex items-center z-10 ${
                isEven ? 'justify-start' : 'justify-end'
              }`}
            >
              <button
                onClick={() => onStart(lesson.id)}
                className={`
                  relative flex items-center w-[85%] sm:w-[75%] h-24 shadow-md border-b-[6px] text-white p-4 font-bold tracking-wide
                  transition-all active:scale-[0.98] text-left group
                  ${bgColors}
                  ${isEven ? 'rounded-r-2xl rounded-l-none' : 'rounded-l-2xl rounded-r-none'}
                `}
              >

                {/* Grid Interno Ajustável */}
                <div className={`w-full flex items-center justify-between gap-4 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                  
                  {/* Círculo do Número */}
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <span className={`text-3xl font-extrabold ${lesson.color === 'magenta' ? 'text-[#c34593]' : 'text-brand-green'}`}>
                      {lesson.id}
                    </span>
                  </div>

                  {/* Título e Texto Dinâmico */}
                  <div className={`flex-1 flex flex-col ${isEven ? 'text-right' : 'text-left'}`}>
                    <span className="text-xs font-medium opacity-80 uppercase tracking-wider block">
                      {lesson.completed ? "Revisar Atividade" : "Iniciar Lição"}
                    </span>
                    <span className="text-base font-black leading-tight group-hover:underline">
                      {lesson.title}
                    </span>
                  </div>

                </div>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}