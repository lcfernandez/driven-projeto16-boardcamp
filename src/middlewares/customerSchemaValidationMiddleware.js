import { customerSchema } from "../schemas/customerSchema.js";

export function validateCustomer(req, res, next) {
    const customer = req.body;
    const { error } = customerSchema.validate(customer, { abortEarly: false });

    if (error) {
        return res.status(400).send(
            error.details.map(detail => detail.message)
        );
    }

    next();
}
