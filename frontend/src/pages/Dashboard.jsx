import { useMemo } from "react";
import { useApp } from "../context/AppContext";
import { Badge, Tag } from "../components/Badge";

export default function Dashboard() {
  const { user, problems, go } = useApp();
  const solved = problems.filter((p) => p.status === "solved").length;
  const attempted = problems.filter((p) => p.status === "attempted").length;
  const heat = useMemo(
    () =>
      Array.from({ length: 52 }, () =>
        Array.from({ length: 7 }, () =>
          Math.random() > 0.55 ? Math.ceil(Math.random() * 4) : 0,
        ),
      ),
    [],
  );
  const hr = new Date().getHours();
  const greeting =
    hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 pt-20 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="animate-fade-up mb-8">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            {greeting}, <span className="text-brand-500">{user?.name}</span> 👋
          </h1>
          <p className="text-gray-400 dark:text-dark-300 mt-2">
            Your coding streak is strong — keep going!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Solved",
              val: solved,
              sub: `of ${problems.length}`,
              color: "text-emerald-400",
            },
            {
              label: "Attempted",
              val: attempted,
              sub: "in progress",
              color: "text-amber-400",
            },
            {
              label: "Day Streak",
              val: "7",
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          {/* Heatmap */}
          <div className="animate-fade-up [animation-delay:0.1s] lg:col-span-2 p-5 rounded-2xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                Activity Heatmap
              </h2>
              <span className="text-xs text-gray-400 dark:text-dark-300">
                Last 52 weeks
              </span>
            </div>
            <div className="overflow-x-auto">
              <div
                className="flex gap-[3px]"
                style={{ minWidth: "fit-content" }}
              >
                {heat.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((cnt, di) => (
                      <div
                        key={di}
                        className={`w-[11px] h-[11px] rounded-sm transition-colors ${
                          cnt === 0
                            ? "bg-gray-100 dark:bg-dark-600"
                            : cnt === 1
                              ? "bg-brand-500/25"
                              : cnt === 2
                                ? "bg-brand-500/50"
                                : cnt === 3
                                  ? "bg-brand-500/75"
                                  : "bg-brand-500"
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-[11px] text-gray-400 dark:text-dark-300">
                Less
              </span>
              {[0.15, 0.3, 0.55, 0.8, 1].map((o, i) => (
                <div
                  key={i}
                  className="w-[11px] h-[11px] rounded-sm"
                  style={{ background: `rgba(139,92,246,${o})` }}
                />
              ))}
              <span className="text-[11px] text-gray-400 dark:text-dark-300">
                More
              </span>
            </div>
          </div>

          {/* Difficulty */}
          <div className="animate-fade-up [animation-delay:0.15s] p-5 rounded-2xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-5">
              By Difficulty
            </h2>
            {[
              { label: "Easy", total: 5, done: 4, color: "bg-emerald-400" },
              { label: "Medium", total: 7, done: 3, color: "bg-amber-400" },
              { label: "Hard", total: 3, done: 0, color: "bg-red-400" },
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
        </div>

        {/* Recommended */}
        <div className="animate-fade-up [animation-delay:0.2s]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">
              Recommended for You
            </h2>
            <button
              onClick={() => go("problems")}
              className="text-xs text-brand-500 font-bold hover:underline"
            >
              View all →
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-500">
            {problems.slice(0, 5).map((p, i) => (
              <div
                key={p.id}
                onClick={() => go("problem", p)}
                className={`flex items-center gap-4 px-5 py-3.5 cursor-pointer hover:bg-brand-500/5 transition-colors group ${i < 4 ? "border-b border-gray-100 dark:border-dark-600" : ""} bg-white dark:bg-dark-700`}
              >
                <span
                  className={`text-xs w-5 flex-shrink-0 font-semibold ${p.status === "solved" ? "text-emerald-400" : p.status === "attempted" ? "text-amber-400" : "text-gray-400 dark:text-dark-300"}`}
                >
                  {p.status === "solved"
                    ? "✓"
                    : p.status === "attempted"
                      ? "○"
                      : p.id}
                </span>
                <span className="flex-1 text-sm font-semibold text-gray-800 dark:text-white group-hover:text-brand-500 transition-colors truncate">
                  {p.title}
                </span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {p.tags.slice(0, 1).map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                  <Badge difficulty={p.difficulty} />
                  <span className="text-xs text-gray-400 dark:text-dark-300 min-w-[38px] text-right">
                    {p.acceptance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
