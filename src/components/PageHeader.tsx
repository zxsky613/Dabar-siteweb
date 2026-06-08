import type { ReactNode } from "react";
import FadeIn from "./FadeIn";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export default function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-white py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(74,172,232,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(26,58,92,0.04),transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <FadeIn>
          {children}
          <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">{title}</h1>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-500 sm:mt-5 sm:text-lg">
              {subtitle}
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
