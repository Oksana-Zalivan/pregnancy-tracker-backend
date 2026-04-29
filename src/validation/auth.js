import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().max(32).required().messages({
      'string.empty': "Ім'я є обов'язковим",
      'any.required': "Ім'я є обов'язковим",
      'string.max': "Ім'я не може бути довшим за 32 символи",
    }),

    email: Joi.string().email().max(64).required().messages({
      'string.empty': 'Email є обовʼязковим',
      'any.required': 'Email є обовʼязковим',
      'string.email': 'Некоректний формат email',
      'string.max': 'Email не може бути довшим за 64 символи',
    }),

    password: Joi.string().min(8).max(128).required().messages({
      'string.empty': 'Пароль є обовʼязковим',
      'any.required': 'Пароль є обовʼязковим',
      'string.min': 'Пароль має містити мінімум 8 символів',
      'string.max': 'Пароль не може бути довшим за 128 символів',
    }),

    gender: Joi.string().valid('boy', 'girl').allow(null),

    dueDate: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .allow(null)
      .custom((value, helpers) => {
        if (!value) return value;

        const inputDate = new Date(value);
        const today = new Date();

        const minDate = new Date();
        minDate.setDate(today.getDate() + 7);

        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 280);

        if (inputDate < minDate || inputDate > maxDate) {
          return helpers.error('date.range');
        }

        return value;
      })
      .messages({
        'string.pattern.base': 'Некоректний формат дати (YYYY-MM-DD)',
        'date.range': 'Дата має бути від +1 тижня до +40 тижнів від сьогодні',
      }),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().max(64).required().messages({
      'string.empty': 'Email є обовʼязковим',
      'any.required': 'Email є обовʼязковим',
      'string.email': 'Некоректний формат email',
      'string.max': 'Email не може бути довшим за 64 символи',
    }),

    password: Joi.string().min(8).max(128).required().messages({
      'string.empty': 'Пароль є обовʼязковим',
      'any.required': 'Пароль є обовʼязковим',
      'string.min': 'Пароль має містити мінімум 8 символів',
      'string.max': 'Пароль не може бути довшим за 128 символів',
    }),
  }),
};

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().max(32).messages({
      'string.max': "Ім'я не може бути довшим за 32 символи",
    }),

    email: Joi.string().email().max(64).messages({
      'string.email': 'Некоректний формат email',
      'string.max': 'Email не може бути довшим за 64 символи',
    }),

    gender: Joi.string().valid('boy', 'girl').allow(null),

    dueDate: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .allow(null)
      .custom((value, helpers) => {
        if (!value) return value;

        const inputDate = new Date(value);
        const today = new Date();

        const minDate = new Date();
        minDate.setDate(today.getDate() + 7);

        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 280);

        if (inputDate < minDate || inputDate > maxDate) {
          return helpers.error('date.range');
        }

        return value;
      })
      .messages({
        'string.pattern.base': 'Некоректний формат дати (YYYY-MM-DD)',
        'date.range': 'Дата має бути від +1 тижня до +40 тижнів від сьогодні',
      }),
  }).min(1),
};
