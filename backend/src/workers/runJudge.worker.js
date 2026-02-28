import dotenv from "dotenv";
dotenv.config();

import { Worker } from "bullmq";
import { redisPublisher } from "../socket/redisPub.js";
import { Problem } from "../models/problem.model.js";
import { judgeRun } from "../services/judgeRun.service.js";
import connectDB from "../config/db.js";

await connectDB();

new Worker(
  "runQueue",
  async (job) => {
    try {
      const { problemId, code, userId } = job.data;

      const problem = await Problem.findById(problemId);

      const result = await judgeRun(problem, code, async (testcaseData) => {
        await redisPublisher.publish(
          "testcaseUpdate",
          JSON.stringify({
            userId,
            testcaseData,
          }),
        );
      });

      await redisPublisher.publish(
        "runResult",
        JSON.stringify({
          userId,
          result,
        }),
      );
    } catch (error) {
      console.error("RUN WORKER ERROR: ", error);
    }
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);
