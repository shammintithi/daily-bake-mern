import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2"
        >
          <span className="text-3xl group-hover:rotate-12 transition duration-500">
            🍞
          </span>

          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Daily Bake
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-gray-700">

          <Link to="/" className="relative group">
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to="/products" className="relative group">
            Menu
            <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to="/about" className="relative group">
            About
            <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link to="/contact" className="relative group">
            Contact
            <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          <Link
            to="/cart"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-amber-50 hover:text-amber-600 transition"
          >
            🛒 Cart

            {cart.length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className="hidden md:block px-4 py-2 font-medium hover:text-amber-600 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="hidden md:block relative overflow-hidden px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 shadow-lg hover:scale-105 transition duration-300"
          >
            Sign Up
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">

          <div className="flex flex-col gap-4 p-5 font-medium">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
            >
              Menu
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
            >
              🛒 Cart ({cart.length})
            </Link>

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="bg-amber-500 text-white text-center py-3 rounded-xl"
            >
              Sign Up
            </Link>

          </div>

        </div>
      )}

    </nav>
  );
}