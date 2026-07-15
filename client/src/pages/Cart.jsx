import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaTrashAlt, FaShoppingBasket, FaArrowLeft } from "react-icons/fa";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    loading,
  } = useContext(CartContext);

  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const deliveryFee = cart.length > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-bakery-cream/30 w-1/4 mx-auto rounded-lg"></div>
          <div className="h-48 bg-bakery-cream/20 rounded-3xl w-full"></div>
          <div className="h-24 bg-bakery-cream/30 rounded-3xl w-1/3 ml-auto"></div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-28 text-center bg-white rounded-[2.5rem] border border-bakery-cream/35 mt-12 shadow-sm">
        <div className="w-20 h-20 bg-bakery-cream/50 text-bakery-terracotta rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
          🛒
        </div>

        <h2 className="text-3xl font-black font-serif text-bakery-burgundy">
          Your Cart Is Empty
        </h2>

        <p className="text-gray-500 mt-3 max-w-sm mx-auto text-sm leading-relaxed">
          Add some of our freshly baked artisan breads, customized cakes, or flakey pastries to get started.
        </p>

        <Link
          to="/products"
          className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-bakery-burgundy hover:bg-bakery-terracotta text-white rounded-2xl font-bold uppercase tracking-wider text-xs shadow-md transition"
        >
          <FaShoppingBasket /> Browse Our Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Title */}
      <h2 className="text-4xl font-black font-serif text-bakery-burgundy mb-10 flex items-center gap-3">
        <span>Cart Details</span>
        <span className="text-sm font-sans font-bold bg-bakery-cream text-bakery-burgundy px-3 py-1 rounded-full border border-bakery-creamDark/20">
          {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
        </span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-center bg-white border border-bakery-cream/30 p-5 rounded-3xl shadow-sm hover:shadow transition gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-2xl border border-bakery-cream/20 shadow-sm"
                />
                <div>
                  <h3 className="font-serif font-bold text-lg text-bakery-burgundy leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-bakery-terracotta text-sm font-semibold mt-1">
                    ${item.price?.toFixed(2)}
                  </p>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                {/* Quantity select */}
                <div className="flex items-center gap-2 bg-bakery-creamLight border border-bakery-creamDark/20 p-1.5 rounded-xl">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-7 h-7 rounded-lg bg-white text-gray-700 hover:bg-bakery-cream transition shadow-sm font-bold flex items-center justify-center text-xs"
                  >
                    −
                  </button>
                  <span className="font-bold text-sm text-bakery-burgundy w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="w-7 h-7 rounded-lg bg-bakery-burgundy text-white hover:bg-bakery-terracotta transition shadow-sm font-bold flex items-center justify-center text-xs"
                  >
                    +
                  </button>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition flex items-center justify-center"
                  title="Remove item"
                >
                  <FaTrashAlt className="text-sm" />
                </button>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-bakery-terracotta hover:text-bakery-burgundy transition group mt-4 pl-2"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-1 bg-white border border-bakery-cream/35 rounded-3xl p-6 shadow-sm">
          <h3 className="text-xl font-bold font-serif text-bakery-burgundy border-b pb-4 mb-6">
            Invoice Summary
          </h3>

          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-bakery-burgundy">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-bold text-bakery-burgundy">${deliveryFee.toFixed(2)}</span>
            </div>

            <hr className="border-bakery-cream/20" />

            <div className="flex justify-between font-serif text-lg font-black text-bakery-burgundy pt-2">
              <span>Order Total</span>
              <span className="text-bakery-terracotta font-sans font-extrabold">${total.toFixed(2)}</span>
            </div>
          </div>

          <Link to="/checkout" className="block mt-8">
            <button className="w-full bg-gradient-to-r from-bakery-burgundy to-bakery-terracotta text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-95 transition text-sm uppercase tracking-wider">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}