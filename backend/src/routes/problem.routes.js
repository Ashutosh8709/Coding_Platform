import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.middleware.js";
import { verifyAdmin } from "../middleware/verifyAdmin.middleware.js";
import {
  addProblem,
  getProblemById,
  getAllProblem,
} from "../controllers/problem.controller.js";

const router = Router();

router.get("/", getAllProblem);
router.get("/:problemId", getProblemById);
router.post("/addProblem", verifyJwt, verifyAdmin, addProblem);

export default router;
