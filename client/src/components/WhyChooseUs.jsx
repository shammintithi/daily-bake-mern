export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f"
              alt="Bakery"
              className="rounded-3xl shadow-xl h-[500px] w-full object-cover"
            />
          </div>

          {/* Content */}
          <div>

            <span className="inline-block px-4 py-2 bg-white text-amber-600 rounded-full text-sm font-medium shadow">
              Why Daily Bake
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mt-5 text-gray-800">
              Freshly Baked With
              <span className="text-amber-500"> Love & Quality</span>
            </h2>

            <p className="mt-5 text-gray-600 leading-relaxed">
              At Daily Bake, every loaf, pastry, and cake is crafted
              using carefully selected ingredients and traditional
              baking techniques to deliver unforgettable flavors.
            </p>

            <div className="mt-8 space-y-5">

              <div className="flex items-start gap-4">
                <div className="text-3xl">🥖</div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Fresh Every Morning
                  </h3>
                  <p className="text-gray-500">
                    Baked fresh daily for the best taste and quality.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-3xl">🌿</div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Premium Ingredients
                  </h3>
                  <p className="text-gray-500">
                    Only high-quality ingredients go into our products.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-3xl">🚚</div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Fast Delivery
                  </h3>
                  <p className="text-gray-500">
                    Fresh bakery products delivered quickly to you.
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