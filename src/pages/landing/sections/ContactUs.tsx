import { useState } from "react";
import { MapPin, Phone, Mail, Building2, Send, User } from "lucide-react";
import InputField from "../../../components/InputField";
import { useTranslation } from "../../../i18n/TranslationContext";

interface FormErrors {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactUs() {
  const { t, isRTL } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
    if (apiError) {
      setApiError(null);
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    };
    let isValid = true;
    if (!formData.firstName.trim()) {
      newErrors.firstName = t("contactUs.errors.firstNameRequired");
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t("contactUs.errors.lastNameRequired");
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = t("contactUs.errors.emailRequired");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("contactUs.errors.emailInvalid");
      isValid = false;
    }
    if (formData.phone && !/^[0-9+\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = t("contactUs.errors.phoneInvalid");
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = t("contactUs.errors.messageRequired");
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      setIsLoading(true);
      setApiError(null);

      try {
        console.log("Sending data to API:", formData);
        const response = await fetch(`${API_URL}/Contact/send`, {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Origin: "",
          },
          mode: "cors",
          body: JSON.stringify(formData),
        });

        console.log("API response status:", response.status);
        console.log(
          "API response headers:",
          Object.fromEntries(response.headers.entries()),
        );

        if (!response.ok) {
          let errorMessage = `Server returned ${response.status}: ${response.statusText}`;
          try {
            const responseText = await response.text();
            console.log("Raw response text:", responseText);

            if (responseText) {
              try {
                const errorData = JSON.parse(responseText);
                errorMessage =
                  errorData.message || errorData.title || errorMessage;
              } catch {
                errorMessage = responseText || errorMessage;
              }
            }
          } catch (parseError) {
            console.error("Could not read error response:", parseError);
          }

          throw new Error(errorMessage);
        }
        try {
          const responseData = await response.json();
          console.log("API success response:", responseData);
        } catch (parseError) {
          console.log(
            "No JSON response, but request succeeded with status:",
            response.status,
          );
        }
        setIsSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } catch (error) {
        console.error("Failed to send message:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        setApiError(
          t("contactUs.errors.apiError") ||
            `Failed to send message: ${errorMessage}. Please try again later.`,
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-16 w-40 h-40 bg-[var(--color-primary)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-16 w-32 h-32 bg-[var(--color-accent-1)] rounded-full blur-3xl"></div>
      </div>
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-[var(--color-accent-2)] text-[var(--color-accent-1)] px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <MapPin className="w-4 h-4 mr-2" />
            {t("contactUs.title")}
          </div>
          <h2 className="text-4xl lg:text-6xl font-extrabold text-[var(--color-primary)] mb-6">
            {t("contactUs.heading.part1")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-1)]">
              {t("contactUs.heading.part2")}
            </span>
          </h2>
        </div>
        <div className="bg-[var(--bg-primary)] rounded-3xl shadow-lg p-8 lg:p-12 border border-[var(--border-light)]">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6">
                {t("contactUs.successMessage")}
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                {t("contactUs.sendAnother")}
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold text-[var(--color-primary)] mb-6">
                  {t("contactUs.form.title.part1")}{" "}
                  <span className="text-[var(--color-primary)]">
                    {t("contactUs.form.title.part2")}
                  </span>
                </h3>
                <p className="text-[var(--text-secondary)] mb-8">
                  {t("contactUs.form.description")}
                </p>
                {apiError && (
                  <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6">
                    {apiError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField
                      id="firstName"
                      name="firstName"
                      type="text"
                      label={t("contactUs.form.firstName")}
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder={t("contactUs.form.firstNamePlaceholder")}
                      error={errors.firstName}
                      icon={User}
                      isRTL={isRTL}
                      required
                      autoComplete="given-name"
                    />
                    <InputField
                      id="lastName"
                      name="lastName"
                      type="text"
                      label={t("contactUs.form.lastName")}
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder={t("contactUs.form.lastNamePlaceholder")}
                      error={errors.lastName}
                      icon={User}
                      isRTL={isRTL}
                      required
                      autoComplete="family-name"
                    />
                  </div>
                  <InputField
                    id="email"
                    name="email"
                    type="email"
                    label={t("contactUs.form.email")}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t("contactUs.form.emailPlaceholder")}
                    error={errors.email}
                    icon={Mail}
                    isRTL={isRTL}
                    required
                    autoComplete="email"
                  />
                  <InputField
                    id="phone"
                    name="phone"
                    type="tel"
                    label={t("contactUs.form.phone")}
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t("contactUs.form.phonePlaceholder")}
                    error={errors.phone}
                    icon={Phone}
                    isRTL={isRTL}
                    required
                    autoComplete="tel"
                  />
                  <InputField
                    id="message"
                    name="message"
                    label={t("contactUs.form.message")}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t("contactUs.form.messagePlaceholder")}
                    error={errors.message}
                    isRTL={isRTL}
                    required
                    multiline
                    rows={5}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={t("contactUs.form.submit")}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        <span>{t("contactUs.form.sending")}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t("contactUs.form.submit")}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
              <div className="lg:pl-8">
                <div className="bg-[var(--bg-secondary)] rounded-2xl p-8 h-full border border-[var(--border-light)] shadow-sm">
                  <h4 className="text-2xl font-bold text-[var(--color-primary)] mb-6">
                    {t("contactUs.info.title")}
                  </h4>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[var(--color-accent-2)] p-3 rounded-xl">
                        <Phone className="w-6 h-6 text-[var(--color-accent-1)]" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-[var(--color-primary)] mb-1">
                          {t("contactUs.info.phone.title")}
                        </h5>
                        <p className="text-[var(--text-secondary)]">
                          +44 (0) 7443 715 994
                        </p>
                        <p className="text-sm text-[var(--text-muted)]">
                          {t("contactUs.info.phone.hours")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-[var(--color-accent-2)] p-3 rounded-xl">
                        <Mail className="w-6 h-6 text-[var(--color-accent-1)]" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-[var(--color-primary)] mb-1">
                          {t("contactUs.info.email.title")}
                        </h5>
                        <p className="text-[var(--text-secondary)]">
                          info@pearline.co.uk
                        </p>
                        <p className="text-sm text-[var(--text-muted)]">
                          {t("contactUs.info.email.response")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-[var(--color-accent-2)] p-3 rounded-xl">
                        <MapPin className="w-6 h-6 text-[var(--color-accent-1)]" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-[var(--color-primary)] mb-1">
                          {t("contactUs.info.address.title")}
                        </h5>
                        <p className="text-[var(--text-secondary)]">
                          128, City Road, London, EC1V 2NX
                        </p>
                        <p className="text-[var(--text-secondary)]">
                          UNITED KINGDOM
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 p-6 bg-[var(--bg-primary)] rounded-xl shadow-sm border border-[var(--border-light)]">
                    <h5 className="font-semibold text-[var(--color-primary)] mb-4 flex items-center">
                      <div className="bg-[var(--color-accent-2)] p-2 rounded-lg mr-3">
                        <Building2 className="w-5 h-5 text-[var(--color-accent-1)]" />
                      </div>
                      {t("contactUs.info.hours.title")}
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-secondary)]">
                          {t("contactUs.info.hours.weekdays")}
                        </span>
                        <span className="font-semibold text-[var(--color-primary)]">
                          9:00 AM - 6:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-secondary)]">
                          {t("contactUs.info.hours.saturday")}
                        </span>
                        <span className="font-semibold text-[var(--color-primary)]">
                          10:00 AM - 4:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-secondary)]">
                          {t("contactUs.info.hours.sunday")}
                        </span>
                        <span className="font-semibold text-[var(--color-primary)]">
                          {t("contactUs.info.hours.closed")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
