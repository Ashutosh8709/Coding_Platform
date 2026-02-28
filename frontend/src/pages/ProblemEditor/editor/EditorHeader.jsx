import { Badge } from "../../../components/Badge";
import { Spinner } from "../../../components/Spinner";
import { Link } from "react-router-dom";

function EditorHeader({
  problem,
  submitting,
  runResult,
  lang,
  setLang,
  onRun,
  onSubmit,
}) {
  return (
    <div className="flex items-center gap-3 px-4 h-11 border-b border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 flex-shrink-0">
      <Link
        to={"/problems"}
        className="text-xs text-gray-400 dark:text-dark-300 hover:text-brand-500 transition-colors font-medium"
      >
        ← Problems
      </Link>

      <span className="text-gray-300 dark:text-dark-500">·</span>

      <span className="text-xs font-bold text-gray-700 dark:text-white">
        {problem.title}
      </span>

      <Badge difficulty={problem.difficulty} />

      <div className="flex-1" />

      {/* LANGUAGE SELECT */}
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-800 text-gray-700 dark:text-white outline-none cursor-pointer"
      >
        {Object.keys(problem?.execution?.starterCode || {}).map((l) => (
          <option key={l} value={l}>
            {l[0].toUpperCase() + l.slice(1)}
          </option>
        ))}
      </select>

      {/* RUN BUTTON */}
      <button
        onClick={onRun}
        disabled={submitting}
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-gray-200 dark:border-dark-500 text-gray-700 dark:text-white text-xs font-bold hover:border-brand-500/50 hover:bg-brand-500/5 disabled:opacity-50 transition-all"
      >
        {submitting && runResult?.type === "running" ? (
          <Spinner size={3} />
        ) : (
          "▶"
        )}{" "}
        Run
      </button>

      {/* SUBMIT BUTTON */}
      <button
        onClick={onSubmit}
        disabled={submitting}
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg gradient-brand text-white text-xs font-bold hover:shadow-glow-sm disabled:opacity-50 transition-all"
      >
        {submitting && runResult?.type === "judging" && <Spinner size={3} />}{" "}
        Submit
      </button>
    </div>
  );
}

export default EditorHeader;
