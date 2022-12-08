import { getCategories } from "../controllers/categoriesController.js";

import { Router } from "express";

const router = Router();

router.get("/categories", getCategories);

export default router;
