import joi from 'joi';

export const transferSchema = joi.object({
    sourceAccount: joi.string().required(),
    destinationAccount: joi.string().required(),
    note: joi.string(),
    amount: joi.number().required().min(10),
    pin:joi.string().required().min(4).max(4)
});