import { connection } from "../database/database.js";

export async function getGames(req, res) {
    const { name } = req.query;

    try {
        const games = connection.query(`SELECT * FROM games ${name && `WHERE name LIKE '%${name}'`};`);
        res.send(games.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
