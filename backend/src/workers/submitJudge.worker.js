import dotenv from "dotenv";
dotenv.config();

import { Worker } from "bullmq";
import { judgeSubmission } from "../services/judgeSubmit.service.js";
import { Submission } from "../models/submission.model.js";
import connectDB from "../config/db.js";
import { redisPublisher } from "../socket/redisPub.js";
import { ApiError } from "../utils/ApiError.js";

await connectDB();

new Worker(
  "submitQueue",
  async (job) => {
    try {
      const { submissionId } = job.data;

      const submission = await Submission.findById(submissionId);

      if (!submission) throw new ApiError(400, "No submission found");

      const result = await judgeSubmission(
        submission.problemId,
        submission.code,
        async (testcaseData) => {
          await redisPublisher.publish(
            "testcaseUpdate",
            JSON.stringify({
              userId: submission.userId.toString(),
              testcaseData,
            }),
          );
        },
      );

      submission.verdict = result.verdict;

      await submission.save();

      await redisPublisher.publish(
        "submissionResult",
        JSON.stringify({
          userId: submission.userId.toString(),
          result,
        }),
      );
    } catch (err) {
      console.error("WORKER ERROR:", err);
    }
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);
