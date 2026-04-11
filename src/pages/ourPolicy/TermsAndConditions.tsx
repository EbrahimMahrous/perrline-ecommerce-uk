import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../i18n/TranslationContext";

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const sections = [
    {
      title: t("terms.sections.welcome.title"),
      content: t("terms.sections.welcome.content"),
    },
    {
      title: t("terms.sections.privacy.title"),
      content: t("terms.sections.privacy.content"),
    },
    {
      title: t("terms.sections.content.title"),
      content: t("terms.sections.content.content"),
    },
    {
      title: t("terms.sections.intellectual.title"),
      content: t("terms.sections.intellectual.content"),
    },
    {
      title: t("terms.sections.links.title"),
      content: t("terms.sections.links.content"),
    },
    {
      title: t("terms.sections.law.title"),
      content: t("terms.sections.law.content"),
    },
  ];

  const promises = [
    t("terms.promises.transparency"),
    t("terms.promises.privacy"),
    t("terms.promises.feedback"),
    t("terms.promises.fairness"),
  ];

  return (
    <>
      <Navbar />
      <div className="container-custom py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
            {t("terms.title")}
          </h1>
          <p className="text-muted">{t("terms.subtitle")}</p>
        </div>

        <div className="bg-bg-primary p-6 rounded-xl shadow-lg">
          {/* Progress/Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === activeSection
                    ? "bg-primary text-white"
                    : "bg-bg-secondary text-secondary hover:bg-accent-2"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-bg-secondary p-6 rounded-lg mb-6 shadow-inner">
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
              {sections[activeSection].title}
            </h2>
            <p className="text-secondary leading-relaxed">
              {sections[activeSection].content}
            </p>
          </div>

          {/* Our Promise */}
          <div className="bg-accent-2 p-6 rounded-lg mb-6 border border-light">
            <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-3">
              {t("terms.promiseTitle")}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {promises.map((promise, idx) => (
                <li key={idx} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-accent-3 mr-2 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-secondary">{promise}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Acceptance */}
          <div className="bg-bg-secondary p-6 rounded-lg text-center">
            <div className="flex items-center justify-center mb-4">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={accepted}
                onChange={() => setAccepted(!accepted)}
                className="h-5 w-5 text-[var(--color-primary)] rounded focus:ring-primary"
              />
              <label
                htmlFor="acceptTerms"
                className="ml-2 text-secondary font-medium"
              >
                {t("terms.acceptLabel")}
              </label>
            </div>
            <button
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                accepted
                  ? "bg-primary hover:bg-primary-dark text-white"
                  : "bg-bg-secondary text-muted cursor-not-allowed"
              }`}
              disabled={!accepted}
              onClick={() => navigate("/")}
            >
              {t("terms.continueButton")}
            </button>
          </div>

          {/* Footer note */}
          <div className="text-center text-sm text-muted mt-6">
            {t("terms.lastUpdated")}:{" "}
            {new Date().toLocaleDateString(t("terms.dateLocale"), {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
