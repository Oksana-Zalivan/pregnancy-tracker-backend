import { Joi, Segments } from "celebrate";
import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

const curDate = new Date();

export const createTaskValidationSchema = {
    [Segments.BODY]: Joi.object({
        name: Joi.string().min(1).max(96).required().messages({
            "string.empty": "Назва є обовʼязковою",
            "any.required": "Назва є обовʼязковою",
            "string.min": "Назва має містити щонайменше 1 символ",
            "string.max": "Назва не може бути довшою за 96 символів",
        }),
        date: Joi.date().format('YYYY-MM-DD').min(curDate).messages({
            "string.format": "Некорректний формат дати",
            "string.min": "Дата не може бути раніше сьогоднішньої",
        }),
        isDone: Joi.boolean().default(false),
    }),
};