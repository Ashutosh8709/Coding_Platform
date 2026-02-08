import { Queue } from "bullmq";

export const judgeQueue = new Queue("judgeQueue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

judgeQueue.on("failed", (job, err) => {
  console.log("QUEUE: Job failed", job?.id, err.message);
});
