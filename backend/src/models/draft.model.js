import mongoose, { Schema } from "mongoose";

const draftSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    problemId: {
      type: Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

draftSchema.index({ userId: 1, problemId: 1, language: 1 }, { unique: true });

export const Draft = mongoose.model("Draft", draftSchema);
