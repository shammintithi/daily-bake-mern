export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">

      {/* Text */}
      <div className="flex-1">
        <h2 className="text-5xl font-bold leading-tight">
          Freshly Baked <span className="text-amber-600">Happiness</span> Every Day 🍰
        </h2>

        <p className="mt-6 text-gray-600 text-lg">
          Discover artisan breads, cakes, pastries baked with love and delivered fresh to your door.
        </p>

        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600">
            Order Now
          </button>
          <button className="px-6 py-3 border border-amber-500 text-amber-600 rounded-xl">
            View Menu
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="flex-1">
        <img
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff"
          className="rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
}