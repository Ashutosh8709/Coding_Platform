import { useState } from "react";

const TRACKS = [
  {
    title: "Interview Prep Path",
    sub: "Land FAANG-level offers",
    gradClass: "gradient-brand",
    courses: [
      { name: "Arrays & Hashing", lessons: 12, done: 12, icon: "📦" },
      { name: "Two Pointers", lessons: 8, done: 8, icon: "👉" },
      { name: "Sliding Window", lessons: 6, done: 4, icon: "🪟" },
      { name: "Stack & Queue", lessons: 10, done: 2, icon: "📚" },
      { name: "Binary Search", lessons: 9, done: 0, icon: "🔍" },
      { name: "Linked Lists", lessons: 11, done: 0, icon: "🔗" },
    ],
  },
  {
    title: "Advanced Algorithms",
    sub: "Master complex patterns",
    gradClass: "gradient-brand-green",
    courses: [
      { name: "Dynamic Programming", lessons: 20, done: 5, icon: "🧮" },
      { name: "Graphs & BFS/DFS", lessons: 16, done: 0, icon: "🕸️" },
      { name: "Trees & Tries", lessons: 14, done: 3, icon: "🌲" },
      { name: "Heap & Priority Queue", lessons: 8, done: 0, icon: "⛏️" },
    ],
  },
  {
    title: "System Design",
    sub: "Architect scalable systems",
    gradClass: "gradient-brand-warm",
    courses: [
      { name: "Distributed Systems", lessons: 10, done: 0, icon: "🌐" },
      { name: "Database Design", lessons: 8, done: 0, icon: "🗄️" },
      { name: "Caching Strategies", lessons: 6, done: 0, icon: "⚡" },
      { name: "API Design", lessons: 7, done: 0, icon: "🔌" },
    ],
  },
];

export default function Courses() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 pt-20 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="animate-fade-up mb-9">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Learning Paths
          </h1>
          <p className="text-gray-400 dark:text-dark-300 mt-2 text-sm">
            Structured roadmaps to master algorithms step by step
          </p>
        </div>
        {TRACKS.map((track, ti) => (
          <div
            key={ti}
            className={`animate-fade-up mb-12`}
            style={{ animationDelay: `${ti * 0.07}s` }}
          >
            <div className="flex items-center gap-4 mb-5">
              <div
                className={`w-11 h-11 ${track.gradClass} rounded-2xl flex items-center justify-center shadow-glow-sm flex-shrink-0`}
              >
                <span className="text-white font-black text-lg">{ti + 1}</span>
              </div>
              <div>
                <h2 className="text-base font-black text-gray-900 dark:text-white">
                  {track.title}
                </h2>
                <p className="text-xs text-gray-400 dark:text-dark-300 mt-0.5">
                  {track.sub}
                </p>
              </div>
              <span className="ml-auto text-xs text-gray-400 dark:text-dark-300">
                {track.courses.filter((c) => c.done === c.lessons).length}/
                {track.courses.length} complete
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {track.courses.map((c, ci) => (
                <CourseCard
                  key={ci}
                  c={c}
                  ci={ci}
                  gradClass={track.gradClass}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CourseCard({ c, ci, gradClass }) {
  const pct = Math.round((c.done / c.lessons) * 100);
  const isComplete = pct === 100;
  const inProgress = pct > 0 && !isComplete;
  return (
    <div
      className="p-5 rounded-2xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 hover:border-brand-500/40 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-black/40 transition-all duration-200 cursor-pointer group"
      style={{ animationDelay: `${ci * 0.06}s` }}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-2xl">{c.icon}</span>
        {isComplete && (
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
            Complete ✓
          </span>
        )}
        {inProgress && (
          <span className="text-[11px] font-bold text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded-full">
            In Progress
          </span>
        )}
      </div>
      <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-brand-500 transition-colors mb-1">
        {c.name}
      </h3>
      <p className="text-xs text-gray-400 dark:text-dark-300 mb-4">
        {c.lessons} lessons
      </p>
      <div className="h-1.5 rounded-full bg-gray-100 dark:bg-dark-600 overflow-hidden">
        <div
          className={`h-full rounded-full ${gradClass} transition-all duration-[1200ms]`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400 dark:text-dark-300">
        <span>
          {c.done}/{c.lessons}
        </span>
        <span className={`font-bold ${isComplete ? "text-emerald-400" : ""}`}>
          {pct}%
        </span>
      </div>
    </div>
  );
}
