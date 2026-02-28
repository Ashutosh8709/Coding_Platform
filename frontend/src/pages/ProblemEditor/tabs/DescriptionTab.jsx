import React from "react";

function DescriptionTab({ p }) {
  return (
    <>
      <h1 className="text-lg font-black text-gray-900 dark:text-white mb-3 tracking-tight">
        {p.title}
      </h1>
      <div className="flex gap-2 flex-wrap mb-5">
        {/* <Badge difficulty={problem.difficulty} />
        {problem.tags?.map((t) => (
          <Tag key={t} label={t} />
        ))} */}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
        {p.description}
      </p>
      <h3 className="text-[11px] font-black text-brand-500 uppercase tracking-widest mb-3">
        Examples
      </h3>
      {p.visibleTestCases.map((ex, i) => (
        <div
          key={i}
          className="mb-3 p-4 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-500"
        >
          <p className="text-[10px] font-black text-gray-400 dark:text-dark-300 uppercase tracking-widest mb-2">
            Example {i + 1}
          </p>
          <div className="font-mono text-xs leading-relaxed">
            <div>
              <span className="text-gray-400 dark:text-dark-300">Input: </span>
              <span className="text-gray-800 dark:text-white">{ex.input}</span>
            </div>
            <div>
              <span className="text-gray-400 dark:text-dark-300">Output: </span>
              <span className="text-gray-800 dark:text-white">{ex.output}</span>
            </div>
            {ex.explanation && (
              <div>
                <span className="text-gray-400 dark:text-dark-300">
                  Explanation:{" "}
                </span>
                <span className="text-gray-800 dark:text-white">
                  {ex.explanation}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}

      <h3 className="text-[11px] font-black text-brand-500 uppercase tracking-widest mb-3 mt-5">
        Input Format
      </h3>
      {p.inputFormat.map((inp) => (
        <div className="flex gap-2 items-center mb-2">
          <span className="text-brand-500 text-lg leading-none">·</span>
          <span className="font-mono text-xs text-gray-700 dark:text-gray-300">
            {inp}
          </span>
        </div>
      ))}

      <h3 className="text-[11px] font-black text-brand-500 uppercase tracking-widest mb-3 mt-5">
        Output Format
      </h3>
      {p.outputFormat.map((out) => (
        <div className="flex gap-2 items-center mb-2">
          <span className="text-brand-500 text-lg leading-none">·</span>
          <span className="font-mono text-xs text-gray-700 dark:text-gray-300">
            {out}
          </span>
        </div>
      ))}
      <h3 className="text-[11px] font-black text-brand-500 uppercase tracking-widest mb-3 mt-5">
        Constraints
      </h3>
      {p.constraints.map((cons) => (
        <div className="flex gap-2 items-center mb-2">
          <span className="text-brand-500 text-lg leading-none">·</span>
          <span className="font-mono text-xs text-gray-700 dark:text-gray-300">
            {cons}
          </span>
        </div>
      ))}
    </>
  );
}

export default DescriptionTab;
