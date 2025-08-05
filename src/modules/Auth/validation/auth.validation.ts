import Joi from 'joi';

export const registerSchema = Joi.object({
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
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required',
  }),
 
});

export const loginSchema = Joi.object({
 email: Joi.string().email().required().messages({
    'string.email': 'Invalid email address',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required',
  }),
 });

 export const findEmail = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email address',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required',
    })
 })