import { Globe, Truck, Shield, Clock } from "lucide-react";

/**
 * Perrline — GoFurther (Globe Edition)
 * — ألوان بالكامل من :root
 * — SVG كرة أرضية + دوران بطيء + مدن وخطوط اتصال
 * — بدون مكتبات خارجية
 */
export default function GoFurther() {
  const globalLocations = [
    { name: "New York", x: "25%", y: "35%" },
    { name: "London", x: "48%", y: "28%" },
    { name: "Dubai", x: "58%", y: "45%" },
    { name: "Singapore", x: "75%", y: "65%" },
    { name: "Sydney", x: "85%", y: "80%" },
    { name: "Tokyo", x: "82%", y: "40%" },
    { name: "Mumbai", x: "65%", y: "55%" },
    { name: "São Paulo", x: "35%", y: "75%" },
    { name: "Lagos", x: "50%", y: "60%" },
    { name: "Cairo", x: "52%", y: "45%" },
  ];

  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Network",
      description: "Connected to over 80 countries worldwide",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Shipping",
      description: "Streamlined freight and shipping process",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Trading",
      description: "Safe and reliable international transactions",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer assistance",
    },
  ];

  // أدوات مساعدة للـ SVG (نسبة مئوية -> رقم 0..100)
  const p = (v: string) => parseFloat(v);
  const cairo = globalLocations.find((l) => l.name === "Cairo")!;
  const cityLinks = globalLocations.filter((l) => l.name !== "Cairo");

  // مسار منحنى بسيط بين نقطتين (x1,y1) و (x2,y2) مع انحناءة خفيفة
  const makeCurve = (x1: number, y1: number, x2: number, y2: number, bend = 12) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    // اتجاه الانحناء يعتمد على موقع النقاط لنعطي إيحاء “عبر القارات”
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.max(Math.hypot(dx, dy), 1);
    // متجه عمودي للوصول لنقطة تحكم Q
    const nx = (-dy / len) * bend;
    const ny = (dx / len) * bend;
    const cx = mx + nx;
    const cy = my + ny;
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  };

  return (
    <section className="py-20 bg-[var(--bg-secondary)] text-[var(--text-primary)] overflow-hidden">
      {/* keyframes + helpers محلياً */}
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
        .shine-border { box-shadow: var(--shadow-lg); }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Globe */}
          <div className="relative">
            <div className="relative rounded-3xl p-8 backdrop-blur-sm shine-border border border-[var(--border-light)] bg-gradient-to-br from-[var(--accent-cream)] via-[var(--primary-gold-light)]/40 to-[var(--accent-blue)]/20">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden">
                {/* إطار ووسم */}
                <div className="absolute -top-4 -right-4 bg-[var(--primary-gold)] text-[var(--text-white)] px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  80+ Countries
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[var(--accent-blue)] text-[var(--text-white)] px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Perrline Global
                </div>

                {/* كرة الأرضية */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full"
                  aria-hidden
                >
                  {/* السماء/المحيط */}
                  <defs>
                    <radialGradient id="ocean" cx="50%" cy="45%" r="60%">
                      <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="1" />
                      <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0.9" />
                    </radialGradient>
                    <linearGradient id="meridian" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary-gold-light)" stopOpacity="0.0" />
                      <stop offset="50%" stopColor="var(--primary-gold-light)" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="var(--primary-gold-light)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* القرص الأساسي */}
                  <g transform="translate(50,50)">
                    <circle r="48" fill="url(#ocean)" className="animate-spin-slow origin-center" />

                    {/* خطوط الطول/العرض الذهبية الخفيفة */}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <g key={`lat-${i}`} opacity="0.18">
                        <circle r={38 - i * 5} fill="none" stroke="url(#meridian)" strokeWidth="0.4" />
                      </g>
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <g
                        key={`lon-${i}`}
                        transform={`rotate(${(i * 180) / 8})`}
                        opacity="0.18"
                      >
                        <ellipse rx="0.01" ry="45" fill="none" stroke="url(#meridian)" strokeWidth="0.5" />
                      </g>
                    ))}

                    {/* كتل قارات مبسطة (blobs) بلون أخضر زيتوني */}
                    <g className="animate-spin-slow origin-center" opacity="0.85">
                      <path
                        d="M-25,-5 C-5,-18 10,-10 25,-8 C35,-6 40,5 35,15 C28,25 10,28 -5,25 C-22,22 -35,10 -25,-5 Z"
                        fill="var(--accent-green)"
                      />
                      <path
                        d="M-15,-28 C-5,-32 10,-30 18,-26 C24,-22 26,-14 18,-10 C10,-6 -2,-8 -10,-12 C-18,-16 -23,-22 -15,-28 Z"
                        fill="var(--accent-green)"
                        opacity="0.9"
                      />
                      <path
                        d="M10,18 C20,14 30,16 36,20 C42,24 44,30 40,34 C36,38 26,38 18,34 C12,31 6,25 10,18 Z"
                        fill="var(--accent-green)"
                        opacity="0.9"
                      />
                    </g>
                  </g>

                  {/* خطوط الاتصال: Cairo -> باقي المدن (viewBox 0..100) */}
                  <g opacity="0.7">
                    {cityLinks.map((city, idx) => {
                      const x1 = p(city.x);
                      const y1 = p(city.y);
                      const x2 = p(cairo.x);
                      const y2 = p(cairo.y);
                      const d = makeCurve(x1, y1, x2, y2, 10 + (idx % 3) * 6);
                      return (
                        <path
                          key={`ln-${city.name}`}
                          d={d}
                          fill="none"
                          stroke="var(--primary-gold-light)"
                          strokeWidth="0.6"
                          strokeLinecap="round"
                          strokeDasharray="2 2"
                        />
                      );
                    })}
                  </g>
                </svg>

                {/* Pins المدن (متموضعة بالنسبة المئوية) */}
                <div className="absolute inset-0">
                  {globalLocations.map((loc, i) => (
                    <div
                      key={i}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group"
                      style={{ left: loc.x, top: loc.y }}
                    >
                      <div className="relative">
                        <div className="w-3.5 h-3.5 rounded-full bg-[var(--primary-gold)] ring-2 ring-[var(--accent-cream)] shadow"
                          title={loc.name}
                        />
                        <div className="absolute inset-0 rounded-full animate-ping bg-[var(--primary-gold)]/25" />
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[var(--accent-brown)] text-[var(--text-white)] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {loc.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-block bg-[var(--primary-gold-light)]/20 text-[var(--accent-brown)] px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-[var(--primary-gold-light)]/50">
                We Go Further — Perrline
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-[var(--text-primary)]">
                Your Global Wholesale{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-gold)] to-[var(--accent-brown)]">
                  Partner
                </span>
              </h2>
              <div className="space-y-4 text-lg text-[var(--text-secondary)] leading-relaxed">
                <p>
                  Across oceans, land and sky, <strong>Perrline</strong> connects
                  people with products in over 80 countries worldwide—powering your
                  growth with a dependable global network.
                </p>
                <p>
                  Our experienced team streamlines freight and shipping, guiding you
                  past common pitfalls of domestic and international exporting with
                  secure, on-time delivery.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-xl p-6 border bg-[var(--bg-primary)]/70 border-[var(--border-light)] hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="mb-3 text-[var(--primary-gold)] group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2 text-[var(--text-primary)]">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button className="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-gold-dark)] hover:brightness-110 text-[var(--text-white)] px-8 py-4 rounded-xl font-semibold text-lg transition-transform duration-300 hover:scale-105 shadow-xl flex items-center gap-3">
                <span>Explore Perrline Network</span>
                <Globe className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}