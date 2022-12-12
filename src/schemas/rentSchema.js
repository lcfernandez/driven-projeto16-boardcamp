import Joi from "joi";

export const rentSchema = Joi.object(
    {
        customerId: Joi.number().integer().strict().min(1).required(),
        gameId: Joi.number().integer().strict().min(1).required(),
        daysRented: Joi.number().integer().min(1).required()
    }
);
