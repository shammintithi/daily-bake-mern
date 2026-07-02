import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-500/10 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              🍞 Daily Bake
            </h2>

            <p className="mt-5 text-gray-400 leading-7">
              Freshly baked cakes, pastries, cookies and breads
              made with premium ingredients every day.
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-6">

              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 hover:scale-110 transition duration-300 cursor-pointer">
                📘
              </div>

              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 hover:scale-110 transition duration-300 cursor-pointer">
                📷
              </div>

              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-sky-500 hover:scale-110 transition duration-300 cursor-pointer">
                🐦
              </div>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <Link
                  to="/"
                  className="hover:text-amber-400 transition hover:translate-x-1 inline-block"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="hover:text-amber-400 transition hover:translate-x-1 inline-block"
                >
                  Menu
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-amber-400 transition hover:translate-x-1 inline-block"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-amber-400 transition hover:translate-x-1 inline-block"
                >
                  Contact
                </Link>
              </li>

            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-bold mb-5">
              Opening Hours
            </h3>

            <div className="space-y-3 text-gray-400">

              <p>
                🕗 Mon - Fri
                <br />
                8:00 AM - 8:00 PM
              </p>

              <p>
                🕘 Sat - Sun
                <br />
                9:00 AM - 10:00 PM
              </p>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-5">
              Contact Us
            </h3>

            <div className="space-y-3 text-gray-400">

              <p>
                📍 Dhaka, Bangladesh
              </p>

              <p>
                📞 +880 1234 567890
              </p>

              <p>
                ✉️ hello@dailybake.com
              </p>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">
            © 2026 Daily Bake. All Rights Reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Crafted with ❤️ and Freshly Baked Ideas
          </p>

        </div>

      </div>
    </footer>
  );
}