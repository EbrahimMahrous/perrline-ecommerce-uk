import React from "react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "../i18n/TranslationContext";

export interface InputFieldProps {
  id: string;
  name: string;
  type?: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  error?: string;
  icon?: LucideIcon;
  isRTL?: boolean;
  required?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  rows?: number;
  multiline?: boolean;
  maxLength?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  placeholder = "",
  error = "",
  icon: Icon,
  isRTL = false,
  required = false,
  autoComplete,
  disabled,
  rows = 5,
  multiline = false,
  maxLength,
}) => {
  useTranslation();
  const getInputClasses = () => {
    const base = `w-full py-3 border ${
      error ? "border-red-500" : "border-[var(--border-light)]"
    } rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`;
    if (multiline) {
      return `${base} px-4 resize-none`;
    } else {
      return Icon
        ? `${base} ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"}`
        : `${base} px-4`;
    }
  };

  const iconPosition = isRTL ? "right-3" : "left-3";

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && !multiline && (
          <Icon
            className={`absolute ${iconPosition} top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]`}
          />
        )}
        {multiline ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={getInputClasses()}
            placeholder={placeholder}
            dir={isRTL ? "rtl" : "ltr"}
            aria-label={label}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${id}-error` : undefined}
            rows={rows}
            disabled={disabled}
            maxLength={maxLength}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className={getInputClasses()}
            placeholder={placeholder}
            dir={isRTL ? "rtl" : "ltr"}
            aria-label={label}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${id}-error` : undefined}
            autoComplete={autoComplete}
            disabled={disabled}
            maxLength={maxLength}
          />
        )}
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-red-500 text-sm flex items-center"
          role="alert"
        >
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default InputField;
