import Joi from 'joi';
import { RequestValidateSchema } from '../types/request-validate-schema.type';

export const createProductSchema: RequestValidateSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    available: Joi.boolean().required(),
    price: Joi.object().keys({
      value: Joi.number().required(),
      discount: Joi.number().optional(),
    }),
  }),
};
