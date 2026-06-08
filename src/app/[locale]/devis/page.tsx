import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import DevisForm from "@/components/DevisForm";
import PageHeader from "@/components/PageHeader";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { isMailConfigured } from "@/lib/mail";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = isValidLocale(l) ? l : "fr";
  const dict = getDictionary(locale);
  return { title: dict.quote.title, description: dict.quote.subtitle };
}

export default async function DevisPage({ params }: PageProps) {
  const { locale: l } = await params;
  if (!isValidLocale(l)) return null;
  const locale: Locale = l;
  const dict = getDictionary(locale);
  const mailConfigured = isMailConfigured();

  return (
    <main>
      <PageHeader title={dict.quote.title} subtitle={dict.quote.subtitle} />

      <section className="py-20">
        <div className="mx-auto max-w-2xl px-6">
          <FadeIn>
            <div className="glass-card p-8">
              <DevisForm dict={dict} mailConfigured={mailConfigured} />
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
