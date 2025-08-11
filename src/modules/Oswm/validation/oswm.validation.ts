import Joi from 'joi';

export const shipperRegisterSchema = Joi.object({
 name: Joi.string().min(6).required().messages({
    'string.min': 'Nmae must be at least 3 characters long',
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email address',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required',
  }),
  phone: Joi.number().required().messages({
    'string.empty': 'Phone cannot be empty',
    'any.required': 'Phone is required',
  }),
  cityId: Joi.number().max(2).required().messages({
    'number.min': 'cityId must be at least 1 and 2 characters long',
    'number.empty': 'cityId cannot be empty',
    'number.required': 'cityId is required',
  }),
});

export const multiShipperRegisterSchema = Joi.array().items(
  Joi.object({
    name: Joi.string().min(3).required().messages({
      'string.min': 'Name must be at least 3 characters long',
      'string.empty': 'Name cannot be empty',
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email address',
      'string.empty': 'Email cannot be empty',
      'any.required': 'Email is required',
    }),
    phone: Joi.string().required().messages({
      'string.empty': 'Phone cannot be empty',
      'any.required': 'Phone is required',
    }),
    cityId: Joi.number().integer().required().messages({
      'number.base': 'cityId must be a number',
      'any.required': 'cityId is required',
    }),
  })
);

