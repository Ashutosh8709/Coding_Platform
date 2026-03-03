import React from "react";

function DifficultyStats({ difficulty }) {
  return (
    <div className="animate-fade-up [animation-delay:0.15s] p-5 rounded-2xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700">
      <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-5">
        By Difficulty
      </h2>
      {[
        {
          label: "Easy",
          total: 2,
          done: difficulty[0].count,
          color: "bg-emerald-400",
        },
        {
          label: "Medium",
          total: 10,
          done: difficulty[1]?.count || 0,
          color: "bg-amber-400",
        },
        {
          label: "Hard",
          total: 3,
          done: difficulty[2]?.count || 0,
          color: "bg-red-400",
        },
      ].map(({ label, total, done, color }) => (
        <div key={label} className="mb-5">
          <div className="flex justify-between mb-1.5 text-sm">
            <span className="font-semibold text-gray-800 dark:text-white">
              {label}
            </span>
            <span className="text-gray-400 dark:text-dark-300 text-xs">
              {done}/{total}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-100 dark:bg-dark-600 overflow-hidden">
            <div
              className={`h-full rounded-full ${color} transition-all duration-[1200ms]`}
              style={{ width: `${(done / total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default DifficultyStats;
