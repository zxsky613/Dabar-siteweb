import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectDetailView from "@/components/ProjectDetailView";
import { getProjectBySlug, getPublishedProjects } from "@/data/projects";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/localized";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = true;

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
    <ProjectDetailView
      project={project}
      locale={locale}
      backHref={`/${locale}/realisations`}
      backLabel={dict.projects.back}
      contactLabel={dict.hero.ctaContact}
      highlightsTitle={dict.projects.highlightsTitle}
      clientsTitle={dict.projects.clientsTitle}
      locationLabel={dict.projects.location}
      yearLabel={dict.projects.year}
      categoryLabel={dict.projects.categories[project.category].title}
      ctaHint={dict.projects.ctaHint}
    />
  );
}
