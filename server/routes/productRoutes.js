import express from "express";

import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

// GET All Products
router.get("/", getProducts);

// GET Single Product
router.get("/:id", getProductById);

export default router;