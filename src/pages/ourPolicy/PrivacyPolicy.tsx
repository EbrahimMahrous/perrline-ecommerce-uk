import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useTranslation } from "../../i18n/TranslationContext";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("intro");
  const { t } = useTranslation();

  const sections = [
    {
      id: "intro",
      title: t("privacy.sections.intro.title"),
      content: t("privacy.sections.intro.content"),
    },
    {
      id: "data-collection",
      title: t("privacy.sections.dataCollection.title"),
      content: t("privacy.sections.dataCollection.content"),
    },
    {
      id: "data-usage",
      title: t("privacy.sections.dataUsage.title"),
      content: t("privacy.sections.dataUsage.content"),
    },
    {
      id: "data-protection",
      title: t("privacy.sections.dataProtection.title"),
      content: t("privacy.sections.dataProtection.content"),
    },
    {
      id: "cookies",
      title: t("privacy.sections.cookies.title"),
      content: t("privacy.sections.cookies.content"),
    },
    {
      id: "rights",
      title: t("privacy.sections.rights.title"),
      content: t("privacy.sections.rights.content"),
    },
    {
      id: "sharing",
      title: t("privacy.sections.sharing.title"),
      content: t("privacy.sections.sharing.content"),
    },
    {
      id: "changes",
      title: t("privacy.sections.changes.title"),
      content: t("privacy.sections.changes.content"),
    },
  ];

  const contactInfo = {
    phone: "+44 7443 715994",
    email: "mohamedmansi@pearline.co.uk",
    address: "128, City Road, London, EC1V 2NX, UNITED KINGDOM",
    website: "www.pearline.co.uk",
  };

  return (
    <>
      <Navbar />
      <div className="container-custom my-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-4">
            {t("privacy.title")}
          </h1>
          <p className="text-muted text-lg">
            {t("privacy.lastUpdated")}:{" "}
            {new Date().toLocaleDateString(t("privacy.dateLocale"), {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-6 bg-bg-primary p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-[var(--color-primary)]">
                {t("privacy.sidebarTitle")}
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`block w-full text-left px-4 py-2 rounded transition-colors ${
                      activeSection === section.id
                        ? "bg-accent-2 text-[var(--color-primary)] font-medium"
                        : "text-muted hover:bg-bg-secondary"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-bg-primary p-8 rounded-lg shadow-md">
              {sections.map(
                (section) =>
                  activeSection === section.id && (
                    <div key={section.id}>
                      <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
                        {section.title}
                      </h2>
                      <div className="prose max-w-none text-secondary">
                        {section.content.split("\n").map((paragraph, idx) => (
                          <p key={idx} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  )
              )}

              {/* Contact Information */}
              {activeSection === "intro" && (
                <div className="mt-8 pt-6 border-t border-light">
                  <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
                    {t("privacy.contactTitle")}
                  </h3>
                  <p className="text-secondary mb-4">
                    {t("privacy.contactDescription")}
                  </p>
                  <ul className="text-secondary space-y-2">
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span>{contactInfo.phone}</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span>{contactInfo.email}</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{contactInfo.address}</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-[var(--color-primary)] mr-2 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{contactInfo.website}</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-accent-2 p-4 rounded-lg text-center">
                <svg
                  className="w-8 h-8 text-[var(--color-primary)] mx-auto mb-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="font-medium text-[var(--color-primary)] mb-1">
                  {t("privacy.actions.questions.title")}
                </h3>
                <p className="text-sm text-muted">
                  {t("privacy.actions.questions.description")}
                </p>
              </div>
              <div className="bg-bg-secondary p-4 rounded-lg text-center">
                <svg
                  className="w-8 h-8 text-accent-3 mx-auto mb-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="font-medium text-[var(--color-primary)] mb-1">
                  {t("privacy.actions.control.title")}
                </h3>
                <p className="text-sm text-muted">
                  {t("privacy.actions.control.description")}
                </p>
              </div>
              <div className="bg-bg-secondary p-4 rounded-lg text-center">
                <svg
                  className="w-8 h-8 text-accent-4 mx-auto mb-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="font-medium text-[var(--color-primary)] mb-1">
                  {t("privacy.actions.transparency.title")}
                </h3>
                <p className="text-sm text-muted">
                  {t("privacy.actions.transparency.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
