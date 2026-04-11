import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../i18n/TranslationContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import teamImage from "../assets/connect-people1.jpeg";
import globalMap from "../assets/Worldwide Distribution Network.jpg";
import pricingImage from "../assets/Strategic Sourcing Advantages.jpeg";
import partnershipImage from "../assets/global.png";
import serviceImage from "../assets/customer1.jpeg";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="bg-bg-secondary py-20 px-6 md:px-20 flex items-center justify-center text-center">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="show"
          variants={fadeInUp}
        >
          <div className="mb-6">
            <span className="inline-block bg-accent-2 text-accent-4 text-sm font-semibold py-1 px-3 rounded-full mb-3">
              {t("about.hero.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4 relative pb-3 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-16 after:h-1 after:bg-accent-4">
              {t("about.hero.title")}
            </h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-accent-4 mb-6">
            {t("about.hero.subtitle")}
          </h2>
          <p className="text-secondary text-lg leading-relaxed mb-8">
            {t("about.hero.description")}
          </p>
          <button
            className="bg-accent-4 hover:bg-accent-4-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
            onClick={() => navigate("/all-products")}
          >
            {t("about.hero.button")}
          </button>
        </motion.div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-20 px-6 md:px-20 bg-bg-primary">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {/* <h2 className="text-3xl font-bold text-accent-4 mb-4 relative inline-block pb-2 after:content-[''] after:absolute after:left-1/4 after:bottom-0 after:w-1/2 after:h-1 after:bg-accent-4">
              {t("about.commitment.title")}
            </h2>
            <p className="text-muted max-w-3xl mx-auto">
              {t("about.commitment.subtitle")}
            </p> */}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <img
                src={teamImage}
                alt="Collaborative Partnership"
                className="rounded-lg shadow-lg w-full"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-semibold text-[var(--color-primary)] mb-4 flex items-center">
                <span className="inline-block w-3 h-3 bg-accent-4 rounded-full mr-3"></span>
                {t("about.commitment.sectionTitle")}
              </h3>
              <p className="text-secondary leading-relaxed mb-6">
                {t("about.commitment.description")}
              </p>
              <button
                className="bg-white border border-accent-4 text-accent-4 hover:bg-[var(--color-accent-4)] hover:text-white font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-sm"
                onClick={() => navigate("/contact")}
              >
                {t("about.commitment.button")}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
                  {t("about.network.title")}
                </h2>
                <div className="w-20 h-1 bg-accent-4 mb-4"></div>
                <h3 className="text-xl font-semibold text-accent-4 mb-4">
                  {t("about.network.subtitle")}
                </h3>
              </div>
              <p className="text-secondary leading-relaxed mb-4">
                {t("about.network.description1")}
              </p>
              <p className="text-secondary leading-relaxed mb-8">
                {t("about.network.description2")}
              </p>
              {/* <button className="bg-accent-4 hover:bg-accent-4-dark text-white font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-md">
                {t("about.network.button")}
              </button> */}
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <img
                src={globalMap}
                alt="Global Distribution Network"
                className="rounded-lg w-full"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 px-6 md:px-20 bg-bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 md:order-1"
            >
              <img
                src={pricingImage}
                alt="Strategic Sourcing Advantages"
                className="rounded-lg shadow-lg w-full"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-1 md:order-2"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[var(--color-primary)]  mb-2">
                  {t("about.value.title")}
                </h2>
                <div className="w-20 h-1 bg-accent-4 mb-4"></div>
              </div>
              <p className="text-secondary leading-relaxed mb-4">
                {t("about.value.description")}
              </p>
              <div className="bg-accent-2 p-4 rounded-lg border-l-4 border-accent-4 mb-6">
                <p className="font-semibold text-accent-4">
                  {t("about.value.insight")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-accent-4 hover:bg-accent-4-dark text-white font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-md">
                  {t("about.value.button1")}
                </button>
                <button
                  className="bg-white border border-accent-4 text-accent-4 hover:bg-[var(--color-accent-4)] hover:text-white font-semibold py-2.5 px-6 rounded-lg transition-colors"
                  onClick={() => navigate("/all-products")}
                >
                  {t("about.value.button2")}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client-Centric Approach Section */}
      <section className="py-20 px-6 md:px-20 bg-bg-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="mb-8">
                <span className="inline-block bg-accent-2 text-accent-4 text-xs font-semibold py-1 px-3 rounded-full mb-3">
                  {t("about.client.badge")}
                </span>
                <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
                  {t("about.client.title")}
                </h2>
                <div className="w-20 h-1 bg-accent-4 mb-4"></div>
              </div>
              <p className="text-secondary leading-relaxed mb-6">
                {t("about.client.description")}
              </p>
              {/* <button className="bg-accent-4 hover:bg-accent-4-dark text-white font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-md">
                {t("about.client.button")}
              </button> */}
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <img
                src={partnershipImage}
                alt="Strategic Business Alliance"
                className="rounded-lg w-full"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Services Section */}
      <section className="py-20 px-6 md:px-20 bg-bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 md:order-1"
            >
              <img
                src={serviceImage}
                alt="Dedicated Account Management"
                className="rounded-lg shadow-lg w-full"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-1 md:order-2"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
                  {t("about.support.title")}
                </h2>
                <div className="w-20 h-1 bg-accent-4 mb-4"></div>
              </div>
              <p className="text-secondary leading-relaxed mb-4">
                {t("about.support.description1")}
              </p>
              <p className="text-secondary leading-relaxed mb-8">
                {t("about.support.description2")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-accent-4 hover:bg-accent-4-dark text-white font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-md">
                  {t("about.support.button1")}
                </button>
                <button
                  className="bg-white border border-accent-4 text-accent-4 hover:bg-[var(--color-accent-4)] hover:text-white font-semibold py-2.5 px-6 rounded-lg transition-colors"
                  onClick={() => navigate("/contact")}
                >
                  {t("about.support.button2")}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* European Operations Section */}
      <section className="py-20 px-6 md:px-20 bg-bg-secondary text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="mb-8">
              <span className="inline-block bg-accent-2 text-accent-4 text-xs font-semibold py-1 px-3 rounded-full mb-3">
                {t("about.europe.badge")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-2">
                {t("about.europe.title")}
              </h2>
              <div className="w-20 h-1 bg-accent-4 mx-auto mb-4"></div>
            </div>

            <p className="text-secondary text-lg leading-relaxed mb-6">
              {t("about.europe.description")}
            </p>

            {/* <button className="bg-accent-4 hover:bg-accent-4-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg">
              {t("about.europe.button")}
            </button> */}
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;
