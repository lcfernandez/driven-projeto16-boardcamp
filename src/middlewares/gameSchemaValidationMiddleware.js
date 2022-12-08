import { gameSchema } from "../schemas/gameSchema.js";

export function validateGame(req, res, next) {
    const game = req.body;
    const { error } = gameSchema.validate(game, { abortEarly: false });

    if (error) {
        return res.status(400).send(
            error.details.map(detail => detail.message)
        );
    }

    next();
}
