import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyOrders } from "../services/orderService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaBoxOpen, FaTruck, FaClock, FaCheckCircle, FaPrint, FaRegFileAlt } from "react-icons/fa";

export default function MyOrders() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!user) {
      toast.error("Please login to see your orders");
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error loading orders:", error);
        toast.error("Failed to load your orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const handlePrint = (order) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice #${order._id}</title>
          <style>
            body { font-family: 'Courier New', Courier, monospace; padding: 40px; color: #333; }
            .header { text-align: center; border-bottom: 2px dashed #7B2525; padding-bottom: 20px; margin-bottom: 20px; }
            .title { font-size: 28px; font-weight: bold; color: #7B2525; }
            .info { display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 14px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #fcf6ee; color: #7B2525; }
            .total-row { font-size: 18px; font-weight: bold; text-align: right; }
            .footer { text-align: center; margin-top: 50px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">🍞 DAILY BAKE</div>
            <p>123 Bakery Lane, Dhaka, Bangladesh | +880 1712 345678</p>
            <h3>OFFICIAL INVOICE</h3>
          </div>
          <div class="info">
            <div>
              <strong>Order ID:</strong> #${order._id}<br>
              <strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}<br>
              <strong>Status:</strong> ${order.isDelivered ? "DELIVERED" : "PROCESSING"}
            </div>
            <div>
              <strong>Shipping Coordinates:</strong><br>
              ${order.shippingAddress?.address || "N/A"}<br>
              ${order.shippingAddress?.city || "N/A"} - ${order.shippingAddress?.postalCode || "N/A"}
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Baked Item</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.orderItems.map(item => `
                <tr>
                  <td>${item.product?.name || "Bakery Item"}</td>
                  <td>${item.quantity}</td>
                  <td>$${(item.product?.price || 0).toFixed(2)}</td>
                  <td>$${((item.product?.price || 0) * item.quantity).toFixed(2)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          <div class="total-row">
            Delivery Fee: $5.00<br>
            Grand Total: $${(order.totalPrice || 0).toFixed(2)}
          </div>
          <div class="footer">
            Thank you for purchasing handmade artisan baked goods from Daily Bake!<br>
            Please bake with us again.
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 animate-pulse">
        <div className="h-8 bg-bakery-cream/30 w-1/4 rounded-lg mb-8"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-bakery-cream/20 h-28 rounded-3xl w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black font-serif text-bakery-burgundy mb-12 flex items-center gap-3">
        <span>Order History</span>
        <span className="text-sm font-sans font-bold bg-bakery-cream text-bakery-burgundy px-3 py-1 rounded-full border">
          {orders.length} orders
        </span>
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-24 bg-white border border-bakery-cream/35 rounded-3xl">
          <div className="text-7xl mb-6">📦</div>
          <h2 className="text-3xl font-black font-serif text-bakery-burgundy">No Orders Placed Yet</h2>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto text-sm leading-relaxed">
            You haven't placed any orders with Daily Bake. Visit our menu to add items to your cart!
          </p>
          <Link
            to="/products"
            className="inline-block mt-8 px-6 py-3 bg-bakery-terracotta hover:bg-bakery-burgundy text-white text-xs font-bold uppercase tracking-wider rounded-xl transition"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Orders list on left */}
          <div className="lg:col-span-2 space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                onClick={() => setSelectedOrder(order)}
                className={`
                  p-6 rounded-3xl border cursor-pointer transition-all duration-200 text-left bg-white
                  ${
                    selectedOrder?._id === order._id
                      ? "border-bakery-terracotta shadow-md bg-bakery-creamLight/20"
                      : "border-bakery-cream/30 hover:border-bakery-creamDark/60 shadow-sm"
                  }
                `}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <span className="text-xs font-bold font-mono text-bakery-terracotta">#{order._id}</span>
                    <p className="text-gray-400 text-xs mt-1">
                      Ordered: {new Date(order.createdAt).toLocaleDateString()} at{" "}
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-bakery-burgundy">${(order.totalPrice || 0).toFixed(2)}</span>
                    <div className="mt-1">
                      {order.isDelivered ? (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-bakery-sage/10 text-bakery-sage text-[10px] font-bold uppercase tracking-wide">
                          Delivered
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-bakery-cream text-bakery-terracotta text-[10px] font-bold uppercase tracking-wide">
                          Baking
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-bakery-cream/10 text-xs text-gray-500 flex items-center justify-between">
                  <span>{order.orderItems?.length || 0} bakery items</span>
                  <span className="text-bakery-terracotta hover:underline font-bold text-[11px] uppercase tracking-wider">
                    View Details & Invoice →
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Expandable Order Details Card on Right */}
          <div className="lg:col-span-1">
            {selectedOrder ? (
              <div className="bg-white border border-bakery-cream/35 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                  <h3 className="font-serif font-bold text-lg text-bakery-burgundy">Order Details</h3>
                  <button
                    onClick={() => handlePrint(selectedOrder)}
                    className="p-2 rounded-xl bg-bakery-creamLight border hover:bg-bakery-cream transition text-bakery-burgundy flex items-center justify-center"
                    title="Print Invoice"
                  >
                    <FaPrint className="text-sm" />
                  </button>
                </div>

                {/* Timeline Status */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status Timeline</h4>
                  <div className="relative pl-6 space-y-4 border-l border-bakery-creamDark/40 ml-2 py-1">
                    {/* Received */}
                    <div className="relative">
                      <span className="absolute -left-[30px] top-0 w-4.5 h-4.5 bg-bakery-burgundy rounded-full flex items-center justify-center text-white text-[9px] font-bold shadow">
                        ✓
                      </span>
                      <h5 className="font-bold text-xs text-bakery-burgundy flex items-center gap-1.5">
                        <FaRegFileAlt className="text-bakery-terracotta" /> Order Placed
                      </h5>
                      <p className="text-[10px] text-gray-400 mt-0.5">Order was received by backend</p>
                    </div>

                    {/* Baking */}
                    <div className="relative">
                      <span className="absolute -left-[30px] top-0 w-4.5 h-4.5 bg-bakery-burgundy rounded-full flex items-center justify-center text-white text-[9px] font-bold shadow">
                        ✓
                      </span>
                      <h5 className="font-bold text-xs text-bakery-burgundy flex items-center gap-1.5">
                        <FaBoxOpen className="text-bakery-terracotta" /> Baked & Packed
                      </h5>
                      <p className="text-[10px] text-gray-400 mt-0.5">Freshly hand-kneaded & oven baked</p>
                    </div>

                    {/* Shipped/Delivered */}
                    <div className="relative">
                      <span
                        className={`
                          absolute -left-[30px] top-0 w-4.5 h-4.5 rounded-full flex items-center justify-center text-white text-[9px] font-bold shadow
                          ${selectedOrder.isDelivered ? "bg-bakery-sage" : "bg-gray-200 text-gray-400"}
                        `}
                      >
                        {selectedOrder.isDelivered ? "✓" : "⏰"}
                      </span>
                      <h5
                        className={`
                          font-bold text-xs flex items-center gap-1.5
                          ${selectedOrder.isDelivered ? "text-bakery-sage" : "text-gray-400"}
                        `}
                      >
                        <FaTruck /> {selectedOrder.isDelivered ? "Delivered" : "Out for Delivery"}
                      </h5>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {selectedOrder.isDelivered ? "Delivered by thermal rider" : "Awaiting dispatch"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order Items</h4>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                    {selectedOrder.orderItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-bakery-burgundy">{item.product?.name || "Bakery Item"}</p>
                          <span className="text-[10px] text-gray-400">Qty: {item.quantity}</span>
                        </div>
                        <span className="font-bold text-gray-700">
                          ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address summary */}
                <div className="bg-bakery-creamLight/60 p-4 rounded-2xl border text-xs text-gray-600">
                  <p className="font-bold text-bakery-burgundy mb-1">Delivered to:</p>
                  <p>{selectedOrder.shippingAddress?.address}</p>
                  <p>
                    {selectedOrder.shippingAddress?.city} - {selectedOrder.shippingAddress?.postalCode}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-bakery-creamLight/40 border border-dashed border-bakery-creamDark/60 rounded-3xl p-8 text-center text-gray-400 text-xs font-medium">
                Click on any order to expand status details and print receipt.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
