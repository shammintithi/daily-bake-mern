import { Link } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/authService";

export default function Register() {

  const [showPassword, setShowPassword] = useState(false);

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


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (formData.password !== formData.confirmPassword) {
      alert("Password does not match");
      return;
    }


    try {

      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });


      console.log(response);

      alert("Registration Successful");


    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 px-6">


      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8">


        <div className="text-center mb-8">

          <h1 className="text-4xl font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            Create Account
          </h1>


          <p className="text-gray-500 mt-2">
            Join Daily Bake today
          </p>

        </div>



        <form 
          onSubmit={handleSubmit}
          className="space-y-5"
        >


          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400"
          />



          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400"
          />



          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400"
            />


            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>


          </div>



          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-400"
          />



          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold"
          >
            Create Account
          </button>



        </form>



        <p className="text-center mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-amber-600 font-semibold"
          >
            Login
          </Link>

        </p>


      </div>


    </div>
  );
}