export function Badge({ difficulty }) {
  const cls = {
    Easy: "text-emerald-400 bg-emerald-400/10 border border-emerald-400/30",
    Medium: "text-amber-400  bg-amber-400/10  border border-amber-400/30",
    Hard: "text-red-400    bg-red-400/10    border border-red-400/30",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide whitespace-nowrap ${cls[difficulty] || cls.Easy}`}
    >
      {difficulty}
    </span>
  );
}

export function VerdictBadge({ verdict }) {
  const cls = {
    Accepted: "text-emerald-400 bg-emerald-400/10",
    "Wrong Answer": "text-red-400     bg-red-400/10",
    "Time Limit Exceeded": "text-amber-400   bg-amber-400/10",
    "Runtime Error": "text-red-400     bg-red-400/10",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap ${cls[verdict] || "text-brand-400 bg-brand-500/10"}`}
    >
      {verdict}
    </span>
  );
}

export function Tag({ label }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-brand-500/10 text-brand-400 dark:text-brand-400 whitespace-nowrap">
      {label}
    </span>
  );
}
