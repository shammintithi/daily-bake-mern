import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../services/orderService";
import toast from "react-hot-toast";
import { FaCheckCircle, FaLock, FaShoppingBag, FaTruck } from "react-icons/fa";

export default function Checkout() {
  const { cart, clearLocalCart } = useContext(CartContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.user?.name || user?.name || "",
    email: user?.user?.email || user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
    paymentMethod: "Cash on Delivery",
  });

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Load saved default address if available
  useState(() => {
    try {
      const saved = localStorage.getItem("userAddress");
      if (saved) {
        const addr = JSON.parse(saved);
        setFormData(prev => ({
          ...prev,
          phone: addr.phone || "",
          address: addr.address || "",
          city: addr.city || "",
          postalCode: addr.postalCode || "",
          country: addr.country || "Bangladesh"
        }));
      }
    } catch (e) {
      console.error(e);
    }
  });

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = cart.length > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Validation
    const { phone, address, city, postalCode, country } = formData;
    if (!phone || !address || !city || !postalCode || !country) {
      toast.error("Please fill in all shipping fields");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
        paymentMethod: formData.paymentMethod,
      };

      const response = await placeOrder(payload);
      toast.success("Order placed successfully! 🥐");
      
      // Clear cart locally
      clearLocalCart();

      // Show success screen with order details
      setOrderSuccess(response.order);
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error(error.response?.data?.message || "Order placement failed");
    } finally {
      setLoading(false);
    }
  };

  // Login reminder
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 bg-bakery-cream text-bakery-terracotta rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
          <FaLock />
        </div>
        <h2 className="text-3xl font-black font-serif text-bakery-burgundy">Authentication Required</h2>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
          Please log in to your account to fill out delivery coordinates and proceed to payment.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/login"
            className="w-full py-3.5 rounded-2xl bg-bakery-burgundy hover:bg-bakery-terracotta text-white font-bold transition text-sm uppercase tracking-wider text-center"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="w-full py-3.5 rounded-2xl border border-bakery-creamDark text-gray-700 font-bold hover:bg-bakery-creamLight transition text-sm uppercase tracking-wider text-center"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  // Success view
  if (orderSuccess) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <div className="w-24 h-24 bg-bakery-sage/10 text-bakery-sage rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-inner animate-bounce">
          <FaCheckCircle />
        </div>
        <h1 className="text-4xl font-black font-serif text-bakery-burgundy">Order Placed!</h1>
        <p className="text-gray-500 mt-3 text-sm leading-relaxed">
          Thank you for baking with us. Your order <span className="font-mono font-bold text-bakery-terracotta">#{orderSuccess._id}</span> is being processed by our bakers.
        </p>

        <div className="bg-white border border-bakery-cream/35 rounded-3xl p-6 my-8 text-left space-y-4">
          <h3 className="font-serif font-bold text-lg text-bakery-burgundy border-b pb-2 mb-2">Delivery coordinates</h3>
          <div className="grid grid-cols-2 text-sm gap-2">
            <span className="text-gray-400">Recipient:</span>
            <span className="font-semibold text-gray-700">{formData.name}</span>

            <span className="text-gray-400">Address:</span>
            <span className="font-semibold text-gray-700">
              {formData.address}, {formData.city}
            </span>

            <span className="text-gray-400">Total Price:</span>
            <span className="font-extrabold text-bakery-terracotta">${total.toFixed(2)}</span>

            <span className="text-gray-400">Payment Mode:</span>
            <span className="font-semibold text-gray-700">{formData.paymentMethod}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/my-orders"
            className="px-8 py-4 bg-bakery-burgundy hover:bg-bakery-terracotta text-white rounded-2xl font-bold uppercase tracking-wider text-xs shadow-md transition"
          >
            Track My Orders 📦
          </Link>
          <Link
            to="/products"
            className="px-8 py-4 border border-bakery-creamDark text-gray-700 rounded-2xl font-bold uppercase tracking-wider text-xs hover:bg-bakery-creamLight transition"
          >
            Continue Baking Menu
          </Link>
        </div>
      </div>
    );
  }

  // Standard checkout form
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black font-serif text-bakery-burgundy text-center mb-16">
        Checkout Shipping 🧾
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Shipping address info */}
        <div className="bg-white border border-bakery-cream/35 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold font-serif text-bakery-burgundy mb-6 flex items-center gap-2">
            <FaTruck className="text-bakery-terracotta" /> Shipping Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm"
                required
                readOnly
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm"
                required
                readOnly
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +880 1712 345678"
                className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Delivery Address</label>
              <textarea
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                placeholder="Apartment, Street address"
                className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-bakery-creamDark/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bakery-terracotta text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Invoice Summary and Submit */}
        <div className="bg-bakery-creamLight border border-bakery-cream/35 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold font-serif text-bakery-burgundy mb-6 flex items-center gap-2">
            <FaShoppingBag className="text-bakery-terracotta" /> Order Summary
          </h2>

          <div className="max-h-60 overflow-y-auto space-y-4 mb-6 pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm border-b border-bakery-cream/20 pb-3">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg border" />
                  <div>
                    <h4 className="font-bold text-bakery-burgundy">{item.name}</h4>
                    <span className="text-xs text-gray-400">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-gray-700">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-bakery-burgundy">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-semibold text-bakery-burgundy">${deliveryFee.toFixed(2)}</span>
            </div>
            <hr className="border-bakery-cream/20 my-3" />
            <div className="flex justify-between text-xl font-bold font-serif text-bakery-burgundy">
              <span>Total Bill</span>
              <span className="text-bakery-terracotta font-sans font-extrabold">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="mt-8 pt-6 border-t border-bakery-cream/30">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">Payment Method</label>
            <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-bakery-cream/40">
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={formData.paymentMethod === "Cash on Delivery"}
                onChange={handleChange}
                className="accent-bakery-terracotta w-4 h-4 cursor-pointer"
              />
              <label htmlFor="cod" className="font-bold text-sm text-bakery-burgundy cursor-pointer flex-1">
                Cash on Delivery (COD)
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 py-4 rounded-2xl text-white font-bold bg-gradient-to-r from-bakery-burgundy to-bakery-terracotta shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-95 transition text-sm uppercase tracking-wider disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Confirm & Place Order 🚀"}
          </button>
        </div>
      </form>
    </div>
  );
}