import { useState } from "react";
import {
  submitByProblemId,
  runByProblemId,
  getSubmissionByUserAndProblem,
} from "../services/submit.service";

export const useSubmission = () => {
  const [loading, setLoading] = useState(false);

  const submitCode = async (problemId, code) => {
    try {
      setLoading(true);
      await submitByProblemId(problemId, code);
    } finally {
      setLoading(false);
    }
  };

  const runCode = async (problemId, code) => {
    try {
      setLoading(true);
      await runByProblemId(problemId, code);
    } finally {
      setLoading(false);
    }
  };

  const getUserSubmission = async (problemId) => {
    return await getSubmissionByUserAndProblem(problemId);
  };

  return { submitCode, loading, runCode, getUserSubmission };
};
