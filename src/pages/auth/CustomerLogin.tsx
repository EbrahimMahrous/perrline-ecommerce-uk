import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import InputField from "../../components/InputField";
import { useTranslation } from "../../i18n/TranslationContext";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock } from "lucide-react";

export default function CustomerLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation();
  const { login, loading, error, clearError } = useAuth();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

    if (error) clearError();
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t("login.errors.emailRequired");
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t("login.errors.emailInvalid");
      isValid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = t("login.errors.passwordRequired");
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = t("login.errors.passwordMinLength");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate("/");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-bg-secondary flex items-center justify-center py-16">
        <div className="w-full max-w-5xl bg-bg-primary shadow-lg rounded-2xl overflow-hidden grid md:grid-cols-2">
          <div className="flex flex-col">
            <div className="bg-accent-4 text-white font-semibold text-lg px-6 py-4">
              {t("login.registeredTitle")}
            </div>
            <div className="p-8 space-y-5 flex-1 flex flex-col justify-center">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              <p className="text-secondary">
                {t("login.registeredDescription")}
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  label={t("login.emailLabel")}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t("login.emailPlaceholder")}
                  error={errors.email}
                  icon={Mail}
                  isRTL={isRTL}
                  required={true}
                  autoComplete="email"
                />
                <div>
                  <InputField
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label={t("login.passwordLabel")}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={t("login.passwordPlaceholder")}
                    error={errors.password}
                    icon={Lock}
                    isRTL={isRTL}
                    required={true}
                    autoComplete="current-password"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="showPass"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                      className="accent-accent-4"
                    />
                    <label
                      htmlFor="showPass"
                      className="text-sm text-secondary"
                    >
                      {t("login.showPassword")}
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[var(--color-primary)] hover:bg-accent-4-dark text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? t("login.loading") : t("login.loginButton")}
                  </button>
                  <Link
                    to="/forget-password"
                    className="text-accent-4 hover:text-accent-4-dark text-sm underline transition-all duration-300"
                  >
                    {t("login.forgotPassword")}
                  </Link>
                </div>
              </form>
            </div>
          </div>
          {/* New Customers */}
          <div className="border-t md:border-t-0 md:border-l border-light flex flex-col">
            <div className="bg-accent-4 text-white font-semibold text-lg px-6 py-4">
              {t("login.newCustomersTitle")}
            </div>
            <div className="p-8 space-y-5 flex-1 flex flex-col justify-center">
              <p className="text-secondary leading-relaxed">
                {t("login.newCustomersDescription")}
              </p>
              <button
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300"
                onClick={() => navigate("/register")}
              >
                {t("login.registerButton")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
