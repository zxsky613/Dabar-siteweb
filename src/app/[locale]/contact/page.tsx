import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import { COMPANY } from "@/lib/constants";
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

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <div className="glass-card p-8">
              <h2 className="text-xl font-semibold text-navy">{dict.contact.infoTitle}</h2>
              <address className="mt-6 space-y-4 not-italic text-gray-600">
                <p>
                  <span className="block text-sm font-medium text-gray-500">Adresse</span>
                  {COMPANY.address}
                </p>
                <p>
                  <span className="block text-sm font-medium text-gray-500">Téléphone</span>
                  <a href={COMPANY.phoneHref} className="text-blue-light hover:text-navy">
                    {COMPANY.phone}
                  </a>
                </p>
                <p>
                  <span className="block text-sm font-medium text-gray-500">Horaires</span>
                  {COMPANY.hours}
                </p>
                <p>
                  <span className="block text-sm font-medium text-gray-500">LinkedIn</span>
                  <a
                    href={COMPANY.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-light hover:text-navy"
                  >
                    Dabar Technique
                  </a>
                </p>
              </address>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="glass-card p-8">
                <h2 className="text-xl font-semibold text-navy">{dict.contact.formTitle}</h2>
                <div className="mt-6">
                  <ContactForm dict={dict} mailConfigured={mailConfigured} />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
