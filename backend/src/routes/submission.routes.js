import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.middleware.js";
import {
  submitCode,
  testExecutor,
} from "../controllers/submission.controller.js";
const router = Router();

router.post("/test-executer", testExecutor);
router.post("/:problemId", verifyJwt, submitCode);

export default router;
