"use client";

import React from "react";
import { Home, Trophy, User, Dumbbell, Store } from "lucide-react";

export type TabOption = "treino" | "loja" | "home" | "leaderboard" | "profile";

type NavigationScreenProps = {
  currentTab: TabOption;
  onTabChange: (tab: TabOption) => void;
  children: React.ReactNode;
};

export function NavigationScreen({
  currentTab,
  onTabChange,
  children,
}: NavigationScreenProps) {
  
  const navItems = [
    { id: "treino", label: "Treino", icon: <Dumbbell size={20} /> },
    { id: "loja", label: "Loja", icon: <Store size={20} /> },
    { id: "home", label: "Início", icon: <Home size={20} /> },
    { id: "leaderboard", label: "Ranking", icon: <Trophy size={20} /> },
    { id: "profile", label: "Perfil", icon: <User size={20} /> },
  ] as const;

  return (
    /* A div pai abaixo ocupa exatamente a altura total do celular (h-full) 
      e organiza o conteúdo em coluna (flex-col).
    */
    <div className="flex h-full w-full flex-col bg-white">
      
      {/* ÁREA DE CONTEÚDO (Telas: Home, Loja, etc.)
        - flex-1: Faz essa área esticar e ocupar todo o espaço vertical livre.
        - overflow-y-auto: Se a página for gigante, a rolagem acontece APENAS aqui dentro.
      */}
      <div className="flex-1 overflow-y-auto bg-slate-50/50">
        <div className="w-full animate-fade-in">
          {children}
        </div>
      </div>

      {/* BARRA DE NAVEGAÇÃO INFERIOR FIXA
        - h-16: Força uma altura fixa para a barra.
        - shrink-0: Impede que o Next.js ou o Tailwind espremam a barra caso o conteúdo de cima cresça.
      */}
      <nav className="flex h-16 w-full shrink-0 items-center justify-around border-t border-slate-100 bg-white px-2 shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative flex flex-col items-center justify-center min-w-[56px] h-12 rounded-xl transition-all duration-200 active:scale-95 group"
            >
              {isActive && (
                <span className="absolute inset-0 bg-brand-pink/10 rounded-xl animate-scale-up" />
              )}

              <div
                className={`z-10 transition-colors duration-200 ${
                  isActive ? "text-brand-pink" : "text-slate-400 group-hover:text-slate-600"
                }`}
              >
                {item.icon}
              </div>
              
              <span
                className={`z-10 text-[9px] font-bold tracking-wider uppercase mt-0.5 transition-colors duration-200 ${
                  isActive ? "text-brand-navy" : "text-slate-400 group-hover:text-slate-500"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}