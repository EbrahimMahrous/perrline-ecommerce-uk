import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { type Language, LANGUAGES, DEFAULT_LANGUAGE } from "./config";
import { commonTranslations } from "./translations/common";
interface TranslationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, values?: { [key: string]: any }) => string; // تحديث هنا
  isRTL: boolean;
}
const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);
interface TranslationProviderProps {
  children: ReactNode;
}
export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage && Object.values(LANGUAGES).includes(savedLanguage)
      ? savedLanguage
      : DEFAULT_LANGUAGE;
  });
  const isRTL = language === LANGUAGES.AR;
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.body.classList.toggle("rtl", isRTL);
  }, [language, isRTL]);
  const t = (key: string, values?: { [key: string]: any }): string => {
    const keys = key.split(".");
    let value: any = commonTranslations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = commonTranslations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            console.warn(`Translation key not found: ${key}`);
            return key; // Return the key itself as fallback
          }
        }
        break;
      }
    }

    let result = typeof value === "string" ? value : key;

    // استبدال القيم الديناميكية إذا وجدت
    if (values) {
      Object.keys(values).forEach((key) => {
        const placeholder = `{${key}}`;
        if (result.includes(placeholder)) {
          result = result.replace(placeholder, String(values[key]));
        }
      });
    }

    return result;
  };

  const value: TranslationContextType = {
    language,
    setLanguage,
    t,
    isRTL,
  };
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
