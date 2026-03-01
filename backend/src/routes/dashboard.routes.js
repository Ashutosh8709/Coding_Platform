import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJWT.middleware.js";
import { getDashBoard } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/", verifyJwt, getDashBoard);
export default router;
