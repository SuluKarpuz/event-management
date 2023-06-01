import Joi from "joi";

export const eventValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.base": "Event name must be a string",
    "string.empty": "Event name is required",
  }),
  date: Joi.date().iso().required().messages({
    "date.base": "Event date must be a valid date",
    "date.empty": "Event date is required",
    "date.format": "Invalid date format. Use YYYY-MM-DD",
  }),
  description: Joi.string().trim().min(10).required().messages({
    "string.base": "Event description must be a string",
    "string.empty": "Event description is required",
    "string.min": "Event description should have at least {#limit} words",
  }),
  location: Joi.string().trim().required().messages({
    "string.base": "Event location must be a string",
    "string.empty": "Event location is required",
  }),
});
