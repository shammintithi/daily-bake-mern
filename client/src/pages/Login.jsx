import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineArrowRight,
} from "react-icons/hi";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(formData);

      // Save user info & token
      login(data);

      toast.success("Welcome back! 🎉");

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ─── Left: decorative panel ─── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-bakery-burgundy via-bakery-burgundy/95 to-bakery-terracotta items-center justify-center overflow-hidden">
        {/* Floating circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-bakery-terracotta/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse" />

        <div className="relative z-10 max-w-md text-center px-8">
          {/* Logo / Brand area */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
            <span className="text-5xl">🍞</span>
          </div>
          <h2 className="text-4xl font-serif text-white leading-tight">
            Fresh from <br />
            <span className="text-bakery-cream">the Oven</span>
          </h2>
          <p className="mt-4 text-bakery-cream/70 text-sm leading-relaxed">
            Handcrafted breads, pastries, and desserts — baked daily with love
            and the finest ingredients.
          </p>

          {/* Testimonial-style badge */}
          <div className="mt-10 mx-auto max-w-xs bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5">
            <div className="flex gap-1 text-amber-300 text-sm mb-2 justify-center">
              {"★★★★★"}
            </div>
            <p className="text-white/80 text-xs italic leading-relaxed">
              "The best bakery I've ever ordered from. Every item arrives fresh
              and absolutely delicious."
            </p>
            <p className="mt-2 text-bakery-cream/60 text-xs font-medium">
              — Happy Customer
            </p>
          </div>
        </div>
      </div>

      {/* ─── Right: login form ─── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-bakery-creamLight px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="lg:hidden text-center mb-8">
            <span className="text-4xl">🍞</span>
            <h1 className="text-2xl font-serif text-bakery-burgundy mt-2">
              The Daily Bake
            </h1>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-serif text-bakery-burgundy">
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Sign in to your Daily Bake account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-bakery-creamDark bg-white focus:outline-none focus:ring-2 focus:ring-bakery-terracotta/40 focus:border-bakery-terracotta transition-all text-sm"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-bakery-creamDark bg-white focus:outline-none focus:ring-2 focus:ring-bakery-terracotta/40 focus:border-bakery-terracotta transition-all text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-bakery-terracotta transition-colors"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="w-5 h-5" />
                  ) : (
                    <HiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-bakery-creamDark text-bakery-terracotta focus:ring-bakery-terracotta/40 accent-bakery-terracotta"
                />
                <span className="text-gray-500 group-hover:text-gray-700 transition-colors">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-bakery-terracotta hover:text-bakery-burgundy font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full py-3.5 rounded-xl bg-gradient-to-r from-bakery-burgundy to-bakery-terracotta text-white font-semibold tracking-wide shadow-lg shadow-bakery-burgundy/20 hover:shadow-xl hover:shadow-bakery-burgundy/30 hover:scale-[1.01] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Signing in…
                </span>
              ) : (
                <>
                  Sign In
                  <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-bakery-creamDark/60" />
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              or
            </span>
            <div className="flex-1 h-px bg-bakery-creamDark/60" />
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-bakery-burgundy font-semibold hover:text-bakery-terracotta transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}