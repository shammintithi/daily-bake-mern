import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}