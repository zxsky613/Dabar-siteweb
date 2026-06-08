import type { Dictionary } from "@/dictionaries/fr";
import FadeIn from "./FadeIn";

export function StatsSection({ dict }: { dict: Dictionary }) {
  const stats = [
    { label: dict.stats.years },
    { label: dict.stats.projects },
    { label: dict.stats.clients },
    { label: dict.stats.countries },
  ];

  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <h2 className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.2em] text-blue-light">
            {dict.stats.title}
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 80}>
              <div className="glass-card p-6 text-center">
                <p className="text-3xl font-bold text-navy sm:text-4xl">{dict.stats.placeholder}</p>
                <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy">{dict.home.testimonialsTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">{dict.home.testimonialsSubtitle}</p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="glass-card border-dashed p-8">
                <p className="text-sm italic text-gray-400">&ldquo;{dict.home.testimonialsPlaceholder}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/50" />
                  <div>
                    <p className="text-sm font-medium text-gray-300">—</p>
                    <p className="text-xs text-gray-300">—</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
