import { useEffect, useState } from "react";
import { getAllProblems } from "../services/problem.service";
import { handleError } from "../utils/toast";

export const useProblemsList = (
  page = 1,
  limit = 15,
  search = "",
  diff = "All",
  status = "All",
) => {
  const [problems, setProblems] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);

        const res = await getAllProblems(page, limit);

        setProblems(res.data?.data?.problems || []);
        setPagination(res.data?.data?.pagination || {});
      } catch (err) {
        handleError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [page, limit, search, diff, status]);

  return { problems, pagination, loading };
};
