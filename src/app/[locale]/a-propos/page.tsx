import Image from "next/image";
import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import PageHeader from "@/components/PageHeader";
import { StatsSection } from "@/components/Sections";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = isValidLocale(l) ? l : "fr";
  const dict = getDictionary(locale);
  return { title: dict.about.title, description: dict.about.subtitle };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: l } = await params;
  if (!isValidLocale(l)) return null;
  const locale: Locale = l;
  const dict = getDictionary(locale);

  return (
    <main>
      <PageHeader title={dict.about.title} subtitle={dict.about.subtitle} />

      <section className="page-content">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
            <FadeIn className="h-full">
              <div className="glass-card flex h-full min-h-[280px] flex-col justify-center p-8 sm:p-10">
                <h2 className="text-3xl font-bold text-navy">{dict.home.aboutTitle}</h2>
                <p className="mt-6 text-lg leading-relaxed text-gray-600">{dict.home.aboutText}</p>
              </div>
            </FadeIn>
            <FadeIn className="h-full" delay={150}>
              <div className="glass-card relative h-full min-h-[280px] overflow-hidden">
                <Image
                  src="/images/about-team-v2.png"
                  alt={dict.home.aboutTitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <StatsSection dict={dict} />

      <section className="section-spacing">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <h2 className="text-2xl font-bold text-navy">{dict.about.historyTitle}</h2>
            <p className="mt-6 max-w-3xl whitespace-pre-line text-lg leading-relaxed text-gray-600">
              {dict.about.historyPlaceholder}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-spacing border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <h2 className="text-center text-2xl font-bold text-navy">{dict.about.valuesTitle}</h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.about.values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 80} className="h-full">
                <div className="interactive-border-card h-full rounded-xl border border-gray-200 bg-white p-6">
                  <h3 className="font-semibold text-navy">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <h2 className="text-2xl font-bold text-navy">{dict.about.teamTitle}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">{dict.about.teamText}</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-spacing border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <h2 className="text-2xl font-bold text-navy">{dict.about.certsTitle}</h2>
            <p className="mt-4 text-gray-500">{dict.about.certsPlaceholder}</p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
