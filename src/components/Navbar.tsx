"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/dictionaries/fr";
import type { Locale } from "@/lib/i18n/config";
import { localeLabels, locales } from "@/lib/i18n/config";
import LanguageSwitcher from "./LanguageSwitcher";

type NavbarProps = {
  locale: Locale;
  dict: Dictionary;
};

export default function Navbar({ locale, dict }: NavbarProps) {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home, exact: true },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/realisations`, label: dict.nav.projects },
    { href: `/${locale}/a-propos`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY < 10) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false);
        setMenuOpen(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav
        className={`border-b border-white/10 bg-navy/95 shadow-lg backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "bg-navy shadow-xl" : ""
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 sm:px-10 sm:py-4">
          <Link
            href={`/${locale}`}
            className="flex shrink-0 items-center rounded-lg bg-white px-3.5 py-2"
          >
            <Image
              src="/logo.png"
              alt="Dabar"
              width={150}
              height={45}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                  isActive(link.href, link.exact)
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Suspense fallback={null}>
              <LanguageSwitcher locale={locale} locales={locales} labels={localeLabels} variant="dark" />
            </Suspense>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Suspense fallback={null}>
              <LanguageSwitcher locale={locale} locales={locales} labels={localeLabels} compact variant="dark" />
            </Suspense>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white"
              aria-label="Menu"
            >
              {menuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-b border-white/10 bg-navy/95 shadow-lg backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-3 sm:px-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(link.href, link.exact)
                    ? "bg-white/15 text-white"
                    : "text-white/75 hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
