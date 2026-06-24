export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">
            🍞 Daily Bake
          </h2>
          <p className="mt-4 text-gray-400">
            Fresh breads, cakes and pastries baked daily.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Menu</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Opening Hours</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Mon-Fri: 8AM - 8PM</li>
            <li>Sat-Sun: 9AM - 10PM</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-gray-400">
            hello@dailybake.com
          </p>
          <p className="text-gray-400">
            +880 1234-567890
          </p>
        </div>
      </div>

      <div className="text-center border-t border-gray-800 py-4 text-gray-500">
        © 2026 Daily Bake. All rights reserved.
      </div>
    </footer>
  );
}