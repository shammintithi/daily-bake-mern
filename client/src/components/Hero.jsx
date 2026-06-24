export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50"></div>

      {/* Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">

        {/* Text */}
        <div className="flex-1">
          <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-medium mb-5">
            Freshly Baked Daily ✨
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Freshly Baked
            <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Happiness
            </span>
            Every Day 🍰
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Discover artisan breads, premium cakes and delicious pastries baked with love and delivered fresh to your doorstep.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg hover:scale-105 transition duration-300">
              Order Now
            </button>

            <button className="px-8 py-4 rounded-2xl border-2 border-amber-500 text-amber-600 font-semibold hover:bg-amber-50 transition">
              View Menu
            </button>
          </div>

          <div className="flex gap-8 mt-10">
            <div>
              <h3 className="text-3xl font-bold text-amber-600">
                500+
              </h3>
              <p className="text-gray-500">
                Happy Customers
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-amber-600">
                50+
              </h3>
              <p className="text-gray-500">
                Bakery Items
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-amber-600">
                4.9★
              </h3>
              <p className="text-gray-500">
                Customer Rating
              </p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff"
            alt="Fresh Bakery"
            className="rounded-3xl shadow-2xl hover:scale-105 transition duration-500"
          />
        </div>

      </div>
    </section>
  );
}