import mongoose, { Schema, Types } from "mongoose";

const discussionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["problem", "general"],
      required: true,
    },
    problemId: {
      type: Schema.Types.ObjectId,
      ref: "Problem",
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    replyCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

discussionSchema.index({ problemId: 1, createdAt: 1, votes: 1 });

export const Discussion = mongoose.model("Discussion", discussionSchema);
