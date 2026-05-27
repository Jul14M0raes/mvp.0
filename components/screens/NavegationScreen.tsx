"use client";

import React from "react";
import { Home, Trophy, User, Settings } from "lucide-react";

// 1. Definição dos tipos das abas disponíveis
export type TabOption = "home" | "leaderboard" | "profile";

type NavigationScreenProps = {
  currentTab: TabOption;
  onTabChange: (tab: TabOption) => void;
  children: React.ReactNode; // O conteúdo da tela ativa será injetado aqui
};

export function NavigationScreen({
  currentTab,
  onTabChange,
  children,
}: NavigationScreenProps) {
  
  // 2. Itens da barra de navegação para mapeamento dinâmico
  const navItems = [
    { id: "home", label: "Início", icon: <Home size={22} /> },
    { id: "leaderboard", label: "Ranking", icon: <Trophy size={22} /> },
    { id: "profile", label: "Perfil", icon: <User size={22} /> },
  ] as const;

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Área do Conteúdo Dinâmico */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

      {/* Barra de Navegação Inferior (Bottom Nav) */}
      <nav className="flex h-16 w-full items-center justify-around border-t border-slate-100 bg-white px-2 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center gap-1 min-w-[64px] h-full transition-all active:scale-95 ${
                isActive
                  ? "text-brand-navy font-black scale-105"
                  : "text-slate-400 font-medium hover:text-slate-600"
              }`}
            >
              <div className={isActive ? "text-brand-pink" : "text-inherit"}>
                {item.icon}
              </div>
              <span className="text-[10px] tracking-wide uppercase">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}