import { Ship, Users, ArrowRight } from "lucide-react";
import { useTranslation } from "../../../i18n/TranslationContext";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import becomeCustommer from "../../../assets/Customer.jpeg";
import becomeSupplier from "../../../assets/Supplier.jpeg";
import { useNavigate } from "react-router-dom";

export default function JoinUs() {
  const { t, isRTL } = useTranslation();
  const navigate = useNavigate();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cards = [
    {
      type: "customer",
      image: becomeCustommer,
      icon: Ship,
      gradient:
        "from-[var(--color-primary-dark)]/90 to-[var(--color-primary)]/80",
      title: t("joinUs.customer.title"),
      description: t("joinUs.customer.description"),
      alt: t("joinUs.customer.imageAlt"),
      buttonText: t("joinUs.buttons.signUp"),
    },
    {
      type: "supplier",
      image: becomeSupplier,
      icon: Users,
      gradient:
        "from-[var(--color-accent-4-dark)]/85 to-[var(--color-accent-4)]/75",
      title: t("joinUs.supplier.title"),
      description: t("joinUs.supplier.description"),
      alt: t("joinUs.supplier.imageAlt"),
      buttonText: t("joinUs.buttons.signUp"),
    },
  ];

  const stats = [
    { key: "customers", value: 1000 },
    { key: "suppliers", value: 500 },
    { key: "countries", value: 100 },
  ];

  return (
    <section className="py-16 bg-bg-secondary">
      <div className="container-custom">
        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.type}
                className="relative overflow-hidden rounded-xl shadow-lg group hover:shadow-xl transition-all duration-500"
              >
                {/* Background Image with Lazy Loading */}
                <div className="absolute inset-0">
                  <img
                    src={card.image}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    alt={card.alt}
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`}
                  ></div>
                </div>
                {/* Decorative Icon */}
                <div
                  className={`absolute top-6 ${
                    isRTL ? "left-6" : "right-6"
                  } opacity-15 text-white transform group-hover:scale-110 transition-transform duration-700`}
                >
                  <IconComponent size={100} />
                </div>
                {/* Content */}
                <div className="relative z-10 p-6 h-72 flex flex-col justify-between text-white">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-shadow">
                      {card.title}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed opacity-95 text-shadow max-w-md">
                      {card.description}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="self-start bg-white text-[var(--color-primary)] hover:bg-primary px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md flex items-center space-x-2 group/btn"
                    aria-label={`${card.buttonText} - ${card.title}`}
                  >
                    <span>{card.buttonText}</span>
                    <ArrowRight
                      size={16}
                      className={`transform group-hover/btn:translate-x-1 transition-transform duration-300 ${
                        isRTL ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* Stats Section */}
        <div ref={ref} className="mt-16 text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-text-[var(--color-primary)] mb-4">
            {t("joinUs.network.title")}
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
            {t("joinUs.network.description")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-bg-primary p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-color-accent-4 mb-2">
                  {inView ? (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix="+"
                      delay={0.5}
                    />
                  ) : (
                    "0+"
                  )}
                </div>
                <div className="text-text-secondary font-medium">
                  {t(`joinUs.stats.${stat.key}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
