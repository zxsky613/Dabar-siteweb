import { NextResponse } from "next/server";
import { createMailTransport } from "@/lib/mail";

type DevisBody = {
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
  website?: string;
};

export async function POST(request: Request) {
  try {
    const body: DevisBody = await request.json();

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const { firstName, lastName, company, email, phone, projectType, message } = body;

    if (!firstName || !lastName || !email || !phone || !projectType || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const transport = createMailTransport();
    if (!transport) {
      return NextResponse.json({ error: "Mail not configured" }, { status: 503 });
    }

    const to = process.env.MAIL_TO ?? process.env.SMTP_USER;

    await transport.sendMail({
      from: process.env.SMTP_USER,
      to,
      replyTo: email,
      subject: `[Dabar Devis] ${projectType} — ${firstName} ${lastName}`,
      text: [
        `Nom : ${firstName} ${lastName}`,
        `Entreprise : ${company || "—"}`,
        `Email : ${email}`,
        `Téléphone : ${phone}`,
        `Type de projet : ${projectType}`,
        "",
        "Description :",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
