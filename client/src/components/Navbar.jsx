import { Link, useNavigate } from "react-router-dom";
import {
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

import { useAuth } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

import {
  FaShoppingCart,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const navigate = useNavigate();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Logout
  const handleLogout = () => {
    logout();

    setProfileOpen(false);
    setMenuOpen(false);

    navigate("/");
  };

  const isAdmin =
    user?.user?.isAdmin ||
    user?.isAdmin;

  const userName =
    user?.user?.name ||
    user?.name ||
    "User";

  return (
    <nav className="glass-nav">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2"
        >
          <span className="text-3xl group-hover:rotate-12 transition duration-500">
            🥐
          </span>

          <h1 className="text-2xl md:text-3xl font-extrabold font-serif bg-gradient-to-r from-bakery-burgundy via-bakery-terracotta to-bakery-sage bg-clip-text text-transparent tracking-tight">
            Daily Bake
          </h1>
        </Link>


        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-gray-700">

          <Link
            to="/"
            className="relative py-2 text-sm uppercase tracking-wider hover:text-bakery-terracotta transition-colors group"
          >
            Home

            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-bakery-terracotta transition-all duration-300 group-hover:w-full"></span>
          </Link>


          <Link
            to="/products"
            className="relative py-2 text-sm uppercase tracking-wider hover:text-bakery-terracotta transition-colors group"
          >
            Menu

            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-bakery-terracotta transition-all duration-300 group-hover:w-full"></span>
          </Link>


          <Link
            to="/about"
            className="relative py-2 text-sm uppercase tracking-wider hover:text-bakery-terracotta transition-colors group"
          >
            About

            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-bakery-terracotta transition-all duration-300 group-hover:w-full"></span>
          </Link>


          <Link
            to="/contact"
            className="relative py-2 text-sm uppercase tracking-wider hover:text-bakery-terracotta transition-colors group"
          >
            Contact

            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-bakery-terracotta transition-all duration-300 group-hover:w-full"></span>
          </Link>

        </div>


        {/* Right Action Buttons */}
        <div className="flex items-center gap-4">

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2.5 rounded-full bg-bakery-cream/30 hover:bg-bakery-cream/70 text-bakery-burgundy transition shadow-sm flex items-center justify-center"
          >
            <FaShoppingCart className="text-xl" />

            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-bakery-terracotta text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow">
                {cart.reduce(
                  (sum, item) =>
                    sum + item.quantity,
                  0
                )}
              </span>
            )}
          </Link>


          {/* User Account */}
          {user ? (

            <div
              ref={profileRef}
              className="relative"
            >

              {/* Account Button */}
              <button
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
                className="flex items-center gap-2 py-1 px-3 rounded-full hover:bg-bakery-cream/30 transition border border-transparent hover:border-bakery-cream/40"
              >

                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-bakery-burgundy to-bakery-terracotta text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {userName
                    .charAt(0)
                    .toUpperCase()}
                </div>


                {/* Name */}
                <span className="hidden sm:inline font-semibold text-gray-700 text-sm max-w-[120px] truncate">
                  {userName}
                </span>


                {/* Arrow */}
                <FaChevronDown
                  className={`text-gray-500 text-xs transition-transform duration-300 ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>


              {/* Profile Dropdown */}
              {profileOpen && (

                <div className="absolute top-12 right-0 w-52 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-bakery-cream/40 overflow-hidden z-50 animate-fadeIn">

                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-bakery-cream/20 bg-bakery-creamLight">

                    <p className="text-xs text-gray-500">
                      Signed in as
                    </p>

                    <p className="text-sm font-bold text-bakery-burgundy truncate">
                      {userName}
                    </p>

                  </div>


                  {/* Profile */}
                  <Link
                    to="/profile"
                    onClick={() =>
                      setProfileOpen(false)
                    }
                    className="flex items-center gap-2.5 px-4 py-3 hover:bg-bakery-cream/20 text-gray-700 hover:text-bakery-burgundy transition text-sm font-medium"
                  >
                    👤 My Profile
                  </Link>


                  {/* Orders */}
                  <Link
                    to="/my-orders"
                    onClick={() =>
                      setProfileOpen(false)
                    }
                    className="flex items-center gap-2.5 px-4 py-3 hover:bg-bakery-cream/20 text-gray-700 hover:text-bakery-burgundy transition text-sm font-medium"
                  >
                    📦 My Orders
                  </Link>


                  {/* Admin */}
                  {isAdmin && (

                    <Link
                      to="/admin"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="flex items-center gap-2.5 px-4 py-3 hover:bg-bakery-cream/20 text-bakery-sage hover:text-bakery-burgundy transition text-sm font-bold border-t border-bakery-cream/20"
                    >
                      👑 Admin Dashboard
                    </Link>

                  )}


                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-3 hover:bg-red-50 text-red-600 hover:text-red-700 text-left transition text-sm font-medium border-t border-bakery-cream/10"
                  >
                    🚪 Logout
                  </button>

                </div>

              )}

            </div>

          ) : (

            /* Login / Sign Up */
            <div className="hidden md:flex items-center gap-3">

              <Link
                to="/login"
                className="px-4 py-2 font-semibold text-gray-700 hover:text-bakery-terracotta transition text-sm"
              >
                Login
              </Link>


              <Link
                to="/register"
                className="px-5 py-2.5 rounded-full text-white font-bold bg-gradient-to-r from-bakery-burgundy to-bakery-terracotta shadow-md hover:shadow-lg transition duration-300 hover:scale-[1.03] text-sm"
              >
                Sign Up
              </Link>

            </div>

          )}


          {/* Mobile Menu Button */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="md:hidden p-2 rounded-full hover:bg-bakery-cream/30 text-bakery-burgundy transition"
          >
            {menuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>

        </div>

      </div>


      {/* Mobile Drawer Menu */}
      {menuOpen && (

        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-bakery-cream/20 shadow-xl py-4 px-6 space-y-4 animate-slideDown">

          <div className="flex flex-col gap-4 font-semibold">

            <Link
              to="/"
              onClick={() =>
                setMenuOpen(false)
              }
              className="text-gray-700 hover:text-bakery-terracotta transition text-sm uppercase py-1 border-b border-bakery-cream/10"
            >
              Home
            </Link>


            <Link
              to="/products"
              onClick={() =>
                setMenuOpen(false)
              }
              className="text-gray-700 hover:text-bakery-terracotta transition text-sm uppercase py-1 border-b border-bakery-cream/10"
            >
              Menu
            </Link>


            <Link
              to="/about"
              onClick={() =>
                setMenuOpen(false)
              }
              className="text-gray-700 hover:text-bakery-terracotta transition text-sm uppercase py-1 border-b border-bakery-cream/10"
            >
              About
            </Link>


            <Link
              to="/contact"
              onClick={() =>
                setMenuOpen(false)
              }
              className="text-gray-700 hover:text-bakery-terracotta transition text-sm uppercase py-1 border-b border-bakery-cream/10"
            >
              Contact
            </Link>


            {user ? (

              <div className="pt-2 space-y-3">

                {/* Mobile User Info */}
                <div className="flex items-center gap-3 py-2 px-1">

                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-bakery-burgundy to-bakery-terracotta text-white flex items-center justify-center font-bold text-lg shadow">
                    {userName
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>

                    <p className="text-sm font-bold text-bakery-burgundy">
                      {userName}
                    </p>

                    <p className="text-xs text-gray-500">
                      Logged In
                    </p>

                  </div>

                </div>


                {/* Mobile Profile */}
                <Link
                  to="/profile"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="block text-gray-700 hover:text-bakery-terracotta text-sm py-1"
                >
                  👤 My Profile
                </Link>


                {/* Mobile Orders */}
                <Link
                  to="/my-orders"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="block text-gray-700 hover:text-bakery-terracotta text-sm py-1"
                >
                  📦 My Orders
                </Link>


                {/* Mobile Admin */}
                {isAdmin && (

                  <Link
                    to="/admin"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className="block text-bakery-sage hover:text-bakery-burgundy text-sm font-bold py-1"
                  >
                    👑 Admin Dashboard
                  </Link>

                )}


                {/* Mobile Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full text-center py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition text-sm font-bold mt-2"
                >
                  Logout
                </button>

              </div>

            ) : (

              <div className="flex flex-col gap-2 pt-2">

                <Link
                  to="/login"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="w-full text-center py-2.5 rounded-xl border border-bakery-creamDark text-gray-700 font-semibold hover:bg-bakery-creamLight transition text-sm"
                >
                  Login
                </Link>


                <Link
                  to="/register"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="w-full text-center py-2.5 rounded-xl text-white font-bold bg-gradient-to-r from-bakery-burgundy to-bakery-terracotta shadow transition text-sm"
                >
                  Sign Up
                </Link>

              </div>

            )}

          </div>

        </div>

      )}

    </nav>
  );
}