import { connection } from "../database/database.js";

export async function getGames(req, res) {
    const { name } = req.query;

    try {
        const games = await connection.query(
            `SELECT
                games.*,
                categories.name AS "categoryName"
            FROM games
            JOIN categories ON games."categoryId" = categories.id
            ${name ? "WHERE LOWER(games.name) LIKE $1||'%'" : ""}
            ;`,
            name ? [name] : ""
        );

        res.send(games.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function postGames(req, res) {
    try {
        const category = await connection.query("SELECT id FROM categories WHERE id = $1;", [req.body.categoryId]);

        if (category.rowCount === 0) {
            res.sendStatus(400);
        } else {
            const game = await connection.query("SELECT name FROM games WHERE LOWER(name) = LOWER($1)", [req.body.name]);

            if (game.rowCount !== 0) {
                res.sendStatus(409);
            } else {
                await connection.query(
                    'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);',
                    [req.body.name, req.body.image, req.body.stockTotal, req.body.categoryId, req.body.pricePerDay]
                );

                res.sendStatus(201);
            }
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
