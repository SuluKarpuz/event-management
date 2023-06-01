import Joi from "joi";

export const userValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email address",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password should have at least {#limit} characters",
  }),
});
