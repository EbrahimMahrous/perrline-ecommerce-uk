"use client";
import { useTranslation } from "../i18n/TranslationContext";
import { Link } from "react-router-dom";
import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaSnapchatGhost,
  FaTiktok,
  FaInstagram,
  FaArrowRight,
  FaBuilding,
  FaStar,
} from "react-icons/fa";

const XIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const { t, isRTL } = useTranslation();

  const footerSections = [
    {
      title: t("footer.getInTouch"),
      items: [
        {
          icon: <FaPhone className="w-4 h-4" />,
          text: t("footer.phone"),
          link: "tel:+447443715994",
        },
        {
          icon: <FaEnvelope className="w-4 h-4" />,
          text: t("footer.email"),
          link: "mailto:info@pearline.co.uk",
        },
      ],
    },
    {
      title: t("footer.becomeCustomer"),
      items: [
        { text: t("footer.allProducts"), link: "/all-products" },
        { text: t("footer.brandSearch"), link: "/all-brands" },
        { text: t("footer.aboutUs"), link: "/about" },
        { text: t("footer.contact"), link: "/contact" },
      ],
    },
    {
      title: t("footer.becomeSupplier"),
      items: [
        { text: t("footer.distribution"), link: "/order" },
        { text: t("footer.warehousing"), link: "/warehousing" },
        { text: t("footer.freightShipping"), link: "/shipping" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: <FaLinkedinIn className="w-5 h-5" />,
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/pearline-trading-726aab380/",
    },
    {
      icon: <FaFacebookF className="w-5 h-5" />,
      name: "Facebook",
      link: "https://www.facebook.com/profile.php?id=61580350830939",
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      name: "Instagram",
      link: "https://www.instagram.com/pearlinetrading",
    },
    {
      icon: <XIcon />,
      name: "X (Twitter)",
      link: "https://x.com/pearlinetrading",
    },
    {
      icon: <FaSnapchatGhost className="w-5 h-5" />,
      name: "Snapchat",
      link: "https://www.snapchat.com/@pearlinetrading",
    },
    {
      icon: <FaTiktok className="w-5 h-5" />,
      name: "Tiktok",
      link: "https://www.tiktok.com/@pearlinetrading",
    },
  ];

  return (
    <footer
      className="bg-[var(--color-accent-2)] text-[var(--text-primary)] relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer */}
        <div className="py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Logo + Social */}
            <div className="lg:col-span-1">
              <div
                className={`flex items-center space-x-3 mb-6 ${
                  isRTL ? "space-x-reverse" : ""
                }`}
              >
                <div className="bg-[var(--color-primary)] p-2 rounded-xl">
                  <FaBuilding className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--color-primary-dark)]">
                    Pearline
                  </h3>
                  <p className="text-[var(--color-primary)] text-sm font-semibold">
                    TRADING
                  </p>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
                {t("footer.description")}
              </p>
              {/* social */}
              <div
                className={`flex space-x-3 ${isRTL ? "space-x-reverse" : ""}`}
              >
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    to={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-bold text-[var(--color-primary-dark)] mb-4 relative">
                  {section.title}
                  <div
                    className={`absolute bottom-0 ${
                      isRTL ? "right-0" : "left-0"
                    } w-8 h-0.5 bg-[var(--color-primary)] rounded-full`}
                  ></div>
                </h4>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link
                        to={item.link}
                        className="group flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--color-primary-dark)] transition-colors duration-300"
                      >
                        {"icon" in item && item.icon && (
                          <span className="text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                            {item.icon}
                          </span>
                        )}
                        <span>{item.text}</span>
                        <FaArrowRight
                          className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                            isRTL ? "rotate-180" : ""
                          }`}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-[var(--border-light)]">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-2">
                {t("footer.newsletterTitle")}
              </h4>
              <p className="text-[var(--text-secondary)]">
                {t("footer.newsletterDescription")}
              </p>
            </div>
            <div
              className={`flex flex-col sm:flex-row gap-3 ${
                isRTL ? "sm:flex-row-reverse" : ""
              }`}
            >
              <input
                type="email"
                placeholder={t("footer.newsletterPlaceholder")}
                className="flex-1 px-4 py-3 bg-white border border-[var(--border-medium)] rounded-xl placeholder-[var(--text-muted)] focus:outline-none"
              />
              <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2">
                <span>{t("footer.newsletterButton")}</span>
                <FaArrowRight
                  className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-8 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <span className="text-[var(--text-secondary)]">
            {t("footer.copyright")}
          </span>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link
              to="/privacy-policy"
              className="hover:text-[var(--color-primary-dark)]"
            >
              {t("footer.privacyPolicy")}
            </Link>
            <Link
              to="/terms-and-conditions"
              className="hover:text-[var(--color-primary-dark)]"
            >
              {t("footer.termsConditions")}
            </Link>
            <Link
              to="/modern-slavery"
              className="hover:text-[var(--color-primary-dark)]"
            >
              {t("footer.modernSlavery")}
            </Link>
          </div>
          <div className="flex items-center space-x-1 text-[var(--color-primary)]">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-[var(--text-secondary)] ml-2">
              {t("footer.trusted")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
