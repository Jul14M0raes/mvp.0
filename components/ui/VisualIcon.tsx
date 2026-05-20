import {
  BookOpenCheck,
  Goal,
  Check,
  Clock,
  RotateCcw,
  Zap,
  Flame,
  Lock,
  X,
  Sparkles,
  Ban,
} from "lucide-react";


import type { Question, AnswerOption } from "@/app/data/questions";

type VisualIconProps = {
  visual: AnswerOption["visual"];
};

export function VisualIcon({ visual }: VisualIconProps) {
  const className = "h-8 w-8";

  switch (visual) {
    case "study":
      return <BookOpenCheck className={className} />;
    case "focus":
      return <Goal className={className} />;
    case "done":
      return <Check className={className} />;
    case "short":
      return <Clock className={className} />;
    case "repeat":
      return <RotateCcw className={className} />;
    case "xp":
      return <Zap className={className} />;
    case "streak":
      return <Flame className={className} />;
    case "wait":
      return <Clock className={className} />;
    case "block":
      return <Lock className={className} />;
    case "wrong":
      return <X className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    default:
      return <Ban className={className} />;
  }
}