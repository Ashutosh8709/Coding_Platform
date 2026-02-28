import { ApiError } from "../utils/ApiError.js";

export const verifyAdmin = (req, res, next) => {
  const role = req.user?.role;
  if (role === "admin") {
    return next();
  }
  throw new ApiError(400, "Forbidden Access");
};
