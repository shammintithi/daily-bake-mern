export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-bakery-creamLight">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Decorative image border */}
          <div className="relative">
            <div className="absolute inset-0 bg-bakery-terracotta rounded-[2.5rem] rotate-3 scale-95 opacity-20"></div>
            <img
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1000"
              alt="Artisan Baker Kneading Dough"
              className="relative z-10 rounded-[2rem] shadow-2xl h-[450px] w-full object-cover border border-white/20"
            />
          </div>

          {/* Core values content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-white text-bakery-terracotta rounded-full text-xs font-bold shadow-sm uppercase tracking-wider border border-bakery-cream/30">
              Why Daily Bake
            </span>

            <h2 className="text-4xl md:text-5xl font-black font-serif text-bakery-burgundy mt-6">
              Crafted With Traditional
              <span className="block mt-1 font-serif text-bakery-terracotta italic font-normal">
                Slow-Ferment & Love
              </span>
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed text-base font-sans">
              We stand apart by honoring the traditional art of baking. Our bakers use centuries-old fermenting techniques, natural wild yeasts, and locally-sourced stoneground flours.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-bakery-cream/30 flex-shrink-0">
                  🥖
                </div>
                <div>
                  <h3 className="font-bold text-lg text-bakery-burgundy font-serif">
                    Baked Fresh Every Dawn
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Our ovens are heated at 3:00 AM daily, ensuring that when your order arrives, it retains that crisp, bakery-fresh crust.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-bakery-cream/30 flex-shrink-0">
                  🌿
                </div>
                <div>
                  <h3 className="font-bold text-lg text-bakery-burgundy font-serif">
                    100% Organic & Raw Ingredients
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    We partner directly with organic farms for raw milk, rich grass-fed butter, farm eggs, and stone-milled whole grains.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-bakery-cream/30 flex-shrink-0">
                  🚚
                </div>
                <div>
                  <h3 className="font-bold text-lg text-bakery-burgundy font-serif">
                    Eco-Friendly Thermal Delivery
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Delivered in sealed, reusable thermal bags so that pastries arrive flakey and warm at your doorstep.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}