"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import WeChatIcon from "@/components/WeChatIcon";

type WeChatContactButtonProps = {
  wechatId: string;
  qrImage?: string;
  labels: {
    ariaLabel: string;
    modalTitle: string;
    modalHint: string;
    idLabel: string;
    copy: string;
    copied: string;
    close: string;
    qrMissing: string;
  };
};

export default function WeChatContactButton({
  wechatId,
  qrImage,
  labels,
}: WeChatContactButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    setCopied(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  async function copyId() {
    if (!wechatId) return;
    try {
      await navigator.clipboard.writeText(wechatId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={labels.ariaLabel}
        className="interactive-tab inline-flex text-[#07C160] transition-colors hover:text-navy"
      >
        <WeChatIcon className="h-9 w-9" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-4 backdrop-blur-sm"
          onClick={close}
          role="presentation"
        >
          <div
            className="glass-card w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="wechat-modal-title"
          >
            <h3 id="wechat-modal-title" className="text-lg font-bold text-navy">
              {labels.modalTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{labels.modalHint}</p>

            {qrImage ? (
              <div className="relative mx-auto mt-5 aspect-square w-52 overflow-hidden rounded-xl border border-gray-200 bg-white">
                <Image src={qrImage} alt={labels.ariaLabel} fill className="object-contain p-2" sizes="208px" />
              </div>
            ) : (
              <p className="mt-5 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
                {labels.qrMissing}
              </p>
            )}

            {wechatId ? (
              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{labels.idLabel}</p>
                <div className="mt-1 flex items-center gap-2">
                  <code className="flex-1 rounded-lg bg-gray-50 px-3 py-2 text-sm font-medium text-navy">
                    {wechatId}
                  </code>
                  <button
                    type="button"
                    onClick={copyId}
                    className="btn-interactive shrink-0 rounded-lg bg-navy px-3 py-2 text-xs font-semibold text-white hover:bg-navy-dark"
                  >
                    {copied ? labels.copied : labels.copy}
                  </button>
                </div>
              </div>
            ) : null}

            <button
              type="button"
              onClick={close}
              className="mt-6 w-full rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-navy hover:text-navy"
            >
              {labels.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
