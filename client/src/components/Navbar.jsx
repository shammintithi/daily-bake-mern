import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-amber-600">
          🍞 Daily Bake
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium">
          <li className="hover:text-amber-600 cursor-pointer">Home</li>
          <li className="hover:text-amber-600 cursor-pointer">Menu</li>
          <li className="hover:text-amber-600 cursor-pointer">About</li>
          <li className="hover:text-amber-600 cursor-pointer">Contact</li>
        </ul>

        {/* Actions */}
        <div className="hidden md:flex gap-4">
          <button className="px-4 py-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600">
            Login
          </button>
          <button className="px-4 py-2 rounded-xl border border-amber-500 text-amber-600 hover:bg-amber-50">
            Cart
          </button>
        </div>

        {/* Mobile Menu */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 space-y-2">
          <p>Home</p>
          <p>Menu</p>
          <p>About</p>
          <p>Contact</p>
        </div>
      )}
    </nav>
  );
}