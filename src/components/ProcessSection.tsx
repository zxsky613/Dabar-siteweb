import type { Dictionary } from "@/dictionaries/fr";
import FadeIn from "./FadeIn";

type ProcessSectionProps = {
  dict: Dictionary;
};

export default function ProcessSection({ dict }: ProcessSectionProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy">{dict.process.title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">{dict.process.subtitle}</p>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.process.steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 100}>
              <div className="glass-card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/90 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
