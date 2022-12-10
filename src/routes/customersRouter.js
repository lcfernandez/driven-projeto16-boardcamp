import { getCustomers } from "../controllers/customersController.js";

import { validateCustomer } from "../middlewares/customerSchemaValidationMiddleware.js";

import { Router } from "express";

const router = Router();

router.get("/customers", getCustomers);
router.post("/customers", validateCustomer);

export default router;
