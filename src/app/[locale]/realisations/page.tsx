import type { Metadata } from "next";
import { Suspense } from "react";
import { EmptyProjects } from "@/components/ProjectCard";
import PageHeader from "@/components/PageHeader";
import ProjectCategoryTabs from "@/components/ProjectCategoryTabs";
import { getPublishedProjects, groupProjectsByCategory, isProjectCategory } from "@/data/projects";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = isValidLocale(l) ? l : "fr";
  const dict = getDictionary(locale);
  return { title: dict.projects.title, description: dict.projects.subtitle };
}

export default async function ProjectsPage({ params, searchParams }: PageProps) {
  const { locale: l } = await params;
  const { category: categoryParam } = await searchParams;
  if (!isValidLocale(l)) return null;
  const locale: Locale = l;
  const dict = getDictionary(locale);
  const publishedProjects = getPublishedProjects();
  const grouped = groupProjectsByCategory(publishedProjects);
  const initialCategory = categoryParam && isProjectCategory(categoryParam) ? categoryParam : undefined;

  return (
    <main>
      <PageHeader title={dict.projects.title} subtitle={dict.projects.subtitle} />

      <section className="page-content">
        <div className="mx-auto max-w-6xl px-6">
          {publishedProjects.length > 0 ? (
            <Suspense fallback={<div className="h-96" aria-hidden />}>
              <ProjectCategoryTabs
                grouped={grouped}
                locale={locale}
                dict={dict}
                initialCategory={initialCategory}
              />
            </Suspense>
          ) : (
            <EmptyProjects dict={dict} />
          )}
        </div>
      </section>
    </main>
  );
}
