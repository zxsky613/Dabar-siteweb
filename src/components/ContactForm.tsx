"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/dictionaries/fr";

type ContactFormProps = {
  dict: Dictionary;
  mailConfigured: boolean;
};

export default function ContactForm({ dict, mailConfigured }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!mailConfigured) return;

    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-blue-light focus:ring-2 focus:ring-blue-light/20";

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="text-green-800">{dict.contact.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!mailConfigured && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {dict.contact.mailNotConfigured}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-gray-600">
            {dict.contact.firstName} *
          </label>
          <input id="firstName" name="firstName" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-gray-600">
            {dict.contact.lastName} *
          </label>
          <input id="lastName" name="lastName" required className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-600">
          {dict.contact.email} *
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-600">
          {dict.contact.message} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-y`}
        />
      </div>

      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      {status === "error" && (
        <p className="text-sm text-red-600">{dict.contact.error}</p>
      )}

      <button
        type="submit"
        disabled={!mailConfigured || status === "loading"}
        className="w-full rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-dark disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {status === "loading" ? dict.contact.sending : dict.contact.submit}
      </button>
    </form>
  );
}
