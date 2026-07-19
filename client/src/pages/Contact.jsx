export default function Contact() {
  return (
    <section className="bg-[#EEE0CC] min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 rounded-full bg-white shadow-sm text-[#BA6A4C] text-sm font-semibold tracking-wider uppercase">
            Contact
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-serif font-bold text-[#7B2525]">
            Let's Talk
          </h1>

          <p className="mt-5 text-gray-600 text-lg leading-8 max-w-xl mx-auto">
            Whether you're planning a special celebration or simply have a
            question, we'd love to hear from you.
          </p>
        </div>

        {/* Form */}

        <form className="space-y-10">

          <div className="grid md:grid-cols-2 gap-10">

            <div>
              <label className="block text-[#607456] font-medium mb-3">
                Name
              </label>

              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-transparent border-b border-[#607456]/40 pb-3 outline-none focus:border-[#BA6A4C] transition placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-[#607456] font-medium mb-3">
                Email
              </label>

              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-transparent border-b border-[#607456]/40 pb-3 outline-none focus:border-[#BA6A4C] transition placeholder:text-gray-400"
              />
            </div>

          </div>

          <div>
            <label className="block text-[#607456] font-medium mb-3">
              Subject
            </label>

            <input
              type="text"
              placeholder="How can we help?"
              className="w-full bg-transparent border-b border-[#607456]/40 pb-3 outline-none focus:border-[#BA6A4C] transition placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-[#607456] font-medium mb-3">
              Message
            </label>

            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full bg-transparent border-b border-[#607456]/40 pb-3 outline-none resize-none focus:border-[#BA6A4C] transition placeholder:text-gray-400"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-[#BA6A4C] hover:bg-[#7B2525] text-white px-10 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Send Message →
            </button>
          </div>

        </form>

        {/* Divider */}

        <div className="my-20 border-t border-[#607456]/20"></div>

        {/* Contact Info */}

        <div className="grid md:grid-cols-3 gap-10 text-center">

          <div>
            <p className="uppercase tracking-widest text-xs text-[#BA6A4C] mb-2">
              Email
            </p>

            <p className="text-[#7B2525] font-medium">
              hello@dailybake.com
            </p>
          </div>

          <div>
            <p className="uppercase tracking-widest text-xs text-[#BA6A4C] mb-2">
              Phone
            </p>

            <p className="text-[#7B2525] font-medium">
              +880 1234 567890
            </p>
          </div>

          <div>
            <p className="uppercase tracking-widest text-xs text-[#BA6A4C] mb-2">
              Location
            </p>

            <p className="text-[#7B2525] font-medium">
              Dhaka, Bangladesh
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}