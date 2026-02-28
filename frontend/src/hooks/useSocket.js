import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";

export const useSocket = ({
  onTestcaseUpdate,
  onSubmissionResult,
  onRunResult,
  setSubmitting,
}) => {
  const { user } = useAuth();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user?._id) return;

    const socket = io("http://localhost:8000");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected");
      socket.emit("joinRoom", user._id);
    });
    socket.on("testcaseUpdate", (data) => {
      console.log("LIVE TESTCASE:", data);
      onTestcaseUpdate?.(data);
    });

    socket.on("submissionResult", (data) => {
      console.log("FINAL RESULT:", data);
      onSubmissionResult?.(data);
      setSubmitting(false);
    });

    socket.on("runResult", (data) => {
      console.log("RUN RESULT:", data);
      onRunResult?.(data);
      setSubmitting(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [user?._id]);

  return socketRef.current;
};
