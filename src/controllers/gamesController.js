import { connectionDB } from "../database/database.js";

export async function getGames(req, res) {
    const { name } = req.query;

    try {
        const games = await connectionDB.query(
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
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        const category = await connectionDB.query("SELECT * FROM categories WHERE id = $1;", [categoryId]);

        if (category.rowCount === 0) {
            return res.sendStatus(400);
        }
        
        const game = await connectionDB.query("SELECT * FROM games WHERE LOWER(name) = LOWER($1)", [name]);

        if (game.rowCount !== 0) {
            return res.sendStatus(409);
        }

        await connectionDB.query(
            'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);',
            [name, image, stockTotal, categoryId, pricePerDay]
        );

        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
