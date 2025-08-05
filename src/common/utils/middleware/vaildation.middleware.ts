import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true
    });

    if (error) {
        res.status(400).json({
            message: 'Validation failed',
            errors: error.details.map(detail => ({
                field: detail.context?.label || detail.path.join('.'),
                message: detail.message.replace(/['"]/g, '')
            }))
        });
        return; 
    }

    req.body = value;
    next(); 
};