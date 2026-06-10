import Image from "next/image";
import type { ServiceOffering } from "@/data/services";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/localized";
import FadeIn from "./FadeIn";

type ServiceOfferingCardsProps = {
  offerings: ServiceOffering[];
  locale: Locale;
  sectionTitle?: string;
};

export default function ServiceOfferingCards({
  offerings,
  locale,
  sectionTitle,
}: ServiceOfferingCardsProps) {
  return (
    <div>
      {sectionTitle && (
        <h3 className="mb-8 text-center text-xl font-bold text-navy sm:text-2xl">{sectionTitle}</h3>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offerings.map((offering, index) => (
          <FadeIn key={offering.id} delay={index * 60}>
            <article className="interactive-border-card group flex h-full flex-col rounded-2xl border border-gray-100 bg-gray-50 p-5 sm:p-6">
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl border border-white/70 bg-white shadow-sm">
                <Image
                  src={offering.image}
                  alt={t(offering.title, locale)}
                  fill
                  className="object-cover interactive-image-zoom"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h4 className="text-base font-semibold leading-snug text-navy">
                {t(offering.title, locale)}
              </h4>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                {t(offering.description, locale)}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
