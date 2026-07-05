import express from "express";

import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// User Profile (Protected)
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// Admin Route (Protected + Admin)
router.get("/admin", protect, admin, (req, res) => {
  res.json({
    message: "Welcome Admin 👑",
  });
});

export default router;