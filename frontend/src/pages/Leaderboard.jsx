import { useState } from "react";

const USERS = [
  {
    rank: 1,
    name: "tourist",
    country: "🇷🇺",
    rating: 3979,
    solved: 1847,
    streak: 142,
    badge: "Legendary",
    change: 0,
  },
  {
    rank: 2,
    name: "Petr",
    country: "🇷🇺",
    rating: 3801,
    solved: 1723,
    streak: 98,
    badge: "Legendary",
    change: 1,
  },
  {
    rank: 3,
    name: "Um_nik",
    country: "🇺🇦",
    rating: 3748,
    solved: 1690,
    streak: 74,
    badge: "Legendary",
    change: -1,
  },
  {
    rank: 4,
    name: "ecnerwala",
    country: "🇺🇸",
    rating: 3712,
    solved: 1612,
    streak: 61,
    badge: "Grandmaster",
    change: 2,
  },
  {
    rank: 5,
    name: "Radewoosh",
    country: "🇵🇱",
    rating: 3688,
    solved: 1598,
    streak: 55,
    badge: "Grandmaster",
    change: 0,
  },
  {
    rank: 6,
    name: "jiangly",
    country: "🇨🇳",
    rating: 3641,
    solved: 1542,
    streak: 88,
    badge: "Grandmaster",
    change: -2,
  },
  {
    rank: 7,
    name: "neal",
    country: "🇺🇸",
    rating: 3619,
    solved: 1511,
    streak: 47,
    badge: "Grandmaster",
    change: 3,
  },
  {
    rank: 8,
    name: "maroonrk",
    country: "🇮🇳",
    rating: 3587,
    solved: 1487,
    streak: 39,
    badge: "Master",
    change: 0,
  },
  {
    rank: 9,
    name: "wxhtxdy",
    country: "🇨🇳",
    rating: 3562,
    solved: 1463,
    streak: 52,
    badge: "Master",
    change: 1,
  },
  {
    rank: 10,
    name: "Benq",
    country: "🇺🇸",
    rating: 3534,
    solved: 1441,
    streak: 33,
    badge: "Master",
    change: -1,
  },
  {
    rank: 11,
    name: "rng_58",
    country: "🇯🇵",
    rating: 3510,
    solved: 1420,
    streak: 28,
    badge: "Master",
    change: 0,
  },
  {
    rank: 12,
    name: "yosupo",
    country: "🇯🇵",
    rating: 3488,
    solved: 1398,
    streak: 41,
    badge: "Master",
    change: 2,
  },
  {
    rank: 13,
    name: "ksun48",
    country: "🇺🇸",
    rating: 3461,
    solved: 1375,
    streak: 22,
    badge: "Master",
    change: -1,
  },
  {
    rank: 14,
    name: "sunset",
    country: "🇺🇸",
    rating: 3435,
    solved: 1352,
    streak: 19,
    badge: "Master",
    change: 0,
  },
  {
    rank: 15,
    name: "noimi",
    country: "🇯🇵",
    rating: 3412,
    solved: 1330,
    streak: 35,
    badge: "Expert",
    change: 1,
  },
];

const BADGE_STYLES = {
  Legendary: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  Grandmaster: "text-red-400    bg-red-400/10    border-red-400/30",
  Master: "text-brand-400  bg-brand-500/10  border-brand-500/30",
  Expert: "text-cyan-400   bg-cyan-400/10   border-cyan-400/30",
};

const MEDAL = ["🥇", "🥈", "🥉"];

const TABS = ["Global", "India", "This Week", "Friends"];

