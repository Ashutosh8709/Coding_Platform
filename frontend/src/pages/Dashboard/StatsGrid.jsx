import React from "react";

function StatsGrid({ data }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {[
        {
          label: "Solved",
          val: data.solved,
          sub: `of 2`,
          color: "text-emerald-400",
        },
        {
          label: "Attempted",
          val: data.attempted,
          sub: "in progress",
          color: "text-amber-400",
        },
        {
          label: "Day Streak",
          val: calculateStreak(data.submissionDates),
          sub: "days 🔥",
          color: "text-orange-400",
        },
        {
          label: "Global Rank",
          val: "#2,841",
          sub: "top 5%",
          color: "text-brand-500",
        },
      ].map((s, i) => (
        <div
          key={i}
          className={`animate-fade-up [animation-delay:${i * 0.07}s] p-5 rounded-2xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 hover:border-brand-500/30 hover:-translate-y-1 transition-all cursor-default`}
        >
          <p className="text-[11px] font-bold text-gray-400 dark:text-dark-300 uppercase tracking-widest mb-2">
            {s.label}
          </p>
          <p className={`text-2xl font-black tracking-tight ${s.color}`}>
            {s.val}
          </p>
          <p className="text-xs text-gray-400 dark:text-dark-300 mt-1">
            {s.sub}
          </p>
        </div>
      ))}
    </div>
  );
}

function calculateStreak(dates) {
  const dateSet = new Set(dates.map((d) => d._id));
  let streak = 0;
  let current = new Date();

  while (true) {
    const formatted = current.toISOString().split("T")[0];
    if (dateSet.has(formatted)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else break;
  }

  return streak;
}

export default StatsGrid;
