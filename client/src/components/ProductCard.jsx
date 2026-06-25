import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ id, name, price, image }) {
  const { addToCart } = useContext(CartContext);
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 hover:-translate-y-2">

      <Link to={`/products/${id}`}>
        <img
          src={image}
          alt={name}
          className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
        />
      </Link>

      <div className="p-5">
        <Link to={`/products/${id}`}>
          <h3 className="font-semibold text-xl text-gray-800 hover:text-amber-600">
            {name}
          </h3>
        </Link>

        <p className="text-amber-600 font-bold text-lg mt-2">
          ${price}
        </p>

        <button
          onClick={(e) => {
            e.preventDefault();

            addToCart({
              id,
              name,
              price,
              image,
            });

            toast.success(`${name} added to cart! 🛒`);
          }}
          className="mt-4 w-full bg-amber-500 text-white py-2 rounded-xl hover:bg-amber-600"
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
}