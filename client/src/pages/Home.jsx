import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">
          Popular Items 🍩
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <ProductCard
            name="Chocolate Cake"
            price="12"
            image="https://images.unsplash.com/photo-1601979031925-424e53b6caaa"
          />

          <ProductCard
            name="Croissant"
            price="5"
            image="https://images.unsplash.com/photo-1555507036-ab1f4038808a"
          />

          <ProductCard
            name="Blueberry Muffin"
            price="4"
            image="https://images.unsplash.com/photo-1608198093002-ad4e005484ec"
          />

        </div>
      </section>
    </div>
  );
}