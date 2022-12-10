import { connection } from "../database/database.js";

export async function getCustomers(req, res) {
    const { cpf } = req.query;

    try {
        const customers = await connection.query(
            `SELECT * FROM customers
            ${cpf ? "WHERE cpf LIKE $1||'%'" : ""}
            ;`,
            cpf ? [cpf] : ""
        );
        res.send(customers.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
