import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { compileCpp, runCppBinary } from "../services/cppExecutor.service.js";
import { Submission } from "../models/submission.model.js";
import { submitQueue } from "../queues/judgeSubmit.queue.js";
import { runQueue } from "../queues/judgeRun.queue.js";

const runcode = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  const { code } = req.body;

  await runQueue.add("run-job", {
    problemId,
    code,
    userId: req.user._id.toString(),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Run Queued Successfully"));
});

const submitCode = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  const { code } = req.body;

  const submission = await Submission.create({
    userId: req.user?._id,
    problemId,
    code,
    verdict: "PENDING",
  });

  await submitQueue.add("judge-job", {
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

  const compileResult = await compileCpp(code);

  if (compileResult.status === "COMPILE_ERROR") {
    return res.json(compileResult);
  }

  const result = await runCppBinary(compileResult.jobId, "2 3");

  res.json(result);
});

const getUserSubmission = asyncHandler(async (req, res) => {
  // get user id from req.user;
  // find submission made by user and return

  const userId = req.user?._id;
  const submission = await Submission.find({ userId });
  if (!submission || submission.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No Submission Found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, submission, "Submission Fetched Successfully"));
});

const getSubmissionById = asyncHandler(async (req, res) => {
  // get submissionId by req.params
  // find submission from db
  // return submission
  const { submissionId } = req.params;
  if (!submissionId) throw new ApiError(404, "SubmissionId is required");

  const submission = await Submission.findById(submissionId);
  if (!submission) {
    throw new ApiError(400, "Submission not found or wrong Submission Id");
  }

  if (submission.userId !== req.user._id) {
    throw new ApiError(403, "Unauthorized access");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, submission, "Submission Fetched Successfully"));
});

const getUserSubmissionByProblem = asyncHandler(async (req, res) => {
  // get userId from req.user
  // get Problemid from req.params
  // find problems for the user with problemId

  const userId = req.user?._id;
  const { problemId } = req.params;

  if (!problemId) {
    throw new ApiError(404, "Problem Id is required");
  }

  const submissions = await Submission.find({
    userId: userId,
    problemId: problemId,
  });
  if (!submissions || submissions.length == 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No Submission Found"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, submissions, "Submissions fetched successfully"),
    );
});

export {
  submitCode,
  testExecutor,
  getUserSubmission,
  getSubmissionById,
  runcode,
  getUserSubmissionByProblem,
};
