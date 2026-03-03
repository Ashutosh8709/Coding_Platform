import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Draft } from "../models/draft.model.js";

const getDraft = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { problemId } = req.params;
  const { language } = req.query;

  if (!userId || !problemId || !language)
    throw new ApiError(404, "All fields are required");

  const draft = await Draft.findOne({
    userId: userId,
    problemId: problemId,
    language: language,
  }).lean();

  if (!draft)
    return res.status(200).json(new ApiResponse(200, {}, "No Draft found"));

  return res
    .status(200)
    .json(new ApiResponse(200, draft, "Draft Fetched Successfully"));
});

const addDraft = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { problemId } = req.params;
  const { language } = req.query;
  const { code } = req.body;

  if (!userId || !problemId || !language || !code)
    throw new ApiError(400, "All fields are required");

  const draft = await Draft.findOneAndUpdate(
    {
      userId,
      problemId,
      language,
    },
    { code },
    { upsert: true, new: true },
  );

  if (!draft) {
    throw new ApiError(400, "Error occured while updating draft");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, draft, "Draft updated Successfully"));
});

const deleteDraft = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { problemId } = req.params;
  const { language } = req.query;

  if (!userId || !problemId || !language)
    throw new ApiError(400, "All fields are required");

  const deletedDraft = await Draft.findOneAndDelete({
    userId,
    problemId,
    language,
  });

  if (!deletedDraft) throw new ApiError(404, "Draft Not Found");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Draft deleted Successfully"));
});

export { getDraft, addDraft, deleteDraft };
s;
