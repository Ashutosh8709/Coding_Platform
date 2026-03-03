import { useApp } from "../context/AppContext";
import { VerdictBadge } from "../components/Badge";

export default function Submissions() {
  const { submissions, go } = useApp();
  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 pt-20 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="animate-fade-up mb-7">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Submission History
          </h1>
          <p className="text-gray-400 dark:text-dark-300 mt-2 text-sm">
            {submissions.length} total submissions
          </p>
        </div>
        <div className="animate-fade-up [animation-delay:0.05s] rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-500">
          <div className="grid grid-cols-[1fr_160px_110px_80px_90px_100px] px-5 py-3 bg-brand-500/3 dark:bg-brand-500/5 border-b border-gray-200 dark:border-dark-500">
            {[
              "Problem",
              "Verdict",
              "Language",
              "Runtime",
              "Memory",
              "Date",
            ].map((h) => (
              <span
                key={h}
                className="text-[11px] font-bold text-gray-400 dark:text-dark-300 uppercase tracking-widest"
              >
                {h}
              </span>
            ))}
          </div>
          {submissions.map((s, i) => (
            <div
              key={s.id}
              className={`grid grid-cols-[1fr_160px_110px_80px_90px_100px] items-center px-5 py-3.5 hover:bg-brand-500/5 transition-colors group bg-white dark:bg-dark-700 animate-slide-in ${i < submissions.length - 1 ? "border-b border-gray-100 dark:border-dark-600" : ""}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <button
                onClick={() => go("problems")}
                className="text-sm font-semibold text-gray-800 dark:text-white group-hover:text-brand-500 transition-colors text-left"
              >
                {s.problem}
              </button>
              <span>
                <VerdictBadge verdict={s.verdict} />
              </span>
              <span className="text-xs text-gray-400 dark:text-dark-300 font-mono">
                {s.lang}
              </span>
              <span className="text-xs text-gray-400 dark:text-dark-300 font-mono">
                {s.time}
              </span>
              <span className="text-xs text-gray-400 dark:text-dark-300 font-mono">
                {s.memory}
              </span>
              <span className="text-xs text-gray-400 dark:text-dark-300">
                {s.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
