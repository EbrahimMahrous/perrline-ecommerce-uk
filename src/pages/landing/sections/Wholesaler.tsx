import {
  Globe,
  TrendingUp,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";

export default function Wholesaler() {
  return (
    <section className="py-20 bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight">
                Your Reliable Partner in{" "}
                <span className="text-[var(--primary-gold)]">Global Wholesale</span>
              </h1>

              <h2 className="text-xl lg:text-2xl text-[var(--text-secondary)] font-medium">
                Supplying Leading FMCG, Beauty, and Food & Beverage Brands
                Worldwide
              </h2>

              <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                At PERRKINE Wholesale, we connect retailers, distributors, and
                suppliers to an extensive portfolio of high-quality products
                from the world's most reputable manufacturers. We offer
                competitive prices, efficient logistics, and exceptional
                customer support to help your business grow.
              </p>
            </div>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Competitive wholesale prices",
                "Efficient global logistics",
                "Exceptional customer support",
                "Extensive product portfolio",
              ].map((text) => (
                <div key={text} className="flex items-center space-x-3">
                  <CheckCircle
                    className="text-[var(--primary-gold)] flex-shrink-0"
                    size={24}
                  />
                  <span className="text-[var(--text-primary)]">{text}</span>
                </div>
              ))}
            </div>

            <button className="bg-[var(--primary-gold)] hover:bg-[var(--primary-gold-dark)] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Start Partnership
            </button>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Large Card */}
              <div className="col-span-2 relative overflow-hidden rounded-2xl shadow-xl border border-[var(--border-light)]">
                <div className="h-64 bg-gradient-to-br from-[var(--accent-blue)] to-[var(--primary-gold)] flex items-center justify-center">
                  <div className="text-center text-white">
                    <Globe size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-bold">Global Network</h3>
                    <p className="text-sm opacity-90">Worldwide Distribution</p>
                  </div>
                </div>
              </div>

              {/* Small Card 1 */}
              <div className="relative overflow-hidden rounded-xl shadow-lg border border-[var(--border-light)]">
                <div className="h-32 bg-gradient-to-br from-[var(--accent-green)] to-[var(--primary-gold)] flex items-center justify-center">
                  <div className="text-center text-white">
                    <TrendingUp size={32} className="mx-auto mb-2" />
                    <h4 className="font-semibold">Growth</h4>
                  </div>
                </div>
              </div>

              {/* Small Card 2 */}
              <div className="relative overflow-hidden rounded-xl shadow-lg border border-[var(--border-light)]">
                <div className="h-32 bg-gradient-to-br from-[var(--accent-brown)] to-[var(--primary-gold-dark)] flex items-center justify-center">
                  <div className="text-center text-white">
                    <Award size={32} className="mx-auto mb-2" />
                    <h4 className="font-semibold">Quality</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-[var(--border-light)]">
              <div className="flex items-center space-x-3">
                <div className="bg-[var(--primary-gold-light)] p-2 rounded-lg">
                  <Users className="text-[var(--accent-brown)]" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--text-primary)]">
                    1000+
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    Happy Clients
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
