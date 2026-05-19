type MetricCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "pink" | "green";
};

export function MetricCard({
  icon,
  label,
  value,
  tone,
}: MetricCardProps) {
  const toneClass =
    tone === "pink"
      ? "bg-brand-pink text-white shadow-brand-pink/20"
      : "bg-brand-green text-white shadow-brand-green/20";

  return (
    <div className="rounded-[22px] border border-slate-100 bg-white p-4 shadow-sm">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg shadow-lg ${toneClass}`}
      >
        {icon}
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black text-brand-navy">
        {value}
      </p>
    </div>
  );
}