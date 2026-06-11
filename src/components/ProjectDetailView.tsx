import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { BackLink } from "@/components/NavArrow";
import ProjectGallery from "@/components/ProjectGallery";
import type { Project } from "@/data/projects";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/localized";

type ProjectDetailViewProps = {
  project: Project;
  locale: Locale;
  backHref: string;
  backLabel: string;
  contactLabel: string;
  highlightsTitle: string;
  locationLabel: string;
  yearLabel: string;
  categoryLabel?: string;
  ctaHint?: string;
};

export default function ProjectDetailView({
  project,
  locale,
  backHref,
  backLabel,
  contactLabel,
  highlightsTitle,
  locationLabel,
  yearLabel,
  categoryLabel,
  ctaHint,
}: ProjectDetailViewProps) {
  const galleryImages = project.images?.length ? project.images : project.image ? [project.image] : [];

  return (
    <main>
      <section className="bg-white pb-12 pt-2 sm:pb-16 sm:pt-3">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          {/* En-tête : retour, catégorie, titre, méta */}
          <FadeIn>
            <BackLink href={backHref} label={backLabel} />
            <div className="mx-auto mt-2 max-w-3xl text-center">
              {categoryLabel && (
                <span className="inline-flex items-center rounded-full bg-blue-light/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-light">
                  {categoryLabel}
                </span>
              )}
              <h1 className="mt-3 text-2xl font-bold leading-tight text-navy sm:text-4xl">
                {t(project.title, locale)}
              </h1>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-gray-500">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="sr-only">{locationLabel} : </span>
                {t(project.location, locale)}
                {project.year && (
                  <>
                    <span className="text-gray-300" aria-hidden>
                      ·
                    </span>
                    <span className="sr-only">{yearLabel} : </span>
                    {project.year}
                  </>
                )}
              </p>
            </div>
          </FadeIn>

          {/* Galerie à gauche, contenu à droite */}
          <FadeIn delay={75}>
            <div className="mt-7 grid gap-8 sm:mt-9 lg:grid-cols-[7fr_5fr] lg:items-center lg:gap-12">
              <ProjectGallery images={galleryImages} title={t(project.title, locale)} />

              <div>
                <p className="text-center text-base leading-relaxed text-gray-600 sm:text-lg lg:text-left">
                  {t(project.description, locale)}
                </p>

                {project.highlights && project.highlights.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-blue-light lg:text-left">
                      {highlightsTitle}
                    </h2>
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                      {project.highlights.map((item) => (
                        <div
                          key={t(item.label, locale)}
                          className="interactive-border-card rounded-2xl border border-gray-200 bg-white px-4 py-5 text-center shadow-sm"
                        >
                          <p className="text-2xl font-bold tracking-tight text-navy">{item.value}</p>
                          <p className="mt-1.5 text-xs leading-snug text-gray-500">{t(item.label, locale)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            {/* Bandeau contact */}
            <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-gray-100 bg-gray-50/80 px-6 py-9 text-center sm:mt-14">
              {ctaHint && <p className="text-sm text-gray-600 sm:text-base">{ctaHint}</p>}
              <Link
                href={`/${locale}/contact`}
                className="btn-interactive mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-semibold text-white shadow-md hover:bg-navy-dark"
              >
                {contactLabel}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
