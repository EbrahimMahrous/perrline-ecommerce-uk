import { Globe, Truck, Shield, Clock } from "lucide-react";
import { useTranslation } from "../../../i18n/TranslationContext";

export default function GoFurther() {
  const { t, language } = useTranslation();

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
      title: t("goFurther.features.global.title"),
      description: t("goFurther.features.global.description"),
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: t("goFurther.features.shipping.title"),
      description: t("goFurther.features.shipping.description"),
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t("goFurther.features.trading.title"),
      description: t("goFurther.features.trading.description"),
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t("goFurther.features.support.title"),
      description: t("goFurther.features.support.description"),
    },
  ];

  const p = (v: string) => parseFloat(v);
  const cairo = globalLocations.find((l) => l.name === "Cairo")!;
  const cityLinks = globalLocations.filter((l) => l.name !== "Cairo");

  const makeCurve = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    bend = 12
  ) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.max(Math.hypot(dx, dy), 1);
    const nx = (-dy / len) * bend;
    const ny = (dx / len) * bend;
    const cx = mx + nx;
    const cy = my + ny;
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  };

  return (
    <section
      className="py-20 bg-[var(--bg-secondary)] text-[var(--color-primary)] overflow-hidden"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* keyframes + helpers */}
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
        .shine-border { box-shadow: var(--shadow-lg); }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Globe */}
          <div className="relative">
            <div className="relative rounded-3xl p-8 backdrop-blur-sm shine-border border border-[var(--border-light)] bg-gradient-to-br from-[var(--color-accent-2)] via-[var(--color-primary-light)]/40 to-[var(--color-accent-3)]/20">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden">
                {/* Earth*/}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full"
                  aria-hidden
                >
                  <defs>
                    <radialGradient id="ocean" cx="50%" cy="45%" r="60%">
                      <stop
                        offset="0%"
                        stopColor="var(--color-accent-3)"
                        stopOpacity="1"
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--color-accent-3)"
                        stopOpacity="0.9"
                      />
                    </radialGradient>
                    <linearGradient id="meridian" x1="0" x2="0" y1="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="var(--color-primary-light)"
                        stopOpacity="0.0"
                      />
                      <stop
                        offset="50%"
                        stopColor="var(--color-primary-light)"
                        stopOpacity="0.35"
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--color-primary-light)"
                        stopOpacity="0.0"
                      />
                    </linearGradient>
                  </defs>
                  {/* Primary disk*/}
                  <g transform="translate(50,50)">
                    <circle
                      r="36"
                      fill="url(#ocean)"
                      className="animate-spin-slow origin-center"
                    />
                    {/* Line Gold */}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <g key={`lat-${i}`} opacity="0.18">
                        <circle
                          r={38 - i * 5}
                          fill="none"
                          stroke="url(#meridian)"
                          strokeWidth="0.4"
                        />
                      </g>
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <g
                        key={`lon-${i}`}
                        transform={`rotate(${(i * 180) / 8})`}
                        opacity="0.18"
                      >
                        <ellipse
                          rx="0.01"
                          ry="45"
                          fill="none"
                          stroke="url(#meridian)"
                          strokeWidth="0.5"
                        />
                      </g>
                    ))}
                  </g>
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
                          stroke="var(--color-primary-light)"
                          strokeWidth="0.6"
                          strokeLinecap="round"
                          strokeDasharray="2 2"
                        />
                      );
                    })}
                  </g>
                </svg>
                {/* Pins [cities]*/}
                <div className="absolute inset-0">
                  {globalLocations.map((loc, i) => (
                    <div
                      key={i}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group"
                      style={{ left: loc.x, top: loc.y }}
                    >
                      <div className="relative">
                        <div
                          className="w-3.5 h-3.5 rounded-full bg-[var(--color-primary)] ring-2 ring-[var(--color-accent-2)] shadow"
                          title={loc.name}
                        />
                        <div className="absolute inset-0 rounded-full animate-ping bg-[var(--color-primary)]/25" />
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[var(--color-accent-1)] text-[var(--text-white)] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
              <div className="inline-block bg-[var(--color-accent-2)] text-[var(--color-accent-1)] px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-[var(--color-accent-2)]">
                {t("goFurther.badge")}
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-[var(--color-primary)]">
                {t("goFurther.title.line1")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-1)]">
                  {t("goFurther.title.line2")}
                </span>
              </h2>
              <div className="space-y-4 text-lg text-[var(--text-secondary)] leading-relaxed">
                <p>
                  {t("goFurther.description.line1")} <strong>Pearline</strong>{" "}
                  {t("goFurther.description.line2")}
                </p>
                <p>{t("goFurther.description.line3")}</p>
              </div>
            </div>
            {/* Features */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-xl p-6 border bg-[var(--bg-primary)]/70 border-[var(--border-light)] hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="mb-3 text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2 text-[var(--color-primary)]">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
