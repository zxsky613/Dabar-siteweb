import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import PageHeader from "@/components/PageHeader";
import { COMPANY } from "@/lib/constants";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, type Locale } from "@/lib/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = isValidLocale(l) ? l : "fr";
  const dict = getDictionary(locale);
  return { title: dict.legal.mentionsTitle };
}

const content = {
  fr: {
    sections: [
      {
        title: "Éditeur du site",
        body: `Le site ${COMPANY.domain} est édité par la société ${COMPANY.legalName}, SIREN ${COMPANY.siren}.\n\nSiège social : ${COMPANY.address}\nTéléphone : ${COMPANY.phone}`,
      },
      {
        title: "Directeur de la publication",
        body: "Le directeur de la publication est le représentant légal de la société Dabar.",
      },
      {
        title: "Hébergement",
        body: `Le site est hébergé par one.com.\nDomaine : ${COMPANY.domain}`,
      },
      {
        title: "Propriété intellectuelle",
        body: "L'ensemble du contenu de ce site (textes, images, logos, graphismes) est la propriété exclusive de Dabar, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.",
      },
      {
        title: "Limitation de responsabilité",
        body: "Dabar s'efforce de fournir des informations exactes et à jour. Toutefois, la société ne saurait être tenue responsable des omissions, inexactitudes ou carences dans la mise à jour des informations diffusées sur ce site.",
      },
    ],
  },
  en: {
    sections: [
      {
        title: "Website publisher",
        body: `The website ${COMPANY.domain} is published by ${COMPANY.legalName}, SIREN ${COMPANY.siren}.\n\nRegistered office: ${COMPANY.address}\nPhone: ${COMPANY.phone}`,
      },
      {
        title: "Publication director",
        body: "The publication director is the legal representative of Dabar.",
      },
      {
        title: "Hosting",
        body: `The website is hosted by one.com.\nDomain: ${COMPANY.domain}`,
      },
      {
        title: "Intellectual property",
        body: "All content on this website (text, images, logos, graphics) is the exclusive property of Dabar unless otherwise stated. Any reproduction, even partial, is prohibited without prior authorization.",
      },
      {
        title: "Limitation of liability",
        body: "Dabar strives to provide accurate and up-to-date information. However, the company cannot be held liable for omissions, inaccuracies or deficiencies in updating the information published on this site.",
      },
    ],
  },
  zh: {
    sections: [
      {
        title: "网站发布者",
        body: `网站 ${COMPANY.domain} 由 ${COMPANY.legalName} 发布，SIREN ${COMPANY.siren}。\n\n注册地址：${COMPANY.address}\n电话：${COMPANY.phone}`,
      },
      {
        title: "出版负责人",
        body: "出版负责人为 Dabar 公司的法定代表人。",
      },
      {
        title: "托管",
        body: `网站由 one.com 托管。\n域名：${COMPANY.domain}`,
      },
      {
        title: "知识产权",
        body: "本网站的所有内容（文字、图片、标志、图形）均为 Dabar 的专有财产。未经事先授权，禁止任何复制。",
      },
      {
        title: "责任限制",
        body: "Dabar 尽力提供准确和最新的信息。但对于网站上发布信息的遗漏、不准确或更新不足，公司不承担责任。",
      },
    ],
  },
};

export default async function LegalPage({ params }: PageProps) {
  const { locale: l } = await params;
  if (!isValidLocale(l)) return null;
  const locale: Locale = l;
  const dict = getDictionary(locale);
  const pageContent = content[locale];

  return (
    <main>
      <PageHeader title={dict.legal.mentionsTitle} />

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-10 text-sm text-gray-500">
            {dict.legal.lastUpdate} : {new Date().getFullYear()}
          </p>
          <div className="space-y-10">
            {pageContent.sections.map((section) => (
              <FadeIn key={section.title}>
                <h2 className="text-xl font-semibold text-navy">{section.title}</h2>
                <p className="mt-3 whitespace-pre-line leading-relaxed text-gray-600">{section.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
