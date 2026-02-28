import { Queue } from "bullmq";

export const runQueue = new Queue("runQueue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});
