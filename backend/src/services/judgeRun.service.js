import fs from "fs";
import { Problem } from "../models/problem.model.js";
import { ApiError } from "../utils/ApiError.js";
import { compileCpp, runCppBinary } from "./cppExecutor.service.js";

export const judgeRun = async (problemId, code, onTestcaseUpdate) => {
  const problem = await Problem.findById(problemId);

  if (!problem) throw new ApiError(404, "Problem not found");

  const testcases = problem.testCases;

  if (!testcases?.length) throw new ApiError(500, "No testcases found");

  if (!problem.execution?.driverCode?.cpp)
    throw new ApiError(500, "Driver code missing");

  const finalCode = problem.execution.driverCode.cpp.replace(
    "{{USER_CODE}}",
    code,
  );

  let compileResult = null;
  let jobId = null;
  let overallVerdict = "ACCEPTED";

  try {
    compileResult = await compileCpp(finalCode);

    jobId = compileResult?.jobId;

    if (compileResult.status === "COMPILE_ERROR") {
      return {
        verdict: "COMPILE_ERROR",
        output: compileResult.output,
      };
    }

    for (let i = 0; i < testcases.length; i++) {
      const result = await runCppBinary(jobId, testcases[i].input);

      if (result.status !== "SUCCESS") {
        if (onTestcaseUpdate) {
          await onTestcaseUpdate({
            index: i + 1,
            verdict: result.status,
          });
        }

        return {
          verdict: result.status,
          output: result.output,
        };
      }

      const normalize = (s) => {
        return s
          .replace(/[\[\],]/g, " ")
          .trim()
          .split(/\s+/)
          .join(" ");
      };

      const userOutput = normalize(result.output);
      const expectedOutput = normalize(testcases[i].output);

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

      if (onTestcaseUpdate) {
        await onTestcaseUpdate({
          index: i + 1,
          verdict: "PASSED",
          output: userOutput,
          expectedOutput,
        });
      }
    }
    return { verdict: overallVerdict };
  } finally {
    if (jobId) {
      await fs.promises.unlink(`temp/${jobId}.cpp`).catch(() => {});

      await fs.promises.unlink(`temp/${jobId}.out`).catch(() => {});
    }
  }
};
