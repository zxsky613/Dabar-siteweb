import Link from "next/link";
import type { Metadata } from "next";
import PartnerMarquee from "@/components/PartnerMarquee";
import ProcessSection from "@/components/ProcessSection";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = isValidLocale(l) ? l : "fr";
  const dict = getDictionary(locale);

  return {
    title: dict.nav.home,
    description: dict.hero.subtitle,
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale: l } = await params;
  if (!isValidLocale(l)) return null;
  const locale: Locale = l;
  const dict = getDictionary(locale);

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-5rem)] flex-col overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(74,172,232,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(26,58,92,0.04),transparent_50%)]" />

        <div className="relative mx-auto flex flex-1 flex-col justify-center max-w-6xl px-6 py-4">
          <div className="mx-auto max-w-3xl text-center animate-fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-light">
              Dabar
            </p>
            <h1 className="mt-2 text-3xl font-bold leading-tight text-navy sm:mt-3 sm:text-4xl lg:text-5xl">
              {dict.hero.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              {dict.hero.subtitle}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href={`/${locale}/devis`}
                className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-navy-dark hover:scale-[1.02]"
              >
                {dict.hero.ctaQuote}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
              <Link
                href={`/${locale}/services`}
                className="inline-flex rounded-full border border-navy/20 px-7 py-3 text-sm font-semibold text-navy transition-all hover:border-navy hover:bg-gray-50"
              >
                {dict.hero.ctaServices}
              </Link>
            </div>
          </div>

        </div>

        {/* Scrolling partner logos */}
        <div className="relative shrink-0 border-t border-gray-100 bg-gray-50/50 py-5 sm:py-6">
          <div className="mx-auto max-w-6xl px-6">
            <PartnerMarquee label={dict.home.partnersMarquee} variant="light" compact />
          </div>
        </div>
      </section>

      <ProcessSection dict={dict} />
    </main>
  );
}
