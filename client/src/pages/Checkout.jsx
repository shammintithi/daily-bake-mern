import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { cart } = useContext(CartContext);

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryFee = cart.length > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <h1 className="text-5xl font-black text-center mb-12">
        Checkout 🧾
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Customer Info */}
        <div className="bg-white shadow-lg rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Customer Information
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />

            <textarea
              rows="4"
              placeholder="Delivery Address"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
            ></textarea>

          </div>

        </div>

        {/* Order Summary */}
        <div className="bg-amber-50 rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between mb-4"
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                $
                {(
                  item.price * item.quantity
                ).toFixed(2)}
              </span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            className="
              w-full
              mt-8
              py-4
              rounded-2xl
              text-white
              font-semibold
              bg-gradient-to-r
              from-amber-500
              to-orange-500
              hover:opacity-90
              transition
            "
          >
            Place Order 🚀
          </button>

        </div>

      </div>

    </div>
  );
}