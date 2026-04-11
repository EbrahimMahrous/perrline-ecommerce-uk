import React, { useState } from "react";
import { useTranslation } from "../../i18n/TranslationContext";
import InputField from "../../components/InputField";
import { useAuth } from "../../context/AuthContext";
import { Mail } from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t, isRTL } = useTranslation();
  const { forgotPassword, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
    if (errors.email) {
      setErrors({ email: "" });
    }
    if (error) clearError();
  };

  const validateForm = () => {
    const newErrors = { email: "" };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = t("forgotPassword.errors.emailRequired");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("forgotPassword.errors.emailInvalid");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const success = await forgotPassword(email);
      if (success) {
        setIsSubmitted(true);
        setTimeout(() => {
          navigate("/verify-otp", { state: { email } });
        }, 2000);
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="bg-bg-secondary flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-[600px] bg-bg-primary rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 py-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
                {t("forgotPassword.title")}
              </h1>
              <p className="text-secondary text-lg">
                {t("forgotPassword.description")}
              </p>
            </div>

            <div className="mb-6">
              <div className="w-full h-1 bg-border-light rounded-full"></div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                  {t("forgotPassword.successMessage")}
                </div>
                <p className="text-secondary">
                  {t("forgotPassword.redirectMessage")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  label={t("forgotPassword.emailLabel")}
                  value={email}
                  onChange={handleEmailChange}
                  error={errors.email}
                  icon={Mail}
                  isRTL={isRTL}
                  required={true}
                  placeholder={t("forgotPassword.emailPlaceholder")}
                  autoComplete="email"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--color-primary)] hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50"
                >
                  {loading
                    ? t("forgotPassword.loading")
                    : t("forgotPassword.resetButton")}
                </button>
              </form>
            )}

            <div className="text-center mt-6">
              <Link
                to="/login"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary)] font-medium transition-colors duration-200"
              >
                {t("forgotPassword.backToLogin")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
