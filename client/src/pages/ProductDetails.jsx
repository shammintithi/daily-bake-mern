import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import products from "../data/products";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();

  const { addToCartWithQuantity } =
    useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="text-center py-20">
        Product Not Found
      </div>
    );
  }

const handleAddToCart = () => {
  addToCartWithQuantity(
    product,
    quantity
  );

  toast.success(
    `${quantity} ${product.name} added to cart! 🛒`
  );
};

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <div className="grid md:grid-cols-2 gap-12">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[500px] object-cover rounded-3xl shadow-xl"
        />

        <div>

          <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full">
            {product.category}
          </span>

          <h1 className="text-5xl font-black mt-6">
            {product.name}
          </h1>

          <p className="text-3xl font-bold text-amber-600 mt-4">
            ${product.price}
          </p>

          <p className="text-gray-600 mt-6 leading-8">
            Freshly baked with premium ingredients.
            Perfect for breakfast, snacks and special occasions.
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-8">

            <button
              onClick={() =>
                quantity > 1 &&
                setQuantity(quantity - 1)
              }
              className="w-10 h-10 rounded-full bg-gray-200 text-xl"
            >
              -
            </button>

            <span className="text-xl font-bold">
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
              className="w-10 h-10 rounded-full bg-amber-500 text-white text-xl"
            >
              +
            </button>

          </div>

          <button
            onClick={handleAddToCart}
            className="mt-8 px-8 py-4 bg-amber-500 text-white rounded-2xl hover:bg-amber-600 transition"
          >
            Add To Cart 🛒
          </button>

        </div>

      </div>

    </div>
  );
}