import { Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section className="py-20 relative overflow-hidden bg-[var(--bg-secondary)]">
      {/* خلفيات دائرية متحركة */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl bg-[var(--primary-gold-light)]"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full blur-3xl bg-[var(--accent-blue)] opacity-40"
        animate={{ x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* العنوان */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center bg-[var(--accent-cream)] text-[var(--primary-gold)] px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <Users className="w-4 h-4 mr-2" />
            About Us
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-[var(--text-primary)]">
            Actually, it's about{" "}
            <span className="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--accent-green)] bg-clip-text text-transparent">
              you
            </span>
          </h2>
        </motion.div>

        {/* المحتوى */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* صورة الفريق */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-lg border border-[var(--border-light)] bg-[var(--bg-primary)]">
              <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-[var(--accent-cream)] to-[var(--primary-gold-light)] relative">
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
                          ? "bg-[var(--primary-gold)]"
                          : i % 3 === 1
                          ? "bg-[var(--accent-green)]"
                          : "bg-[var(--accent-blue)]"
                      } opacity-80`}
                    ></div>
                  ))}
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="text-white text-center">
                    <Users className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <p className="text-lg font-semibold">Our Amazing Team</p>
                  </div>
                </div>
              </div>

              {/* عناصر طافية */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-md p-4"
                whileHover={{ scale: 1.1 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[var(--accent-green)] rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    Active Team
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-[var(--primary-gold)] to-[var(--accent-brown)] text-white rounded-2xl shadow-md p-4"
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">20+</div>
                  <div className="text-xs opacity-90">Years</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* النص */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
              At{" "}
              <span className="font-semibold text-[var(--primary-gold)]">
                SIAN Wholesale
              </span>
              , we're your trusted wholesale distributor for{" "}
              <span className="font-semibold">Toiletries, Health & Beauty</span>{" "}
              and <span className="font-semibold">Household</span> goods, proudly serving for{" "}
              <span className="font-semibold text-[var(--accent-green)]">
                20+ years
              </span>
              .
            </p>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              We believe our success is tied to yours — that’s why{" "}
              <span className="font-semibold text-[var(--accent-blue)]">
                our team is your team
              </span>{" "}
              working hand in hand to meet your needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="bg-[var(--primary-gold)] hover:bg-[var(--primary-gold-dark)] text-white px-8 py-4 rounded-xl font-semibold shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                Partner With Us
              </motion.button>
              <motion.button
                className="border-2 border-[var(--border-medium)] hover:border-[var(--primary-gold)] text-[var(--text-primary)] px-8 py-4 rounded-xl font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
