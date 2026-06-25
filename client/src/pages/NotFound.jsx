import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">

      <h1 className="text-7xl font-bold text-amber-500">
        404
      </h1>

      <h2 className="text-3xl font-bold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-500 mt-2">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 bg-amber-500 text-white px-6 py-3 rounded-xl"
      >
        Back To Home
      </Link>

    </div>
  );
}