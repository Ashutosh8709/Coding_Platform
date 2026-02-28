import React from "react";
import { Spinner } from "../../../components/Spinner";

export default function SubmitResultPanel({ submitResult }) {
  if (!submitResult) return null;

  // ⭐ If currently judging
  if (submitResult.type === "judging") {
    return (
      <div className="mb-4 p-4 rounded-xl border bg-[#111122] text-white flex items-center gap-3">
        <Spinner size={3} />
        <span className="text-yellow-400 font-bold text-base">Judging...</span>
      </div>
    );
  }

  const verdict = submitResult.verdict;

  const isAccepted = verdict === "ACCEPTED";
  const isWrong = verdict === "WRONG_ANSWER";

  return (
    <div className="mb-4 p-4 rounded-xl border bg-[#111122] text-white">
      {/* VERDICT HEADER */}
      <div className="text-sm font-bold mb-3">
        {isAccepted && (
          <span className="text-emerald-400 text-base">✅ Accepted</span>
        )}

        {isWrong && (
          <span className="text-red-400 text-base">❌ Wrong Answer</span>
        )}

        {!isAccepted && !isWrong && (
          <span className="text-red-400 text-base">
            ❌ {verdict?.replaceAll("_", " ")}
          </span>
        )}
      </div>

      {/* WRONG ANSWER DETAILS */}
      {isWrong && (
        <div className="space-y-3 text-xs">
          <Block
            title="Input"
            value={Object.values(submitResult?.input?.input || {})}
          />
          <Block title="Your Output" value={submitResult.output} />
          <Block title="Expected Output" value={submitResult.expectedOutput} />
        </div>
      )}
    </div>
  );
}

function Block({ title, value }) {
  return (
    <div>
      <p className="text-gray-400 mb-1">{title}</p>
      <div className="bg-[#2a2a40] rounded p-3 font-mono break-all">
        {value || "-"}
      </div>
    </div>
  );
}
