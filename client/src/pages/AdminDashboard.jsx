import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDashboardStats } from "../services/dashboardService";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import { getAllOrders, markOrderDelivered } from "../services/orderService";
import { getAllUsers, deleteUser, updateUser } from "../services/userService";
import toast from "react-hot-toast";
import {
  HiOutlineChartBar,
  HiOutlineCube,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineShoppingBag,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineX,
  HiOutlineCheck,
  HiOutlineSearch,
  HiOutlineRefresh,
  HiOutlinePhotograph,
  HiOutlineEye,
  HiOutlineShieldCheck,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";

/* ──────────────────────────── constants ──────────────────────────── */
const TABS = [
  { id: "overview", label: "Overview", icon: HiOutlineChartBar },
  { id: "products", label: "Products", icon: HiOutlineCube },
  { id: "orders", label: "Orders", icon: HiOutlineClipboardList },
  { id: "users", label: "Users", icon: HiOutlineUsers },
];

const EMPTY_PRODUCT = {
  name: "",
  price: "",
  image: "",
  category: "",
  description: "",
  stock: "",
};

const ROWS_PER_PAGE = 8;

/* ──────────────────────── animated counter ───────────────────────── */
function AnimatedNumber({ value, prefix = "", duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = Number(value) || 0;
    if (end === 0) { setDisplay(0); return; }
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(start);
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return (
    <span>
      {prefix}
      {display.toLocaleString()}
    </span>
  );
}

/* ──────────────────────── skeleton loader ─────────────────────────── */
function SkeletonRow({ cols = 5 }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-5 py-4">
          <div className="h-4 bg-bakery-cream rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

/* ──────────────────────── product modal ──────────────────────────── */
function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(product || EMPTY_PRODUCT);
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(product?._id);

  const handle = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image || !form.category) {
      toast.error("Fill required fields");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock) || 0,
      };
      if (isEdit) await updateProduct(product._id, payload);
      else await createProduct(payload);
      toast.success(isEdit ? "Product updated" : "Product created");
      onSave();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Operation failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <form
        onSubmit={submit}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-bakery-cream/60 transition-colors"
        >
          <HiOutlineX className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-serif text-bakery-burgundy">
          {isEdit ? "Edit Product" : "New Product"}
        </h2>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            value={form.name}
            onChange={handle("name")}
            className="w-full border border-bakery-creamDark rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-bakery-terracotta/40 focus:border-bakery-terracotta outline-none transition"
            placeholder="Sourdough Bread"
          />
        </div>

        {/* Price + Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handle("price")}
              className="w-full border border-bakery-creamDark rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-bakery-terracotta/40 focus:border-bakery-terracotta outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Stock
            </label>
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={handle("stock")}
              className="w-full border border-bakery-creamDark rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-bakery-terracotta/40 focus:border-bakery-terracotta outline-none transition"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            value={form.category}
            onChange={handle("category")}
            className="w-full border border-bakery-creamDark rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-bakery-terracotta/40 focus:border-bakery-terracotta outline-none transition"
            placeholder="Breads"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Image URL <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              value={form.image}
              onChange={handle("image")}
              className="flex-1 border border-bakery-creamDark rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-bakery-terracotta/40 focus:border-bakery-terracotta outline-none transition"
              placeholder="https://..."
            />
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="w-11 h-11 rounded-lg object-cover border border-bakery-creamDark"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            rows={3}
            value={form.description}
            onChange={handle("description")}
            className="w-full border border-bakery-creamDark rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-bakery-terracotta/40 focus:border-bakery-terracotta outline-none transition resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-bakery-burgundy to-bakery-terracotta text-white font-semibold tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-60"
        >
          {saving ? "Saving…" : isEdit ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
}

/* ──────────────────── order detail drawer ─────────────────────────── */
function OrderDrawer({ order, onClose }) {
  if (!order) return null;
  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white shadow-2xl h-full overflow-y-auto p-6 space-y-5 animate-slide-in-right">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg text-bakery-burgundy">
            Order Details
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-bakery-cream/60 transition-colors"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        <div className="text-sm space-y-1 text-gray-600">
          <p>
            <span className="font-medium text-gray-800">ID:</span>{" "}
            <span className="font-mono text-xs">{order._id}</span>
          </p>
          <p>
            <span className="font-medium text-gray-800">Customer:</span>{" "}
            {order.user?.name || "N/A"} ({order.user?.email || "—"})
          </p>
          <p>
            <span className="font-medium text-gray-800">Date:</span>{" "}
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p>
            <span className="font-medium text-gray-800">Payment:</span>{" "}
            {order.paymentMethod}
          </p>
        </div>

        {/* Shipping */}
        <div className="bg-bakery-creamLight rounded-xl p-4 text-sm">
          <p className="font-medium text-bakery-burgundy mb-1">Shipping</p>
          <p>{order.shippingAddress?.address}</p>
          <p>
            {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
          </p>
          <p>{order.shippingAddress?.country}</p>
        </div>

        {/* Items */}
        <div>
          <p className="font-medium text-bakery-burgundy mb-2">Items</p>
          <div className="space-y-2">
            {order.orderItems?.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white border border-bakery-cream rounded-xl px-4 py-2.5"
              >
                <span className="text-sm text-gray-700 truncate max-w-[200px]">
                  {item.product?.name || "Product"}
                </span>
                <span className="text-sm font-semibold text-bakery-burgundy whitespace-nowrap">
                  ×{item.quantity} — $
                  {((item.product?.price || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="flex items-center justify-between border-t border-bakery-cream pt-4">
          <span className="font-medium text-gray-800">Total</span>
          <span className="text-xl font-serif text-bakery-burgundy">
            ${order.totalPrice?.toFixed(2)}
          </span>
        </div>

        {/* Status badges */}
        <div className="flex gap-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              order.isPaid
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {order.isPaid ? "Paid" : "Unpaid"}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              order.isDelivered
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {order.isDelivered ? "Delivered" : "Processing"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ MAIN ADMIN DASHBOARD ════════════════════════ */
export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  /* ---- global data ---- */
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---- product modal ---- */
  const [modalProduct, setModalProduct] = useState(null); // null = closed
  const [showModal, setShowModal] = useState(false);

  /* ---- order drawer ---- */
  const [drawerOrder, setDrawerOrder] = useState(null);

  /* ---- search & pagination ---- */
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  /* ──── auth guard ──── */
  const isAdmin = user?.user?.isAdmin || user?.isAdmin;
  useEffect(() => {
    if (!user || !isAdmin) navigate("/", { replace: true });
  }, [user, isAdmin, navigate]);

  /* ──── data fetching ──── */
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [s, p, o, u] = await Promise.all([
        getDashboardStats(),
        getProducts(),
        getAllOrders(),
        getAllUsers(),
      ]);
      setStats(s);
      setProducts(Array.isArray(p) ? p : []);
      setOrders(Array.isArray(o) ? o : []);
      setUsers(Array.isArray(u) ? u : []);
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) fetchAll();
  }, [isAdmin, fetchAll]);

  /* Reset page on tab / search change */
  useEffect(() => {
    setPage(1);
  }, [activeTab, search]);

  /* ──── helpers ──── */
  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );
  const filteredOrders = orders.filter(
    (o) =>
      o._id?.toLowerCase().includes(search.toLowerCase()) ||
      o.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.user?.email?.toLowerCase().includes(search.toLowerCase())
  );
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const paginate = (arr) => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return {
      data: arr.slice(start, start + ROWS_PER_PAGE),
      totalPages: Math.ceil(arr.length / ROWS_PER_PAGE),
    };
  };

  /* ──── actions ──── */
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleToggleDelivered = async (id) => {
    try {
      await markOrderDelivered(id);
      toast.success("Delivery status updated");
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, isDelivered: true } : o))
      );
    } catch {
      toast.error("Update failed");
    }
  };

  const handleToggleAdmin = async (u) => {
    try {
      await updateUser(u._id, { isAdmin: !u.isAdmin });
      toast.success("Role updated");
      setUsers((prev) =>
        prev.map((x) =>
          x._id === u._id ? { ...x, isAdmin: !x.isAdmin } : x
        )
      );
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      await deleteUser(id);
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  if (!isAdmin) return null;

  /* ═══════════════════════ RENDER ═══════════════════════════════ */
  return (
    <div className="min-h-screen bg-bakery-creamLight">
      {/* ─── header ─── */}
      <header className="bg-gradient-to-r from-bakery-burgundy via-bakery-burgundy/95 to-bakery-terracotta text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-bakery-cream/80 text-sm">
            Manage your bakery — products, orders &amp; customers
          </p>
        </div>
      </header>

      {/* ─── tabs ─── */}
      <nav className="sticky top-[64px] z-40 bg-white/80 backdrop-blur-md border-b border-bakery-cream/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto scrollbar-hide">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                  active
                    ? "border-bakery-burgundy text-bakery-burgundy"
                    : "border-transparent text-gray-500 hover:text-bakery-terracotta hover:border-bakery-creamDark"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {t.label}
                {t.id === "orders" && orders.length > 0 && (
                  <span className="ml-1 bg-bakery-burgundy/10 text-bakery-burgundy text-xs px-2 py-0.5 rounded-full">
                    {orders.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ─── content ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <OverviewTab
            stats={stats}
            orders={orders}
            loading={loading}
            onRefresh={fetchAll}
            onViewOrder={setDrawerOrder}
          />
        )}
        {activeTab === "products" && (
          <DataTableSection
            title="Products"
            description={`${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""}`}
            search={search}
            onSearch={setSearch}
            searchPlaceholder="Search products…"
            headerAction={
              <button
                onClick={() => {
                  setModalProduct(null);
                  setShowModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-bakery-burgundy to-bakery-terracotta text-white text-sm font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <HiOutlinePlus className="w-4 h-4" />
                Add Product
              </button>
            }
          >
            <ProductsTable
              products={filteredProducts}
              page={page}
              setPage={setPage}
              loading={loading}
              onEdit={(p) => {
                setModalProduct(p);
                setShowModal(true);
              }}
              onDelete={handleDeleteProduct}
              paginate={paginate}
            />
          </DataTableSection>
        )}
        {activeTab === "orders" && (
          <DataTableSection
            title="Orders"
            description={`${filteredOrders.length} order${filteredOrders.length !== 1 ? "s" : ""}`}
            search={search}
            onSearch={setSearch}
            searchPlaceholder="Search by ID, name, or email…"
          >
            <OrdersTable
              orders={filteredOrders}
              page={page}
              setPage={setPage}
              loading={loading}
              onView={setDrawerOrder}
              onDeliver={handleToggleDelivered}
              paginate={paginate}
            />
          </DataTableSection>
        )}
        {activeTab === "users" && (
          <DataTableSection
            title="Users"
            description={`${filteredUsers.length} user${filteredUsers.length !== 1 ? "s" : ""}`}
            search={search}
            onSearch={setSearch}
            searchPlaceholder="Search by name or email…"
          >
            <UsersTable
              users={filteredUsers}
              page={page}
              setPage={setPage}
              loading={loading}
              onToggleAdmin={handleToggleAdmin}
              onDelete={handleDeleteUser}
              paginate={paginate}
            />
          </DataTableSection>
        )}
      </main>

      {/* ─── modals / drawers ─── */}
      {showModal && (
        <ProductModal
          product={modalProduct}
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            fetchAll();
          }}
        />
      )}
      {drawerOrder && (
        <OrderDrawer
          order={drawerOrder}
          onClose={() => setDrawerOrder(null)}
        />
      )}
    </div>
  );
}

/* ═══════════════════ OVERVIEW TAB ════════════════════════════════ */
function OverviewTab({ stats, orders, loading, onRefresh, onViewOrder }) {
  const cards = [
    {
      label: "Total Revenue",
      value: stats?.totalRevenue || 0,
      prefix: "$",
      icon: HiOutlineCurrencyDollar,
      gradient: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50",
    },
    {
      label: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: HiOutlineShoppingBag,
      gradient: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50",
    },
    {
      label: "Total Products",
      value: stats?.totalProducts || 0,
      icon: HiOutlineCube,
      gradient: "from-bakery-sage to-emerald-600",
      bgLight: "bg-emerald-50",
    },
    {
      label: "Total Users",
      value: stats?.totalUsers || 0,
      icon: HiOutlineUsers,
      gradient: "from-bakery-terracotta to-bakery-burgundy",
      bgLight: "bg-red-50",
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* ─ Stat cards ─ */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif text-bakery-burgundy">
          At a Glance
        </h2>
        <button
          onClick={onRefresh}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-bakery-terracotta transition-colors"
        >
          <HiOutlineRefresh className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="relative bg-white rounded-2xl border border-bakery-cream/40 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 overflow-hidden group"
            >
              {/* Decorative gradient bar */}
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${c.gradient}`}
              />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                    {c.label}
                  </p>
                  <p className="mt-2 text-3xl font-serif text-gray-800">
                    {loading ? (
                      <span className="inline-block w-24 h-8 bg-bakery-cream rounded animate-pulse" />
                    ) : (
                      <AnimatedNumber
                        value={c.value}
                        prefix={c.prefix || ""}
                      />
                    )}
                  </p>
                </div>
                <div
                  className={`${c.bgLight} p-3 rounded-xl group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-6 h-6 bg-gradient-to-br ${c.gradient} bg-clip-text text-transparent`} style={{ color: 'inherit' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─ Recent orders ─ */}
      <div className="bg-white rounded-2xl border border-bakery-cream/40 shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-bakery-cream/30 flex items-center justify-between">
          <h3 className="font-serif text-bakery-burgundy">Recent Orders</h3>
          <span className="text-xs text-gray-400">Last 5</span>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-bakery-cream/60 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : recentOrders.length === 0 ? (
          <p className="p-6 text-center text-gray-400 text-sm">
            No orders yet
          </p>
        ) : (
          <div className="divide-y divide-bakery-cream/30">
            {recentOrders.map((o) => (
              <button
                key={o._id}
                onClick={() => onViewOrder(o)}
                className="w-full flex items-center justify-between px-6 py-3.5 hover:bg-bakery-creamLight/60 transition-colors text-left"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-bakery-cream/60 flex items-center justify-center text-bakery-burgundy font-serif text-sm">
                    {o.user?.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {o.user?.name || "Customer"}
                    </p>
                    <p className="text-xs text-gray-400 font-mono truncate">
                      #{o._id.slice(-8)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      o.isDelivered
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {o.isDelivered ? "Delivered" : "Processing"}
                  </span>
                  <span className="text-sm font-semibold text-bakery-burgundy">
                    ${o.totalPrice?.toFixed(2)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════ REUSABLE TABLE SECTION ══════════════════════ */
function DataTableSection({
  title,
  description,
  search,
  onSearch,
  searchPlaceholder,
  headerAction,
  children,
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif text-bakery-burgundy">{title}</h2>
          <p className="text-sm text-gray-400 mt-0.5">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-10 pr-4 py-2.5 border border-bakery-creamDark rounded-xl text-sm focus:ring-2 focus:ring-bakery-terracotta/40 focus:border-bakery-terracotta outline-none transition w-64"
            />
          </div>
          {headerAction}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ═══════════════════ PAGINATION ══════════════════════════════════ */
function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-bakery-cream/30">
      <p className="text-xs text-gray-400">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="p-2 rounded-lg border border-bakery-creamDark hover:bg-bakery-cream/40 disabled:opacity-30 transition"
        >
          <HiOutlineChevronLeft className="w-4 h-4" />
        </button>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="p-2 rounded-lg border border-bakery-creamDark hover:bg-bakery-cream/40 disabled:opacity-30 transition"
        >
          <HiOutlineChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════ PRODUCTS TABLE ══════════════════════════════ */
function ProductsTable({
  products,
  page,
  setPage,
  loading,
  onEdit,
  onDelete,
  paginate,
}) {
  const { data, totalPages } = paginate(products);
  return (
    <div className="bg-white rounded-2xl border border-bakery-cream/40 shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-bakery-creamLight/80 text-xs uppercase tracking-wider text-gray-500">
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium text-right">Price</th>
              <th className="px-5 py-3 font-medium text-center">Stock</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bakery-cream/30">
            {loading ? (
              [...Array(4)].map((_, i) => <SkeletonRow key={i} cols={5} />)
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-12 text-gray-400 text-sm"
                >
                  No products found
                </td>
              </tr>
            ) : (
              data.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-bakery-creamLight/40 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover border border-bakery-cream"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-bakery-cream/60 flex items-center justify-center">
                          <HiOutlinePhotograph className="w-5 h-5 text-bakery-creamDark" />
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-800 truncate max-w-[180px]">
                        {p.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-block bg-bakery-cream/50 text-bakery-burgundy text-xs font-medium px-2.5 py-1 rounded-full">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right text-sm font-semibold text-gray-700">
                    ${Number(p.price).toFixed(2)}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={`text-sm font-medium ${
                        p.stock > 10
                          ? "text-bakery-sage"
                          : p.stock > 0
                          ? "text-amber-600"
                          : "text-red-500"
                      }`}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(p)}
                        className="p-2 rounded-lg text-gray-400 hover:text-bakery-terracotta hover:bg-bakery-cream/40 transition-colors"
                        title="Edit"
                      >
                        <HiOutlinePencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(p._id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}

/* ═══════════════════ ORDERS TABLE ════════════════════════════════ */
function OrdersTable({
  orders,
  page,
  setPage,
  loading,
  onView,
  onDeliver,
  paginate,
}) {
  const { data, totalPages } = paginate(orders);
  return (
    <div className="bg-white rounded-2xl border border-bakery-cream/40 shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-bakery-creamLight/80 text-xs uppercase tracking-wider text-gray-500">
              <th className="px-5 py-3 font-medium">Order ID</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium text-right">Total</th>
              <th className="px-5 py-3 font-medium text-center">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bakery-cream/30">
            {loading ? (
              [...Array(4)].map((_, i) => <SkeletonRow key={i} cols={6} />)
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-12 text-gray-400 text-sm"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              data.map((o) => (
                <tr
                  key={o._id}
                  className="hover:bg-bakery-creamLight/40 transition-colors"
                >
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-500">
                    #{o._id.slice(-8)}
                  </td>
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {o.user?.name || "—"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {o.user?.email || ""}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">
                    {new Date(o.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3.5 text-right text-sm font-semibold text-bakery-burgundy">
                    ${o.totalPrice?.toFixed(2)}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        o.isDelivered
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {o.isDelivered ? "Delivered" : "Processing"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onView(o)}
                        className="p-2 rounded-lg text-gray-400 hover:text-bakery-terracotta hover:bg-bakery-cream/40 transition-colors"
                        title="View details"
                      >
                        <HiOutlineEye className="w-4 h-4" />
                      </button>
                      {!o.isDelivered && (
                        <button
                          onClick={() => onDeliver(o._id)}
                          className="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                          title="Mark delivered"
                        >
                          <HiOutlineCheck className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}

/* ═══════════════════ USERS TABLE ═════════════════════════════════ */
function UsersTable({
  users,
  page,
  setPage,
  loading,
  onToggleAdmin,
  onDelete,
  paginate,
}) {
  const { data, totalPages } = paginate(users);
  return (
    <div className="bg-white rounded-2xl border border-bakery-cream/40 shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-bakery-creamLight/80 text-xs uppercase tracking-wider text-gray-500">
              <th className="px-5 py-3 font-medium">User</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium text-center">Role</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bakery-cream/30">
            {loading ? (
              [...Array(4)].map((_, i) => <SkeletonRow key={i} cols={5} />)
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-12 text-gray-400 text-sm"
                >
                  No users found
                </td>
              </tr>
            ) : (
              data.map((u) => (
                <tr
                  key={u._id}
                  className="hover:bg-bakery-creamLight/40 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-bakery-terracotta to-bakery-burgundy flex items-center justify-center text-white text-sm font-semibold">
                        {u.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {u.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">
                    {u.email}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        u.isAdmin
                          ? "bg-bakery-burgundy/10 text-bakery-burgundy"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {u.isAdmin && (
                        <HiOutlineShieldCheck className="w-3.5 h-3.5" />
                      )}
                      {u.isAdmin ? "Admin" : "Customer"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onToggleAdmin(u)}
                        className={`p-2 rounded-lg transition-colors ${
                          u.isAdmin
                            ? "text-bakery-burgundy hover:bg-bakery-burgundy/10"
                            : "text-gray-400 hover:text-bakery-sage hover:bg-green-50"
                        }`}
                        title={
                          u.isAdmin ? "Remove admin role" : "Make admin"
                        }
                      >
                        <HiOutlineShieldCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(u._id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete user"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
