import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PartnerMarquee from "@/components/PartnerMarquee";
import HomeProjectsSection from "@/components/HomeProjectsSection";
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
        <div className="relative mx-auto flex min-h-0 flex-1 flex-col justify-center max-w-6xl px-6 py-4">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10 animate-fade-in-up">
            <div className="flex flex-col justify-center text-center lg:text-left">
              <h1 className="text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
                {dict.hero.title}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg lg:mx-0">
                {dict.hero.subtitle}
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
                <Link
                  href={`/${locale}/contact`}
                  className="btn-interactive inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-semibold text-white shadow-lg hover:bg-navy-dark"
                >
                  {dict.hero.ctaContact}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/services`}
                  className="btn-interactive inline-flex rounded-full border border-navy/20 px-7 py-3 text-sm font-semibold text-navy hover:border-navy hover:bg-gray-50"
                >
                  {dict.hero.ctaServices}
                </Link>
              </div>
            </div>

            <div className="grid h-52 min-h-0 grid-rows-[3fr_2fr] gap-2 sm:h-60 lg:h-full">
              <div className="relative min-h-0 overflow-hidden rounded-2xl">
                <Image
                  src="/images/hero/convoyeur-courbe.png"
                  alt={dict.hero.images.convoyeur}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  priority
                />
              </div>
              <div className="grid min-h-0 grid-cols-[7fr_4fr] gap-2">
                <div className="relative min-h-0 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/hero/trieur-automatise.png"
                    alt={dict.hero.images.trieur}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 60vw, 300px"
                    priority
                  />
                </div>
                <div className="relative min-h-0 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/hero/rayonnages-entrepot.png"
                    alt={dict.hero.images.rayonnages}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 35vw, 180px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling partner logos */}
        <div className="relative shrink-0 border-t border-gray-100 bg-white py-6 sm:py-10">
          <div className="mx-auto max-w-6xl px-6">
            <PartnerMarquee label={dict.home.partnersMarquee} variant="light" compact />
          </div>
        </div>
      </section>

      <ProcessSection dict={dict} />

      <HomeProjectsSection locale={locale} dict={dict} />
    </main>
  );
}
