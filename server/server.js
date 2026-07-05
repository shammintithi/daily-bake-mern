import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

// Connect Database
connectDB();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🍞 Daily Bake Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});