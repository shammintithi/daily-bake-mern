export default function Login() {
  return (
    <div className="min-h-[70vh] flex justify-center items-center">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl"
          />

          <button
            className="w-full bg-amber-500 text-white py-3 rounded-xl"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}