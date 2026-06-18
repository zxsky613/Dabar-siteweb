"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type SuccessModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  closeLabel: string;
};

export default function SuccessModal({ open, onClose, title, message, closeLabel }: SuccessModalProps) {
  const [mounted, setMounted] = useState(false);

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    setMounted(true);
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

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4"
      onClick={close}
      role="presentation"
    >
      <div
        className="relative w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 text-center shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
      >
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 rounded-md p-1 text-gray-400 hover:text-navy"
          aria-label={closeLabel}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <svg
            className="h-6 w-6 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 id="success-modal-title" className="mt-4 text-lg font-bold text-navy">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{message}</p>

        <button
          type="button"
          onClick={close}
          className="btn-interactive mt-6 rounded-lg bg-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-dark"
        >
          {closeLabel}
        </button>
      </div>
    </div>,
    document.body,
  );
}
