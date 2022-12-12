import Joi from "joi";

export const gameSchema = Joi.object(
    {
        categoryId: Joi.number().integer().strict().min(1).required(),
        image: Joi.string().uri().required(),
        name: Joi.string().min(1).trim().required(),
        pricePerDay: Joi.number().integer().min(1).required(),
        stockTotal: Joi.number().integer().min(1).required()
    }
);
