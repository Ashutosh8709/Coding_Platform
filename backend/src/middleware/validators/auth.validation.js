import Joi from "joi";
import { ApiError } from "../../utils/ApiError.js";

const registerUserValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string().min(8).max(100).required(),
    confirmPassword: Joi.ref("password"),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw new ApiError(400, error.message);
  }
  next();
};

const loginUserValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string().min(8).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new ApiError(400, error.message);
  }
  next();
};

const changePasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    currentPassword: Joi.string().min(8).max(100).required(),
    newPassword: Joi.string().min(8).max(100).required(),
    confirmNewPassword: Joi.ref("newPssword"),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new ApiError(400, error.message);
  }
  next();
};

const forgotPasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    newPassword: Joi.string().min(8).max(100).required(),
    confirmNewPassword: Joi.ref("newPssword"),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new ApiError(400, error.message);
  }
  next();
};
export {
  registerUserValidation,
  loginUserValidation,
  changePasswordValidation,
  forgotPasswordValidation,
};
