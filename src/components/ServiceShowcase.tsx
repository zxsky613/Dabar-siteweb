import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Dictionary } from "@/dictionaries/fr";
import type { Service } from "@/data/services";
import type { Locale } from "@/lib/i18n/config";
import { t, tl } from "@/lib/i18n/localized";
import FadeIn from "./FadeIn";

type ServiceShowcaseProps = {
  services: Service[];
  locale: Locale;
  dict: Dictionary;
};

function ServiceIcon({ slug }: { slug: string }) {
  const icons: Record<string, ReactNode> = {
    "installation-logistique": (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h10M20 17v4H4V3h16v14" />
    ),
    tic: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
    ),
    "reamenagement-electrique": (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
    "amenagement-bureaux": (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    ),
    approvisionnement: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    ),
  };

  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {icons[slug] ?? icons["installation-logistique"]}
    </svg>
  );
}

export default function ServiceShowcase({ services, locale, dict }: ServiceShowcaseProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="space-y-16">
          {services.map((service, index) => {
            const imageRight = index % 2 === 0;

            return (
              <FadeIn key={service.slug} delay={index * 80}>
                <article>
                  <h2 className="mb-8 text-center text-2xl font-bold text-navy sm:text-3xl">
                    {t(service.title, locale)}
                  </h2>

                  <div
                    className={`grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8 ${
                      imageRight ? "" : "lg:[&>*:first-child]:order-2"
                    }`}
                  >
                    <div className="glass-card flex flex-col p-8 sm:p-10">
                      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white">
                        <ServiceIcon slug={service.slug} />
                      </div>
                      <p className="text-base leading-relaxed text-gray-600">
                        {t(service.description, locale)}
                      </p>
                      <ul className="mt-6 space-y-2">
                        {tl(service.features, locale)
                          .slice(0, 3)
                          .map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="mt-0.5 text-blue-light">✓</span>
                              {feature}
                            </li>
                          ))}
                      </ul>
                      <Link
                        href={`/${locale}/services/${service.slug}`}
                        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-light transition-colors hover:text-navy"
                      >
                        {dict.services.learnMore}
                        <span aria-hidden>→</span>
                      </Link>
                    </div>

                    <div className="relative min-h-[280px] overflow-hidden rounded-2xl sm:min-h-[320px]">
                      <Image
                        src={service.image}
                        alt={t(service.title, locale)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
                    </div>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
