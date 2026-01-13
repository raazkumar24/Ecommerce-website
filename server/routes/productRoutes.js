import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import  protect  from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import admin from "../middlewares/adminMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

// ADMIN
router.post("/", protect, admin, upload.array("images", 10), createProduct);
router.put("/:id", protect, admin, upload.array("images", 10), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
