import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ id, name, price, image, category }) {
  const { addToCart } = useContext(CartContext);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart({ id, name, price, image, category });
    toast.success(`${name} added to cart! 🥐`);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-bakery-cream/30 hover:border-bakery-terracotta/20 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
      <Link to={`/products/${id}`} className="relative block overflow-hidden aspect-video">
        {category && (
          <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md text-bakery-burgundy text-xs font-bold px-3 py-1.5 rounded-full border border-bakery-cream/40 shadow-sm uppercase tracking-wider">
            {category}
          </span>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>

      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <Link to={`/products/${id}`}>
            <h3 className="font-serif font-bold text-xl text-bakery-burgundy hover:text-bakery-terracotta transition-colors leading-tight line-clamp-1">
              {name}
            </h3>
          </Link>
          <p className="text-bakery-terracotta font-extrabold text-lg mt-2">
            ${price.toFixed(2)}
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="mt-5 w-full bg-bakery-burgundy hover:bg-bakery-terracotta text-white font-bold py-3 rounded-2xl transition duration-300 text-sm uppercase tracking-wider shadow-md hover:shadow-lg active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}