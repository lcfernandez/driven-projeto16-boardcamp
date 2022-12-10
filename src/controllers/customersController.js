import { connection } from "../database/database.js";

export async function getCustomers(req, res) {
    try {
        const customers = await connection.query("SELECT * FROM customers;");
        res.send(customers.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
