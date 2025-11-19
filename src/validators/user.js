import joi from 'joi';

export const signupUserSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(8).max(10)
});