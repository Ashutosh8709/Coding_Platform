import mongoose, { Schema } from "mongoose";

const testCaseSchema = new Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
});

const visibleTestCaseSchema = new Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
  },
});

const hiddenTestCaseSchema = new Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
});

const problemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    inputFormat: {
      type: [String],
      required: true,
    },
    outputFormat: {
      type: [String],
      required: true,
    },
    constraints: {
      type: [String],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    visibleTestCase: [visibleTestCaseSchema],
    testCases: [testCaseSchema],
    hiddenTestCases: [hiddenTestCaseSchema],
    execution: {
      functionName: {
        type: String,
        required: true,
      },

      starterCode: {
        cpp: String,
        python: String,
        javascript: String,
        java: String,
      },

      driverCode: {
        cpp: String,
        python: String,
        javascript: String,
        java: String,
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Problem = mongoose.model("Problem", problemSchema);
