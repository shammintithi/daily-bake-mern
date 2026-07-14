import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";


export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

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

    try {
      const data = await loginUser(formData);

      // Save user info & token
      login(data);

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 px-6">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to your Daily Bake account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-3 text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>
          </div>

          <div className="flex justify-between items-center text-sm">

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember Me
            </label>

            <button
              type="button"
              className="text-amber-600 hover:underline"
            >
              Forgot Password?
            </button>

          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:scale-[1.02] transition"
          >
            Login
          </button>

        </form>

        <div className="mt-6">

          <button
            className="w-full py-3 border rounded-xl font-medium hover:bg-gray-50 transition"
          >
            Continue with Google
          </button>

        </div>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-amber-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}