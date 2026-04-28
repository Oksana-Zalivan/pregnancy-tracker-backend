import { Joi } from "celebrate";

export const createDiarySchema = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    emotions: Joi.array().items(Joi.string()).min(1).max(12).required(),
  }),
};