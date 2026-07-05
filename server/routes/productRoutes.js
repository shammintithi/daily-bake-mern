import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

// GET All Products
router.get("/", getProducts);

// GET Single Product
router.get("/:id", getProductById);

// POST Create New Product
router.post("/", createProduct);

// PUT Update Product
router.put("/:id", updateProduct);

// DELETE Product
router.delete("/:id", deleteProduct);

export default router;