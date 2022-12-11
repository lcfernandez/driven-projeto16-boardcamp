import { connection } from "../database/database.js";

import dayjs from "dayjs";

export async function getRentals(req, res) {
    try {
        const rentals = await connection.query(
            `SELECT
                rentals.*,
                rentals."rentDate"::text,
                JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customer,
                JSON_BUILD_OBJECT(
                    'id', games.id,
                    'name', games.name,
                    'categoryId', games."categoryId",
                    'categoryName', categories.name
                ) AS game
            FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
            JOIN categories ON games."categoryId" = categories.id;`
        );

        res.send(rentals.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function postRentals(req, res) {
    try {
        const { customerId, gameId, daysRented } = req.body;

        const customer = await connection.query(
            `SELECT * FROM customers WHERE id = $1;`,
            [customerId]
        );

        if (customer.rowCount === 0) {
            return res.sendStatus(400);
        }

        const game = await connection.query(
            `SELECT * FROM games WHERE id = $1;`,
            [gameId]
        );

        if (game.rowCount === 0) {
            return res.sendStatus(400);
        }

        const stock = await connection.query(
            `SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;`,
            [gameId]
        );

        if (stock.rowCount === game.rows[0].stockTotal) {
            return res.sendStatus(400);
        }
        
        const rentDate = dayjs().format("YYYY-MM-DD");
        const originalPrice = Number(game.rows[0].pricePerDay) * daysRented;

        await connection.query(
            `INSERT INTO rentals (
                "customerId",
                "gameId",
                "rentDate",
                "daysRented",
                "returnDate",
                "originalPrice",
                "delayFee"
            )
            VALUES ($1, $2, $3, $4, null, $5, null);`,
            [customerId, gameId, rentDate, daysRented, originalPrice]
        );

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
