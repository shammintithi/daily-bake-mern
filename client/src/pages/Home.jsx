import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import FeaturedCategories from "../components/FeaturedCategories";
import WhyChooseUs from "../components/WhyChooseUs";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import toast from "react-hot-toast";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getProducts();
        // Take first 3 products as featured
        setFeaturedProducts(data.slice(0, 3));
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing to our bakery newsletter! 🥐");
    setEmail("");
  };

  const faqs = [
    {
      q: "Do you offer gluten-free options?",
      a: "Yes! We bake a special selection of gluten-free almond flour muffins and breads every Tuesday and Thursday morning in a sanitized zone.",
    },
    {
      q: "How early should I order custom event cakes?",
      a: "We recommend placing custom order inquiries at least 48 to 72 hours in advance so our pastry chefs can design and bake your request perfectly.",
    },
    {
      q: "What is your delivery coverage area?",
      a: "We currently deliver to all major neighborhoods within Dhaka city. All orders are transported in thermal containers to preserve freshness.",
    },
  ];

  return (
    <>
      <Hero />

      <FeaturedCategories />

      {/* Dynamic Best Sellers */}
      <section className="py-24 bg-gradient-to-b from-white to-bakery-creamLight">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-bakery-cream text-bakery-terracotta text-xs font-bold tracking-widest uppercase mb-3">
              Best Sellers
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-serif text-bakery-burgundy">
              Customer Favorites 🍰
            </h2>
            <p className="text-gray-500 mt-4 max-w-lg mx-auto">
              Artisan baking creations that our community loves and orders day after day.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white/40 h-80 rounded-3xl animate-pulse border border-bakery-cream/30"></div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  id={product._id || product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500 font-medium">
              No signature items uploaded yet. Check back soon!
            </div>
          )}
        </div>
      </section>

      <WhyChooseUs />

      {/* Customer Reviews section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-bakery-cream text-bakery-terracotta text-xs font-bold tracking-widest uppercase mb-3">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-serif text-bakery-burgundy">
              What Our Foodies Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl border border-bakery-cream/30">
              <div className="text-amber-400 text-lg mb-4">★★★★★</div>
              <p className="text-gray-600 italic leading-relaxed text-sm">
                "The chocolate cake was the absolute star of my daughter's birthday! Super rich fudge icing and incredibly moist sponge. Best bakery in the city!"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-bakery-terracotta/20 flex items-center justify-center font-bold text-bakery-terracotta text-xs">
                  SL
                </div>
                <div>
                  <h4 className="font-bold text-bakery-burgundy text-sm">Sophia L.</h4>
                  <p className="text-xs text-gray-400">Verified Customer</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-bakery-cream/30">
              <div className="text-amber-400 text-lg mb-4">★★★★★</div>
              <p className="text-gray-600 italic leading-relaxed text-sm">
                "Their slow-ferment country sourdough bread has a spectacular open crumb and crust. Perfect for morning avocado toast. I order two loaves every week."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-bakery-sage/20 flex items-center justify-center font-bold text-bakery-sage text-xs">
                  DK
                </div>
                <div>
                  <h4 className="font-bold text-bakery-burgundy text-sm">David K.</h4>
                  <p className="text-xs text-gray-400">Verified Local Guide</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-bakery-cream/30">
              <div className="text-amber-400 text-lg mb-4">★★★★★</div>
              <p className="text-gray-600 italic leading-relaxed text-sm">
                "Delivery is incredibly fast. The butter croissants arrived wrapped in bakery paper, still flakey and beautifully warm. Absolute luxury service!"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-bakery-burgundy/20 flex items-center justify-center font-bold text-bakery-burgundy text-xs">
                  MH
                </div>
                <div>
                  <h4 className="font-bold text-bakery-burgundy text-sm">Maria H.</h4>
                  <p className="text-xs text-gray-400">Pastry Blogger</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-24 bg-bakery-creamLight/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-bakery-cream text-bakery-terracotta text-xs font-bold tracking-widest uppercase mb-3">
              FAQ
            </span>
            <h2 className="text-4xl font-black font-serif text-bakery-burgundy">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-bakery-cream/30 overflow-hidden shadow-sm hover:shadow transition duration-200"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center font-serif text-bakery-burgundy text-lg font-bold hover:text-bakery-terracotta transition"
                >
                  <span>{faq.q}</span>
                  <span className="text-bakery-terracotta text-xl">{activeFaq === index ? "−" : "+"}</span>
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-bakery-cream/10 pt-3 font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter signup section */}
      <section className="py-24 bg-gradient-to-br from-bakery-burgundy to-bakery-terracotta text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black font-serif text-bakery-cream mb-4">
            Subscribe For Baked Offers
          </h2>
          <p className="text-bakery-cream/80 max-w-md mx-auto mb-8 text-sm md:text-base">
            Get 15% off your first bakery order. Be the first to hear about custom batches, discounts, and baking secrets.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="px-6 py-4 rounded-2xl text-gray-900 w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-bakery-cream"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-2xl bg-bakery-sage hover:bg-opacity-90 font-bold text-sm tracking-wider uppercase transition shadow-lg flex-shrink-0"
            >
              Sign Up Free
            </button>
          </form>
        </div>
      </section>
    </>
  );
}