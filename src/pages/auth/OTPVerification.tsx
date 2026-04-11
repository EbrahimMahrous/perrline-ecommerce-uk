import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "../../i18n/TranslationContext";
import InputField from "../../components/InputField";
import { useAuth } from "../../context/AuthContext";
import { Mail, Shield } from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
const OTPVerification: React.FC = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ code: "" });
  const [isVerified, setIsVerified] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { t, isRTL } = useTranslation();
  const { verifyOtp, resendOtp, loading, error, clearError } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      navigate("/forgot-password");
    }
  }, [location.state, navigate]);
  useEffect(() => {
    let timer: number;

    if (resendDisabled && countdown > 0) {
      timer = window.setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
      setCountdown(60);
    }
    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [resendDisabled, countdown]);

  const handleCodeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const numericValue = target.value.replace(/\D/g, "").slice(0, 6);
    setCode(numericValue);

    if (errors.code) {
      setErrors({ code: "" });
    }
    if (error) clearError();
  };

  const validateForm = () => {
    const newErrors = { code: "" };
    let isValid = true;

    if (!code.trim()) {
      newErrors.code = t("otpVerification.errors.codeRequired");
      isValid = false;
    } else if (code.length !== 6) {
      newErrors.code = t("otpVerification.errors.codeLength");
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const success = await verifyOtp(email, code);
      if (success) {
        setIsVerified(true);
        setTimeout(() => {
          navigate("/reset-password", {
            state: {
              email: email,
              token: code,
            },
          });
        }, 2000);
      }
    }
  };
  const handleResendOtp = async () => {
    setResendDisabled(true);
    await resendOtp(email);
  };
  if (!email) {
    return (
      <>
        <Navbar />
        <div className="bg-bg-secondary flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
          <div className="w-[600px] bg-bg-primary rounded-2xl shadow-lg overflow-hidden">
            <div className="px-8 py-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
                  {t("otpVerification.invalidRequest")}
                </h1>
                <p className="text-secondary text-lg">
                  {t("otpVerification.invalidRequestDescription")}
                </p>
              </div>
              <div className="text-center mt-6">
                <Link
                  to="/forgot-password"
                  className="text-[var(--color-primary)] hover:text-[var(--color-primary)] font-medium transition-colors duration-200"
                >
                  {t("otpVerification.backToForgotPassword")}
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
                {t("otpVerification.title")}
              </h1>
              <p className="text-secondary text-lg">
                {t("otpVerification.description")}
              </p>
              <p className="text-secondary text-sm mt-2">
                {t("otpVerification.emailSentTo")} <strong>{email}</strong>
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

            {isVerified ? (
              <div className="text-center py-8">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                  {t("otpVerification.successMessage")}
                </div>
                <p className="text-secondary">
                  {t("otpVerification.redirectMessage")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  label={t("otpVerification.emailLabel")}
                  value={email}
                  icon={Mail}
                  isRTL={isRTL}
                  required={true}
                  disabled={true}
                  onChange={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />

                <InputField
                  id="code"
                  name="code"
                  type="text"
                  label={t("otpVerification.codeLabel")}
                  value={code}
                  onChange={handleCodeChange}
                  error={errors.code}
                  icon={Shield}
                  isRTL={isRTL}
                  required={true}
                  placeholder={t("otpVerification.codePlaceholder")}
                  autoComplete="one-time-code"
                  maxLength={6}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--color-primary)] hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50"
                >
                  {loading
                    ? t("otpVerification.loading")
                    : t("otpVerification.verifyButton")}
                </button>
              </form>
            )}

            <div className="text-center mt-6 space-y-4">
              <div>
                <button
                  onClick={handleResendOtp}
                  disabled={resendDisabled || loading}
                  className="text-[var(--color-primary)] hover:text-[var(--color-primary)] font-medium transition-colors duration-200 disabled:opacity-50"
                >
                  {resendDisabled
                    ? t("otpVerification.resendCountdown", { countdown })
                    : t("otpVerification.resendButton")}
                </button>
              </div>

              <div>
                <Link
                  to="/forgot-password"
                  className="text-[var(--color-primary)] hover:text-[var(--color-primary)] font-medium transition-colors duration-200"
                >
                  {t("otpVerification.backToForgotPassword")}
                </Link>
              </div>

              <div>
                <Link
                  to="/login"
                  className="text-[var(--color-primary)] hover:text-[var(--color-primary)] font-medium transition-colors duration-200"
                >
                  {t("otpVerification.backToLogin")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OTPVerification;
