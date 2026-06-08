import type { Metadata } from "next";
import ServiceShowcase from "@/components/ServiceShowcase";
import ProcessSection from "@/components/ProcessSection";
import PageHeader from "@/components/PageHeader";
import { services } from "@/data/services";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = isValidLocale(l) ? l : "fr";
  const dict = getDictionary(locale);
  return { title: dict.services.title, description: dict.services.subtitle };
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale: l } = await params;
  if (!isValidLocale(l)) return null;
  const locale: Locale = l;
  const dict = getDictionary(locale);

  return (
    <main>
      <PageHeader title={dict.services.title} subtitle={dict.services.subtitle} />

      <ServiceShowcase services={services} locale={locale} dict={dict} />

      <ProcessSection dict={dict} />
    </main>
  );
}
