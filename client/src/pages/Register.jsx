import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/authService";
import toast from "react-hot-toast";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
} from "react-icons/hi";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* Password strength indicator */
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { label: "", color: "", width: "0%" };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { label: "Weak", color: "bg-red-400", width: "20%" };
    if (score <= 2)
      return { label: "Fair", color: "bg-amber-400", width: "40%" };
    if (score <= 3)
      return { label: "Good", color: "bg-yellow-400", width: "60%" };
    if (score <= 4)
      return { label: "Strong", color: "bg-bakery-sage", width: "80%" };
    return { label: "Excellent", color: "bg-green-500", width: "100%" };
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Account created! Please sign in 🎉");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ─── Left: decorative panel ─── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-bakery-terracotta via-bakery-burgundy to-bakery-burgundy items-center justify-center overflow-hidden">
        {/* Floating circles */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute top-10 left-10 w-96 h-96 bg-bakery-terracotta/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse" />

        <div className="relative z-10 max-w-md text-center px-8">
          {/* Logo */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
            <span className="text-5xl">🧁</span>
          </div>
          <h2 className="text-4xl font-serif text-white leading-tight">
            Start Your <br />
            <span className="text-bakery-cream">Baking Journey</span>
          </h2>
          <p className="mt-4 text-bakery-cream/70 text-sm leading-relaxed">
            Create an account to order artisan baked goods, track your deliveries, and discover new flavors every week.
          </p>

          {/* Benefits */}
          <div className="mt-10 space-y-3 text-left mx-auto max-w-xs">
            {[
              "Exclusive member-only deals",
              "Order tracking & history",
              "Save your favorite items",
            ].map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3"
              >
                <HiOutlineShieldCheck className="w-5 h-5 text-bakery-cream flex-shrink-0" />
                <span className="text-white/80 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Right: register form ─── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-bakery-creamLight px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="lg:hidden text-center mb-8">
            <span className="text-4xl">🧁</span>
            <h1 className="text-2xl font-serif text-bakery-burgundy mt-2">
              The Daily Bake
            </h1>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-serif text-bakery-burgundy">
              Create Account
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Join The Daily Bake and enjoy fresh goodness
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-bakery-creamDark bg-white focus:outline-none focus:ring-2 focus:ring-bakery-terracotta/40 focus:border-bakery-terracotta transition-all text-sm"
                  required
                />
              </div>
            </div>

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
                  placeholder="Min. 6 characters"
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
              {/* Strength meter */}
              {formData.password && (
                <div className="mt-2">
                  <div className="h-1.5 w-full bg-bakery-cream rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strength.color} rounded-full transition-all duration-500`}
                      style={{ width: strength.width }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Strength:{" "}
                    <span className="font-medium text-gray-600">
                      {strength.label}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all text-sm ${
                    formData.confirmPassword &&
                    formData.confirmPassword !== formData.password
                      ? "border-red-300 focus:ring-red-300/40 focus:border-red-400"
                      : "border-bakery-creamDark focus:ring-bakery-terracotta/40 focus:border-bakery-terracotta"
                  }`}
                  required
                />
              </div>
              {formData.confirmPassword &&
                formData.confirmPassword !== formData.password && (
                  <p className="text-xs text-red-500 mt-1">
                    Passwords do not match
                  </p>
                )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full py-3.5 rounded-xl bg-gradient-to-r from-bakery-burgundy to-bakery-terracotta text-white font-semibold tracking-wide shadow-lg shadow-bakery-burgundy/20 hover:shadow-xl hover:shadow-bakery-burgundy/30 hover:scale-[1.01] transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
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
                  Creating account…
                </span>
              ) : (
                <>
                  Create Account
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

          {/* Login link */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-bakery-burgundy font-semibold hover:text-bakery-terracotta transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}