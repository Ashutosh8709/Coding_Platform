import { judgeSubmission } from "../services/judge.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { runCpp } from "../services/cppExecutor.service.js";
import { Submission } from "../models/submission.model.js";
import { judgeQueue } from "../queues/judge.queue.js";

const submitCode = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  const { code } = req.body;

  const submission = await Submission.create({
    userId: req.user?._id,
    problemId,
    code,
    verdict: "PENDING",
  });

  await judgeQueue.add("judge-job", {
    submissionId: submission._id,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        submissionId: submission._id,
      },
      "Submission queued Successfully",
    ),
  );

  // const result = await judgeSubmission(problemId, code);

  // submission.verdict = result.verdict;

  // await submission.save();

  // return res
  //   .status(200)
  //   .json(new ApiResponse(200, result, "Problem Executed Successfully"));
});

const testExecutor = asyncHandler(async (req, res) => {
  const code = `
  #include<iostream>
  using namespace std;
  int main(){
      int a,b;
      cin >> a >> b;
      cout << a + b;
  }
  `;

  const result = await runCpp(code, "2 3");

  console.log("RESULT:", result);

  res.json(result);
});

export { submitCode, testExecutor };
