import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Submission } from "../models/submission.model.js";

const getDashBoard = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) throw new ApiError(404, "User Id not Found");
  let data;
  try {
    data = await Submission.aggregate([
      { $match: { userId: userId } },
      {
        $facet: {
          solved: [
            { $match: { verdict: "ACCEPTED" } },
            { $group: { _id: "$problemId" } },
            { $count: "count" },
          ],
          attempted: [
            { $match: { verdict: { $ne: "ACCEPTED" } } },
            { $group: { _id: "$problemId" } },
            { $count: "count" },
          ],
          difficultyStatus: [
            { $match: { verdict: "ACCEPTED" } },
            {
              $lookup: {
                from: "problems",
                localField: "problemId",
                foreignField: "_id",
                as: "problem",
              },
            },
            {
              $unwind: "$problem",
            },
            { $group: { _id: "$problem.difficulty", count: { $sum: 1 } } },
          ],
          recent: [
            { $sort: { createdAt: -1 } },
            { $limit: 10 },
            {
              $lookup: {
                from: "problems",
                localField: "problemId",
                foreignField: "_id",
                as: "problem",
              },
            },
            {
              $unwind: "$problem",
            },
            {
              $project: {
                verdict: 1,
                createdAt: 1,
                problemTitle: "$problem.title",
                problemDifficulty: "$problem.difficulty",
              },
            },
          ],
          submissionDates: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
              },
            },
          ],
          heatMapData: [
            {
              $match: {
                createdAt: {
                  $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                },
              },
            },
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);
  } catch (error) {
    console.log(error);
  }

  if (!data || data.length == 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No Submissions Made Yet"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Dashboard data fetched Successfully"));
});

export { getDashBoard };
