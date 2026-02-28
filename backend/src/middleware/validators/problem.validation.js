import Joi from "joi";
import { Schema } from "mongoose";
import { ApiError } from "../../utils/ApiError.js";

export const problemSchemaValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().required(),
    inputFormat: Joi.string().allow(""),
    outputFormat: Joi.string().allow(""),
    constraints: Joi.string().allow(""),
    difficulty: Joi.string().valid("Easy", "Medium", "Hard").required(),
    testCases: Joi.array()
      .items(
        Joi.object({
          input: Joi.string().required(),
          output: Joi.string().required(),
        }),
      )
      .min(1)
      .required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw new ApiError(400, error.message);
  }
  next();
};
