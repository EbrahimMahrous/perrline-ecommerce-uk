import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "../../../i18n/TranslationContext";
import CountUp from "react-countup";
export default function AboutUs() {
  const { t, isRTL } = useTranslation();
  return (
    <section className="py-20 relative overflow-hidden bg-bg-secondary">
      <div className="container-custom px-4 relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center bg-accent-2 text-[var(--color-primary)] px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <Users className="w-4 h-4 mr-2" />
            {t("aboutUs.title")}
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-[var(--color-primary)] mb-4">
            {t("aboutUs.heading.part1")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-1)]">
              {t("aboutUs.heading.highlighted")}
            </span>
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            {t("aboutUs.subheading")}
          </p>
        </motion.div>
        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Team Images*/}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-lg border border-light bg-bg-primary">
              <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-accent-2 to-primary-light relative">
                <motion.div
                  className="grid grid-cols-6 gap-2 p-8"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full ${
                        i % 3 === 0
                          ? "bg-primary"
                          : i % 3 === 1
                          ? "bg-accent-4"
                          : "bg-accent-3"
                      } opacity-80`}
                    ></div>
                  ))}
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center bg-primary/30 backdrop-blur-sm rounded-3xl">
                  <div className="text-white text-center p-6 bg-primary/80 rounded-2xl shadow-lg">
                    <Users className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold">
                      {t("aboutUs.team.title")}
                    </p>
                    <p className="text-sm mt-2">
                      {t("aboutUs.team.experience")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Text */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl text-secondary leading-relaxed">
              {t("aboutUs.description.part1")}{" "}
              <span className="font-semibold text-[var(--color-primary)]">
                {t("aboutUs.description.companyName")}
              </span>
              {t("aboutUs.description.part2")}{" "}
              <span className="font-semibold">
                {t("aboutUs.description.category1")}
              </span>{" "}
              {t("aboutUs.description.part3")}{" "}
              <span className="font-semibold">
                {t("aboutUs.description.category2")}
              </span>{" "}
              {t("aboutUs.description.part4")}{" "}
              <span className="font-semibold text-accent-4">
                {t("aboutUs.description.years")}
              </span>
              .
            </p>
            <p className="text-lg text-secondary leading-relaxed">
              {t("aboutUs.belief.part1")}{" "}
              <span className="font-semibold text-accent-3">
                {t("aboutUs.belief.highlighted")}
              </span>{" "}
              {t("aboutUs.belief.part2")}
            </p>
            {/* Numbers */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              {/* Years */}
              <div className="text-center p-4 bg-bg-primary rounded-xl shadow-sm border border-light">
                <div className="text-3xl font-bold text-[var(--color-primary)]">
                  <CountUp end={20} duration={2} suffix="+" />
                </div>
                <div className="text-sm text-secondary mt-1">
                  {t("aboutUs.stats.years")}
                </div>
              </div>
              {/* Clients */}
              <div className="text-center p-4 bg-bg-primary rounded-xl shadow-sm border border-light">
                <div className="text-3xl font-bold text-[var(--color-primary)]">
                  <CountUp end={500} duration={3} suffix="+" />
                </div>
                <div className="text-sm text-secondary mt-1">
                  {t("aboutUs.stats.clients")}
                </div>
              </div>
              {/* Products */}
              <div className="text-center p-4 bg-bg-primary rounded-xl shadow-sm border border-light">
                <div className="text-3xl font-bold text-[var(--color-primary)]">
                  <CountUp end={1000} duration={4} suffix="+" />
                </div>
                <div className="text-sm text-secondary mt-1">
                  {t("aboutUs.stats.products")}
                </div>
              </div>
              {/* Support */}
              <div className="text-center p-4 bg-bg-primary rounded-xl shadow-sm border border-light">
                <div className="text-3xl font-bold text-[var(--color-primary)]">
                  24/7
                </div>
                <div className="text-sm text-secondary mt-1">
                  {t("aboutUs.stats.support")}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
