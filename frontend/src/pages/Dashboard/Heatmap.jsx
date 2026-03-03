import React from "react";
import { useDashboard } from "../../hooks/useDashboard";
function Heatmap({ heatMapData }) {
  const { buildHeatmapGrid } = useDashboard();
  const heat = buildHeatmapGrid(heatMapData);
  return (
    <div className="animate-fade-up [animation-delay:0.1s] lg:col-span-2 p-5 rounded-2xl border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white">
          Activity Heatmap
        </h2>
        <span className="text-xs text-gray-400 dark:text-dark-300">
          Last 52 weeks
        </span>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-[3px]" style={{ minWidth: "fit-content" }}>
          {heat.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((cnt, di) => (
                <div
                  key={di}
                  className={`w-[11px] h-[11px] rounded-sm transition-colors ${
                    cnt === 0
                      ? "bg-gray-100 dark:bg-dark-600"
                      : cnt === 1
                        ? "bg-brand-500/25"
                        : cnt === 2
                          ? "bg-brand-500/50"
                          : cnt === 3
                            ? "bg-brand-500/75"
                            : "bg-brand-500"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-3">
        <span className="text-[11px] text-gray-400 dark:text-dark-300">
          Less
        </span>
        {[0.15, 0.3, 0.55, 0.8, 1].map((o, i) => (
          <div
            key={i}
            className="w-[11px] h-[11px] rounded-sm"
            style={{ background: `rgba(139,92,246,${o})` }}
          />
        ))}
        <span className="text-[11px] text-gray-400 dark:text-dark-300">
          More
        </span>
      </div>
    </div>
  );
}

export default Heatmap;
