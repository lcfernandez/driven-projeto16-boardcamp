import { categorySchema } from "../schemas/categorySchema.js";

export function validateCategory(req, res, next) {
    const category = req.body;
    const { error } = categorySchema.validate(category);

    if (error) {
        return res.status(400).send(error);
    }

    next();
}
