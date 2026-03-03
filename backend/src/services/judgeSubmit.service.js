import fs from "fs";
import { runCppBinary, compileCpp } from "../services/cppExecutor.service.js";
import { Problem } from "../models/problem.model.js";
import { ApiError } from "../utils/ApiError.js";

export const judgeSubmission = async (problemId, code) => {
  const problem = await Problem.findById(problemId);

  if (!problem) throw new ApiError(404, "Problem not found");

  const testcases = problem.hiddenTestCases;

  if (!testcases?.length) throw new ApiError(500, "No testcases found");

  if (!problem.execution?.driverCode?.cpp)
    throw new ApiError(500, "Driver code missing");

  const finalCode = problem.execution.driverCode.cpp.replace(
    "{{USER_CODE}}",
    code,
  );

  const normalize = (s) =>
    s
      .replace(/[\[\],]/g, " ")
      .trim()
      .split(/\s+/)
      .join(" ");

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
        return {
          verdict: result.status,
          output: result.output,
        };
      }

      const userOutput = normalize(result.output);
      const expectedOutput = normalize(testcases[i].output);

      if (userOutput !== expectedOutput) {
        overallVerdict = "WRONG_ANSWER";

        return {
          verdict: "WRONG_ANSWER",
          input: testcases[i],
          output: userOutput,
          expectedOutput,
        };
      }
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    await fs.promises.unlink(`temp/${jobId}.cpp`).catch(() => {});

    await fs.promises.unlink(`temp/${jobId}.out`).catch(() => {});
  }
  return { verdict: overallVerdict };
};
