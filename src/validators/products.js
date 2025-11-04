import joi from 'joi';

export const addProdcutsSchema = joi.object({
    name: joi.string().required(),
    id: joi.number().required(),
    price: joi.number().required(),
    category: joi.string().required()
});