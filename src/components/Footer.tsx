import Link from "next/link";
import LinkedInIcon from "@/components/LinkedInIcon";
import WeChatContactButton from "@/components/WeChatContactButton";
import type { Dictionary } from "@/dictionaries/fr";
import { COMPANY } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/config";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export default function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="relative mt-10 border-t border-white/40">
      <div className="glass mx-4 mb-4 rounded-2xl sm:mx-6">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:flex lg:items-start lg:justify-between lg:gap-8">
            <div className="lg:max-w-[220px]">
              <p className="text-lg font-bold tracking-wide text-navy">DABAR</p>
              <p className="mt-2 text-sm text-gray-600">{dict.footer.tagline}</p>
            </div>

            <div className="lg:shrink-0">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-light">
                {dict.contact.infoTitle}
              </p>
              <address className="mt-3 space-y-1.5 text-sm not-italic text-gray-600">
                <p>{COMPANY.address}</p>
                <p>{COMPANY.hours}</p>
              </address>
            </div>

            <div className="lg:shrink-0">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-light">
                Navigation
              </p>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>
                  <Link href={`/${locale}/services`} className="transition-colors hover:text-navy">
                    {dict.nav.services}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/realisations`} className="transition-colors hover:text-navy">
                    {dict.nav.projects}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:shrink-0">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-light">
                {dict.nav.contact}
              </p>
              <p className="mt-3">
                <a
                  href={COMPANY.emailHref}
                  className="text-sm text-gray-600 transition-colors hover:text-blue-light"
                >
                  {COMPANY.email}
                </a>
              </p>
              <div className="mt-4">
                <span className="flex items-center gap-3">
                  <a
                    href={COMPANY.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Dabar Technique sur LinkedIn"
                    className="interactive-tab inline-flex text-[#0A66C2] transition-colors hover:text-navy"
                  >
                    <LinkedInIcon className="h-7 w-7" />
                  </a>
                  <WeChatContactButton
                    wechatId={COMPANY.wechatId}
                    qrImage={COMPANY.wechatQrImage || undefined}
                    labels={{
                      ariaLabel: dict.contact.wechatAriaLabel,
                      modalTitle: dict.contact.wechatModalTitle,
                      modalHint: dict.contact.wechatModalHint,
                      idLabel: dict.contact.wechatIdLabel,
                      copy: dict.contact.wechatCopy,
                      copied: dict.contact.wechatCopied,
                      close: dict.contact.wechatClose,
                      qrMissing: dict.contact.wechatQrMissing,
                    }}
                  />
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/50 pt-8 text-xs text-gray-500 sm:flex-row">
            <p>
              © {new Date().getFullYear()} {COMPANY.name}. {dict.footer.rights}
            </p>
            <div className="flex gap-6">
              <Link href={`/${locale}/mentions-legales`} className="transition-colors hover:text-navy">
                {dict.footer.legal}
              </Link>
              <Link href={`/${locale}/confidentialite`} className="transition-colors hover:text-navy">
                {dict.footer.privacy}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
