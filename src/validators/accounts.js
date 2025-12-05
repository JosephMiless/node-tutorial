import joi from 'joi';

export const createAccountScherma = joi.object({
    accountType: joi.string().required(),
    currency: joi.string(),
    pin: joi.string().required().min(4).max(4)
});