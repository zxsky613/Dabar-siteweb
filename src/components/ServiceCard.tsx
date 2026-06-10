import Link from "next/link";
import type { Dictionary } from "@/dictionaries/fr";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/localized";
import type { Service } from "@/data/services";
import FadeIn from "./FadeIn";

type ServiceCardProps = {
  service: Service;
  locale: Locale;
  dict: Dictionary;
};

export default function ServiceCard({ service, locale, dict }: ServiceCardProps) {
  return (
    <FadeIn>
      <Link
        href={`/${locale}/services/${service.slug}`}
        className="glass-card interactive-card group flex h-full flex-col overflow-hidden p-6"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/50 text-navy transition-colors group-hover:bg-blue-light/20 group-hover:text-blue-light">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-navy">{t(service.title, locale)}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
          {t(service.shortDescription, locale)}
        </p>
        <span className="mt-4 text-sm font-medium text-blue-light transition-colors group-hover:text-navy">
          {dict.services.learnMore} →
        </span>
      </Link>
    </FadeIn>
  );
}
