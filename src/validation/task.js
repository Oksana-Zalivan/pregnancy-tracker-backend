import { Joi, Segments } from 'celebrate';

export const createTaskValidationSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(1).max(96).required().messages({
      'string.empty': 'Назва завдання є обовʼязковою',
      'any.required': 'Назва завдання є обовʼязковою',
      'string.min': 'Назва завдання має містити мінімум 1 символ',
      'string.max': 'Назва завдання не може бути довшою за 96 символів',
    }),

    date: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required()
      .messages({
        'string.empty': 'Дата є обовʼязковою',
        'any.required': 'Дата є обовʼязковою',
        'string.pattern.base': 'Некоректний формат дати (YYYY-MM-DD)',
      }),
  }),
};

export const updateTaskStatusValidationSchema = {
  [Segments.BODY]: Joi.object({
    isDone: Joi.boolean().required().messages({
      'boolean.base': 'Статус завдання має бути true або false',
      'any.required': 'Статус завдання є обовʼязковим',
    }),
  }),
};
