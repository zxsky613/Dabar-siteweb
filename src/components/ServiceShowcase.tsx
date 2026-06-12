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
        <div className="space-y-8 sm:space-y-10">
          {services.map((service, index) => {
            const imageRight = index % 2 === 0;

            return (
              <FadeIn key={service.slug} delay={index * 80}>
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="glass-card interactive-card group block overflow-hidden"
                >
                  <article
                    className={`grid lg:grid-cols-2 ${
                      imageRight ? "" : "lg:[&>*:first-child]:order-2"
                    }`}
                  >
                    <div className="flex flex-col justify-center p-6 sm:p-8">
                      <h2 className="text-xl font-bold text-navy transition-colors group-hover:text-blue-light sm:text-2xl">
                        {t(service.title, locale)}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                        {t(service.description, locale)}
                      </p>
                      <ul className="mt-4 space-y-1.5">
                        {tl(service.features, locale)
                          .slice(0, 3)
                          .map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="mt-0.5 text-blue-light">✓</span>
                              {feature}
                            </li>
                          ))}
                      </ul>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-light transition-all group-hover:gap-3 group-hover:text-navy">
                        {dict.services.learnMore}
                        <span aria-hidden>→</span>
                      </span>
                    </div>

                    <div className="relative min-h-[200px] overflow-hidden sm:min-h-[250px]">
                      <Image
                        src={service.image}
                        alt={t(service.title, locale)}
                        fill
                        className="object-cover interactive-image-zoom"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/15 to-transparent" aria-hidden />
                    </div>
                  </article>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
