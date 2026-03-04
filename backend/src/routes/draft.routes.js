import { Router } from "express";
import {
  getDraft,
  addDraft,
  deleteDraft,
} from "../controllers/draft.controller.js";
import { verifyJwt } from "../middleware/verifyJWT.middleware.js";

const router = Router();

router.get("/:problemId", verifyJwt, getDraft);
router.post("/:problemId", verifyJwt, addDraft);
router.delete("/:problemId", verifyJwt, deleteDraft);

export default router;
