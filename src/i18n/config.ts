export const LANGUAGES = {
  EN: "en",
  AR: "ar",
} as const;
export const DEFAULT_LANGUAGE = LANGUAGES.EN;
export const LANGUAGE_NAMES = {
  [LANGUAGES.EN]: "English",
  [LANGUAGES.AR]: "العربية",
} as const;
export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];
export type LanguageKey = keyof typeof LANGUAGES;
