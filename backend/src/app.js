import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import healthRouter from "./routes/health.routes.js";
import userRouter from "./routes/auth.routes.js";
import problemRouter from "./routes/problem.routes.js";
import submissionRouter from "./routes/submission.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import draftRouter from "./routes/draft.routes.js";
import discussionRouter from "./routes/discuss.routes.js";
import replyRouter from "./routes/reply.routes.js";

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/problem", problemRouter);
app.use("/api/v1/submit", submissionRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/draft", draftRouter);
app.use("/api/v1/discuss", discussionRouter);
app.use("/api/v1/reply", replyRouter);

app.use(errorHandler);
export { app };
