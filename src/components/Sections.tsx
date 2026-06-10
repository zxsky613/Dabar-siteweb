import type { Dictionary } from "@/dictionaries/fr";
import FadeIn from "./FadeIn";

export function StatsSection({ dict }: { dict: Dictionary }) {
  const stats = [
    { value: dict.stats.yearsValue, label: dict.stats.years },
    { value: dict.stats.projectsValue, label: dict.stats.projects },
    { value: dict.stats.clientsValue, label: dict.stats.clients },
    { value: dict.stats.countriesValue, label: dict.stats.countries },
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
            <FadeIn key={stat.label} delay={i * 80} className="h-full">
              <div className="glass-card interactive-card h-full p-6 text-center">
                <p className="text-3xl font-bold text-navy sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
