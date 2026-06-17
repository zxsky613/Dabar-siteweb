"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
  locales: readonly Locale[];
  labels: Record<Locale, string>;
  compact?: boolean;
  variant?: "light" | "dark";
};

export default function LanguageSwitcher({
  locale,
  locales,
  labels,
  compact = false,
  variant = "light",
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && isValidLocale(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    const query = searchParams.toString();
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const href = `/${segments.join("/")}${query ? `?${query}` : ""}${hash}`;

    router.push(href, { scroll: false });
  };

  const isDark = variant === "dark";

  return (
    <div
      className={`flex gap-1 ${compact ? "" : `ml-2 pl-4 ${isDark ? "border-l border-white/20" : "border-l border-gray-200"}`}`}
    >
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
            loc === locale
              ? isDark
                ? "bg-blue-light text-white shadow-sm"
                : "bg-navy text-white shadow-sm"
              : isDark
                ? "text-white/70 hover:bg-white/10 hover:text-white"
                : "text-gray-500 hover:bg-white/50 hover:text-navy"
          }`}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
}
