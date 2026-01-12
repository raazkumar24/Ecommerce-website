import express from "express";
import protect from "../middlewares/authMiddleware.js";
import admin from "../middlewares/adminMiddleware.js";
import { cleanupOrphanImages } from "../utils/cleanupImages.js";

const router = express.Router();

router.post("/cleanup-images", protect, admin, async (req, res) => {
  await cleanupOrphanImages();
  res.json({ message: "Image cleanup completed" });
});

export default router;
