import { connection } from "../database/database.js";

export async function getCategories(req, res) {
    try {
        const categories = await connection.query("SELECT * FROM categories;");
        res.send(categories.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function postCategories(req, res) {
    const { name } = req.body;

    try {
        const category = await connection.query("SELECT name FROM categories WHERE LOWER(name) = LOWER($1);", [name]);

        if (category.rowCount !== 0) {
            return res.sendStatus(409);
        }

        await connection.query("INSERT INTO categories (name) VALUES ($1);", [name]);

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
