import { useEffect, useState } from "react";
import { Globe, TrendingUp, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "../../../i18n/TranslationContext";

export default function Wholesaler() {
  const { t, language } = useTranslation();
  const [, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = 1000;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 10;
      setCount((prev) => (prev < end ? prev + 10 : end));
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="py-20 w-[90%] m-auto"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl lg:text-5xl font-bold text-[var(--color-primary)] leading-tight"
              >
                {t("wholesaler.title.line1")}{" "}
                <span className="text-accent-4">
                  {t("wholesaler.title.line2")}
                </span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl lg:text-2xl text-secondary font-medium"
              >
                {t("wholesaler.subtitle")}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted leading-relaxed"
              >
                {t("wholesaler.description")}
              </motion.p>
            </div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {[
                t("wholesaler.features.competitive"),
                t("wholesaler.features.logistics"),
                t("wholesaler.features.support"),
                t("wholesaler.features.portfolio"),
              ].map((text) => (
                <div key={text} className="flex items-center space-x-3">
                  <CheckCircle
                    className="text-accent-4 flex-shrink-0"
                    size={24}
                  />
                  <span className="text-primary">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="p-6">
            <div className="relative max-w-5xl mx-auto">
              <div className="grid grid-cols-2 gap-4">
                {/* Large Card */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="col-span-2 relative overflow-hidden rounded-2xl shadow-lg border border-light"
                >
                  <div className="h-64 bg-accent-4 flex items-center justify-center">
                    <motion.div
                      transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "linear",
                      }}
                      className="text-center text-white"
                    >
                      <Globe size={48} className="mx-auto mb-4" />
                      <h3 className="text-xl font-bold">
                        {t("wholesaler.cards.global.title")}
                      </h3>
                      <p className="text-sm opacity-90">
                        {t("wholesaler.cards.global.subtitle")}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Small Card 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-xl shadow-md border border-light"
                >
                  <div className="h-32 bg-accent-3 flex items-center justify-center">
                    <div className="text-center text-white">
                      <TrendingUp size={32} className="mx-auto mb-2" />
                      <h4 className="font-semibold">
                        {t("wholesaler.cards.growth.title")}
                      </h4>
                    </div>
                  </div>
                </motion.div>

                {/* Small Card 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-xl shadow-md border border-light"
                >
                  <div className="h-32 bg-accent-1 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Award size={32} className="mx-auto mb-2" />
                      <h4 className="font-semibold">
                        {t("wholesaler.cards.quality.title")}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
