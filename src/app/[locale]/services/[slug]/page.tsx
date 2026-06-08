import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import ServiceOfferingCards from "@/components/ServiceOfferingCards";
import { getServiceBySlug, services } from "@/data/services";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/localized";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return services.flatMap((service) =>
    ["fr", "en", "zh"].map((locale) => ({ locale, slug: service.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const locale = isValidLocale(l) ? l : "fr";
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service" };
  return { title: t(service.title, locale), description: t(service.shortDescription, locale) };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale: l, slug } = await params;
  if (!isValidLocale(l)) return null;
  const locale: Locale = l;
  const dict = getDictionary(locale);
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <main>
      <section className="bg-white pt-8">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-1 text-sm text-blue-light transition-colors hover:text-navy"
          >
            ← {dict.services.back}
          </Link>
        </div>
      </section>

      <section className="bg-white pb-16 pt-6">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <h1 className="mb-6 text-center text-3xl font-bold text-navy sm:text-4xl">
              {t(service.title, locale)}
            </h1>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-gray-600">
              {t(service.description, locale)}
            </p>
          </FadeIn>

          <ServiceOfferingCards
            offerings={service.offerings}
            locale={locale}
            sectionTitle={dict.services.offeringsTitle}
          />

          <FadeIn>
            <div className="mt-14 text-center">
              <Link
                href={`/${locale}/devis`}
                className="inline-flex rounded-full bg-navy px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-dark"
              >
                {dict.hero.ctaQuote}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
