import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import { useTranslation } from "../i18n/TranslationContext";
import { Phone, Mail, MapPin, User, MailIcon, PhoneIcon } from "lucide-react";
import headOfice from "../assets/head-office.jpg";
import branchPearline from "../assets/branch-perrline.jpg";
import sypportSystem from "../assets/support-system.jpg";
import salesOfice from "../assets/sales-office.jpg";
import haveQuestions from "../assets/have-question-t.png";
import { Link } from "react-router-dom";
import { useContact, type ContactFormData } from "../context/ContactContext";

const ContactPage: React.FC = () => {
  const { t, isRTL } = useTranslation();
  const { sendMessage, loading, error } = useContact();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    };

    let isValid = true;
    if (!formData.firstName.trim()) {
      newErrors.firstName = t("contact.errors.firstNameRequired");
      isValid = false;
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = t("contact.errors.nameMinLength");
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t("contact.errors.lastNameRequired");
      isValid = false;
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = t("contact.errors.nameMinLength");
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t("contact.errors.emailRequired");
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t("contact.errors.emailInvalid");
      isValid = false;
    }
    if (formData.phone && !/^[\+]?[0-9\s\-\(\)]{8,}$/.test(formData.phone)) {
      newErrors.phone = t("contact.errors.phoneInvalid");
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = t("contact.errors.messageRequired");
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("contact.errors.messageMinLength");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const apiData: ContactFormData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      };

      const result = await sendMessage(apiData);

      if (result.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
          });
          setIsSubmitted(false);
        }, 3000);
      }
    }
  };

  const contactCards = [
    {
      title: t("contact.cards.headOffice.title"),
      img: headOfice,
      phone: "+1 (555) 123-4567",
      email: "headoffice@example.com",
      location: t("contact.cards.headOffice.location"),
    },
    {
      title: t("contact.cards.branchOffice.title"),
      img: branchPearline,
      phone: "+1 (555) 987-6543",
      email: "branch@example.com",
      location: t("contact.cards.branchOffice.location"),
    },
    {
      title: t("contact.cards.supportCenter.title"),
      img: sypportSystem,
      phone: "+1 (555) 222-3333",
      email: "support@example.com",
      location: t("contact.cards.supportCenter.location"),
    },
    {
      title: t("contact.cards.salesOffice.title"),
      img: salesOfice,
      phone: "+1 (555) 444-5555",
      email: "sales@example.com",
      location: t("contact.cards.salesOffice.location"),
    },
  ];

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="bg-bg-secondary py-16 text-center">
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">
          {t("contact.hero.title")}
        </h1>
        <p className="text-secondary mt-2">{t("contact.hero.description")}</p>
      </div>
      {error && (
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error.message}
          </div>
        </div>
      )}

      {/* Contact Cards */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-bg-primary shadow-md border border-light rounded-lg overflow-hidden animate-fadeIn"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-40 object-cover"
              loading="lazy"
            />
            <div className="p-4 space-y-2">
              <h2 className="font-bold text-lg text-accent-4">{card.title}</h2>

              <div className="flex items-center gap-2 text-secondary">
                <Phone className="w-4 h-4" />
                <span>{card.phone}</span>
              </div>

              <div className="flex items-center gap-2 text-secondary">
                <Mail className="w-4 h-4" />
                <span>{card.email}</span>
              </div>

              <div className="flex items-center gap-2 text-secondary">
                <MapPin className="w-4 h-4" />
                <span>{card.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Google Map */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <iframe
          title={t("contact.map.title")}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d198.34652045672958!2d-0.0889!3d51.5273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cb5d9d3a7df%3A0x4a7e36b295a4e4d6!2s128%20City%20Rd%2C%20London%20EC1V%202NX%2C%20UK!5e0!3m2!1sen!2suk!4v1692201000000!5m2!1sen!2suk"
          width="100%"
          height="400"
          loading="lazy"
          className="rounded-lg shadow-md contact-map-iframe"
        ></iframe>
      </div>

      {/* Questions Section */}
      <div className="bg-bg-secondary">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-4 gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
              {t("contact.questions.title")}
            </h2>
            <p className="text-secondary mb-4">
              {t("contact.questions.description")}
            </p>
            <Link
              to="/faqs"
              className="inline-block bg-accent-4 text-white px-6 py-2 rounded-lg shadow-md hover-accent-4 transition-all duration-300"
            >
              {t("contact.questions.button")}
            </Link>
          </div>
          <div className="flex-1">
            <img
              src={haveQuestions}
              alt={t("contact.questions.imageAlt")}
              className="rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">
          {t("contact.form.title")}
        </h2>

        {isSubmitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            {t("contact.form.successMessage")}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              id="firstName"
              name="firstName"
              type="text"
              label={t("contact.form.firstName")}
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder={t("contact.form.firstName")}
              error={errors.firstName}
              icon={User}
              isRTL={isRTL}
              required={true}
            />
            <InputField
              id="lastName"
              name="lastName"
              type="text"
              label={t("contact.form.lastName")}
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder={t("contact.form.lastName")}
              error={errors.lastName}
              icon={User}
              isRTL={isRTL}
              required={true}
            />
            <InputField
              id="email"
              name="email"
              type="email"
              label={t("contact.form.email")}
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t("contact.form.email")}
              error={errors.email}
              icon={MailIcon}
              isRTL={isRTL}
              required={true}
              autoComplete="email"
            />
            <InputField
              id="phone"
              name="phone"
              type="tel"
              label={t("contact.form.phone")}
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={t("contact.form.phone")}
              error={errors.phone}
              icon={PhoneIcon}
              isRTL={isRTL}
              required={true}
              autoComplete="tel"
            />
          </div>
          <InputField
            id="message"
            name="message"
            label={t("contact.form.message")}
            value={formData.message}
            onChange={handleInputChange}
            placeholder={t("contact.form.message")}
            error={errors.message}
            isRTL={isRTL}
            multiline={true}
            required={true}
            rows={4}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--color-primary-dark)] hover:bg-primary-dark text-white px-6 py-3 rounded-lg shadow-md hover-accent-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t("contact.form.sending") : t("contact.form.button")}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
