"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/dictionaries/fr";

type DevisFormProps = {
  dict: Dictionary;
  mailConfigured: boolean;
};

export default function DevisForm({ dict, mailConfigured }: DevisFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!mailConfigured) return;

    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/devis", {
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
        <p className="text-green-800">{dict.quote.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!mailConfigured && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {dict.quote.mailNotConfigured}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-gray-600">
            {dict.quote.firstName} *
          </label>
          <input id="firstName" name="firstName" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-gray-600">
            {dict.quote.lastName} *
          </label>
          <input id="lastName" name="lastName" required className={inputClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-gray-600">
            {dict.quote.company}
          </label>
          <input id="company" name="company" className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-600">
            {dict.quote.phone} *
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-600">
          {dict.quote.email} *
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="projectType" className="mb-1.5 block text-sm font-medium text-gray-600">
          {dict.quote.projectType} *
        </label>
        <select id="projectType" name="projectType" required className={inputClass}>
          <option value="">{dict.quote.projectTypePlaceholder}</option>
          {dict.projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-600">
          {dict.quote.message} *
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
        <p className="text-sm text-red-600">{dict.quote.error}</p>
      )}

      <button
        type="submit"
        disabled={!mailConfigured || status === "loading"}
        className="w-full rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-dark disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {status === "loading" ? dict.quote.sending : dict.quote.submit}
      </button>
    </form>
  );
}
