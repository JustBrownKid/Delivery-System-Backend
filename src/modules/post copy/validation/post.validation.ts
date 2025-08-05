import Joi from "joi";

export const createPostSchema = Joi.object({
    title: Joi.string().trim().min(3).max(255).required().messages({
        'string.base': 'Title should be a type of text', /* ... */ }),
    description: Joi.string().trim().min(10).required().messages({
        'string.base': 'Description should be a type of text', /* ... */ }),
    userId: Joi.number().integer().positive().required().messages({
        'number.base': 'User ID should be a type of number', /* ... */ })
});

export const updatePostSchema = Joi.object({
    title: Joi.string().trim().min(3).max(255).messages({ /* ... */ }),
    description: Joi.string().trim().min(10).messages({ /* ... */ }),
}).min(1).messages({
    'object.min': 'At least one field (title or description) must be provided for update'
});