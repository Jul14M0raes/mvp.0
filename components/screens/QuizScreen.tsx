"use client";

import { Check } from "lucide-react";

import { ProgressBar } from "@/components/ui/ProgressBarr";


import type { Question } from "@/data/questions";
import type { AnswerOption } from "@/data/questions";

type QuizScreenProps = {
  currentQuestion: number;
  totalQuestions: number;
  question: Question;
  selectedOption: number | null;
  onAnswer: (index: number) => void;
  xpPerCorrect: number;
};

export function QuizScreen({
  currentQuestion,
  totalQuestions,
  question,
  selectedOption,
  onAnswer,
  xpPerCorrect,
}: QuizScreenProps) {
  const progress = Math.round(
    ((currentQuestion + (selectedOption === null ? 0 : 1)) /
      totalQuestions) *
      100
  );

  return (
    <section className="flex flex-1 flex-col overflow-y-auto px-5 pb-6 pt-3">
      <ProgressBar value={progress} />

      <div className="mt-10 flex items-center justify-between">
        <span className="rounded-full bg-brand-pink/10 px-3 py-1 text-xs font-black text-brand-pink">
          Questão {currentQuestion + 1}/{totalQuestions}
        </span>

        <span className="text-xs font-bold text-slate-400">
          +{xpPerCorrect} XP
        </span>
      </div>

      <div className="mt-8 flex min-h-[96px] items-start gap-3">
        <h2 className="flex-1 text-center text-2xl font-black text-brand-navy">
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
              key={option.label}
              className={`grid min-h-20 grid-cols-[64px_1fr_48px] items-stretch overflow-hidden rounded-lg border-2 transition ${
                showCorrect
                  ? "border-brand-green bg-brand-green text-white"
                  : showWrong
                  ? "border-brand-pink bg-brand-pink text-white"
                  : isSelected
                  ? "border-brand-navy bg-brand-navy text-white"
                  : "border-slate-200 bg-white text-brand-ink shadow-sm"
              }`}
            >
              <div className="flex items-center justify-center bg-brand-mist">
                <VisualIcon visual={option.visual} />
              </div>

              <button
                className="flex h-full items-center justify-between px-4 text-left text-lg font-black"
                disabled={selectedOption !== null}
                onClick={() => onAnswer(index)}
              >
                <span>{option.label}</span>
                {showCorrect && <Check size={20} />}
              </button>

              <AudioButton
                compact
                label={`Ouvir resposta: ${option.label}`}
                text={option.label}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}