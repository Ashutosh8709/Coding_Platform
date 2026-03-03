import React from "react";
import { Badge, Tag } from "../../components/Badge";
function RecentSubmissions({ submissions }) {
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now - past) / 1000); // seconds

    if (diff < 60) return "Just now";

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;

    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  };
  return (
    <div className="animate-fade-up [animation-delay:0.2s]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white">
          Submissions
        </h2>
        <button
          onClick={() => go("problems")}
          className="text-xs text-brand-500 font-bold hover:underline"
        >
          View all →
        </button>
      </div>
      <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-500">
        {submissions.map((p, i) => (
          <div
            key={p._id}
            // onClick={() => go("problem", p)}
            className={`flex items-center gap-4 px-5 py-3.5 cursor-pointer hover:bg-brand-500/5 transition-colors group ${i < 4 ? "border-b border-gray-100 dark:border-dark-600" : ""} bg-white dark:bg-dark-700`}
          >
            <span
              className={`text-xs w-5 flex-shrink-0 font-semibold ${p.verdict === "ACCEPTED" ? "text-emerald-400" : p.verdict !== "ACCEPTED" ? "text-amber-400" : "text-gray-400 dark:text-dark-300"}`}
            >
              {p.verdict === "ACCEPTED"
                ? "✓"
                : p.status !== "ACCEPTED"
                  ? "○"
                  : p.id}
            </span>
            <span className="flex-1 text-sm font-semibold text-gray-800 dark:text-white group-hover:text-brand-500 transition-colors truncate">
              {p.problemTitle}
            </span>
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* {p.tags.slice(0, 1).map((t) => (
                <Tag key={t} label={t} />
              ))} */}
              <Badge difficulty={p.problemDifficulty} />
              <span className="text-xs text-gray-400 dark:text-dark-300 min-w-[38px] text-right">
                {/* {p.acceptance} */}
                {formatTimeAgo(p.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentSubmissions;
