import React, { useState, useEffect } from "react";
import {
  useSearchParams,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom"; // أضف useLocation
import { useTranslation } from "../../i18n/TranslationContext";
import InputField from "../../components/InputField";
import { useAuth } from "../../context/AuthContext";
import { Lock, Mail } from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

interface FormData {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

interface Errors {
  newPassword: string;
  confirmPassword: string;
}
const ResetPassword: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    token: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t, isRTL } = useTranslation();
  const { resetPassword, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getEmailAndToken = () => {
      if (location.state) {
        const { email, token } = location.state as {
          email: string;
          token: string;
        };
        setFormData((prev) => ({
          ...prev,
          email: email || "",
          token: token || "",
        }));
        return;
      }
      const fixInvalidUrl = () => {
        const currentUrl = window.location.href;

        if (
          currentUrl.includes("http:///") ||
          currentUrl.includes("https:///")
        ) {
          const fixedUrl = currentUrl
            .replace("http:///", "http://")
            .replace("https:///", "https://");

          window.history.replaceState(null, "", fixedUrl);
          const url = new URL(fixedUrl);
          const newSearchParams = new URLSearchParams(url.search);
          setFormData((prev) => ({
            ...prev,
            email: newSearchParams.get("email") || "",
            token: newSearchParams.get("token") || "",
          }));
          setSearchParams(newSearchParams);
          return;
        }

        setFormData((prev) => ({
          ...prev,
          email: searchParams.get("email") || "",
          token: searchParams.get("token") || "",
        }));
      };

      fixInvalidUrl();
    };

    getEmailAndToken();
  }, [searchParams, setSearchParams, location.state]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (error) clearError();
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {
      newPassword: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = t("resetPassword.errors.passwordRequired");
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = t("resetPassword.errors.passwordMinLength");
      isValid = false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = t("resetPassword.errors.passwordMismatch");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const success = await resetPassword(
        formData.email,
        formData.token,
        formData.newPassword
      );
      if (success) {
        setIsSubmitted(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    }
  };

  if (!formData.email || !formData.token) {
    return (
      <>
        <Navbar />
        <div className="bg-bg-secondary flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
          <div className="w-[600px] bg-bg-primary rounded-2xl shadow-lg overflow-hidden">
            <div className="px-8 py-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
                  {t("resetPassword.invalidLink")}
                </h1>
                <p className="text-secondary text-lg">
                  {t("resetPassword.invalidLinkDescription")}
                </p>
              </div>
              <div className="text-center mt-6">
                <Link
                  to="/forgot-password"
                  className="text-[var(--color-primary)] hover:text-[var(--color-primary)] font-medium transition-colors duration-200"
                >
                  {t("resetPassword.requestNewLink")}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="bg-bg-secondary flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-[600px] bg-bg-primary rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 py-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
                {t("resetPassword.title")}
              </h1>
              <p className="text-secondary text-lg">
                {t("resetPassword.description")}
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
                  {t("resetPassword.successMessage")}
                </div>
                <p className="text-secondary">
                  {t("resetPassword.redirectMessage")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  label={t("resetPassword.emailLabel")}
                  value={formData.email}
                  onChange={handleInputChange}
                  icon={Mail}
                  isRTL={isRTL}
                  required={true}
                  disabled={true}
                />
                <InputField
                  id="token"
                  name="token"
                  type="text"
                  label={t("resetPassword.tokenLabel")}
                  value={formData.token}
                  onChange={handleInputChange}
                  isRTL={isRTL}
                  required={true}
                  disabled={true}
                />
                <InputField
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  label={t("resetPassword.newPasswordLabel")}
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  error={errors.newPassword}
                  icon={Lock}
                  isRTL={isRTL}
                  required={true}
                  autoComplete="new-password"
                />
                <InputField
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  label={t("resetPassword.confirmPasswordLabel")}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                  icon={Lock}
                  isRTL={isRTL}
                  required={true}
                  autoComplete="new-password"
                />
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <span>{t("resetPassword.showPassword")}</span>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--color-primary)] hover:bg-primary text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50"
                >
                  {loading
                    ? t("resetPassword.loading")
                    : t("resetPassword.resetButton")}
                </button>
              </form>
            )}
            <div className="text-center mt-6">
              <Link
                to="/login"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary)] font-medium transition-colors duration-200"
              >
                {t("resetPassword.backToLogin")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
