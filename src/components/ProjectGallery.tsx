"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowButton } from "@/components/NavArrow";

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

  return (
    <div className="mx-auto w-full max-w-xl sm:max-w-2xl">
      <div className="flex items-center justify-center gap-3 sm:gap-6">
        {total > 1 ? (
          <ArrowButton direction="left" onClick={goPrev} label="Photo précédente" />
        ) : (
          <span className="hidden w-8 shrink-0 sm:block sm:w-10" aria-hidden />
        )}

        <div className="min-w-0 flex-1">
          <div className="interactive-card-subtle group overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={main}
              alt={`${title} — ${active + 1}/${total}`}
              className="aspect-[4/3] w-full object-cover interactive-image-zoom"
            />
          </div>
        </div>

        {total > 1 ? (
          <ArrowButton direction="right" onClick={goNext} label="Photo suivante" />
        ) : (
          <span className="hidden w-8 shrink-0 sm:block sm:w-10" aria-hidden />
        )}
      </div>

      {total > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all ${
                active === index ? "w-6 bg-navy" : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`${title} — photo ${index + 1}`}
              aria-current={active === index ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
