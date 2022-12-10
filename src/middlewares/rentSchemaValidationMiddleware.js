import { rentSchema } from "../schemas/rentSchema.js";

export function validateRent(req, res, next) {
    const rent = req.body;
    const { error } = rentSchema.validate(rent, { abortEarly: false });

    if (error) {
        return res.status(400).send(
            error.details.map(detail => detail.message)
        );
    }

    next();
}
