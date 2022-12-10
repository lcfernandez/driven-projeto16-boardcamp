import { getCustomer, getCustomers, postCustomers, putCustomers } from "../controllers/customersController.js";

import { validateCustomer } from "../middlewares/customerSchemaValidationMiddleware.js";

import { Router } from "express";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomer);
router.post("/customers", validateCustomer, postCustomers);
router.put("/customers/:id", validateCustomer, putCustomers)

export default router;
