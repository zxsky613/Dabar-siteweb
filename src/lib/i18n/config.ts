export const locales = ["fr", "en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  zh: "中文",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
