import React from "react";

function SubmissionsTab({ submissions }) {
  if (!submissions || submissions.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 text-sm">
        No submissions yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {submissions.map((sub) => (
        <div
          key={sub._id}
          className="p-4 rounded-xl bg-gray-50 dark:bg-dark-600 border border-gray-200 dark:border-dark-500 flex justify-between items-center"
        >
          <div className="flex flex-col">
            <span className="text-xs font-bold dark:text-gray-300">
              {sub.language?.toUpperCase() || "CPP"}
            </span>
            <span className="text-[10px] text-gray-400">
              {new Date(sub.createdAt).toLocaleString()}
            </span>
          </div>

          <div>
            {sub.verdict === "ACCEPTED" && (
              <span className="text-emerald-400 text-xs font-bold">
                Accepted
              </span>
            )}

            {sub.verdict === "WRONG_ANSWER" && (
              <span className="text-red-400 text-xs font-bold">
                Wrong Answer
              </span>
            )}

            {sub.verdict === "RUNTIME_ERROR" && (
              <span className="text-red-400 text-xs font-bold">
                Runtime Error
              </span>
            )}

            {sub.verdict === "TIME_LIMIT_EXCEEDED" && (
              <span className="text-red-400 text-xs font-bold">
                Time Limit Exceeded
              </span>
            )}

            {sub.verdict === "COMPILE_ERROR" && (
              <span className="text-red-400 text-xs font-bold">
                Compile Error
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SubmissionsTab;
