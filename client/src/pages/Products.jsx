import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Our Bakery Items 🍪</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-white shadow rounded-xl p-4">
            <img src={p.image} className="h-40 w-full object-cover rounded" />
            <h3 className="font-bold mt-2">{p.name}</h3>
            <p className="text-amber-600">${p.price}</p>

            <button
              onClick={() => addToCart(p)}
              className="mt-3 w-full bg-amber-500 text-white py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}