import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart 🛒</h2>

      {cart.map((item) => (
        <div key={item._id} className="flex justify-between p-4 bg-white shadow mb-3">
          <p>{item.name}</p>
          <p>${item.price}</p>

          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}