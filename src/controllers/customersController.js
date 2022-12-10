import { connection } from "../database/database.js";

export async function getCustomer(req, res) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.sendStatus(404);
    }

    try {
        const customer = await connection.query(
            `SELECT * FROM customers
            WHERE id = $1;`,
            [id]
        );

        if (customer.rowCount === 0) {
            res.sendStatus(404);
        } else {
            res.send(customer.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

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

export async function putCustomers(req, res) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.sendStatus(404);
    }

    try {
        const customer = await connection.query(
            `SELECT * FROM customers
            WHERE id = $1;`,
            [id]
        );

        if (customer.rowCount === 0) {
            return res.sendStatus(404);
        }
        
        const cpf = await connection.query(
            `SELECT cpf FROM customers
            WHERE cpf = $1 AND id <> $2;`,
            [req.body.cpf, id]
        );

        if (cpf.rowCount !== 0) {
            res.sendStatus(409);
        } else {
            await connection.query(
                `UPDATE customers
                SET name = $1, phone = $2, cpf = $3, birthday = $4
                WHERE id = $5;`,
                [req.body.name, req.body.phone, req.body.cpf, req.body.birthday, id]
            );

            res.sendStatus(200);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
