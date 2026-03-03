import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.middleware.js";
import {
  runcode,
  submitCode,
  testExecutor,
  getSubmissionById,
  getUserSubmission,
  getUserSubmissionByProblem,
} from "../controllers/submission.controller.js";
const router = Router();

router.post("/test-executer", testExecutor);
router.get("/", verifyJwt, getUserSubmission);
router.get("/:problemId", verifyJwt, getUserSubmissionByProblem);
router.get("/:submissionId", verifyJwt, getSubmissionById);
router.post("/run/:problemId", verifyJwt, runcode);
router.post("/:problemId", verifyJwt, submitCode);

export default router;
