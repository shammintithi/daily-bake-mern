import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 px-6">

      {/* Big 404 */}
      <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
        404
      </h1>

      <p className="text-2xl font-semibold mt-4 text-gray-700">
        Oops! Page Not Found
      </p>

      <p className="text-gray-500 mt-2 text-center max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Animation dot */}
      <div className="flex gap-2 mt-6">
        <span className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-150"></span>
        <span className="w-3 h-3 bg-red-400 rounded-full animate-bounce delay-300"></span>
      </div>

      {/* Button */}
      <Link
        to="/"
        className="mt-10 px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg hover:scale-105 transition"
      >
        Go Back Home 🏠
      </Link>

    </div>
  );
}