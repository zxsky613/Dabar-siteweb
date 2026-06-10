import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import { BackLink } from "@/components/NavArrow";
import ProjectGallery from "@/components/ProjectGallery";
import type { Project } from "@/data/projects";
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

type ProjectDetailViewProps = {
  project: Project;
  locale: Locale;
  backHref: string;
  backLabel: string;
  contactLabel: string;
  highlightsTitle: string;
  locationLabel: string;
  yearLabel: string;
};

/** Mise en page unique pour toutes les pages réalisation. */
export function ProjectDetailView({
  project,
  locale,
  backHref,
  backLabel,
  contactLabel,
  highlightsTitle,
  locationLabel,
  yearLabel,
}: ProjectDetailViewProps) {
  const galleryImages = project.images?.length ? project.images : project.image ? [project.image] : [];

  return (
    <main>
      <section className="bg-white pb-10 pt-2 sm:pb-12 sm:pt-3">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <FadeIn>
            <BackLink href={backHref} label={backLabel} />
            <h1 className="mx-auto mt-1 max-w-2xl text-center text-2xl font-bold text-navy sm:text-3xl">
              {t(project.title, locale)}
            </h1>
          </FadeIn>

          <FadeIn delay={75}>
            <div className="mt-5 sm:mt-6">
              <ProjectGallery images={galleryImages} title={t(project.title, locale)} />
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="mx-auto mt-8 max-w-2xl">
              <p className="text-center text-base leading-relaxed text-gray-600">{t(project.description, locale)}</p>

              {project.highlights && project.highlights.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-center text-xs font-semibold uppercase tracking-wider text-blue-light">
                    {highlightsTitle}
                  </h2>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {project.highlights.map((item) => (
                      <div
                        key={t(item.label, locale)}
                        className="interactive-border-card rounded-xl border border-gray-200 bg-white p-3 text-center shadow-sm"
                      >
                        <p className="text-xl font-bold text-navy">{item.value}</p>
                        <p className="mt-1 text-xs leading-snug text-gray-500">{t(item.label, locale)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <dl className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4 border-t border-gray-200 pt-8 text-center">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">{locationLabel}</dt>
                  <dd className="mt-1 text-sm font-medium text-navy">{t(project.location, locale)}</dd>
                </div>
                {project.year ? (
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">{yearLabel}</dt>
                    <dd className="mt-1 text-sm font-medium text-navy">{project.year}</dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-8 text-center">
                <Link
                  href={`/${locale}/contact`}
                  className="btn-interactive inline-block rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-dark"
                >
                  {contactLabel}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale: l, slug } = await params;
  if (!isValidLocale(l)) return null;
  const locale: Locale = l;
  const dict = getDictionary(locale);
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <ProjectDetailView
      project={project}
      locale={locale}
      backHref={`/${locale}/realisations`}
      backLabel={dict.projects.back}
      contactLabel={dict.hero.ctaContact}
      highlightsTitle={dict.projects.highlightsTitle}
      locationLabel={dict.projects.location}
      yearLabel={dict.projects.year}
    />
  );
}
