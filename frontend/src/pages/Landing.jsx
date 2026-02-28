import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { VerdictBadge } from "../components/Badge";
import { Link } from "react-router-dom";

const DEMO_CODE = `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
};`;

const FEATURES = [
  {
    icon: "⚡",
    title: "Real-Time Judge",
    desc: "WebSocket-powered verdict streaming — see each testcase pass live as the judge runs.",
  },
  {
    icon: "🧩",
    title: "1,200+ Problems",
    desc: "Handcrafted problem sets from Easy warmups to Hard algorithmic challenges.",
  },
  {
    icon: "🗺️",
    title: "Structured Paths",
    desc: "Roadmap-style courses from Arrays to DP, designed to build deep intuition.",
  },
  {
    icon: "📊",
    title: "Deep Analytics",
    desc: "Heatmaps, rating graphs, topic breakdowns — know exactly where to improve.",
  },
  {
    icon: "🏆",
    title: "Weekly Contests",
    desc: "Compete live, earn ratings, and rise the global leaderboard each week.",
  },
  {
    icon: "🤖",
    title: "AI-Powered Hints",
    desc: "Stuck? Targeted nudges that guide your thinking without spoiling the answer.",
  },
];

export default function Landing() {
  const { go } = useApp();
  const [typed, setTyped] = useState("");
  const full = "Master Algorithms.";

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(iv);
    }, 65);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 pt-14 overflow-x-hidden fontFamily: Outfit, sans-serif">
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[8%] left-[18%] w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-[120px]" />
        <div className="absolute top-[35%] right-[8%] w-[450px] h-[450px] rounded-full bg-cyan-500/4 blur-[100px]" />
        <div className="absolute bottom-[15%] left-[45%] w-[400px] h-[400px] rounded-full bg-brand-500/4 blur-[100px]" />
      </div>

      {/* HERO */}
      <section className="relative z-10 px-6 pt-24 pb-20 text-center">
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse-dot inline-block" />
          <span className="text-xs text-brand-500 font-semibold">
            Real-time judge · Socket.IO powered
          </span>
        </div>

        <h1 className="animate-fade-up [animation-delay:0.05s] text-[clamp(42px,7vw,88px)] font-black leading-[1.05] tracking-[-0.04em] mb-6 text-gray-900 dark:text-white">
          <span className="gradient-text">{typed}</span>
          <span className="animate-blink text-brand-500 ml-1">|</span>
          <br />
          Build Careers.
        </h1>

        <p className="animate-fade-up [animation-delay:0.12s] text-lg text-gray-500 dark:text-dark-300 max-w-[560px] mx-auto mb-10 leading-[1.7]">
          The sharpest coding platform for engineers who want to think deeply,
          solve fast, and get hired at top companies.
        </p>

        <div className="animate-fade-up [animation-delay:0.19s] flex gap-3 justify-center flex-wrap">
          <Link
            to={"/signup"}
            className="px-8 py-3.5 rounded-xl gradient-brand text-white font-bold text-sm hover:shadow-glow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            Start coding free →
          </Link>
          <Link
            to={"/problems"}
            className="px-8 py-3.5 rounded-xl border border-brand-500/35 text-brand-500 font-bold text-sm hover:bg-brand-500/10 hover:-translate-y-0.5 transition-all duration-200"
          >
            Browse problems
          </Link>
        </div>

        {/* Demo card */}
        <div className="animate-fade-up [animation-delay:0.26s] animate-float max-w-2xl mx-auto mt-16 rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-500 shadow-2xl dark:shadow-black/60">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-dark-700 border-b border-gray-200 dark:border-dark-500">
            <div className="flex gap-1.5">
              {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
                <div
                  key={c}
                  style={{ background: c }}
                  className="w-3 h-3 rounded-full"
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 dark:text-dark-300 flex-1 text-center font-mono">
              two-sum.js
            </span>
            <VerdictBadge verdict="Accepted" />
          </div>
          <div className="bg-[#06060f] p-6 text-left overflow-x-auto">
            {DEMO_CODE.split("\n").map((line, i) => (
              <div key={i} className="flex leading-[1.65]">
                <span className="text-[#2d2b4e] w-6 text-xs font-mono select-none flex-shrink-0">
                  {i + 1}
                </span>
                <span
                  className={`pl-4 text-[13px] font-mono ${
                    line.includes("var ") || line.includes("function")
                      ? "text-brand-400"
                      : line.includes("const") ||
                          line.includes("for") ||
                          line.includes("if") ||
                          line.includes("return")
                        ? "text-cyan-400"
                        : line.includes("//")
                          ? "text-[#4a4870]"
                          : "text-[#c4c2f0]"
                  }`}
                >
                  {line || " "}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 px-5 py-3 bg-gray-50 dark:bg-dark-700 border-t border-gray-200 dark:border-dark-500">
            <span className="text-xs text-gray-400 font-mono">⏱ 68ms</span>
            <span className="text-xs text-gray-400 font-mono">💾 42.1 MB</span>
            <span className="ml-auto text-xs text-emerald-400 font-bold">
              ✓ 57/57 testcases passed
            </span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-8 p-10 rounded-2xl bg-gradient-to-r from-brand-500/8 to-cyan-500/5 border border-brand-500/15 text-center">
          {[
            ["1,200+", "Problems"],
            ["280K+", "Engineers"],
            ["4.8M+", "Submissions"],
            ["94%", "Hire Rate"],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="text-2xl font-black text-brand-500 tracking-tight">
                {v}
              </div>
              <div className="text-sm text-gray-400 dark:text-dark-300 mt-1 font-medium">
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
              Everything in one forge
            </h2>
            <p className="text-gray-400 dark:text-dark-300 text-base">
              Every tool you need to become an elite problem solver.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <FeatureCard key={i} f={f} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 pb-24 text-center">
        <div className="max-w-lg mx-auto p-16 rounded-3xl bg-gradient-to-br from-brand-500/8 to-cyan-500/5 border border-brand-500/20">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
            Ready to forge your skills?
          </h2>
          <p className="text-gray-400 dark:text-dark-300 mb-8 leading-relaxed">
            Join 280,000+ engineers already using CodeForge to land their dream
            jobs.
          </p>
          <Link
            to={"/signup"}
            className="px-10 py-3.5 gradient-brand text-white font-bold rounded-xl hover:shadow-glow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            Create account →
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ f }) {
  return (
    <div className="p-7 rounded-2xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700/50 hover:border-brand-500/40 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-black/40 transition-all duration-200 group cursor-default">
      {/* <div className="text-3xl mb-4">{f.icon}</div> */}
      <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-500 transition-colors">
        {f.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-dark-300 leading-relaxed">
        {f.desc}
      </p>
    </div>
  );
}
