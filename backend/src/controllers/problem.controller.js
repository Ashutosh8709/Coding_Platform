import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Problem } from "../models/problem.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addProblem = asyncHandler(async (req, res) => {
  // get all details from frontend and only admin can add problems
  // validate of everything is done in middleware
  // insert in db

  const {
    title,
    description,
    inputFormat,
    outputFormat,
    constraints,
    difficulty,
    testcases,
  } = req.body;

  const problem = await Problem.create({
    title,
    description,
    inputFormat,
    outputFormat,
    constraints,
    difficulty,
    testCases: testcases,
    createdBy: req.user?._id,
  }).select("-testcases");

  if (!problem)
    throw new ApiError(400, "Something went wrong while adding this problem");

  return res
    .status(201)
    .json(new ApiResponse(201, problem, "Problem Added Successfully"));
});

const getAllProblem = asyncHandler(async (req, res) => {
  const problems = await Problem.find({}).select("-testcases");

  return res
    .status(200)
    .json(new ApiResponse(200, problems, "All problems fetched successfully"));
});

const getProblemById = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  const problem = await Problem.findById(problemId).select("-testcases");

  if (!problem) throw new ApiError(404, "Problem not found");

  return res
    .status(200)
    .json(new ApiResponse(200, problem, "Problem Fetched Successfully"));
});
export { addProblem, getAllProblem, getProblemById };
