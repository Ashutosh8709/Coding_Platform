import mongoose, { Schema } from "mongoose";

const submissionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemId: {
      type: Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: "Cpp",
    },
    verdict: {
      type: String,
      required: true,
    },
    executionTime: {
      type: Number,
    },
  },
  { timestamps: true },
);

export const Submission = mongoose.model("Submission", submissionSchema);
