import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import InputField from "../../components/InputField";
import { useTranslation } from "../../i18n/TranslationContext";
import {
  User,
  Lock,
  Phone,
  Building,
  Globe,
  MapPin,
  CreditCard,
  Eye,
  EyeOff,
  ArrowLeft,
  Mail,
  Loader,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type FormDataKeys =
  | "firstName"
  | "lastName"
  | "email"
  | "newEmail"
  | "mobileNumber"
  | "companyName"
  | "companyWebsite"
  | "vatNumber"
  | "streetAddress"
  | "city"
  | "country"
  | "state"
  | "zipCode"
  | "currentPassword"
  | "newPassword"
  | "confirmPassword";

type FormDataType = {
  [key in FormDataKeys]: string | boolean;
};

type ErrorsType = Partial<Record<FormDataKeys, string>> & {
  submit?: string;
};

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  companyName: string;
  companyWebsite: string;
  vatNumber: string;
  streetAddress: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
}

const EditAccountPage: React.FC = () => {
  const { user, updateUser, token, logout } = useAuth();
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation();
  const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    newEmail: "",
    mobileNumber: "",
    companyName: "",
    companyWebsite: "",
    vatNumber: "",
    streetAddress: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ErrorsType>({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setFetchError(null);

      const authToken = token || localStorage.getItem("authToken");

      if (!authToken) {
        setFetchError(
          t("register.editAccount.unauthorized") ||
            "Your session has expired. Please log in again."
        );
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/Profile`, {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 401) {
        logout();
        setFetchError(
          t("editAccount.unauthorized") ||
            "Your session has expired. Please log in again."
        );
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData: UserProfile = await response.json();
      setProfileData(userData);
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        newEmail: "",
        mobileNumber: userData.mobileNumber || "",
        companyName: userData.companyName || "",
        companyWebsite: userData.companyWebsite || "",
        vatNumber: userData.vatNumber || "",
        streetAddress: userData.streetAddress || "",
        city: userData.city || "",
        country: userData.country || "",
        state: userData.state || "",
        zipCode: userData.zipCode || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setFetchError(
        t("editAccount.fetchError") ||
          "Failed to load user data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [token]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    if (successMessage) {
      setSuccessMessage(null);
    }
  };

  const handleCheckboxChange = (type: "email" | "password") => {
    if (type === "email") {
      setChangeEmail(!changeEmail);
      if (changeEmail) {
        setFormData({ ...formData, newEmail: "" });
      }
    } else {
      setChangePassword(!changePassword);
      if (changePassword) {
        setFormData({
          ...formData,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    }
  };
  const getPasswordStrength = (
    password: string
  ): { text: string; color: string } => {
    if (!password)
      return { text: t("register.passwordStrength.none"), color: "bg-black" };
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
      "mobileNumber",
      "companyName",
      "vatNumber",
      "streetAddress",
      "city",
      "country",
      "state",
      "zipCode",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = t("register.errors.required");
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email as string)) {
      newErrors.email = t("register.errors.emailInvalid");
    }

    if (changeEmail) {
      if (!formData.newEmail) {
        newErrors.newEmail = t("register.errors.emailRequired");
      } else if (!emailRegex.test(formData.newEmail as string)) {
        newErrors.newEmail = t("register.errors.emailInvalid");
      }

      if (!formData.currentPassword) {
        newErrors.currentPassword = t("editAccount.currentPasswordRequired");
      }
    }

    if (changePassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = t("editAccount.currentPasswordRequired");
      }
      if (!formData.newPassword) {
        newErrors.newPassword = t("register.errors.passwordRequired");
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = t(
          "register.errors.confirmPasswordRequired"
        );
      }
      if (formData.newPassword && (formData.newPassword as string).length < 8) {
        newErrors.newPassword = t("register.errors.passwordMinLength");
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = t("register.errors.passwordMismatch");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateProfile = async (): Promise<boolean> => {
    try {
      const authToken = token || localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/Profile/update`, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          mobileNumber: formData.mobileNumber,
          companyName: formData.companyName,
          companyWebsite: formData.companyWebsite,
          vatNumber: formData.vatNumber,
          streetAddress: formData.streetAddress,
          city: formData.city,
          country: formData.country,
          state: formData.state,
          zipCode: formData.zipCode,
        }),
      });

      if (response.status === 401) {
        logout();
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  };

  const changeUserEmail = async (): Promise<boolean> => {
    try {
      const authToken = token || localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/Profile/change-email`, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newEmail: formData.newEmail,
        }),
      });

      if (response.status === 401) {
        logout();
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return true;
    } catch (error) {
      console.error("Email change error:", error);
      throw error;
    }
  };

  const changeUserPassword = async (): Promise<boolean> => {
    try {
      const authToken = token || localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/Profile/change-password`, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      if (response.status === 401) {
        logout();
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return true;
    } catch (error) {
      console.error("Password change error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSuccessMessage(null);
      setErrors({});

      try {
        let profileUpdated = false;
        let emailChanged = false;
        if (
          profileData &&
          (formData.firstName !== profileData.firstName ||
            formData.lastName !== profileData.lastName ||
            formData.mobileNumber !== profileData.mobileNumber ||
            formData.companyName !== profileData.companyName ||
            formData.companyWebsite !== profileData.companyWebsite ||
            formData.vatNumber !== profileData.vatNumber ||
            formData.streetAddress !== profileData.streetAddress ||
            formData.city !== profileData.city ||
            formData.country !== profileData.country ||
            formData.state !== profileData.state ||
            formData.zipCode !== profileData.zipCode)
        ) {
          await updateProfile();
          profileUpdated = true;
        }
        if (changeEmail && formData.newEmail) {
          await changeUserEmail();
          emailChanged = true;
        }
        if (changePassword && formData.newPassword) {
          await changeUserPassword();
        }

        if (profileUpdated && updateUser) {
          const updatedUserData = {
            ...user,
            email: user?.email || "",
            firstName: formData.firstName as string,
            lastName: formData.lastName as string,
            mobileNumber: formData.mobileNumber as string,
            companyName: formData.companyName as string,
            companyWebsite: formData.companyWebsite as string,
            vatNumber: formData.vatNumber as string,
            streetAddress: formData.streetAddress as string,
            city: formData.city as string,
            country: formData.country as string,
            state: formData.state as string,
            zipCode: formData.zipCode as string,
            password: user?.password || "",
            phoneNumber: user?.phoneNumber || "",
          };

          await updateUser(updatedUserData);
        }

        // Show success message
        let successMsg =
          t("editAccount.updateSuccess") ||
          "Account information updated successfully!";

        if (emailChanged) {
          successMsg +=
            " " +
            (t("editAccount.emailChangeNote") ||
              "Please check your new email to confirm the change.");
        }

        setSuccessMessage(successMsg);

        // Refresh profile data
        setTimeout(() => {
          fetchUserProfile();
        }, 1500);
      } catch (error: any) {
        console.error("Update error:", error);
        const errorMsg =
          error.message ||
          t("editAccount.updateError") ||
          "Failed to update account. Please try again.";
        setErrors({ submit: errorMsg });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-bg-secondary flex justify-center items-center py-40">
          <div className="flex flex-col items-center">
            <Loader className="animate-spin h-12 w-12 text-primary mb-4" />
            <p className="text-lg text-secondary">
              {t("register.editAccount.loading") || "Loading your data..."}
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (fetchError) {
    return (
      <>
        <Navbar />
        <div className="bg-bg-secondary flex justify-center items-center py-40">
          <div className="bg-bg-primary shadow-lg rounded-lg p-8 w-full max-w-2xl text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-4">
              {t("register.editAccount.errorTitle") || "Error Loading Data"}
            </h2>
            <p className="text-secondary mb-6">{fetchError}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={fetchUserProfile}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                {t("register.editAccount.retryButton") || "Try Again"}
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-secondary text-white px-6 py-2 rounded-md hover:bg-secondary-dark transition-colors"
              >
                {t("register.editAccount.loginButton") || "Go to Login"}
              </button>
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
      <div className="bg-bg-secondary flex justify-center py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-bg-primary shadow-lg rounded-lg p-8 w-full max-w-6xl"
        >
          <div className="flex items-center mb-6">
            <button
              type="button"
              onClick={() => navigate("/my-account")}
              className="flex items-center text-primary hover:text-primary-dark mr-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              {t("register.editAccount.back")}
            </button>
            <h2 className="text-2xl font-bold text-primary">
              {t("register.editAccount.editTitle")}
            </h2>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
              {errors.submit}
            </div>
          )}

          <div className="mb-6 p-4 border border-light rounded-md">
            <h3 className="text-lg font-semibold mb-3">
              {t("register.editAccount.changeOptions")}
            </h3>

            <div className="flex flex-col space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={changeEmail}
                  onChange={() => handleCheckboxChange("email")}
                  className="mr-2"
                />
                <span>{t("register.editAccount.changeEmail")}</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={changePassword}
                  onChange={() => handleCheckboxChange("password")}
                  className="mr-2"
                />
                <span>{t("register.editAccount.changePassword")}</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-light rounded-md">
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
                disabled={true}
              />

              {changeEmail && (
                <InputField
                  id="newEmail"
                  name="newEmail"
                  type="email"
                  label={t("register.editAccount.newEmail")}
                  value={formData.newEmail as string}
                  onChange={handleInputChange}
                  error={errors.newEmail}
                  icon={Mail}
                  isRTL={isRTL}
                  required={true}
                  autoComplete="email"
                />
              )}

              {(changeEmail || changePassword) && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-secondary mb-2">
                    {t("register.editAccount.currentPassword")}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword as string}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-10 py-2 border border-light rounded-md focus:outline-none focus:border-primary"
                      placeholder={t(
                        "register.editAccount.currentPasswordPlaceholder"
                      )}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>
              )}

              {changePassword && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-secondary mb-2">
                      {t("register.editAccount.newPassword")}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword as string}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-10 py-2 border border-light rounded-md focus:outline-none focus:border-primary"
                        placeholder={t(
                          "register.editAccount.newPasswordPlaceholder"
                        )}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {formData.newPassword && (
                      <p
                        className={`text-sm mt-1 ${
                          getPasswordStrength(formData.newPassword as string)
                            .color === "bg-red-500"
                            ? "text-red-500"
                            : getPasswordStrength(
                                formData.newPassword as string
                              ).color === "bg-yellow-500"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      >
                        {t("register.passwordStrength.label")}:{" "}
                        {
                          getPasswordStrength(formData.newPassword as string)
                            .text
                        }
                      </p>
                    )}
                    {errors.newPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.newPassword}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-secondary mb-2">
                      {t("register.editAccount.confirmPassword")}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword as string}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-10 py-2 border border-light rounded-md focus:outline-none focus:border-primary"
                        placeholder={t(
                          "register.editAccount.confirmPasswordPlaceholder"
                        )}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

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
                required={true}
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
                id="vatNumber"
                name="vatNumber"
                type="text"
                label={t("register.fields.vatNumber")}
                value={formData.vatNumber as string}
                onChange={handleInputChange}
                error={errors.vatNumber}
                icon={CreditCard}
                isRTL={isRTL}
                required={true}
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
                required={true}
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
                required={true}
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
                required={true}
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--color-primary)] hover:bg-primary-dark text-white px-8 py-3 rounded-md shadow-md transition-colors duration-200 font-semibold disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting && <Loader className="animate-spin mr-2 h-4 w-4" />}
              {t("register.editAccount.saveChanges")}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditAccountPage;
