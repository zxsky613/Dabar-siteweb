import { partners } from "@/data/partners";

type PartnerMarqueeProps = {
  label: string;
  variant?: "light" | "dark";
  compact?: boolean;
};

export default function PartnerMarquee({ label, variant = "light", compact = false }: PartnerMarqueeProps) {
  const items = [...partners, ...partners];

  const tileClass =
    variant === "dark"
      ? compact
        ? "interactive-border-card flex size-20 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-md sm:size-24"
        : "interactive-border-card flex size-24 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-md sm:size-28"
      : compact
        ? "interactive-border-card flex size-20 shrink-0 items-center justify-center rounded-xl border border-white/70 bg-white/50 p-3 shadow-sm backdrop-blur-md sm:size-24"
        : "interactive-border-card flex size-24 shrink-0 items-center justify-center rounded-xl border border-white/70 bg-white/50 p-4 shadow-sm backdrop-blur-md sm:size-28";

  const labelClass =
    variant === "dark"
      ? "text-xs font-semibold uppercase tracking-[0.2em] text-white/60"
      : "text-xs font-semibold uppercase tracking-[0.2em] text-gray-500";

  return (
    <div className="w-full">
      <p className={`${compact ? "mb-5" : "mb-6"} text-center ${labelClass}`}>{label}</p>
      <div
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max flex-row flex-nowrap gap-5 px-2 animate-marquee hover:[animation-play-state:paused]">
          {items.map((partner, i) => (
            <div key={`${partner.name}-${i}`} className={tileClass}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
