import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-bakery-creamLight via-white to-bakery-cream/20">
      {/* Decorative Orbs */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-bakery-cream rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-bakery-terracotta/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-16">
        {/* Hero Info Text */}
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-bakery-cream text-bakery-terracotta text-sm font-bold tracking-wider uppercase mb-6 shadow-sm border border-white/40">
            ✨ Handcrafted Daily With Love
          </span>

          <h1 className="text-5xl md:text-7xl font-black font-serif text-bakery-burgundy leading-tight">
            Artisan Baking,
            <span className="block mt-1 bg-gradient-to-r from-bakery-terracotta via-bakery-burgundy to-bakery-sage bg-clip-text text-transparent italic font-normal">
              Fresh Daily
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
            Indulge in our exquisite collection of freshly baked sourdoughs, premium pastries, decadent custom cakes, and classic cookies. Baked daily by master pastry chefs.
          </p>

          {/* Action buttons */}
          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
            <Link
              to="/products"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-bakery-burgundy to-bakery-terracotta text-white font-bold shadow-xl shadow-bakery-burgundy/10 hover:shadow-bakery-burgundy/20 hover:scale-[1.03] transition duration-300 text-sm uppercase tracking-wider"
            >
              Order Online Now
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 rounded-2xl border-2 border-bakery-burgundy text-bakery-burgundy hover:bg-bakery-burgundy hover:text-white font-bold transition duration-300 text-sm uppercase tracking-wider"
            >
              Our Heritage Story
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="flex gap-10 mt-14 justify-center lg:justify-start border-t border-bakery-cream/40 pt-8">
            <div>
              <h3 className="text-3xl font-extrabold text-bakery-burgundy">1,200+</h3>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Happy Foodies</p>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-bakery-burgundy">48+</h3>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Signature Items</p>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-bakery-burgundy">4.9 ★</h3>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Rating</p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
          <div className="absolute inset-0 bg-bakery-cream rounded-3xl rotate-3 scale-95 opacity-50"></div>
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000"
            alt="Artisan Sourdough Loaf"
            className="relative z-10 w-full h-[320px] md:h-[450px] object-cover rounded-3xl shadow-2xl hover:scale-[1.02] transition duration-500 border border-white/20"
          />
        </div>
      </div>
    </section>
  );
}