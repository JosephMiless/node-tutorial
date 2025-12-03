import joi from 'joi';

export const createAccountScherma = joi.object({
    accountType: joi.string().required(),
    currency: joi.string()
});