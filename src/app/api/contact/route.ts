import { NextResponse } from "next/server";
import { createMailTransport } from "@/lib/mail";

const SUBJECT_LABELS: Record<string, string> = {
  conveyors: "Convoyeurs & systèmes de tri",
  racking: "Rayonnages & stockage",
  electrical: "Courants forts et faibles",
  "office-renovation": "Aménagement & rénovation de bureaux",
  other: "Autre demande",
};

type ContactBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  website?: string;
};

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const { firstName, lastName, email, phone, company, subject, message } = body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!SUBJECT_LABELS[subject]) {
      return NextResponse.json({ error: "Invalid subject" }, { status: 400 });
    }

    const subjectLabel = SUBJECT_LABELS[subject];

    const transport = createMailTransport();
    if (!transport) {
      return NextResponse.json({ error: "Mail not configured" }, { status: 503 });
    }

    const to = process.env.MAIL_TO ?? process.env.SMTP_USER;

    await transport.sendMail({
      from: process.env.SMTP_USER,
      to,
      replyTo: email,
      subject: `[Dabar Contact] ${subjectLabel} — ${firstName} ${lastName}`,
      text: [
        `Nom : ${firstName} ${lastName}`,
        `Email : ${email}`,
        phone ? `Téléphone : ${phone}` : null,
        company ? `Entreprise : ${company}` : null,
        `Sujet : ${subjectLabel}`,
        "",
        "Message :",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
