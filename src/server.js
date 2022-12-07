import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// instance of express
const app = express();

// configs
app.use(cors());
app.use(express.json());
dotenv.config();

// starts the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});
