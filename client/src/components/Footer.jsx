import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-gradient-to-br from-gray-950 via-[#180e0c] to-[#120705] text-white overflow-hidden border-t-4 border-bakery-terracotta">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-bakery-burgundy/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-bakery-terracotta/10 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Mission */}
          <div>
            <h2 className="text-3xl font-black font-serif bg-gradient-to-r from-bakery-cream to-bakery-terracotta bg-clip-text text-transparent group flex items-center gap-2">
              <span>🥐</span> Daily Bake
            </h2>

            <p className="mt-5 text-gray-400 leading-7 text-sm font-sans">
              Crafting high-end, artisan pastries, cakes, and rustic breads using 100% premium, organic ingredients. Freshly baked with passion and love, delivered straight to your door.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-bakery-terracotta hover:scale-110 transition duration-300 shadow-lg text-sm border border-white/10"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 hover:scale-110 transition duration-300 shadow-lg text-sm border border-white/10"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-sky-500 hover:scale-110 transition duration-300 shadow-lg text-sm border border-white/10"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 hover:scale-110 transition duration-300 shadow-lg text-sm border border-white/10"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Nav links */}
          <div className="md:pl-8">
            <h3 className="text-lg font-bold font-serif text-bakery-cream mb-5 tracking-wide">
              Explore Menu
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  to="/"
                  className="hover:text-bakery-terracotta transition hover:translate-x-1 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-bakery-terracotta transition hover:translate-x-1 inline-block"
                >
                  Our Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-bakery-terracotta transition hover:translate-x-1 inline-block"
                >
                  About Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-bakery-terracotta transition hover:translate-x-1 inline-block"
                >
                  Get In Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-bold font-serif text-bakery-cream mb-5 tracking-wide">
              Store Hours
            </h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Monday - Friday</span>
                <span className="font-semibold text-bakery-terracotta">08:00 AM - 08:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Saturday</span>
                <span className="font-semibold text-bakery-terracotta">09:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-semibold text-bakery-sage">09:00 AM - 06:00 PM</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-bold font-serif text-bakery-cream mb-5 tracking-wide">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <FaMapMarkerAlt className="text-bakery-terracotta mt-1 text-base flex-shrink-0" />
                <span>123 Bakery Lane, Banani Road 11, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-bakery-terracotta text-sm flex-shrink-0" />
                <span>+880 1712 345678</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-bakery-terracotta text-sm flex-shrink-0" />
                <span className="hover:text-bakery-terracotta transition cursor-pointer">
                  hello@dailybake.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Daily Bake. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs flex items-center gap-1">
            Crafted with ❤️ for premium bread & cake lovers
          </p>
        </div>
      </div>
    </footer>
  );
}