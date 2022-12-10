import categoriesRouter from "./routes/categoriesRouter.js";
import customersRouter from "./routes/customersRouter.js";
import gamesRouter from "./routes/gamesRouter.js";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// instance of express
const app = express();

// configs
app.use(cors());
app.use(express.json());
app.use(categoriesRouter);
app.use(customersRouter);
app.use(gamesRouter);
dotenv.config();

// starts the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});
