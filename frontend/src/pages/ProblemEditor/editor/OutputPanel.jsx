import React from "react";
import { useState, useEffect } from "react";
import Block from "./Block";

function OutputPanel({ runResult, runStream, collapsed, onToggleCollapse }) {
  const [activeCase, setActiveCase] = useState(0);
  const current = runStream.length > 0 ? runStream[activeCase] : null;

  useEffect(() => {
    if (activeCase >= runStream.length) {
      setActiveCase(0);
    }
  }, [runStream]);

  useEffect(() => {
    if (runResult?.type === "running") {
      setActiveCase(0);
    }
  }, [runResult]);

  return (
    <div className="h-full border-t flex flex-col bg-[#06060f] text-white">
      {/* HEADER */}
      <div className="px-4 py-2 border-b text-sm font-bold flex items-center">
        <div className="flex-1">
          {runResult?.type === "accepted" && (
            <span className="text-emerald-400">Accepted</span>
          )}

          {runResult?.type === "wrong_answer" && (
            <span className="text-red-400">Wrong Answer</span>
          )}

          {runResult?.type === "runtime_error" && (
            <span className="text-red-400">Runtime Error</span>
          )}

          {runResult?.type === "compile_error" && (
            <span className="text-red-400">Compile Error</span>
          )}

          {runResult?.type === "time_limit_exceeded" && (
            <span className="text-red-400">Time Limit Exceeded</span>
          )}

          {runResult?.type === "running" && (
            <span className="text-yellow-400">Running...</span>
          )}
        </div>

        <button
          onClick={onToggleCollapse}
          className="text-xs text-gray-400 hover:text-white"
        >
          {collapsed ? "▲ Expand" : "▼ Collapse"}
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-2 px-4 py-2 border-b">
        {runStream.map((tc, i) => (
          <button
            key={tc.id}
            onClick={() => setActiveCase(i)}
            className={`px-3 py-1 rounded text-xs font-bold ${
              i === activeCase ? "bg-[#2a2a40]" : ""
            }`}
          >
            <span
              className={
                tc.ok === true
                  ? "text-emerald-400"
                  : tc.ok === false
                    ? "text-red-400"
                    : "text-gray-400"
              }
            >
              {tc.ok === null
                ? "•"
                : tc.status === "PASSED"
                  ? "✓"
                  : tc.status === "PENDING"
                    ? "•"
                    : "✗"}
            </span>{" "}
            Case {tc.id}
          </button>
        ))}
      </div>

      {/* DETAILS */}
      <div className="flex-1 overflow-auto p-4 space-y-4 text-sm">
        {/* FIRST LOAD STATE */}
        {!runResult && (
          <div className="text-gray-400 text-xs">
            Run code to see testcase results
          </div>
        )}

        {/* COMPILE ERROR */}
        {runResult?.type === "compile_error" && (
          <Block title="Compiler Output" value={runResult.error} />
        )}

        {/* NORMAL TESTCASE VIEW */}
        {runResult &&
          runResult.type !== "compile_error" &&
          current &&
          (current.error ? (
            <Block title="Error" value={current.error} />
          ) : (
            <>
              <Block title="Input" value={current.input} />
              <Block title="Output" value={current.output} />
              <Block title="Expected" value={current.expected} />
            </>
          ))}
      </div>
    </div>
  );
}

export default OutputPanel;
