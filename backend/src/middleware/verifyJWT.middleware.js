import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  // get access token from cookies
  // verify token
  // find user and set user to req.user
  const token = req.cookies?.accessToken;
  if (!token) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken?._id).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new ApiError(404, "Invalid Access Token");
  }

  req.user = user;
  next();
});
