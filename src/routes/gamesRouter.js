import { getGames, postGames } from "../controllers/gamesController.js";

import { validateGame } from "../middlewares/gameSchemaValidationMiddleware.js";

import { Router } from "express";

const router = Router();

router.get("/games", getGames);
router.post("/games", validateGame, postGames);

export default router;
