import Link from "next/link";
import type { Dictionary } from "@/dictionaries/fr";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/localized";
import type { Project } from "@/data/projects";
import FadeIn from "./FadeIn";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
};

export default function ProjectCard({ project, locale }: ProjectCardProps) {
  return (
    <FadeIn>
      <Link
        href={`/${locale}/realisations/${project.slug}`}
        className="glass-card group block overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl"
      >
        <div className="flex h-48 items-center justify-center bg-gray-100 text-gray-400">
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image} alt={t(project.title, locale)} className="h-full w-full object-cover" />
          ) : (
            <svg className="h-12 w-12 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>
        <div className="p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-blue-light">
            {t(project.sector, locale)}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-navy group-hover:text-blue-light">
            {t(project.title, locale)}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {t(project.description, locale)}
          </p>
        </div>
      </Link>
    </FadeIn>
  );
}

export function EmptyProjects({ dict }: { dict: Dictionary }) {
  return (
    <div className="glass-card border-dashed px-8 py-16 text-center">
      <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <p className="mt-4 text-lg font-medium text-navy">{dict.projects.empty}</p>
      <p className="mt-2 text-sm text-gray-500">{dict.projects.emptyHint}</p>
    </div>
  );
}
