import React from "react";
import { useDashboard } from "../../hooks/useDashboard";
import StatsGrid from "./StatsGrid";
import Heatmap from "./Heatmap";
import DifficultyStats from "./DifficultyStats";
import RecentSubmissions from "./RecentSubmissions";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { dashboardData, loading } = useDashboard();
  const { user } = useAuth();

  const hr = new Date().getHours();
  const greeting =
    hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : "Good evening";

  if (loading) return <div>Loading...</div>;

  return (
    dashboardData && (
      <div className="min-h-screen bg-white dark:bg-dark-900 pt-20 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-up mb-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              {greeting}, <span className="text-brand-500">{user?.name}</span>{" "}
              👋
            </h1>
            <p className="text-gray-400 dark:text-dark-300 mt-2">
              Your coding streak is strong — keep going!
            </p>
          </div>
          <StatsGrid data={dashboardData} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            <Heatmap heatMapData={dashboardData.heatMapData} />
            <DifficultyStats difficulty={dashboardData.difficultyStatus} />
          </div>
          <RecentSubmissions submissions={dashboardData.recent} />
        </div>
      </div>
    )
  );
}

export default Dashboard;
