import Joi from "joi";

export const eventValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Event name is required",
  }),
  date: Joi.string().isoDate().required().messages({
    "string.empty": "Event date is required",
    "string.isoDate": "Invalid date format. Use YYYY-MM-DD",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Event description is required",
  }),
  location: Joi.string().required().messages({
    "string.empty": "Event location is required",
  }),
});
