import joi from "joi";

export const createDepositSchema = joi.object({
    accountNumber: joi.string().required(),
    amount: joi.number().required().min(500)
});