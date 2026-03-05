import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.middleware.js";
import {
  addReply,
  deleteReply,
  getReply,
} from "../controllers/Reply.controller.js";

const router = Router();

router.post("/add/:discussionId", verifyJwt, addReply);
router.get("/:discussionId", verifyJwt, getReply);
router.delete("/delete/:replyId", verifyJwt, deleteReply);

export default router;
