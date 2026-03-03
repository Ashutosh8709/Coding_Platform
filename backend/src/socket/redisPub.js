import Redis from "ioredis";

export const redisPublisher = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

export const redisSubscriber = new Redis({
  host: "127.0.0.1",
  port: 6379,
});
