import { Server } from "socket.io";
import { redisSubscriber } from "./redisPub.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (userId) => {
      socket.join(userId);
      console.log("User joined room", userId);
    });
  });

  redisSubscriber.subscribe("submissionResult");
  redisSubscriber.subscribe("testcaseUpdate");
  redisSubscriber.subscribe("runResult");

  redisSubscriber.on("message", (channel, message) => {
    const parsed = JSON.parse(message);

    if (channel === "submissionResult") {
      const { userId, result } = parsed;

      io.to(userId).emit("submissionResult", result);
    }

    if (channel === "testcaseUpdate") {
      const { userId, testcaseData } = parsed;

      io.to(userId).emit("testcaseUpdate", testcaseData);
    }

    if (channel === "runResult") {
      const { userId, result } = parsed;
      io.to(userId).emit("runResult", result);
    }
  });
};

export const getIO = () => io;
