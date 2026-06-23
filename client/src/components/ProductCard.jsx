export default function ProductCard({ name, price, image }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img src={image} className="h-48 w-full object-cover" />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-amber-600 font-bold">${price}</p>

        <button className="mt-3 w-full bg-amber-500 text-white py-2 rounded-xl hover:bg-amber-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
}