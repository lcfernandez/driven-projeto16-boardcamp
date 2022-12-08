import { getGames } from "../controllers/gamesController.js";

import { Router } from "express";

const router = Router();

router.get("/games", getGames);

export default router;
