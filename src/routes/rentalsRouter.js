import { getRentals, postRentals } from "../controllers/rentalsController.js";
import { validateRent } from "../middlewares/rentSchemaValidationMiddleware.js";

import { Router } from "express";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", validateRent, postRentals);

export default router;
