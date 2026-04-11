import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useTranslation } from "../i18n/TranslationContext";
import bannerPearline from "../assets/ads1.jpg";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSection {
  category: string;
  questions: FAQItem[];
}

const FAQS: React.FC = () => {
  const { t } = useTranslation();

  const faqs: FAQSection[] = [
    {
      category: t("faqs.categories.orders"),
      questions: [
        {
          q: t("faqs.questions.shippingTime"),
          a: t("faqs.answers.shippingTime"),
        },
        {
          q: t("faqs.questions.trackOrder"),
          a: t("faqs.answers.trackOrder"),
        },
        {
          q: t("faqs.questions.internationalShipping"),
          a: t("faqs.answers.internationalShipping"),
        },
        {
          q: t("faqs.questions.lostPackage"),
          a: t("faqs.answers.lostPackage"),
        },
        {
          q: t("faqs.questions.changeAddress"),
          a: t("faqs.answers.changeAddress"),
        },
      ],
    },
    {
      category: t("faqs.categories.payments"),
      questions: [
        {
          q: t("faqs.questions.paymentMethods"),
          a: t("faqs.answers.paymentMethods"),
        },
        {
          q: t("faqs.questions.paymentSecurity"),
          a: t("faqs.answers.paymentSecurity"),
        },
        {
          q: t("faqs.questions.refundTime"),
          a: t("faqs.answers.refundTime"),
        },
        {
          q: t("faqs.questions.partialRefund"),
          a: t("faqs.answers.partialRefund"),
        },
        {
          q: t("faqs.questions.storeCredit"),
          a: t("faqs.answers.storeCredit"),
        },
      ],
    },
    {
      category: t("faqs.categories.products"),
      questions: [
        {
          q: t("faqs.questions.productsStock"),
          a: t("faqs.answers.productsStock"),
        },
        {
          q: t("faqs.questions.bulkDiscounts"),
          a: t("faqs.answers.bulkDiscounts"),
        },
        {
          q: t("faqs.questions.requestProduct"),
          a: t("faqs.answers.requestProduct"),
        },
        {
          q: t("faqs.questions.restockItems"),
          a: t("faqs.answers.restockItems"),
        },
        {
          q: t("faqs.questions.productsSource"),
          a: t("faqs.answers.productsSource"),
        },
      ],
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let questionCounter = 0;

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="">
        <div className="max-w-5xl mx-auto px-4 py-10 text-center">
          <img
            src={bannerPearline}
            alt={t("faqs.bannerAlt")}
            className="w-[50%] m-auto rounded-lg shadow-md mb-6"
            loading="lazy"
          />
          <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
            {t("faqs.title")}
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            {t("faqs.description.part1")}{" "}
            <a
              href="/contact"
              className="text-[var(--color-primary)] hover:text-[var(--primary-gold-dark)] font-semibold"
            >
              {t("faqs.description.link")}
            </a>
            {t("faqs.description.part2")}
          </p>
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {faqs.map((section, secIdx) => (
          <div key={secIdx} className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
              {section.category}
            </h2>
            <div className="space-y-3">
              {section.questions.map((item, qIdx) => {
                const currentIndex = questionCounter++;
                const isOpen = openIndex === currentIndex;
                return (
                  <div
                    key={qIdx}
                    className="bg-[var(--bg-primary)] shadow-sm border border-[var(--border-light)] rounded-lg"
                  >
                    <button
                      className="w-full text-left px-4 py-3 font-semibold text-[var(--text-primary)] flex justify-between items-center"
                      onClick={() => toggleFAQ(currentIndex)}
                    >
                      {item.q}
                      <span className="text-[var(--color-primary)]">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-3 text-[var(--text-secondary)]">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default FAQS;
