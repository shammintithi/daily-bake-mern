import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import { FaSearch, FaSlidersH, FaTimesCircle } from "react-icons/fa";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(50);
  const [sortBy, setSortBy] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch products from backend
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products from server:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Update selected category when URL query changes
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "all");
    setCurrentPage(1);
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearch("");
    handleCategoryChange("all");
    setPriceRange(50);
    setSortBy("name-asc");
    setCurrentPage(1);
  };

  // Filter and Sort Logic
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "all" ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase();

    const searchMatch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const priceMatch = product.price <= priceRange;

    return categoryMatch && searchMatch && priceMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const categoriesList = ["all", "cakes", "pastries", "cookies", "bread"];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Page Title */}
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-bakery-cream text-bakery-terracotta text-xs font-bold tracking-widest uppercase mb-3">
          Our Bakery Menu
        </span>
        <h1 className="text-5xl font-black font-serif text-bakery-burgundy">
          Artisan Baking Menu 🥖
        </h1>
        <p className="text-gray-500 mt-4 max-w-md mx-auto font-sans">
          Fresh, hand-shaped sourdough breads, laminated croissants, and delicious pastries made with local ingredients.
        </p>
      </div>

      {/* Filter and Search controls */}
      <div className="bg-white rounded-3xl border border-bakery-cream/35 p-6 mb-12 shadow-sm flex flex-col lg:flex-row gap-6 justify-between items-center">
        {/* Search */}
        <div className="relative w-full lg:w-96">
          <input
            type="text"
            placeholder="Search bakery menu..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-11 pr-5 py-3 rounded-2xl border border-bakery-creamDark/30 bg-bakery-creamLight/30 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta transition font-sans text-sm text-gray-800"
          />
          <FaSearch className="absolute left-4 top-4 text-gray-400 text-sm" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
          {/* Price Filter */}
          <div className="flex items-center gap-3 w-full sm:w-auto flex-grow sm:flex-grow-0">
            <span className="text-xs font-bold text-bakery-burgundy uppercase tracking-wider">Max Price:</span>
            <input
              type="range"
              min="2"
              max="50"
              value={priceRange}
              onChange={(e) => {
                setPriceRange(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="accent-bakery-terracotta w-32 cursor-pointer"
            />
            <span className="text-sm font-extrabold text-bakery-terracotta">${priceRange}</span>
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-bakery-burgundy uppercase tracking-wider">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-bakery-creamDark/30 px-3 py-2.5 rounded-xl focus:outline-none text-sm text-gray-700 font-medium"
            >
              <option value="name-asc">Alphabetical (A-Z)</option>
              <option value="name-desc">Alphabetical (Z-A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Categories */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-bakery-cream/35 p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-bakery-burgundy border-b pb-3 flex items-center justify-between">
              <span>Categories</span>
              <FaSlidersH className="text-bakery-terracotta" />
            </h3>
            <div className="flex flex-col gap-2">
              {categoriesList.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl text-sm font-semibold capitalize transition
                    ${
                      selectedCategory === category
                        ? "bg-bakery-burgundy text-white shadow-md shadow-bakery-burgundy/10"
                        : "text-gray-600 hover:bg-bakery-creamLight/50 hover:text-bakery-burgundy"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>

            <button
              onClick={handleResetFilters}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-bakery-creamDark/50 text-xs font-bold uppercase tracking-wider text-bakery-terracotta hover:bg-bakery-creamLight hover:border-bakery-terracotta transition"
            >
              <FaTimesCircle /> Reset Filters
            </button>
          </div>
        </div>

        {/* Products Grid / Skeletons */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="bg-white rounded-3xl p-4 border border-bakery-cream/30 shadow-sm flex flex-col justify-between h-96 animate-pulse">
                  <div className="bg-bakery-cream/40 rounded-2xl h-48 w-full"></div>
                  <div className="space-y-3 mt-4 flex-grow">
                    <div className="bg-bakery-cream/50 h-5 rounded w-3/4"></div>
                    <div className="bg-bakery-cream/40 h-4 rounded w-1/4"></div>
                  </div>
                  <div className="bg-bakery-cream/60 h-11 rounded-2xl w-full mt-4"></div>
                </div>
              ))}
            </div>
          ) : currentItems.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentItems.map((product) => (
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-16">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2.5 rounded-xl border border-bakery-creamDark/40 text-xs font-bold uppercase tracking-wider hover:bg-bakery-cream text-bakery-burgundy disabled:opacity-50 disabled:hover:bg-transparent transition cursor-pointer"
                  >
                    Prev
                  </button>
                  <span className="text-sm font-bold text-bakery-burgundy px-4">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2.5 rounded-xl border border-bakery-creamDark/40 text-xs font-bold uppercase tracking-wider hover:bg-bakery-cream text-bakery-burgundy disabled:opacity-50 disabled:hover:bg-transparent transition cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-bakery-cream/35">
              <span className="text-7xl block mb-6">🍪</span>
              <h2 className="text-3xl font-black font-serif text-bakery-burgundy">No Baked Goods Match</h2>
              <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm font-sans">
                We couldn't find any products matching your search or filters. Try adjusting your settings or reset filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 px-6 py-3 rounded-2xl bg-bakery-terracotta hover:bg-bakery-burgundy text-white text-xs font-bold uppercase tracking-wider transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}