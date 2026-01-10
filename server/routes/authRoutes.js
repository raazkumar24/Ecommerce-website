import express from "express";
import { registerUser, loginUser, updateProfile } from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, updateProfile);


export default router;
