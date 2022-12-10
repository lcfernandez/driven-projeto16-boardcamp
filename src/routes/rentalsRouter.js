import { postRentals } from "../controllers/rentalsController.js";
import { validateRent } from "../middlewares/rentSchemaValidationMiddleware.js";

import { Router } from "express";

const router = Router();

router.post("/rentals", validateRent, postRentals);

export default router;
