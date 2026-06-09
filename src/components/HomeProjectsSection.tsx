import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import type { Dictionary } from "@/dictionaries/fr";
import {
  PROJECT_CATEGORIES,
  getCategoryIllustration,
  getPublishedProjects,
  type ProjectCategory,
} from "@/data/projects";
import type { Locale } from "@/lib/i18n/config";

type HomeProjectsSectionProps = {
  locale: Locale;
  dict: Dictionary;
};

export default function HomeProjectsSection({ locale, dict }: HomeProjectsSectionProps) {
  if (getPublishedProjects().length === 0) return null;

  return (
    <section className="section-spacing-lg border-t border-gray-100 bg-gray-50/50">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy">{dict.home.projectsTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">{dict.home.projectsSubtitle}</p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PROJECT_CATEGORIES.map((category, index) => (
            <CategoryCard
              key={category}
              category={category}
              locale={locale}
              dict={dict}
              image={getCategoryIllustration(category)}
              delay={index * 80}
            />
          ))}
        </div>

        <FadeIn delay={200}>
          <div className="mt-10 text-center">
            <Link
              href={`/${locale}/realisations`}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-navy-dark hover:shadow-lg"
            >
              {dict.home.projectsLink}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

type CategoryCardProps = {
  category: ProjectCategory;
  locale: Locale;
  dict: Dictionary;
  image: string;
  delay: number;
};

function CategoryCard({ category, locale, dict, image, delay }: CategoryCardProps) {
  const meta = dict.projects.categories[category];

  return (
    <FadeIn delay={delay}>
      <Link
        href={`/${locale}/realisations?category=${category}`}
        className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-blue-light/40 hover:shadow-lg"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={meta.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={90}
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="text-lg font-bold text-navy transition-colors group-hover:text-blue-light">
            {meta.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-600">{meta.subtitle}</p>
        </div>
      </Link>
    </FadeIn>
  );
}
