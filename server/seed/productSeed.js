import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";

dotenv.config();

await connectDB();

const products = [
  {
    name: "Chocolate Cake",
    category: "Cake",
    price: 25,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  },
  {
    name: "Croissant",
    category: "Pastry",
    price: 5,
    image: "https://images.unsplash.com/photo-1555507036-ab794f4ade6a",
  },
  {
    name: "Baguette",
    category: "Bread",
    price: 3,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
  },
  {
    name: "Blueberry Muffin",
    category: "Muffin",
    price: 4,
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa",
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("✅ Products Imported Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();