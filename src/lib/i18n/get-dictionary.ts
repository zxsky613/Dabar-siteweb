import type { Locale } from "./config";
import { en } from "@/dictionaries/en";
import { fr } from "@/dictionaries/fr";
import { zh } from "@/dictionaries/zh";

const dictionaries = { fr, en, zh };

export type Dictionary = typeof fr;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
