import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const deliveryFee = cart.length > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="text-7xl mb-6">🛒</div>

        <h2 className="text-4xl font-bold">
          Your Cart Is Empty
        </h2>

        <p className="text-gray-500 mt-4">
          Add some delicious bakery items to get started.
        </p>

        <Link
          to="/products"
          className="inline-block mt-8 px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h2 className="text-4xl font-bold mb-8">
        Your Cart 🛒
      </h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center bg-white p-5 rounded-2xl shadow mb-4"
        >
          <div>

            <h3 className="font-semibold text-lg">
              {item.name}
            </h3>

            <p className="text-amber-600 font-bold mt-1">
              ${item.price}
            </p>

            <div className="flex items-center gap-3 mt-4">

              <button
                onClick={() => decreaseQuantity(item.id)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition"
              >
                -
              </button>

              <span className="font-semibold min-w-[20px] text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQuantity(item.id)}
                className="w-8 h-8 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition"
              >
                +
              </button>

            </div>

            <p className="text-sm text-gray-500 mt-3">
              Item Total: $
              {(item.price * item.quantity).toFixed(2)}
            </p>

          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Remove
          </button>

        </div>
      ))}

      <div className="bg-amber-50 p-6 rounded-2xl mt-8">

        <div className="flex justify-between mb-3">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-3">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-xl">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
          Proceed To Checkout
        </button>

      </div>

    </div>
  );
}