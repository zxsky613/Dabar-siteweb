import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import { getProjectBySlug, getPublishedProjects } from "@/data/projects";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/localized";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getPublishedProjects().flatMap((project) =>
    ["fr", "en", "zh"].map((locale) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const locale = isValidLocale(l) ? l : "fr";
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Projet" };
  return { title: t(project.title, locale), description: t(project.description, locale) };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale: l, slug } = await params;
  if (!isValidLocale(l)) return null;
  const locale: Locale = l;
  const dict = getDictionary(locale);
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main>
      <section className="border-b border-gray-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <Link
              href={`/${locale}/realisations`}
              className="text-sm text-blue-light transition-colors hover:text-navy"
            >
              ← {dict.projects.back}
            </Link>
            <p className="mt-4 text-sm font-medium uppercase tracking-wider text-blue-light">
              {t(project.sector, locale)}
            </p>
            <h1 className="mt-2 text-4xl font-bold text-navy">{t(project.title, locale)}</h1>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-gray-100">
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image}
                    alt={t(project.title, locale)}
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <svg className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <p className="text-lg leading-relaxed text-gray-600">{t(project.description, locale)}</p>
              <dl className="mt-8 space-y-4 border-t border-gray-200 pt-8">
                <div>
                  <dt className="text-sm font-medium text-gray-500">{dict.projects.sector}</dt>
                  <dd className="mt-1 text-navy">{t(project.sector, locale)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">{dict.projects.location}</dt>
                  <dd className="mt-1 text-navy">{t(project.location, locale)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">{dict.projects.year}</dt>
                  <dd className="mt-1 text-navy">{project.year}</dd>
                </div>
              </dl>
              <Link
                href={`/${locale}/devis`}
                className="mt-8 inline-block rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-dark"
              >
                {dict.hero.ctaQuote}
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
