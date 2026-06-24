export default function FeaturedCategories() {
  const categories = [
    {
      name: "Cakes",
      emoji: "🎂"
    },
    {
      name: "Pastries",
      emoji: "🥐"
    },
    {
      name: "Cookies",
      emoji: "🍪"
    },
    {
      name: "Bread",
      emoji: "🍞"
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-5xl font-black">
            Browse Categories
          </h2>

          <p className="text-gray-500 mt-3">
            Find your favorite bakery treats.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {categories.map((item, index) => (
            <div
              key={index}
              className="
                group
                rounded-3xl
                p-10
                text-center
                bg-gradient-to-br
                from-amber-100
                to-orange-100
                hover:scale-105
                transition
                duration-300
                cursor-pointer
              "
            >
              <div className="text-7xl mb-5 group-hover:rotate-12 transition">
                {item.emoji}
              </div>

              <h3 className="text-2xl font-bold">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}