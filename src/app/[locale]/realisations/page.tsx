import type { Metadata } from "next";
import ProjectCard, { EmptyProjects } from "@/components/ProjectCard";
import PageHeader from "@/components/PageHeader";
import { getPublishedProjects } from "@/data/projects";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = isValidLocale(l) ? l : "fr";
  const dict = getDictionary(locale);
  return { title: dict.projects.title, description: dict.projects.subtitle };
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale: l } = await params;
  if (!isValidLocale(l)) return null;
  const locale: Locale = l;
  const dict = getDictionary(locale);
  const publishedProjects = getPublishedProjects();

  return (
    <main>
      <PageHeader title={dict.projects.title} subtitle={dict.projects.subtitle} />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
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
      </section>
    </main>
  );
}
