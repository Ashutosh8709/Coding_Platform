import { useState } from "react";
import DescriptionTab from "./DescriptionTab";
import SolutionTab from "./SolutionTab";
import DiscussTab from "./DiscussTab";
import SubmissionsTab from "./SubmissionsTab";
import SubmitResultPanel from "./SubmitResultPanel";

export default function ProblemTab({ problem, submissions, submitResult }) {
  const [tab, setTab] = useState("Description");

  return (
    <>
      <SubmitResultPanel submitResult={submitResult} />
      <div className="flex border-b border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-700 sticky top-0 z-10">
        {["Description", "Solutions", "Discuss", "Submissions"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-xs font-bold transition-all
  ${
    tab === t
      ? "text-brand-500 border-b-2 border-brand-500"
      : "text-gray-500 dark:text-gray-300 border-b-2 border-transparent hover:text-gray-700 dark:hover:text-white"
  }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-6 pb-16 bg-white dark:bg-dark-800">
        {tab === "Description" && <DescriptionTab p={problem} />}
        {tab === "Solutions" && <SolutionTab />}
        {tab === "Discuss" && <DiscussTab />}
        {tab === "Submissions" && <SubmissionsTab submissions={submissions} />}
      </div>
    </>
  );
}
