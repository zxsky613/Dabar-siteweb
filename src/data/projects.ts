import type { LocalizedText } from "@/lib/i18n/localized";

export type Project = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  sector: LocalizedText;
  location: LocalizedText;
  year: string;
  image?: string;
  published: boolean;
};

export const projects: Project[] = [];

export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.published);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug && p.published);
}
