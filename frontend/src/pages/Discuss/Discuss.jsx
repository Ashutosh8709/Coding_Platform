import { useState } from "react";
import PostCard from "./PostCard";
import { useDiscussion } from "../../hooks/useDiscussions";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";

const TAGS = [
  "General",
  "Interview Exp",
  "Tips & Tricks",
  "Bug Report",
  "Feature Request",
  "Study Group",
];

const SORT_OPTIONS = [
  "Most Recent",
  "Most Liked",
  "Most Commented",
  "Trending",
];

export default function Discuss() {
  const [activeTag, setActiveTag] = useState("All");
  const [sort, setSort] = useState("Most Recent");
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState(new Set());
  const { discussions, loading } = useDiscussion();

  const toggleLike = (id) => {
    setLiked((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  // const filtered = POSTS.filter(
  //   (p) =>
  //     (activeTag === "All" || p.tag === activeTag) &&
  //     (p.title.toLowerCase().includes(search.toLowerCase()) ||
  //       p.body.toLowerCase().includes(search.toLowerCase())),
  // );

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 pt-20 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="animate-fade-up flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Discuss
            </h1>
            <p className="text-gray-400 dark:text-dark-300 mt-2 text-sm">
              Share knowledge, ask questions, grow together
            </p>
          </div>
          <Link
            to={"/discuss/create"}
            className="px-5 py-2.5 rounded-xl gradient-brand text-white text-sm font-bold hover:shadow-glow-sm hover:-translate-y-px transition-all flex-shrink-0"
          >
            + New Post
          </Link>
        </div>

        {/* Search + sort row */}
        <div className="animate-fade-up [animation-delay:0.05s] flex gap-3 mb-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none">
              🔍
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search discussions..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-dark-300 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 transition-all"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 text-sm text-gray-700 dark:text-white outline-none cursor-pointer font-medium"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Tag filters */}
        <div className="animate-fade-up [animation-delay:0.08s] flex gap-2 mb-6 flex-wrap">
          {["All", ...TAGS].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                activeTag === tag
                  ? "border-brand-500 bg-brand-500/10 text-brand-500"
                  : "border-gray-200 dark:border-dark-500 text-gray-500 dark:text-dark-300 hover:border-brand-500/40 hover:text-brand-500"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-3">
          {loading ? (
            <ProblemsSkeleton />
          ) : discussions.length === 0 && !loading ? (
            <div className="py-16 text-center text-gray-400 dark:text-dark-300 text-sm">
              No discussions match your filters.
            </div>
          ) : (
            discussions.map((discuss, i) => (
              <PostCard
                key={discuss._id}
                discuss={discuss}
                i={i}
                liked={liked.has(discuss._id)}
                onLike={() => toggleLike(discuss._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function ProblemsSkeleton() {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="p-5 rounded-2xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700"
        >
          <div className="flex gap-4">
            {/* Avatar */}
            <Skeleton
              variant="circular"
              width={36}
              height={36}
              animation="wave"
              sx={{
                bgcolor: "transparent",
                "&::after": {
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                },
              }}
            />

            <div className="flex-1">
              {/* Title */}
              <Skeleton
                variant="text"
                width="60%"
                height={22}
                animation="wave"
                sx={{
                  bgcolor: "transparent",
                  "&::after": {
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                  },
                }}
              />

              {/* Content line 1 */}
              <Skeleton
                variant="text"
                width="95%"
                height={18}
                animation="wave"
                sx={{
                  bgcolor: "transparent",
                  "&::after": {
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                  },
                }}
              />

              {/* Content line 2 */}
              <Skeleton
                variant="text"
                width="80%"
                height={18}
                animation="wave"
                sx={{
                  bgcolor: "transparent",
                  "&::after": {
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                  },
                }}
              />

              {/* Footer */}
              <div className="flex items-center justify-between mt-3">
                {/* Username + time */}
                <Skeleton
                  variant="text"
                  width={120}
                  height={16}
                  animation="wave"
                  sx={{
                    bbgcolor: "transparent",
                    "&::after": {
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                    },
                  }}
                />

                {/* Stats */}
                <div className="flex gap-3">
                  <Skeleton
                    variant="rounded"
                    width={40}
                    height={18}
                    animation="wave"
                    sx={{
                      bgcolor: "transparent",
                      "&::after": {
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                      },
                    }}
                  />

                  <Skeleton
                    variant="rounded"
                    width={40}
                    height={18}
                    animation="wave"
                    sx={{
                      bgcolor: "transparent",
                      "&::after": {
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                      },
                    }}
                  />

                  <Skeleton
                    variant="rounded"
                    width={50}
                    height={20}
                    animation="wave"
                    sx={{
                      bgcolor: "transparent",
                      "&::after": {
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
