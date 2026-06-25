import Hero from "../components/Hero";
import FeaturedCategories from "../components/FeaturedCategories";
import WhyChooseUs from "../components/WhyChooseUs";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <>
      <Hero />

      <FeaturedCategories />

      {/* Customer Favorites */}
      <section className="py-24 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-medium">
              Best Sellers
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-5">
              Customer Favorites 🍰
            </h2>

            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Freshly baked treats loved by our customers every day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <ProductCard
              id="1"
              name="Chocolate Cake"
              category="cakes"
              price="12"
              image="https://images.unsplash.com/photo-1578985545062-69928b1d9587"
            />

            <ProductCard
              id="2"
              name="Butter Croissant"
              category="pastries"
              price="5"
              image="https://images.unsplash.com/photo-1555507036-ab1f4038808a"
            />

            <ProductCard
              id="3"
              name="Blueberry Muffin"
              category="bread"
              price="4"
              image="https://images.unsplash.com/photo-1608198093002-ad4e005484ec"
            />

          </div>
        </div>
      </section>

      <WhyChooseUs />
    </>
  );
}