import { useEffect, useState } from "react";
import { getProblemById } from "../services/problem.service";
import { handleError } from "../utils/toast";

export const useProblem = (problemId) => {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!problemId) {
      return;
    }

    const fetchProblem = async () => {
      try {
        setLoading(true);
        const res = await getProblemById(problemId);
        setProblem(res.data?.data);
      } catch (err) {
        handleError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  return { problem, loading };
};
