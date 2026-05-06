import { Joi, Segments } from 'celebrate';

export const weekNumberSchema = {
  [Segments.PARAMS]: Joi.object({
    weekNumber: Joi.number().integer().min(1).max(40).required().messages({
      'number.base': 'Номер тижня має бути числом',
      'number.integer': 'Номер тижня має бути цілим числом',
      'number.min': 'Номер тижня не може бути меншим за 1',
      'number.max': 'Номер тижня не може бути більшим за 40',
      'any.required': 'Номер тижня є обовʼязковим',
    }),
  }),
};
