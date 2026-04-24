import { Joi, Segments } from "celebrate";
import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

const curDate = new Date();

export const taskValidationSchema = {
    [Segments.BODY]: Joi.object({
        name: Joi.string().min(1).max(96).required(),
        date: Joi.string().format('YYYY-MM-DD').min(curDate),
        isDone: Joi.boolean().default(false),
    }),
};