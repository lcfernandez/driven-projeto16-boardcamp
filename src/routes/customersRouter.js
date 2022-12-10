import { getCustomers, postCustomers } from "../controllers/customersController.js";

import { validateCustomer } from "../middlewares/customerSchemaValidationMiddleware.js";

import { Router } from "express";

const router = Router();

router.get("/customers", getCustomers);
router.post("/customers", validateCustomer, postCustomers);

export default router;
