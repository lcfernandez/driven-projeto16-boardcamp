import { connection } from "../database/database.js";

export async function getCategories(req, res) {
    try {
        const categories = await connection.query("SELECT * FROM categories;")
        res.send(categories.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
