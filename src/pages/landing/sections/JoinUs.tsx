import { Ship, Users, ArrowRight } from "lucide-react";

export default function JoinUs() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#fdf6e3] to-[#fffaf0]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Become a Customer */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="https://unsplash.com/photos/pleasant-caucasian-consultant-glad-to-help-clients-in-cars-showroom-handsome-salesman-in-formal-suit-have-conversation-with-customers-cG9h9OXZjR4"
                alt="Customer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-gold-dark)]/90 to-[#d4af37]/70"></div>
            </div>

            {/* Icon */}
            <div className="absolute top-8 right-8 opacity-20 text-white">
              <Ship size={120} />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 h-80 flex flex-col justify-between text-white">
              <div>
                <h3 className="text-2xl font-bold mb-4 drop-shadow-lg">
                  Become a Customer
                </h3>
                <p className="text-lg leading-relaxed opacity-90 drop-shadow">
                  Unlock exclusive access to leading global brands, competitive
                  pricing, and tailored solutions for your business needs.
                </p>
              </div>

              <button className="self-start bg-white text-[var(--primary-gold-dark)] hover:bg-[var(--primary-gold-dark)] hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 group">
                <span>Sign Up</span>
                <ArrowRight
                  size={18}
                  className="transform group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </div>
          </div>

          {/* Become a Supplier */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                alt="Supplier"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/80 to-red-600/70"></div>
            </div>

            {/* Icon */}
            <div className="absolute top-8 right-8 opacity-20 text-white">
              <Users size={120} />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 h-80 flex flex-col justify-between text-white">
              <div>
                <h3 className="text-2xl font-bold mb-4 drop-shadow-lg">
                  Become a Supplier
                </h3>
                <p className="text-lg leading-relaxed opacity-90 drop-shadow">
                  Partner with us to expand your reach and connect with a global
                  network of retailers and distributors.
                </p>
              </div>

              <button className="self-start bg-white text-orange-600 hover:bg-orange-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 group">
                <span>Sign Up</span>
                <ArrowRight
                  size={18}
                  className="transform group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Join Our Growing Network
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Whether you're sourcing premium products or expanding your reach, we
            provide the platform and support you need to succeed globally.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: "1000+", label: "Active Customers" },
              { value: "500+", label: "Trusted Suppliers" },
              { value: "100+", label: "Countries Served" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-[var(--primary-gold-dark)] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
