import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSection {
  category: string;
  questions: FAQItem[];
}

const FAQS: React.FC = () => {
  const faqs: FAQSection[] = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          q: "How long does shipping take?",
          a: "Shipping usually takes 3-5 business days depending on your location.",
        },
        {
          q: "Can I track my order?",
          a: "Yes, once your order ships you will receive a tracking number via email.",
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship worldwide with varying delivery times.",
        },
        {
          q: "What happens if my package is lost?",
          a: "Please contact our support team and we’ll investigate immediately.",
        },
        {
          q: "Can I change my shipping address after placing an order?",
          a: "Yes, but only before the order has been shipped.",
        },
      ],
    },
    {
      category: "Payments & Refunds",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept credit cards, PayPal, and bank transfers.",
        },
        {
          q: "Is my payment information secure?",
          a: "Yes, all payments are processed through encrypted gateways.",
        },
        {
          q: "How long does it take to receive a refund?",
          a: "Refunds are processed within 5-7 business days.",
        },
        {
          q: "Can I get a partial refund?",
          a: "Yes, depending on the circumstances of the return.",
        },
        {
          q: "Do you offer store credit?",
          a: "Yes, store credits are available as an alternative to refunds.",
        },
      ],
    },
    {
      category: "Products & Stock",
      questions: [
        {
          q: "Are all products in stock?",
          a: "We aim to keep all items in stock, but availability may vary.",
        },
        {
          q: "Do you offer bulk discounts?",
          a: "Yes, contact our sales team for bulk pricing.",
        },
        {
          q: "Can I request a product that's not listed?",
          a: "Yes, reach out and we’ll do our best to source it.",
        },
        {
          q: "Do you restock sold-out items?",
          a: "Popular items are often restocked, so keep an eye on our store.",
        },
        {
          q: "Where are your products sourced from?",
          a: "Our products are sourced from trusted global suppliers.",
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
      <div className="bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto px-4 py-10 text-center">
          <img
            src="https://via.placeholder.com/1200x400"
            alt="FAQ Banner"
            className="w-full rounded-lg shadow-md mb-6"
          />
          <h1 className="text-3xl font-bold text-[var(--accent-brown)] mb-4">
            We’re Here to Help
          </h1>
          <p className="text-[var(--text-secondary)] text-lg">
            Find answers to common questions below. If you still can’t find what
            you’re looking for,{" "}
            <a
              href="/contact"
              className="text-[var(--primary-gold)] hover:text-[var(--primary-gold-dark)] font-semibold"
            >
              contact us here
            </a>
            .
          </p>
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {faqs.map((section, secIdx) => (
          <div key={secIdx} className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--primary-gold)] mb-4">
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
                      <span className="text-[var(--primary-gold)]">
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
