export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-8">
        Contact Us
      </h1>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full border p-3 rounded-xl"
        />

        <textarea
          rows="5"
          placeholder="Your Message"
          className="w-full border p-3 rounded-xl"
        ></textarea>

        <button
          className="bg-amber-500 text-white px-6 py-3 rounded-xl"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}