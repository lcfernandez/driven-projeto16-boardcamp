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

export async function postCustomers(req, res) {
    try {
        const customer = await connection.query(
            "SELECT cpf FROM customers WHERE cpf = $1;",
            [req.body.cpf]
        );

        if (customer.rowCount !== 0) {
            res.sendStatus(409);
        } else {
            await connection.query(
                `INSERT INTO customers (name, phone, cpf, birthday)
                VALUES ($1, $2, $3, $4);`,
                [req.body.name, req.body.phone, req.body.cpf, req.body.birthday]
            );

            res.sendStatus(201);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
