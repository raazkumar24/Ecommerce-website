import express from "express";
import { registerUser, loginUser, updateProfile } from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/cloudinaryUpload.js";
import updateAvatar from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, updateProfile);
router.put("/avatar", protect, upload.single("avatar"), updateAvatar);

export default router;
