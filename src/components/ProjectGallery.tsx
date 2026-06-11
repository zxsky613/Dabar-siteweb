"use client";

import { useCallback, useEffect, useState } from "react";
import { NavArrow } from "@/components/NavArrow";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [active, setActive] = useState(0);
  const total = images.length;

  const goPrev = useCallback(() => {
    setActive((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % total);
  }, [total]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  if (total === 0) return null;

  const main = images[active] ?? images[0];
  const arrowButtonClass =
    "absolute top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy shadow-md backdrop-blur-sm transition-all hover:scale-105 hover:bg-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100";

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={main}
          alt={`${title} — ${active + 1}/${total}`}
          className="aspect-[16/10] w-full object-cover"
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy/25 to-transparent"
          aria-hidden
        />

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Photo précédente"
              className={`${arrowButtonClass} left-3`}
            >
              <NavArrow direction="left" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Photo suivante"
              className={`${arrowButtonClass} right-3`}
            >
              <NavArrow direction="right" className="h-5 w-5" />
            </button>

            <span className="absolute bottom-3 right-3 rounded-full bg-navy/70 px-2.5 py-1 text-xs font-medium tabular-nums text-white backdrop-blur-sm">
              {active + 1} / {total}
            </span>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {images.map((src, index) => {
            const isActive = active === index;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`${title} — photo ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative w-16 shrink-0 overflow-hidden rounded-lg border transition-all sm:w-20 ${
                  isActive
                    ? "border-blue-light ring-2 ring-blue-light/40"
                    : "border-gray-200 opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
