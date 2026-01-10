import express from "express";
import {
  addToCart,
  getUserCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";

import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getUserCart);
router.put("/update", protect, updateCartItem);
router.delete("/remove/:productId", protect, removeCartItem);
router.delete("/clear", protect, clearCart);

export default router;
