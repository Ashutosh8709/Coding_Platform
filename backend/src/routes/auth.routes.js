import { Router } from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";
import {
  registerUserValidation,
  loginUserValidation,
} from "../middleware/validators/auth.validation.js";

import { verifyJwt } from "../middleware/verifyJWT.middleware.js";
const router = Router();

router.post("/signup", registerUserValidation, signupUser);
router.post("/login", loginUserValidation, loginUser);
router.post("/logout", verifyJwt, logoutUser);

export default router;
