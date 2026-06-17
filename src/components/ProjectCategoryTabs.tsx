"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { Dictionary } from "@/dictionaries/fr";
import type { Project, ProjectCategory } from "@/data/projects";
import { PROJECT_CATEGORIES, isProjectCategory } from "@/data/projects";
import type { Locale } from "@/lib/i18n/config";

type ProjectCategoryTabsProps = {
  grouped: Record<ProjectCategory, Project[]>;
  locale: Locale;
  dict: Dictionary;
  limit?: number;
  viewAllHref?: string;
  viewAllLabel?: string;
  initialCategory?: ProjectCategory;
};

export default function ProjectCategoryTabs({
  grouped,
  locale,
  dict,
  limit,
  viewAllHref,
  viewAllLabel,
  initialCategory,
}: ProjectCategoryTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState<ProjectCategory>(initialCategory ?? "conveyors");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && isProjectCategory(categoryParam)) {
      setActive(categoryParam);
    }
  }, [searchParams]);

  function selectCategory(category: ProjectCategory) {
    setActive(category);
    router.replace(`${pathname}?category=${category}`, { scroll: false });
  }

  const activeProjects = grouped[active];
  const displayedProjects = limit ? activeProjects.slice(0, limit) : activeProjects;

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {PROJECT_CATEGORIES.map((category) => {
          const meta = dict.projects.categories[category];
          const count = grouped[category].length;
          const isActive = active === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => selectCategory(category)}
              className={`interactive-tab rounded-full px-4 py-2.5 text-sm font-semibold sm:px-5 ${
                isActive
                  ? "bg-navy text-white shadow-md"
                  : "border border-gray-200 bg-white text-navy hover:border-blue-light hover:text-blue-light"
              }`}
              aria-pressed={isActive}
            >
              {meta.title}
              <span className={`ml-2 text-xs font-normal ${isActive ? "text-white/80" : "text-gray-400"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">{dict.projects.categories[active].subtitle}</p>
      </div>

      {displayedProjects.length > 0 ? (
        <div className="mt-8 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-center text-gray-500">{dict.projects.empty}</p>
      )}

      {viewAllHref && viewAllLabel && (
        <div className="mt-10 text-center">
          <Link
            href={viewAllHref}
            className="btn-interactive inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-semibold text-white shadow-md hover:bg-navy-dark"
          >
            {viewAllLabel}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
