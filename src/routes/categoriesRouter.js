import { getCategories, postCategories } from "../controllers/categoriesController.js";

import { validateCategory } from "../middlewares/categorySchemaValidationMiddleware.js";

import { Router } from "express";

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", validateCategory, postCategories);

export default router;
