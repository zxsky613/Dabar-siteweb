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
  return { title: dict.legal.privacyTitle };
}

const content = {
  fr: {
    sections: [
      {
        title: "Responsable du traitement",
        body: `${COMPANY.legalName}\n${COMPANY.address}\n${COMPANY.phone}`,
      },
      {
        title: "Données collectées",
        body: "Via nos formulaires de contact et de devis, nous collectons : nom, prénom, adresse email, numéro de téléphone, nom d'entreprise, type de projet et message. Ces données sont nécessaires pour répondre à votre demande.",
      },
      {
        title: "Finalité du traitement",
        body: "Vos données sont utilisées exclusivement pour traiter vos demandes de contact ou de devis, et pour assurer le suivi commercial de votre projet.",
      },
      {
        title: "Durée de conservation",
        body: "Vos données sont conservées pendant la durée nécessaire au traitement de votre demande, puis archivées conformément aux obligations légales (3 ans pour les prospects).",
      },
      {
        title: "Vos droits",
        body: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à l'adresse indiquée ci-dessus ou par téléphone.",
      },
      {
        title: "Cookies",
        body: "Ce site n'utilise pas de cookies de tracking. Des cookies techniques peuvent être utilisés pour le bon fonctionnement du site.",
      },
    ],
  },
  en: {
    sections: [
      {
        title: "Data controller",
        body: `${COMPANY.legalName}\n${COMPANY.address}\n${COMPANY.phone}`,
      },
      {
        title: "Data collected",
        body: "Through our contact and quote forms, we collect: name, email address, phone number, company name, project type and message. This data is necessary to respond to your request.",
      },
      {
        title: "Purpose of processing",
        body: "Your data is used exclusively to process your contact or quote requests and to provide commercial follow-up for your project.",
      },
      {
        title: "Retention period",
        body: "Your data is retained for the period necessary to process your request, then archived in accordance with legal obligations (3 years for prospects).",
      },
      {
        title: "Your rights",
        body: "In accordance with GDPR, you have the right to access, rectify, delete and port your data. To exercise these rights, contact us at the address above or by phone.",
      },
      {
        title: "Cookies",
        body: "This site does not use tracking cookies. Technical cookies may be used for the proper functioning of the site.",
      },
    ],
  },
  zh: {
    sections: [
      {
        title: "数据处理负责人",
        body: `${COMPANY.legalName}\n${COMPANY.address}\n${COMPANY.phone}`,
      },
      {
        title: "收集的数据",
        body: "通过我们的联系和报价表单，我们收集：姓名、电子邮箱、电话号码、公司名称、项目类型和消息。这些数据对于回应您的请求是必要的。",
      },
      {
        title: "处理目的",
        body: "您的数据仅用于处理您的联系或报价请求，以及为您的项目提供商业跟进。",
      },
      {
        title: "保留期限",
        body: "您的数据在处理请求所需的期限内保留，然后按照法律义务（潜在客户3年）进行归档。",
      },
      {
        title: "您的权利",
        body: "根据 GDPR，您有权访问、更正、删除和移植您的数据。如需行使这些权利，请通过上述地址或电话联系我们。",
      },
      {
        title: "Cookie",
        body: "本网站不使用跟踪 Cookie。可能使用技术 Cookie 以确保网站正常运行。",
      },
    ],
  },
};

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: l } = await params;
  if (!isValidLocale(l)) return null;
  const locale: Locale = l;
  const dict = getDictionary(locale);
  const pageContent = content[locale];

  return (
    <main>
      <PageHeader title={dict.legal.privacyTitle} />

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
