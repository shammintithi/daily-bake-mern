import express from "express";

import {
  registerUser,
  loginUser,
  updateProfile,
  updatePassword,
  updateAddress,
} from "../controllers/authController.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// REGISTER
router.post(
  "/register",
  registerUser
);

// LOGIN
router.post(
  "/login",
  loginUser
);

// GET PROFILE
router.get(
  "/profile",
  protect,
  (req, res) => {
    res.json(req.user);
  }
);

// UPDATE PROFILE
router.put(
  "/profile",
  protect,
  updateProfile
);

// UPDATE PASSWORD
router.put(
  "/password",
  protect,
  updatePassword
);

// UPDATE ADDRESS
router.put(
  "/address",
  protect,
  updateAddress
);

// ADMIN ROUTE
router.get(
  "/admin",
  protect,
  admin,
  (req, res) => {
    res.json({
      message: "Welcome Admin 👑",
    });
  }
);

export default router;
