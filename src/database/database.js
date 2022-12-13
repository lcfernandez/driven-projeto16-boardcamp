import dotenv from "dotenv";
import pkg from "pg";

// config
dotenv.config();

// database connection
const { Pool } = pkg;

export const connectionDB = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});
