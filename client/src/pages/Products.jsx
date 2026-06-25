import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

export default function Products() {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");

  const category = searchParams.get("category");

  const filteredProducts = products
    .filter((product) => {
      const categoryMatch = category
        ? product.category === category
        : true;

      const searchMatch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="text-center mb-12">

        <h1 className="text-5xl font-black">
          Our Bakery Menu 🍪
        </h1>

        <p className="text-gray-500 mt-4">
          Freshly baked every day.
        </p>

        <p className="text-sm text-amber-600 font-medium mt-3">
          {filteredProducts.length} items available
        </p>

      </div>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">

        <input
          type="text"
          placeholder="🔍 Search bakery items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full md:w-[420px]
            px-5 py-3
            rounded-2xl
            border border-gray-200
            shadow-sm
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-amber-400
          "
        />

      </div>

      {/* Products */}
      <div className="grid md:grid-cols-3 gap-8">

        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}

      </div>

    </div>
  );
}