import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.middleware.js";
import {
  addDiscuss,
  deleteDiscuss,
  getDiscussProblem,
  updateDiscuss,
} from "../controllers/discuss.controller.js";

const router = Router();

router.post("/add/:type", verifyJwt, addDiscuss);
router.get("/problem/:problemId", verifyJwt, getDiscussProblem);
router.put("/update/:discussionId", verifyJwt, updateDiscuss);
router.delete("/delete/:discussionId", verifyJwt, deleteDiscuss);

export default router;
