import { useState } from "react";
import { Badge, Tag } from "../components/Badge";
import { useProblemsList } from "../hooks/useProblemsList";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Problems() {
  const [search, setSearch] = useState("");
  const [diff, setDiff] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const { problems, loading, pagination } = useProblemsList(page, 15);

  const filtered = problems.filter((p) => {
    const ms =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const md = diff === "All" || p.difficulty === diff;
    const mst =
      status === "All" ||
      (status === "Solved" && p.status === "solved") ||
      (status === "Attempted" && p.status === "attempted") ||
      (status === "Todo" && !p.status);
    return ms && md && mst;
  });

  const pages = pagination?.totalPages || 1;
  const paged = filtered;

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 pt-20 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="animate-fade-up mb-7">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Problems
          </h1>
          <p className="text-gray-400 dark:text-dark-300 mt-2 text-sm">
            {problems.length} problems · practice makes perfect
          </p>
        </div>

        {/* Filters */}
        <div className="animate-fade-up [animation-delay:0.05s] flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-[220px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none">
              🔍
            </span>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search problems or tags..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-dark-300 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", "Easy", "Medium", "Hard"].map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDiff(d);
                  setPage(1);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${diff === d ? "border-brand-500 bg-brand-500/10 text-brand-500" : "border-gray-200 dark:border-dark-500 text-gray-500 dark:text-dark-300 hover:border-brand-500/40"}`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", "Solved", "Attempted", "Todo"].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStatus(s);
                  setPage(1);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${status === s ? "border-brand-500 bg-brand-500/10 text-brand-500" : "border-gray-200 dark:border-dark-500 text-gray-500 dark:text-dark-300 hover:border-brand-500/40"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="animate-fade-up [animation-delay:0.1s] rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-500">
          <div className="grid grid-cols-[44px_1fr_110px_160px_64px] px-5 py-3 bg-brand-500/3 dark:bg-brand-500/5 border-b border-gray-200 dark:border-dark-500">
            {["#", "Title", "Difficulty", "Tags", "Acc."].map((h) => (
              <span
                key={h}
                className="text-[11px] font-bold text-gray-400 dark:text-dark-300 uppercase tracking-widest"
              >
                {h}
              </span>
            ))}
          </div>
          {loading ? (
            <ProblemsSkeleton />
          ) : (
            paged.map((p, i) => (
              <Link
                to={`/problem/${p._id}`}
                key={p._id}
                className={`grid grid-cols-[44px_1fr_110px_160px_64px] items-center px-5 py-3.5 cursor-pointer hover:bg-brand-500/5 transition-colors group bg-white dark:bg-dark-700 animate-slide-in ${i < paged.length - 1 ? "border-b border-gray-100 dark:border-dark-600" : ""}`}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <span
                  className={`text-xs font-semibold ${p.status === "solved" ? "text-emerald-400" : p.status === "attempted" ? "text-amber-400" : "text-gray-400 dark:text-dark-300"}`}
                >
                  {p.status === "solved"
                    ? "✓"
                    : p.status === "attempted"
                      ? "○"
                      : i + 1 + (page - 1) * pagination.limit}
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-white group-hover:text-brand-500 transition-colors truncate pr-3">
                  {p.title}
                </span>
                <span>
                  <Badge difficulty={p.difficulty} />
                </span>
                {/* <div className="flex gap-1.5 flex-wrap">
                {p.tags.slice(0, 2).map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div> */}
                <span className="text-xs text-gray-400 dark:text-dark-300 text-right">
                  {p.acceptance}
                </span>
              </Link>
            ))
          )}
          {!loading && paged.length === 0 && (
            <div className="px-5 py-14 text-center text-gray-400 dark:text-dark-300 text-sm bg-white dark:bg-dark-700">
              No problems match your filters.
            </div>
          )}
        </div>

        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <PagBtn
              label="← Prev"
              onClick={() => setPage(page - 1)}
              disabled={!pagination?.hasPrevPage}
            />

            <span className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-300">
              {pagination?.currentPage} / {pages}
            </span>

            <PagBtn
              label="Next →"
              onClick={() => setPage(page + 1)}
              disabled={!pagination?.hasNextPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function PagBtn({ label, onClick, disabled, active }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-[36px] h-9 px-3 rounded-xl text-sm font-bold border transition-all ${
        active
          ? "bg-brand-500 text-white border-brand-500"
          : disabled
            ? "border-gray-200 dark:border-dark-500 text-gray-300 dark:text-dark-400 cursor-not-allowed opacity-40"
            : "border-gray-200 dark:border-dark-500 text-gray-600 dark:text-gray-300 hover:border-brand-500/50 hover:text-brand-500"
      }`}
    >
      {label}
    </button>
  );
}

function ProblemsSkeleton() {
  return (
    <>
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[44px_1fr_110px_160px_64px] items-center px-5 py-3.5 border-b border-gray-100 dark:border-dark-600"
        >
          <Skeleton
            variant="text"
            width={20}
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
            variant="text"
            width="80%"
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
            width={80}
            height={24}
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
            variant="text"
            width="60%"
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
            variant="text"
            width={40}
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
      ))}
    </>
  );
}
