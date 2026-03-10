import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Reply } from "../models/reply.model.js";
import { Discussion } from "../models/discussion.model.js";
import mongoose from "mongoose";

const addReply = asyncHandler(async (req, res) => {
  // get discussionId from req.params
  // get user Id from req.user
  // get content from req.body

  try {
    const userId = req.user?._id;
    const { discussionId } = req.params;
    const { content } = req.body;

    if (!userId || !discussionId || !content)
      throw new ApiError(404, "All Fields are required");

    let reply = await Reply.create({
      discussionId,
      userId,
      content,
    });

    if (!reply) throw new ApiError(400, "Error while adding reply");

    await Discussion.findByIdAndUpdate(discussionId, {
      $inc: { replyCount: 1 },
    });

    reply = reply.toObject();
    reply.username = req.user?.name;

    return res
      .status(200)
      .json(new ApiResponse(200, reply, "Reply added successfully"));
  } catch (error) {
    console.log(error);
  }
});

const updateReply = asyncHandler(async (req, res) => {
  // get replyId from req.params
  // get content from req.body;

  const userId = req.user?._id;
  const { replyId } = req.params;
  const { content } = req.body;

  if (!replyId || !content) throw new ApiError(404, "All fields Are required");

  const reply = await Reply.findById(replyId);

  if (reply?.userId.toString() !== userId.toString())
    throw new ApiError(401, "Unauthorized Access");

  reply.content = content;

  await reply.save();

  return res
    .status(200)
    .json(new ApiResponse(200, reply, "Reply Updated Successfully"));
});

const deleteReply = asyncHandler(async (req, res) => {
  // get replyId from req.params;
  // match user ids and delete

  try {
    const { replyId } = req.params;
    const reply = await Reply.findById(replyId);
    const userId = req.user?._id;

    if (!reply) throw new ApiError(404, "Reply not found");

    if (reply.userId.toString() !== userId.toString())
      throw new ApiError(403, "Unauthorized");

    await Reply.findByIdAndDelete(replyId);

    await Discussion.findByIdAndUpdate(reply.discussionId, {
      $inc: { replyCount: -1 },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Reply deleted Successfully"));
  } catch (error) {
    console.log(error);
  }
});

const getReply = asyncHandler(async (req, res) => {
  // get discusssionId from req.params
  // get replies for the discussion id with username

  try {
    const { discussionId } = req.params;

    if (!discussionId) throw new ApiError(404, "DiscussionId is required");

    const replies = await Reply.aggregate([
      {
        $match: {
          discussionId: new mongoose.Types.ObjectId(discussionId),
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
        $unwind: "$user",
      },
      {
        $project: {
          content: 1,
          createdAt: 1,
          username: "$user.name",
        },
      },
      {
        $sort: { createdAt: 1 },
      },
    ]);

    if (!replies || !replies.length) {
      return res.status(200).json(new ApiResponse(200, [], "No Replies Found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, replies, "All Replies fetched Successfully"));
  } catch (error) {
    console.log(error);
  }
});

export { addReply, updateReply, deleteReply, getReply };
