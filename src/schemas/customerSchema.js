import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

export const customerSchema = Joi.object(
    {
        name: Joi.string().min(1).trim().required(),
        phone: Joi.string().regex(/^\d+$/).min(10).max(11).required(),
        cpf: Joi.string().regex(/^\d+$/).min(11).max(11).required(),
        birthday: Joi.date().format("YYYY-MM-DD").required()
    }
);
