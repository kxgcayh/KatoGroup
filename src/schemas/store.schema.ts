import Joi from 'joi';
import { RequestValidateSchema } from '../types/request-validate-schema.type';

export const createStoreSchema: RequestValidateSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

export const getStoreSchema: RequestValidateSchema = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const updateStoreSchema: RequestValidateSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const deleteStoreSchema: RequestValidateSchema = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};
