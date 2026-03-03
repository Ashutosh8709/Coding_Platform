import { Queue } from "bullmq";

export const submitQueue = new Queue("submitQueue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

submitQueue.on("failed", (job, err) => {
  console.log("QUEUE: Job failed", job?.id, err.message);
});
