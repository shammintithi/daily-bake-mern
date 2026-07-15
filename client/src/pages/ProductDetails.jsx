import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getProductById, getProducts } from "../services/productService";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { FaChevronLeft, FaShoppingCart, FaStar } from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCartWithQuantity } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  // Fetch product and related products
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        setProduct(data);

        // Fetch related products in the same category
        const allProducts = await getProducts();
        const filtered = allProducts.filter(
          (p) =>
            p.category?.toLowerCase() === data.category?.toLowerCase() &&
            (p._id || p.id) !== id
        );
        setRelatedProducts(filtered.slice(0, 3));
      } catch (error) {
        console.error("Error loading product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCartWithQuantity(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart! 🥐`);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-bakery-cream/30 h-[450px] rounded-3xl"></div>
          <div className="space-y-6 py-4">
            <div className="bg-bakery-cream/40 h-8 w-1/3 rounded-full"></div>
            <div className="bg-bakery-cream/50 h-12 w-3/4 rounded-2xl"></div>
            <div className="bg-bakery-cream/40 h-6 w-1/4 rounded-lg"></div>
            <div className="bg-bakery-cream/30 h-24 w-full rounded-2xl"></div>
            <div className="bg-bakery-cream/50 h-12 w-1/3 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-24 px-6 bg-bakery-creamLight">
        <span className="text-6xl block mb-4">🥐</span>
        <h2 className="text-3xl font-black font-serif text-bakery-burgundy">Product Not Found</h2>
        <p className="text-gray-500 mt-2">The bakery product might have sold out or been removed.</p>
        <Link
          to="/products"
          className="inline-block mt-6 px-6 py-3 bg-bakery-terracotta text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-bakery-burgundy transition"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Back button */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm font-semibold text-bakery-terracotta hover:text-bakery-burgundy mb-10 transition"
      >
        <FaChevronLeft /> Back to Menu
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Product Image and Thumbnail mimics */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[380px] md:h-[480px] object-cover rounded-3xl shadow-xl border border-bakery-cream/20"
          />

          <div className="grid grid-cols-3 gap-4 mt-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`rounded-2xl overflow-hidden border-2 cursor-pointer aspect-square ${
                  num === 1 ? "border-bakery-terracotta" : "border-bakery-cream/30"
                }`}
              >
                <img
                  src={product.image}
                  alt={`${product.name} alternate view`}
                  className={`w-full h-full object-cover ${num > 1 ? "opacity-70 saturate-50 hover:opacity-100 hover:saturate-100 transition" : ""}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col h-full justify-between">
          <div>
            <span className="inline-block bg-bakery-cream/50 text-bakery-burgundy border border-bakery-cream text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              {product.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-black font-serif text-bakery-burgundy mt-6">
              {product.name}
            </h1>

            {/* Stars rating mimic */}
            <div className="flex items-center gap-1.5 mt-4 text-amber-500">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FaStar key={s} className="text-sm" />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">(14 Customer Reviews)</span>
            </div>

            <p className="text-3xl font-extrabold text-bakery-terracotta mt-5">
              ${product.price?.toFixed(2)}
            </p>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-6">
              {product.description ||
                "Bakehouse fresh! Handcrafted using slowly-fermented starters, local dairy, and organic grains. Contains no preservatives or artificial flavorings."}
            </p>

            {/* Availability */}
            <div className="flex items-center gap-2 mt-6">
              <span className="w-2.5 h-2.5 bg-bakery-sage rounded-full"></span>
              <span className="text-xs font-bold text-bakery-sage uppercase tracking-wider">
                Freshly Baked & In Stock
              </span>
            </div>
          </div>

          <div className="mt-8 border-t border-bakery-cream/30 pt-8">
            {/* Quantity and Cart */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-3 bg-bakery-creamLight border border-bakery-creamDark/20 p-2.5 rounded-2xl flex-shrink-0">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-9 h-9 rounded-xl bg-white hover:bg-bakery-cream hover:text-bakery-burgundy transition shadow-sm font-bold text-base flex items-center justify-center"
                >
                  −
                </button>
                <span className="font-bold text-lg text-bakery-burgundy w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-xl bg-bakery-burgundy hover:bg-bakery-terracotta text-white transition shadow-sm font-bold text-base flex items-center justify-center"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full sm:flex-1 py-4 rounded-2xl bg-gradient-to-r from-bakery-burgundy to-bakery-terracotta text-white font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-95 transition"
              >
                <FaShoppingCart /> Add to Order • ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs description vs reviews */}
      <div className="mt-20 border-b border-bakery-cream/40 flex gap-6">
        <button
          onClick={() => setActiveTab("description")}
          className={`pb-4 text-sm font-bold uppercase tracking-wider border-b-2 transition ${
            activeTab === "description"
              ? "border-bakery-terracotta text-bakery-burgundy"
              : "border-transparent text-gray-500 hover:text-bakery-burgundy"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-4 text-sm font-bold uppercase tracking-wider border-b-2 transition ${
            activeTab === "reviews"
              ? "border-bakery-terracotta text-bakery-burgundy"
              : "border-transparent text-gray-500 hover:text-bakery-burgundy"
          }`}
        >
          Reviews (14)
        </button>
      </div>

      <div className="py-8">
        {activeTab === "description" ? (
          <div className="max-w-3xl text-gray-600 space-y-4 text-sm md:text-base leading-relaxed font-sans">
            <p>
              Our bakery products represent the pinnacle of traditional baking techniques. We source our flour from local stone-mill co-operatives that grind heritage grain varieties.
            </p>
            <p className="font-bold text-bakery-burgundy">Allergen Notice:</p>
            <p className="bg-bakery-creamLight p-4 rounded-2xl border border-bakery-cream/20 text-xs">
              Made in a kitchen that handles wheat flour, gluten, tree nuts, eggs, dairy butter, and yeast. If you have severe allergies, please contact our support staff before ordering.
            </p>
          </div>
        ) : (
          <div className="space-y-6 max-w-3xl">
            <div className="border-b border-bakery-cream/20 pb-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-bakery-burgundy text-sm">Amelia S.</h4>
                <span className="text-amber-500 flex text-xs"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
              </div>
              <p className="text-gray-500 text-xs">June 24, 2026</p>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                Absolutely flawless crumb structure. Reminded me of my childhood visits to local French country houses. Will order again!
              </p>
            </div>
            <div className="border-b border-bakery-cream/20 pb-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-bakery-burgundy text-sm">Oliver B.</h4>
                <span className="text-amber-500 flex text-xs"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
              </div>
              <p className="text-gray-500 text-xs">May 19, 2026</p>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                Incredible moisture retention. Even after two days, the flavor remains full and bread holds together beautifully. 5 stars.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 border-t border-bakery-cream/40 pt-16">
          <h2 className="text-3xl font-black font-serif text-bakery-burgundy text-center mb-12">
            Related Baking Treats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p._id || p.id}
                id={p._id || p.id}
                name={p.name}
                price={p.price}
                image={p.image}
                category={p.category}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}