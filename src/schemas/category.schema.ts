import Joi from 'joi';
import { RequestValidateSchema } from '../types/request-validate-schema.type';

export const createCategorySchema: RequestValidateSchema = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    store: Joi.string().required(),
  }),
};

export const getCategorySchema: RequestValidateSchema = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const updateCategorySchema: RequestValidateSchema = {
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
  }),
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const deleteCategorySchema: RequestValidateSchema = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};
