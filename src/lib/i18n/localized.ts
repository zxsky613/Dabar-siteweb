import type { Locale } from "./config";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export function t(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

export function tl(list: LocalizedList, locale: Locale): string[] {
  return list[locale];
}
