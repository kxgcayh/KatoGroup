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

export const getProductSchema: RequestValidateSchema = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const updateProductSchema: RequestValidateSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    available: Joi.boolean().required(),
    price: Joi.object().keys({
      value: Joi.number().required(),
      discount: Joi.number().optional(),
    }),
  }),
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const deleteProductSchema: RequestValidateSchema = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};
