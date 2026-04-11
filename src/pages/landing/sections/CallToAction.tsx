import {
  ArrowRight,
  Users,
  ShoppingBag,
  Zap,
  Gift,
  Crown,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "../../../i18n/TranslationContext";
import { useNavigate } from "react-router-dom";

export default function CallToAction() {
  const { t, isRTL } = useTranslation();
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: t("cta.benefits.delivery.title"),
      description: t("cta.benefits.delivery.description"),
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: t("cta.benefits.pricing.title"),
      description: t("cta.benefits.pricing.description"),
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: t("cta.benefits.quality.title"),
      description: t("cta.benefits.quality.description"),
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t("cta.benefits.support.title"),
      description: t("cta.benefits.support.description"),
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-bg-secondary">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Subtle Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-custom relative z-10">
        {/* CTA Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-accent-2 backdrop-blur-sm text-[var(--color-primary)] px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-medium">
            <Sparkles className="w-4 h-4 mr-2 text-[var(--color-primary)]" />
            {t("cta.header.ready")}
          </div>

          <h2 className="text-5xl lg:text-7xl font-bold text-[var(--color-primary)] mb-8 leading-tight">
            {t("cta.heading.part1")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-1)]">
              {t("cta.heading.highlighted")}
            </span>
            <br />
            {t("cta.heading.part2")}
          </h2>

          <p className="text-xl lg:text-2xl text-secondary max-w-4xl mx-auto mb-12 leading-relaxed">
            {t("cta.description")}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="group text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center space-x-3 min-w-[200px]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundImage =
                  "linear-gradient(to right, var(--color-primary), var(--color-primary-light))";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundImage =
                  "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))";
              }}
            >
              <span>{t("cta.buttons.getStarted")}</span>
              <ArrowRight
                className={`w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ${
                  isRTL ? "transform rotate-180" : ""
                }`}
              />
            </button>
            <button
              onClick={() => {
                navigate("/all-products");
              }}
              className="group bg-white/90 backdrop-blur-sm hover:bg-white text-[var(--color-primary)] px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 border border-medium flex items-center space-x-3 min-w-[200px]"
            >
              <span>{t("cta.buttons.viewCatalog")}</span>
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="group">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 hover:bg-white transition-all duration-300 hover:scale-105 border border-medium text-center">
                <div
                  className="inline-flex items-center justify-center w-12 h-12 text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--color-primary-dark), var(--color-primary))",
                  }}
                >
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-secondary text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
