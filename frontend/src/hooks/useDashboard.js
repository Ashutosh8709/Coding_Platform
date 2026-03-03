import { useState } from "react";
import { getDashBoard } from "../services/dashboard.service";
import { useEffect } from "react";

const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await getDashBoard();
        setDashboardData(res.data?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const buildHeatmapGrid = (heatMapData) => {
    const dateMap = {};

    heatMapData.forEach((d) => {
      dateMap[d._id] = d.count;
    });

    const today = new Date();
    const days = [];

    for (let i = 364; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const formatted = date.toISOString().split("T")[0];
      days.push(dateMap[formatted] || 0);
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  };
  return { dashboardData, loading, buildHeatmapGrid };
};

export { useDashboard };
