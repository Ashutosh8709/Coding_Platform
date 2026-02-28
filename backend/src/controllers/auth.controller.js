import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  // get User
  // generate access token from method in model
  // generate refresh token from method in model

  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating Access and Refresh Tokens",
    );
  }
};

const loginUser = asyncHandler(async (req, res) => {
  // get userData from frontend
  // validation is done in middleware
  // check if user exists
  // check if password matches
  // genetate token and send cookies

  const { email, password } = req.body;

  if (!email || !password) throw new ApiError(400, "All fields are required");

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User Not Exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Wrong Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user?._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -createdAt -updatedAt",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User LoggedIn Successfully"));
});

const signupUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validate details which is done in joi middleware
  // check if user exists
  // create user
  // check user ceated or not
  // return res

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const createdUser = user.toObject();
  delete createdUser.password;

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered Successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  // take user from req.user
  // clear refreshtoken from db
  // clear cookies and return

  await User.findByIdAndUpdate(req.user?._id, {
    $unset: {
      refreshToken: 1,
    },
  });

  const Option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", Option)
    .clearCookie("refreshToken", Option)
    .json(new ApiResponse(200, {}, "User LoggedOut Successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  // take currentPassword and newPassword from frontend
  // take userId from req.user and search user
  // match currentPassword
  // put newPassword

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword)
    throw new ApiError(400, "All fields are required");

  const userId = req.user?._id;

  const user = await User.findById(userId);

  const isCorrectPassword = await user.isPasswordCorrect(currentPassword);
  if (!isCorrectPassword) throw new ApiError(401, "Wrong Password");

  user.password = newPassword;
  user.refreshToken = undefined;

  user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed Successfully"));
});

const forgotPassword = asyncHandler(async (req, res) => {
  // get email, newPassword from frontend
  // find user with email and update password(need to verify email(future work))
  // save user and ask to login

  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }

  user.password = newPassword;
  user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Updated Successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  if (req.user) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, req.user, "Current user fetched successfully"),
      );
  }
  throw new ApiError(404, "User not Logged In");
});

export {
  loginUser,
  signupUser,
  logoutUser,
  changeCurrentPassword,
  forgotPassword,
  getCurrentUser,
};
