import dotenv from "dotenv";
import pkg from "pg";

// config
dotenv.config();
pkg.types.setTypeParser(1082, str => str); // 1082 for date type; prevent JS date conversion

// database connection
const { Pool } = pkg;

export const connection = new Pool({
    connectionString: process.env.DATABASE_URL
});
