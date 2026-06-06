import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import InputField from "../../components/InputField";
import { useTranslation } from "../../i18n/TranslationContext";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  Mail,
  Lock,
  Phone,
  Building,
  Globe,
  MapPin,
  CreditCard,
} from "lucide-react";

type FormDataKeys =
  | "firstName"
  | "lastName"
  | "email"
  | "password"
  | "confirmPassword"
  | "mobileNumber"
  | "companyName"
  | "companyWebsite"
  | "phoneNumber"
  | "vatNumber"
  | "streetAddress"
  | "city"
  | "country"
  | "state"
  | "zipCode"
  | "terms";

type FormDataType = {
  [key in FormDataKeys]: string | boolean;
};

type ErrorsType = Partial<Record<FormDataKeys, string>>;

export default function CreateAccount() {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    companyName: "",
    companyWebsite: "",
    phoneNumber: "",
    vatNumber: "",
    streetAddress: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
    terms: false,
  });
  const [errors, setErrors] = useState<ErrorsType>({});
  const [showPassword, setShowPassword] = useState(false);
  const { t, isRTL } = useTranslation();
  const { register, countries, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert(error);
      clearError();
    }
  }, [error, clearError]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const newValue = type === "checkbox" ? target.checked : value;
    setFormData({
      ...formData,
      [name as FormDataKeys]: newValue,
    });
    if (errors[name as FormDataKeys]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const getPasswordStrength = (
    password: string,
  ): { text: string; color: string } => {
    if (!password)
      return {
        text: t("register.passwordStrength.none"),
        color: "bg-gray-300",
      };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1)
      return { text: t("register.passwordStrength.weak"), color: "bg-red-500" };
    if (strength === 2)
      return {
        text: t("register.passwordStrength.medium"),
        color: "bg-yellow-500",
      };
    if (strength >= 3)
      return {
        text: t("register.passwordStrength.strong"),
        color: "bg-green-500",
      };
    return {
      text: t("register.passwordStrength.unknown"),
      color: "bg-gray-500",
    };
  };

  const validateForm = () => {
    let newErrors: ErrorsType = {};
    const requiredFields: FormDataKeys[] = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
      "mobileNumber",
      "terms",
    ];

    requiredFields.forEach((key) => {
      if (key !== "terms" && !formData[key]) {
        newErrors[key] = t("register.errors.required");
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email as string)) {
      newErrors.email = t("register.errors.emailInvalid");
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("register.errors.passwordMismatch");
    }

    const passwordValue = formData.password as string;

    if (passwordValue.length > 0) {
      if (passwordValue.length < 8) {
        newErrors.password = t("register.errors.passwordMinLength");
      } else if (!/[A-Z]/.test(passwordValue)) {
        newErrors.password = t("register.errors.mustContainUppercase");
      } else if (!/[a-z]/.test(passwordValue)) {
        newErrors.password = t("register.errors.mustContainLowercase");
      } else if (!/[0-9]/.test(passwordValue)) {
        newErrors.password = t("register.errors.mustContainNumber");
      } else if (!/[^A-Za-z0-9]/.test(passwordValue)) {
        newErrors.password = t("register.errors.mustContainSymbol");
      }
    }

    if (!formData.terms) {
      newErrors.terms = t("register.errors.terms");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const success = await register(formData as any);
      if (success) {
        navigate("/");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-bg-secondary flex justify-center py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-bg-primary shadow-lg rounded-lg p-8 w-full max-w-6xl"
        >
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">
            {t("register.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-light rounded-md">
            {/* Personal Information */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-light">
              <h3 className="bg-primary text-white px-4 py-2 rounded mb-4">
                {t("register.sections.personal")}
              </h3>

              <InputField
                id="firstName"
                name="firstName"
                type="text"
                label={t("register.fields.firstName")}
                value={formData.firstName as string}
                onChange={handleInputChange}
                error={errors.firstName}
                icon={User}
                isRTL={isRTL}
                required={true}
              />

              <InputField
                id="lastName"
                name="lastName"
                type="text"
                label={t("register.fields.lastName")}
                value={formData.lastName as string}
                onChange={handleInputChange}
                error={errors.lastName}
                icon={User}
                isRTL={isRTL}
                required={true}
              />

              <InputField
                id="email"
                name="email"
                type="email"
                label={t("register.fields.email")}
                value={formData.email as string}
                onChange={handleInputChange}
                error={errors.email}
                icon={Mail}
                isRTL={isRTL}
                required={true}
                autoComplete="email"
              />

              <InputField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label={t("register.fields.password")}
                value={formData.password as string}
                onChange={handleInputChange}
                error={errors.password}
                icon={Lock}
                isRTL={isRTL}
                required={true}
                autoComplete="new-password"
              />
              <p
                className={`${
                  getPasswordStrength(formData.password as string).color
                } text-white text-sm px-2 py-1 mb-4 rounded`}
              >
                {t("register.passwordStrength.label")}:{" "}
                {getPasswordStrength(formData.password as string).text}
              </p>

              <InputField
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                label={t("register.fields.confirmPassword")}
                value={formData.confirmPassword as string}
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
                <span>{t("register.fields.showPassword")}</span>
              </div>

              <InputField
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                label={t("register.fields.mobile")}
                value={formData.mobileNumber as string}
                onChange={handleInputChange}
                error={errors.mobileNumber}
                icon={Phone}
                isRTL={isRTL}
                required={true}
                autoComplete="tel"
              />
            </div>

            {/* Company Information */}
            <div className="p-6">
              <h3 className="bg-primary text-white px-4 py-2 rounded mb-4">
                {t("register.sections.company")}
              </h3>

              <InputField
                id="companyName"
                name="companyName"
                type="text"
                label={t("register.fields.companyName")}
                value={formData.companyName as string}
                onChange={handleInputChange}
                error={errors.companyName}
                icon={Building}
                isRTL={isRTL}
                required={false}
              />

              <InputField
                id="companyWebsite"
                name="companyWebsite"
                type="url"
                label={t("register.fields.companyWebsite")}
                value={formData.companyWebsite as string}
                onChange={handleInputChange}
                error={errors.companyWebsite}
                icon={Globe}
                isRTL={isRTL}
                required={false}
              />

              <InputField
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                label={t("register.fields.phoneNumber")}
                value={formData.phoneNumber as string}
                onChange={handleInputChange}
                error={errors.phoneNumber}
                icon={Phone}
                isRTL={isRTL}
                required={false}
              />

              <InputField
                id="vatNumber"
                name="vatNumber"
                type="text"
                label={t("register.fields.vatNumber")}
                value={formData.vatNumber as string}
                onChange={handleInputChange}
                error={errors.vatNumber}
                icon={CreditCard}
                isRTL={isRTL}
                required={false}
              />

              <InputField
                id="streetAddress"
                name="streetAddress"
                type="text"
                label={t("register.fields.streetAddress")}
                value={formData.streetAddress as string}
                onChange={handleInputChange}
                error={errors.streetAddress}
                icon={MapPin}
                isRTL={isRTL}
                required={false}
              />

              <InputField
                id="city"
                name="city"
                type="text"
                label={t("register.fields.city")}
                value={formData.city as string}
                onChange={handleInputChange}
                error={errors.city}
                icon={MapPin}
                isRTL={isRTL}
                required={false}
              />

              {/* Country */}
              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-secondary mb-1"
                >
                  {t("register.fields.country")} *
                </label>
                <div className="relative">
                  <select
                    id="country"
                    name="country"
                    value={formData.country as string}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.country ? "border-red-500" : "border-light"
                    } ${isRTL ? "pr-10" : "pl-10"}`}
                    required
                  >
                    <option value="">
                      {t("register.fields.selectCountry")}
                    </option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <MapPin
                    className={`absolute top-3 h-5 w-5 text-gray-400 ${
                      isRTL ? "right-3" : "left-3"
                    }`}
                  />
                </div>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>

              <InputField
                id="state"
                name="state"
                type="text"
                label={t("register.fields.state")}
                value={formData.state as string}
                onChange={handleInputChange}
                error={errors.state}
                icon={MapPin}
                isRTL={isRTL}
                required={false}
              />

              <InputField
                id="zipCode"
                name="zipCode"
                type="text"
                label={t("register.fields.zip")}
                value={formData.zipCode as string}
                onChange={handleInputChange}
                error={errors.zipCode}
                icon={MapPin}
                isRTL={isRTL}
                required={false}
              />
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms as boolean}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span>{t("register.fields.terms")}</span>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-sm mb-3">{errors.terms}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-[var(--color-primary)] hover:bg-primary text-white px-6 py-2 rounded shadow-md mt-4 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? t("register.loading") : t("register.submitButton")}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
