import {
    getRentals,
    postRentals,
    postRentalsReturn
} from "../controllers/rentalsController.js";
import { validateRent } from "../middlewares/rentSchemaValidationMiddleware.js";

import { Router } from "express";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", validateRent, postRentals);
router.post("/rentals/:id/return", postRentalsReturn);

export default router;
