import { useState } from "react";

const UPCOMING = [
  {
    id: 1,
    title: "CodeForge Weekly #142",
    type: "Weekly",
    date: "Sat, Mar 8 · 8:00 AM IST",
    duration: "1.5 hrs",
    registered: 3841,
    problems: 4,
    prize: null,
    countdown: { h: 2, m: 34, s: 12 },
  },
  {
    id: 2,
    title: "CodeForge Biweekly #78",
    type: "Biweekly",
    date: "Sun, Mar 9 · 8:00 PM IST",
    duration: "1.5 hrs",
    registered: 2190,
    problems: 4,
    prize: null,
    countdown: { h: 38, m: 10, s: 44 },
  },
  {
    id: 3,
    title: "Grand Championship — Spring 2025",
    type: "Special",
    date: "Sat, Mar 15 · 6:00 PM IST",
    duration: "3 hrs",
    registered: 12480,
    problems: 6,
    prize: "$5,000",
    countdown: { h: 164, m: 22, s: 8 },
  },
];

const PAST = [
  {
    id: 10,
    title: "CodeForge Weekly #141",
    type: "Weekly",
    date: "Mar 1, 2025",
    participants: 4120,
    myRank: 182,
    myRating: "+18",
    problems: 4,
  },
  {
    id: 9,
    title: "CodeForge Biweekly #77",
    type: "Biweekly",
    date: "Feb 23, 2025",
    participants: 3876,
    myRank: null,
    myRating: null,
    problems: 4,
  },
  {
    id: 8,
    title: "CodeForge Weekly #140",
    type: "Weekly",
    date: "Feb 22, 2025",
    participants: 3940,
    myRank: 74,
    myRating: "+31",
    problems: 4,
  },
  {
    id: 7,
    title: "Grand Championship — Winter 2025",
    type: "Special",
    date: "Feb 15, 2025",
    participants: 15200,
    myRank: 201,
    myRating: "+52",
    problems: 6,
  },
  {
    id: 6,
    title: "CodeForge Weekly #139",
    type: "Weekly",
    date: "Feb 15, 2025",
    participants: 3710,
    myRank: 310,
    myRating: "+12",
    problems: 4,
  },
  {
    id: 5,
    title: "CodeForge Biweekly #76",
    type: "Biweekly",
    date: "Feb 9, 2025",
    participants: 3601,
    myRank: null,
    myRating: null,
    problems: 4,
  },
];

const TYPE_STYLE = {
  Weekly: "text-brand-500 bg-brand-500/10 border-brand-500/25",
  Biweekly: "text-cyan-400  bg-cyan-400/10  border-cyan-400/25",
  Special: "text-yellow-400 bg-yellow-400/10 border-yellow-400/25",
};

export default function Contests() {
  const [tab, setTab] = useState("upcoming");

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 pt-20 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="animate-fade-up mb-8">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Contests
          </h1>
          <p className="text-gray-400 dark:text-dark-300 mt-2 text-sm">
            Compete live, earn ratings, climb the global leaderboard
          </p>
        </div>

        {/* Stats banner */}
        <div className="animate-fade-up [animation-delay:0.05s] grid grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Contests Held",
              val: "141",
              icon: "🏆",
              color: "text-yellow-400",
            },
            {
              label: "Total Participants",
              val: "280K+",
              icon: "👥",
              color: "text-brand-500",
            },
            {
              label: "Your Rating",
              val: "1,842",
              icon: "📈",
              color: "text-emerald-400",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 flex items-center gap-4"
            >
              <span className="text-3xl">{s.icon}</span>
              <div>
                <p className={`text-xl font-black ${s.color}`}>{s.val}</p>
                <p className="text-xs text-gray-400 dark:text-dark-300 font-medium">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="animate-fade-up [animation-delay:0.1s] flex gap-1 mb-6 p-1 bg-gray-100 dark:bg-dark-700 rounded-xl w-fit">
          {["upcoming", "past"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-1.5 rounded-lg text-sm font-semibold transition-all capitalize ${
                tab === t
                  ? "bg-white dark:bg-dark-600 text-brand-500 shadow-sm"
                  : "text-gray-500 dark:text-dark-300 hover:text-gray-800 dark:hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Upcoming contests */}
        {tab === "upcoming" && (
          <div className="animate-fade-up space-y-4">
            {UPCOMING.map((c, i) => (
              <div
                key={c.id}
                className={`p-6 rounded-2xl border bg-white dark:bg-dark-700 hover:border-brand-500/40 hover:shadow-lg dark:hover:shadow-black/40 transition-all group animate-slide-in ${c.prize ? "border-yellow-400/30 dark:border-yellow-400/20" : "border-gray-200 dark:border-dark-500"}`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-start gap-4 flex-wrap">
                  {/* Left */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${TYPE_STYLE[c.type]}`}
                      >
                        {c.type}
                      </span>
                      {c.prize && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full border text-yellow-400 bg-yellow-400/10 border-yellow-400/25">
                          💰 Prize: {c.prize}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-black text-gray-900 dark:text-white mb-1 group-hover:text-brand-500 transition-colors">
                      {c.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-dark-300 flex-wrap">
                      <span>📅 {c.date}</span>
                      <span>⏱ {c.duration}</span>
                      <span>🧩 {c.problems} problems</span>
                      <span>👥 {c.registered.toLocaleString()} registered</span>
                    </div>
                  </div>

                  {/* Countdown + button */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-1 text-sm font-mono">
                      {[
                        ["h", c.countdown.h],
                        ["m", c.countdown.m],
                        ["s", c.countdown.s],
                      ].map(([label, val]) => (
                        <div key={label} className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-600 flex items-center justify-center font-black text-gray-900 dark:text-white text-sm">
                            {String(val).padStart(2, "0")}
                          </div>
                          <span className="text-[9px] text-gray-400 dark:text-dark-300 mt-0.5 uppercase">
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button className="px-5 py-2 rounded-xl gradient-brand text-white text-xs font-bold hover:shadow-glow-sm hover:-translate-y-px transition-all">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Past contests */}
        {tab === "past" && (
          <div className="animate-fade-up [animation-delay:0.05s] rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-500">
            <div className="grid grid-cols-[1fr_100px_110px_90px_90px] px-5 py-3 bg-brand-500/3 dark:bg-brand-500/5 border-b border-gray-200 dark:border-dark-500">
              {["Contest", "Type", "Date", "Participants", "Your Rank"].map(
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
            {PAST.map((c, i) => (
              <div
                key={c.id}
                className={`grid grid-cols-[1fr_100px_110px_90px_90px] items-center px-5 py-3.5 hover:bg-brand-500/5 transition-colors group bg-white dark:bg-dark-700 animate-slide-in ${i < PAST.length - 1 ? "border-b border-gray-100 dark:border-dark-600" : ""}`}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <span className="text-sm font-semibold text-gray-800 dark:text-white group-hover:text-brand-500 transition-colors truncate pr-4 cursor-pointer">
                  {c.title}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border w-fit ${TYPE_STYLE[c.type]}`}
                >
                  {c.type}
                </span>
                <span className="text-xs text-gray-400 dark:text-dark-300">
                  {c.date}
                </span>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                  {c.participants.toLocaleString()}
                </span>
                <div>
                  {c.myRank ? (
                    <div>
                      <p className="text-sm font-bold text-gray-800 dark:text-white">
                        #{c.myRank}
                      </p>
                      <p
                        className={`text-xs font-bold ${c.myRating?.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}
                      >
                        {c.myRating}
                      </p>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-300 dark:text-dark-400">
                      —
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
