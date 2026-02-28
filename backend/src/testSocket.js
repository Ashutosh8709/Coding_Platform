import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

socket.on("connect", () => {
  console.log("Connected");

  socket.emit("joinRoom", "6986ca8af790e72d6f8122ce");
});

// 🔥 LIVE TESTCASE STREAM
socket.on("testcaseUpdate", (data) => {
  console.log("LIVE TESTCASE:", data);
});

// 🔥 FINAL RESULT
socket.on("submissionResult", (data) => {
  console.log("FINAL RESULT:", data);
});
