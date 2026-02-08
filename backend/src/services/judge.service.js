import { Problem } from "../models/problem.model.js";
import { ApiError } from "../utils/ApiError.js";
import { runCpp } from "./cppExecutor.service.js";

export const judgeSubmission = async (problemId, code, onTestcaseUpdate) => {
  const problem = await Problem.findById(problemId);

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  const testcases = problem.testCases; // ⚠️ make sure schema matches

  if (!testcases || testcases.length === 0) {
    throw new ApiError(500, "No testcases found");
  }

  let overallVerdict = "ACCEPTED";

  for (let i = 0; i < testcases.length; i++) {
    const testcase = testcases[i];

    const result = await runCpp(code, testcase.input);

    // 🔥 TLE / CE / RE
    if (result.status !== "SUCCESS") {
      overallVerdict = result.status;

      if (onTestcaseUpdate) {
        await onTestcaseUpdate({
          index: i + 1,
          verdict: result.status,
        });
      }

      continue;
    }

    const userOutput = result.output.trim();
    const expectedOutput = testcase.output.trim();

    // ❌ WRONG ANSWER
    if (userOutput !== expectedOutput) {
      overallVerdict = "WRONG_ANSWER";

      if (onTestcaseUpdate) {
        await onTestcaseUpdate({
          index: i + 1,
          verdict: "WRONG_ANSWER",
          output: userOutput,
          expectedOutput,
        });
      }

      continue;
    }

    // ✅ PASSED testcase
    if (onTestcaseUpdate) {
      await onTestcaseUpdate({
        index: i + 1,
        verdict: "PASSED",
      });
    }
  }

  return {
    verdict: overallVerdict,
  };
};
