type ProgressBarProps = {
  value: number;
  className?: string;
};

export function ProgressBarr({ value, className = "" }: ProgressBarProps) {
  return (
    <div className={`h-2.5 overflow-hidden rounded-full bg-slate-200 ${className}`}>
      <div
        className="h-full rounded-full bg-brand-green transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}