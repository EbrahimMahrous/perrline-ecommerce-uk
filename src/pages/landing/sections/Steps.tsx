import { Search, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "../../../i18n/TranslationContext";
import step1Image from "../../../assets/quote.jpg";
import step2Image from "../../../assets/requestOrder.jpg";
import step3Image from "../../../assets/FINALISE.jpg";

export default function Steps() {
  const { t, isRTL } = useTranslation();

  const steps = [
    {
      number: "01",
      title: t("steps.step1.title"),
      description: t("steps.step1.description"),
      icon: <Search className="w-6 h-6" />,
      color: "text-color-accent-4",
      bgColor: "bg-color-accent-4",
      image: step1Image,
    },
    {
      number: "02",
      title: t("steps.step2.title"),
      description: t("steps.step2.description"),
      icon: <FileText className="w-6 h-6" />,
      color: "text-color-primary",
      bgColor: "bg-color-primary",
      image: step2Image,
    },
    {
      number: "03",
      title: t("steps.step3.title"),
      description: t("steps.step3.description"),
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-color-accent-3",
      bgColor: "bg-color-accent-3",
      image: step3Image,
    },
  ];

  return (
    <section className="py-16 bg-bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-accent-2 text-accent-1 px-4 py-2 rounded-full text-sm font-medium mb-4">
            {t("steps.header.getStarted")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
            {t("steps.header.title")}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            {t("steps.header.description")}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-bg-primary rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-border-light flex flex-col"
            >
              {/* Number Indicator */}
              <div
                className={`absolute top-4 left-4 w-8 h-8 rounded-full ${step.bgColor} text-white flex items-center justify-center text-sm font-bold z-10`}
              >
                {step.number}
              </div>

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                {/* Icon and Title */}
                <div className="flex items-center mb-4">
                  <div
                    className={`p-2 rounded-lg ${step.bgColor} bg-opacity-10 mr-3`}
                  >
                    <div className={step.color}>{step.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-text-primary text-opacity-80 mb-6 leading-relaxed flex-grow">
                  {step.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border-light">
                  <span className="text-sm text-text-primary text-opacity-70">
                    {t("steps.step")} {step.number}
                  </span>
                  {index < steps.length - 1 && (
                    <ArrowRight
                      className={`w-5 h-5 ${
                        step.color
                      } group-hover:translate-x-1 transition-transform duration-300 ${
                        isRTL ? "transform rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
