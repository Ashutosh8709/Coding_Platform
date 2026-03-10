import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.middleware.js";
import {
  addReply,
  deleteReply,
  getReply,
  updateReply,
} from "../controllers/Reply.controller.js";

const router = Router();

router.post("/add/:discussionId", verifyJwt, addReply);
router.get("/:discussionId", verifyJwt, getReply);
router.delete("/delete/:replyId", verifyJwt, deleteReply);
router.put("/update/:replyId", verifyJwt, updateReply);

export default router;