export default function Leaderboard() {
  const [tab, setTab] = useState("Global");

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 pt-20 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="animate-fade-up mb-8">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Leaderboard
          </h1>
          <p className="text-gray-400 dark:text-dark-300 mt-2 text-sm">
            Top coders ranked by rating worldwide
          </p>
        </div>

        {/* Top 3 podium */}
        <div className="animate-fade-up [animation-delay:0.05s] grid grid-cols-3 gap-4 mb-8">
          {[USERS[1], USERS[0], USERS[2]].map((u, i) => {
            const pos = i === 1 ? 0 : i === 0 ? 1 : 2;
            return (
              <div
                key={u.rank}
                className={`relative flex flex-col items-center p-6 rounded-2xl border transition-all
                  ${
                    pos === 0
                      ? "border-yellow-400/40 bg-yellow-400/5 dark:bg-yellow-400/5 shadow-lg scale-105"
                      : "border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700"
                  }`}
              >
                <span className="text-3xl mb-2">{MEDAL[pos]}</span>
                <div
                  className={`w-14 h-14 rounded-full gradient-brand flex items-center justify-center text-white font-black text-xl mb-3 ${pos === 0 ? "shadow-glow-md" : ""}`}
                >
                  {u.name[0].toUpperCase()}
                </div>
                <p
                  className={`font-black text-sm tracking-tight mb-1 ${pos === 0 ? "text-yellow-400" : "text-gray-900 dark:text-white"}`}
                >
                  {u.name}
                </p>
                <p className="text-xs text-gray-400 dark:text-dark-300 mb-2">
                  {u.country}
                </p>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${BADGE_STYLES[u.badge]}`}
                >
                  {u.badge}
                </span>
                <p
                  className={`text-lg font-black mt-3 ${pos === 0 ? "text-yellow-400" : "text-brand-500"}`}
                >
                  {u.rating.toLocaleString()}
                </p>
                <p className="text-[11px] text-gray-400 dark:text-dark-300">
                  Rating
                </p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="animate-fade-up [animation-delay:0.1s] flex gap-1 mb-5 p-1 bg-gray-100 dark:bg-dark-700 rounded-xl w-fit">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                tab === t
                  ? "bg-white dark:bg-dark-600 text-brand-500 shadow-sm"
                  : "text-gray-500 dark:text-dark-300 hover:text-gray-700 dark:hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="animate-fade-up [animation-delay:0.15s] rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-500">
          <div className="grid grid-cols-[52px_1fr_110px_90px_90px_80px] px-5 py-3 bg-brand-500/3 dark:bg-brand-500/5 border-b border-gray-200 dark:border-dark-500">
            {["Rank", "User", "Badge", "Rating", "Solved", "Streak"].map(
              (h) => (
                <span
                  key={h}
                  className="text-[11px] font-bold text-gray-400 dark:text-dark-300 uppercase tracking-widest"
                >
                  {h}
                </span>
              ),
            )}
          </div>

          {USERS.map((u, i) => (
            <div
              key={u.rank}
              className={`grid grid-cols-[52px_1fr_110px_90px_90px_80px] items-center px-5 py-3.5 hover:bg-brand-500/5 transition-colors group bg-white dark:bg-dark-700 animate-slide-in ${i < USERS.length - 1 ? "border-b border-gray-100 dark:border-dark-600" : ""}`}
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              {/* Rank */}
              <div className="flex items-center gap-1">
                <span
                  className={`text-sm font-black w-6 text-center ${u.rank <= 3 ? "text-yellow-400" : "text-gray-500 dark:text-dark-300"}`}
                >
                  {u.rank <= 3 ? MEDAL[u.rank - 1] : u.rank}
                </span>
                <span
                  className={`text-[10px] font-bold ml-1 ${u.change > 0 ? "text-emerald-400" : u.change < 0 ? "text-red-400" : "text-gray-300 dark:text-dark-400"}`}
                >
                  {u.change > 0
                    ? `▲${u.change}`
                    : u.change < 0
                      ? `▼${Math.abs(u.change)}`
                      : "—"}
                </span>
              </div>

              {/* User */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {u.name[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-brand-500 transition-colors truncate">
                    {u.name}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-dark-300">
                    {u.country}
                  </p>
                </div>
              </div>

              {/* Badge */}
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full border w-fit ${BADGE_STYLES[u.badge]}`}
              >
                {u.badge}
              </span>

              {/* Rating */}
              <span className="text-sm font-black text-brand-500">
                {u.rating.toLocaleString()}
              </span>

              {/* Solved */}
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {u.solved.toLocaleString()}
              </span>

              {/* Streak */}
              <span className="text-sm font-semibold text-orange-400">
                🔥 {u.streak}
              </span>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="flex justify-center mt-6">
          <button className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-dark-500 text-sm font-bold text-gray-500 dark:text-dark-300 hover:border-brand-500/50 hover:text-brand-500 transition-all">
            Load more
          </button>
        </div>
      </div>
    </div>
  );
}
