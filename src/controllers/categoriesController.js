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

export async function postCategories(req, res) {
    try {
        const category = await connection.query("SELECT * FROM categories WHERE name = $1;", [req.body.name]);

        if (category.rowCount !== 0) {
            return res.sendStatus(409);
        }

        await connection.query("INSERT INTO categories (name) VALUES ($1);", [req.body.name]);

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
