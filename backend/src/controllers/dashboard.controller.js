import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Submission } from "../models/submission.model.js";

const getDashBoard = asyncHandler(async (req, res) => {
  try {
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
                $group: {
                  _id: "$problemId",
                },
              },
              {
                $lookup: {
                  from: "problems",
                  localField: "_id",
                  foreignField: "_id",
                  as: "problem",
                },
              },
              {
                $unwind: "$problem",
              },
              {
                $group: {
                  _id: "$problem.difficulty",
                  count: { $sum: 1 },
                },
              },
            ],
            recent: [
              { $sort: { createdAt: -1 } },

              {
                $group: {
                  _id: "$problemId",
                  latestSubmission: { $first: "$$ROOT" },
                },
              },

              {
                $replaceRoot: { newRoot: "$latestSubmission" },
              },

              {
                $lookup: {
                  from: "problems",
                  localField: "problemId",
                  foreignField: "_id",
                  as: "problem",
                },
              },

              { $unwind: "$problem" },

              {
                $project: {
                  verdict: 1,
                  createdAt: 1,
                  problemTitle: "$problem.title",
                  problemDifficulty: "$problem.difficulty",
                },
              },

              { $limit: 10 },
            ],
            submissionDates: [
              {
                $group: {
                  _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                  },
                },
              },
              { $sort: { _id: -1 } },
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
              { $sort: { _id: -1 } },
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

    const dashboard = data[0];
    const response = {
      solved: dashboard.solved[0]?.count || 0,
      attempted: dashboard.attempted[0]?.count || 0,
      difficultyStatus: dashboard.difficultyStatus,
      recent: dashboard.recent,
      submissionDates: dashboard.submissionDates,
      heatMapData: dashboard.heatMapData,
      acceptanceRate:
        (dashboard.solved[0]?.count || 0 / dashboard.attempted[0]?.count || 0) *
        100,
    };

    return res
      .status(200)
      .json(
        new ApiResponse(200, response, "Dashboard data fetched Successfully"),
      );
  } catch (error) {
    console.log(error);
  }
});

export { getDashBoard };
