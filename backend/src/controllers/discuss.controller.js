import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Discussion } from "../models/discussion.model.js";
import mongoose from "mongoose";

const addDiscuss = asyncHandler(async (req, res) => {
  // get userId from req.user
  // get type from req.params
  // get content, title and if problemId from req.body

  try {
    const userId = req.user?._id;
    const { type } = req.params;
    const { content, title, problemId } = req.body;

    if (!["problem", "general"].includes(type)) {
      throw new ApiError(400, "Invalid discussion type");
    }

    if (type === "problem" && !problemId) {
      throw new ApiError(400, "ProblemId required for problem discussions");
    }

    if (!userId || !content || !title) {
      throw new ApiError(400, "All fields are required");
    }

    const discussion = await Discussion.create({
      type,
      problemId: problemId || null,
      title,
      content,
      userId,
    });

    if (!discussion) {
      throw new ApiError(400, "Error while adding discussion");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, discussion, "Discussion Added Successfully"));
  } catch (error) {
    console.log(error);
  }
});

const getDiscussProblem = asyncHandler(async (req, res) => {
  // get problemId from req.params
  // find discussions of that particular problemId and send them
  try {
    const { problemId } = req.params;

    if (!problemId) throw new ApiError(404, "Problem Id required");

    const discussions = await Discussion.aggregate([
      {
        $match: {
          type: "problem",
          problemId: new mongoose.Types.ObjectId(problemId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: { path: "$user" },
      },
      {
        $addFields: {
          username: "$user.name",
        },
      },
      {
        $project: {
          username: 1,
          problemId: 1,
          title: 1,
          content: 1,
          votes: 1,
          replyCount: 1,
          createdAt: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    if (!discussions || discussions.length == 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, [], "No Discussions found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          discussions,
          "All Discussions fetched Successfully",
        ),
      );
  } catch (error) {
    console.log(error);
  }
});

const getDiscussGeneral = asyncHandler(async (req, res) => {
  // find discussions of type general and send them
  // get username

  try {
    const discussions = await Discussion.aggregate([
      {
        $match: {
          type: "general",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: { path: "$user" },
      },
      {
        $addFields: {
          username: "$user.name",
        },
      },
      {
        $project: {
          username: 1,
          title: 1,
          content: 1,
          votes: 1,
          replyCount: 1,
          createdAt: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    if (!discussions || discussions.length == 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, [], "No Discussions found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          discussions,
          "All Discussions fetched Successfully",
        ),
      );
  } catch (error) {
    console.log(error);
  }
});

const updateDiscuss = asyncHandler(async (req, res) => {
  // get discussionId from req.params
  // get updated title and content from req.body
  try {
    const { discussionId } = req.params;
    const { title, content } = req.body;
    const userId = req.user?._id;

    if (!discussionId || !title || !content) {
      throw new ApiError(404, "All Fields are required");
    }

    const discussion = await Discussion.findById(discussionId);

    if (!discussion) throw new ApiError(404, "Discussion not found");

    if (discussion.userId.toString() !== userId.toString()) {
      throw new ApiError(403, "Unauthorized");
    }

    discussion.title = title;
    discussion.content = content;

    await discussion.save();

    return res
      .status(200)
      .json(new ApiResponse(200, discussion, "Discussion Updated Sucessfully"));
  } catch (error) {
    console.log(error);
  }
});

const deleteDiscuss = asyncHandler(async (req, res) => {
  // get discussionId from req.params
  // find and delete the discussion

  try {
    const { discussionId } = req.params;
    const userId = req.user?._id;
    if (!discussionId) throw new ApiError(400, "DiscussionId is required");

    const discussion = await Discussion.findById(discussionId);

    if (!discussion) throw new ApiError(404, "Discussion not found");

    if (discussion.userId.toString() !== userId.toString()) {
      throw new ApiError(403, "Unauthorized");
    }

    await Discussion.findByIdAndDelete(discussionId);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Discussion Deleted Successfully"));
  } catch (error) {
    console.log(error);
  }
});

export {
  addDiscuss,
  getDiscussProblem,
  updateDiscuss,
  deleteDiscuss,
  getDiscussGeneral,
};
