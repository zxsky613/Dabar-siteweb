"use client";

import { useCallback, useEffect } from "react";

type SuccessModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  closeLabel: string;
};

export default function SuccessModal({ open, onClose, title, message, closeLabel }: SuccessModalProps) {
  const close = useCallback(() => {
    onClose();
  }, [onClose]);

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-4 backdrop-blur-sm"
      onClick={close}
      role="presentation"
    >
      <div
        className="glass-card w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-light/15">
          <svg
            className="h-7 w-7 text-blue-light"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 id="success-modal-title" className="mt-5 text-xl font-bold text-navy">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{message}</p>
        <button
          type="button"
          onClick={close}
          className="btn-interactive mt-8 w-full rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-dark"
        >
          {closeLabel}
        </button>
      </div>
    </div>
  );
}
