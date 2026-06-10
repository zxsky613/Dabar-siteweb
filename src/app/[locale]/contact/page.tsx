import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";
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
  return { title: dict.contact.title, description: dict.contact.subtitle };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: l } = await params;
  if (!isValidLocale(l)) return null;
  const locale: Locale = l;
  const dict = getDictionary(locale);
  const mailConfigured = isMailConfigured();

  return (
    <main>
      <PageHeader title={dict.contact.title} subtitle={dict.contact.subtitle} />

      <section className="page-content">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <div className="glass-card p-8">
              <h2 className="text-xl font-semibold text-navy">{dict.contact.formTitle}</h2>
              <div className="mt-6">
                <ContactForm dict={dict} mailConfigured={mailConfigured} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
