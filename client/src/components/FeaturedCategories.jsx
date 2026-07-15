import { Link } from "react-router-dom";

export default function FeaturedCategories() {
  const categories = [
    {
      name: "Cakes",
      emoji: "🎂",
      desc: "Delicate custom creations",
      bgClass: "from-amber-50 to-orange-100/30",
    },
    {
      name: "Pastries",
      emoji: "🥐",
      desc: "Crispy, buttery laminates",
      bgClass: "from-orange-50 to-amber-100/30",
    },
    {
      name: "Cookies",
      emoji: "🍪",
      desc: "Warm & chewy bites",
      bgClass: "from-yellow-50 to-amber-100/20",
    },
    {
      name: "Bread",
      emoji: "🍞",
      desc: "Rustic slow-ferment sourdough",
      bgClass: "from-stone-50 to-bakery-cream/30",
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-bakery-cream text-bakery-terracotta text-xs font-bold tracking-widest uppercase mb-3">
            Handcrafted Categories
          </span>
          <h2 className="text-4xl md:text-5xl font-black font-serif text-bakery-burgundy">
            Browse Our Baking Specialties
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            Choose from our daily-baked categories to find your perfect craving.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((item, index) => (
            <Link
              key={index}
              to={`/products?category=${item.name.toLowerCase()}`}
              className="group"
            >
              <div
                className={`
                  rounded-3xl
                  p-8
                  text-center
                  bg-gradient-to-br
                  ${item.bgClass}
                  border border-bakery-cream/20
                  group-hover:border-bakery-terracotta/30
                  group-hover:shadow-xl
                  group-hover:shadow-bakery-cream/40
                  group-hover:-translate-y-1.5
                  transition-all
                  duration-300
                  cursor-pointer
                  h-full
                  flex
                  flex-col
                  justify-between
                `}
              >
                <div>
                  <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                    {item.emoji}
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-bakery-burgundy mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.desc}
                  </p>
                </div>
                
                <span className="inline-block mt-6 text-xs font-bold text-bakery-terracotta group-hover:underline">
                  View Category →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}