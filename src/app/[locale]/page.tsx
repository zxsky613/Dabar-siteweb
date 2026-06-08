import Link from "next/link";
import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import PartnerMarquee from "@/components/PartnerMarquee";
import ProcessSection from "@/components/ProcessSection";
import ProjectCard, { EmptyProjects } from "@/components/ProjectCard";
import ServiceCard from "@/components/ServiceCard";
import { StatsSection, TestimonialsSection } from "@/components/Sections";
import { getPublishedProjects } from "@/data/projects";
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
  const publishedProjects = getPublishedProjects().slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(74,172,232,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(26,58,92,0.04),transparent_50%)]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-8 pt-16 sm:pt-24 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center animate-fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-light">
              Dabar
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-navy sm:text-5xl lg:text-6xl">
              {dict.hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              {dict.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={`/${locale}/devis`}
                className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-navy-dark hover:scale-[1.02]"
              >
                {dict.hero.ctaQuote}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
              <Link
                href={`/${locale}/services`}
                className="inline-flex rounded-full border border-navy/20 px-8 py-3.5 text-sm font-semibold text-navy transition-all hover:border-navy hover:bg-gray-50"
              >
                {dict.hero.ctaServices}
              </Link>
            </div>
          </div>

          {/* Glass preview cards */}
          <div className="mx-auto mt-16 hidden max-w-4xl gap-6 md:grid md:grid-cols-2">
            <div className="glass-card p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-blue-light">Europe</p>
              <p className="mt-2 text-2xl font-bold text-navy">10+ ans</p>
              <p className="mt-1 text-sm text-gray-600">d&apos;expertise intralogistique</p>
            </div>
            <div className="glass-card p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-blue-light">Clé en main</p>
              <p className="mt-2 text-2xl font-bold text-navy">5 services</p>
              <p className="mt-1 text-sm text-gray-600">installation & ingénierie</p>
            </div>
          </div>
        </div>

        {/* Scrolling partner logos */}
        <div className="relative border-t border-gray-100 bg-gray-50/50 py-10">
          <div className="mx-auto max-w-6xl px-6">
            <PartnerMarquee label={dict.home.partnersMarquee} variant="light" />
          </div>
        </div>
      </section>

      <StatsSection dict={dict} />

      {/* About */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <div className="glass-card p-8">
                <h2 className="text-3xl font-bold text-navy">{dict.home.aboutTitle}</h2>
                <p className="mt-6 text-lg leading-relaxed text-gray-600">{dict.home.aboutText}</p>
                <Link
                  href={`/${locale}/a-propos`}
                  className="mt-6 inline-block text-sm font-semibold text-blue-light transition-colors hover:text-navy"
                >
                  {dict.nav.about} →
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="glass-card flex aspect-[4/3] items-center justify-center">
                <svg className="h-16 w-16 text-blue-light/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-navy">{dict.home.servicesTitle}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">{dict.home.servicesSubtitle}</p>
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.slug} service={service} locale={locale} dict={dict} />
            ))}
          </div>
          <FadeIn>
            <div className="mt-10 text-center">
              <Link
                href={`/${locale}/services`}
                className="glass-pill inline-block px-6 py-3 text-sm font-semibold text-navy transition-all hover:bg-white/60"
              >
                {dict.home.servicesLink}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <ProcessSection dict={dict} />

      {/* Projects preview */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-navy">{dict.home.projectsTitle}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">{dict.home.projectsSubtitle}</p>
            </div>
          </FadeIn>
          <div className="mt-12">
            {publishedProjects.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {publishedProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} locale={locale} />
                ))}
              </div>
            ) : (
              <EmptyProjects dict={dict} />
            )}
          </div>
          <FadeIn>
            <div className="mt-10 text-center">
              <Link
                href={`/${locale}/realisations`}
                className="text-sm font-semibold text-blue-light transition-colors hover:text-navy"
              >
                {dict.home.projectsLink} →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <TestimonialsSection dict={dict} />

      {/* Zone */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <div className="glass-card p-10 text-center">
              <h2 className="text-3xl font-bold text-navy">{dict.home.zoneTitle}</h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-600">{dict.home.zoneText}</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
