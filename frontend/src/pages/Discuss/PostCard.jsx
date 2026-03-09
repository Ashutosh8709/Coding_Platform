import React from "react";
import { formatDistanceToNow } from "date-fns";

function PostCard({ discuss, i, liked, onLike }) {
  const TAG_COLORS = {
    General:
      "text-gray-500  bg-gray-100   dark:bg-dark-600  dark:text-gray-400 border-gray-200 dark:border-dark-500",
    "Interview Exp": "text-brand-500 bg-brand-500/10 border-brand-500/25",
    "Tips & Tricks": "text-emerald-500 bg-emerald-400/10 border-emerald-400/25",
    "Bug Report": "text-red-400   bg-red-400/10   border-red-400/25",
    "Feature Request": "text-cyan-400  bg-cyan-400/10  border-cyan-400/25",
    "Study Group": "text-yellow-500 bg-yellow-400/10 border-yellow-400/25",
  };
  return (
    <div
      className={`p-5 rounded-2xl border bg-white dark:bg-dark-700 hover:border-brand-500/35 hover:shadow-md dark:hover:shadow-black/30 transition-all group cursor-pointer animate-slide-in ${
        discuss
          ? "border-brand-500/25 dark:border-brand-500/20"
          : "border-gray-200 dark:border-dark-500"
      }`}
      style={{ animationDelay: `${i * 0.04}s` }}
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
          {discuss.username[0].toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          {/* Top row */}
          {/* <div className="flex items-center gap-2 mb-2 flex-wrap">
            {discuss.pinned && (
              <span className="text-[10px] font-black text-brand-500 bg-brand-500/10 border border-brand-500/25 px-2 py-0.5 rounded-full">
                📌 PINNED
              </span>
            )}
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${TAG_COLORS[post.tag] || TAG_COLORS["General"]}`}
            >
              {post.tag}
            </span>
          </div> */}

          {/* Title */}
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-brand-500 transition-colors leading-snug">
            {discuss.title}
          </h3>

          {/* Body preview */}
          <p className="text-xs text-gray-500 dark:text-dark-300 leading-relaxed mb-3 line-clamp-2">
            {discuss.content}
          </p>

          {/* Footer */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-xs text-gray-400 dark:text-dark-300 font-medium">
              <span className="text-gray-600 dark:text-gray-400 font-semibold">
                {discuss.username}
              </span>{" "}
              ·{" "}
              {formatDistanceToNow(new Date(discuss.createdAt), {
                addSuffix: true,
              })}
            </span>

            <div className="flex items-center gap-3 ml-auto">
              {/* Views */}
              <span className="text-xs text-gray-400 dark:text-dark-300 flex items-center gap-1">
                <span>⬆</span> {discuss.votes}
              </span>

              {/* Comments */}
              <span className="text-xs text-gray-400 dark:text-dark-300 flex items-center gap-1">
                <span>💬</span> {discuss.replyCount}
              </span>

              {/* Like */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLike();
                }}
                className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg border transition-all ${
                  liked
                    ? "text-brand-500 bg-brand-500/10 border-brand-500/30"
                    : "text-gray-400 dark:text-dark-300 border-transparent hover:border-brand-500/30 hover:text-brand-500 hover:bg-brand-500/5"
                }`}
              >
                {/* <span>{liked ? "♥" : "♡"}</span>
                <span>{post.likes + (liked ? 1 : 0)}</span> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
