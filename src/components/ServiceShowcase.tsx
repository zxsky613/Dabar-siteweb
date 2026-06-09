import Image from "next/image";
import Link from "next/link";
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

export default function ServiceShowcase({ services, locale, dict }: ServiceShowcaseProps) {
  return (
    <section className="page-content bg-white">
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
