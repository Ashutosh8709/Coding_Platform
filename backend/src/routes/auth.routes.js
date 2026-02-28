import { Router } from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  forgotPassword,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import {
  registerUserValidation,
  loginUserValidation,
  changePasswordValidation,
  forgotPasswordValidation,
} from "../middleware/validators/auth.validation.js";

import { verifyJwt } from "../middleware/verifyJWT.middleware.js";
const router = Router();

router.post("/signup", registerUserValidation, signupUser);
router.post("/login", loginUserValidation, loginUser);
router.post(
  "/changePassword",
  changePasswordValidation,
  verifyJwt,
  changeCurrentPassword,
);

router.post("/forgotPassword", forgotPasswordValidation, forgotPassword);

router.get("/", verifyJwt, getCurrentUser);
router.post("/logout", verifyJwt, logoutUser);

export default router;
