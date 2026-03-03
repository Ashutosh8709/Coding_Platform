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
  // implement pagination here

  const page = Number.parseInt(req.query.page || 1);
  const limit = Number.parseInt(req.query.limit || 10);

  if (!page || !limit)
    throw new ApiError(404, "Page number and limit is required");

  const skip = (page - 1) * limit;
  const problems = await Problem.find({})
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .select("-testCases");

  const totalProblems = await Problem.countDocuments();

  const totalPages = Math.ceil(totalProblems / limit);

  const payload = {
    problems,
    pagination: {
      totalProblems,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };

  return res
    .status(200)
    .json(new ApiResponse(200, payload, "All problems fetched successfully"));
});

const getProblemById = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  const problem = await Problem.findById(problemId).select("-testcases");

  if (!problem) throw new ApiError(404, "Problem not found");

  return res
    .status(200)
    .json(new ApiResponse(200, problem, "Problem Fetched Successfully"));
});

const getProblemByDifficulty = asyncHandler(async (req, res) => {
  // get difficulty from req.query and also implement pagination
  // find problems based on difficulty
  // return them
  const { difficulty } = req.query;
  if (!difficulty) throw new ApiError(404, "Difficulty is required");

  const page = Number.parseInt(req.query.page || 1);
  const limit = Number.parseInt(req.query.limit || 10);

  const skip = (page - 1) * limit;
  const problems = await Problem.find({ difficulty })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .select("-testCases");

  const totalProblems = await Problem.countDocuments();

  const totalPages = Math.ceil(totalProblems / limit);

  const payload = {
    problems,
    pagination: {
      totalProblems,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };

  return res
    .status(200)
    .json(new ApiResponse(200, payload, "Problems fetched Successfully"));
});
export { addProblem, getAllProblem, getProblemById, getProblemByDifficulty };
