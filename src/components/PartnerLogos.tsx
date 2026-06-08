import { partners } from "@/data/partners";
import FadeIn from "./FadeIn";

type PartnerLogosProps = {
  title: string;
  subtitle: string;
};

export default function PartnerLogos({ title, subtitle }: PartnerLogosProps) {
  return (
    <section className="border-t border-gray-200 bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy">{title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">{subtitle}</p>
          </div>
        </FadeIn>

        <div className="mt-14 flex flex-wrap justify-center gap-4 sm:gap-5">
          {partners.map((partner, i) => (
            <FadeIn key={partner.name} delay={i * 30}>
              <div className="group flex size-32 items-center justify-center rounded-lg border border-gray-200/80 bg-white p-4 shadow-sm transition-all hover:border-blue-light/40 hover:shadow-md sm:size-36 md:size-40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
