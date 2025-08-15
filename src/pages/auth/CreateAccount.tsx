import { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

type FormDataKeys =
  | "firstName"
  | "lastName"
  | "email"
  | "password"
  | "confirmPassword"
  | "mobile"
  | "companyName"
  | "phoneNumber"
  | "streetAddress"
  | "city";

type FormDataType = {
  [key in FormDataKeys]: string;
};

type ErrorsType = Partial<Record<FormDataKeys, string>>;

export default function CreateAccount() {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    companyName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
  });

  const [errors, setErrors] = useState<ErrorsType>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name as FormDataKeys]: e.target.value,
    });
  };

  const getPasswordStrength = (
    password: string
  ): { text: string; color: string } => {
    if (!password) return { text: "No Password", color: "bg-black" };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return { text: "Weak", color: "bg-red-500" };
    if (strength === 2) return { text: "Medium", color: "bg-yellow-500" };
    if (strength >= 3) return { text: "Strong", color: "bg-green-500" };
    // Default fallback
    return { text: "Unknown", color: "bg-gray-500" };
  };

  const validateForm = () => {
    let newErrors: ErrorsType = {};
    (Object.keys(formData) as FormDataKeys[]).forEach((key) => {
      if (!formData[key]) newErrors[key] = "This field is required";
    });
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-[var(--bg-secondary)] min-h-screen flex justify-center py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--bg-primary)] shadow-lg rounded-lg p-8 w-full max-w-6xl"
        >
          <h2 className="text-2xl font-bold text-[var(--accent-brown)] mb-6">
            Create New Customer Account
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--border-light)] rounded-md">
            {/* Personal Information */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-[var(--border-light)]">
              <h3 className="bg-[var(--accent-blue)] text-[var(--text-white)] px-4 py-2 rounded mb-4">
                PERSONAL INFORMATION
              </h3>

              {/* First Name */}
              <label className="block mb-2 font-medium">FIRST NAME *</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-[var(--border-light)] rounded p-2 mb-1"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mb-3">{errors.firstName}</p>
              )}

              {/* Last Name */}
              <label className="block mb-2 font-medium">LAST NAME *</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-[var(--border-light)] rounded p-2 mb-1"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mb-3">{errors.lastName}</p>
              )}

              {/* Email */}
              <label className="block mb-2 font-medium">EMAIL *</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-[var(--border-light)] rounded p-2 mb-1"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mb-3">{errors.email}</p>
              )}

              {/* Password */}
              <label className="block mb-2 font-medium">PASSWORD *</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-[var(--border-light)] rounded p-2 mb-1"
              />
              <p
                className={`${
                  getPasswordStrength(formData.password).color
                } text-white text-sm px-2 py-1 mb-4`}
              >
                Password Strength: {getPasswordStrength(formData.password).text}
              </p>
              {errors.password && (
                <p className="text-red-500 text-sm mb-3">{errors.password}</p>
              )}

              {/* Confirm Password */}
              <label className="block mb-2 font-medium">
                CONFIRM PASSWORD *
              </label>
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-[var(--border-light)] rounded p-2 mb-1"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mb-3">
                  {errors.confirmPassword}
                </p>
              )}

              {/* Show Password */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span>SHOW PASSWORD</span>
              </div>

              {/* Mobile */}
              <label className="block mb-2 font-medium">MOBILE NUMBER *</label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border border-[var(--border-light)] rounded p-2 mb-1"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mb-3">{errors.mobile}</p>
              )}
            </div>

            {/* Company Information */}
            <div className="p-6">
              <h3 className="bg-[var(--accent-blue)] text-[var(--text-white)] px-4 py-2 rounded mb-4">
                COMPANY INFORMATION
              </h3>

              {/* Company Name */}
              <label className="block mb-2 font-medium">COMPANY NAME *</label>
              <input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border border-[var(--border-light)] rounded p-2 mb-1"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mb-3">
                  {errors.companyName}
                </p>
              )}

              {/* Phone Number */}
              <label className="block mb-2 font-medium">PHONE NUMBER *</label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-[var(--border-light)] rounded p-2 mb-1"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mb-3">
                  {errors.phoneNumber}
                </p>
              )}

              {/* Street Address */}
              <label className="block mb-2 font-medium">STREET ADDRESS *</label>
              <input
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                className="w-full border border-[var(--border-light)] rounded p-2 mb-1"
              />
              {errors.streetAddress && (
                <p className="text-red-500 text-sm mb-3">
                  {errors.streetAddress}
                </p>
              )}

              {/* City */}
              <label className="block mb-2 font-medium">CITY *</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-[var(--border-light)] rounded p-2 mb-1"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mb-3">{errors.city}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="bg-[var(--primary-gold)] hover:bg-[var(--primary-gold-dark)] text-white px-6 py-2 rounded shadow-md mt-4"
              >
                REGISTER FOR PRICING
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
