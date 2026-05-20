"use client";

import { Volume2 } from "lucide-react";

function speakText(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.rate = 0.9;

  window.speechSynthesis.speak(utterance);
}

type AudioButtonProps = {
  text: string;
  label: string;
  compact?: boolean;
};

export function AudioButton({
  text,
  label,
  compact = false,
}: AudioButtonProps) {
  return (
    <button
      aria-label={label}
      title={label}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speakText(text);
      }}
      className={`flex shrink-0 items-center justify-center border-slate-200 bg-white/90 text-brand-navy transition hover:bg-brand-green hover:text-white active:scale-95 ${
        compact
          ? "h-full w-12 border-l"
          : "h-11 w-11 rounded-lg border-2 shadow-sm"
      }`}
    >
      <Volume2 size={compact ? 20 : 22} />
    </button>
  );
}