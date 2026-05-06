import { Joi, Segments } from 'celebrate';

export const createDiarySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(64).required().messages({
      'string.empty': 'Заголовок є обовʼязковим',
      'any.required': 'Заголовок є обовʼязковим',
      'string.min': 'Заголовок має містити мінімум 1 символ',
      'string.max': 'Заголовок не може бути довшим за 64 символи',
    }),

    description: Joi.string().min(1).max(1000).required().messages({
      'string.empty': 'Текст запису є обовʼязковим',
      'any.required': 'Текст запису є обовʼязковим',
      'string.min': 'Текст запису має містити мінімум 1 символ',
      'string.max': 'Текст запису не може бути довшим за 1000 символів',
    }),

    emotions: Joi.array()
      .items(Joi.string().hex().length(24))
      .min(1)
      .max(12)
      .required()
      .messages({
        'array.min': 'Оберіть хоча б одну емоцію',
        'array.max': 'Можна обрати не більше 12 емоцій',
        'any.required': 'Емоції є обовʼязковими',
      }),
  }),
};
