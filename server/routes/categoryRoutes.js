import express from "express";
import {
  createCategory,
  getAllCategories,
  deleteCategory,
} from "../controllers/categoryController.js";

import protect from "../middlewares/authMiddleware.js";
import admin from "../middlewares/adminMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getAllCategories);

// ADMIN
router.post("/", protect, admin, createCategory);
router.delete("/:id", protect, admin, deleteCategory);

export default router;
