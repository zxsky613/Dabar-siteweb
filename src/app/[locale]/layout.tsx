import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import GlassBackground from "@/components/GlassBackground";
import Navbar from "@/components/Navbar";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dict = getDictionary(locale);

  return (
    <>
      <GlassBackground />
      <Navbar locale={locale} dict={dict} />
      <div className="relative flex-1 pt-20">{children}</div>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
