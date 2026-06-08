import { NextResponse } from "next/server";
import { createMailTransport } from "@/lib/mail";

type ContactBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  website?: string;
};

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const { firstName, lastName, email, message } = body;

    if (!firstName || !lastName || !email || !message) {
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
      subject: `[Dabar Contact] ${firstName} ${lastName}`,
      text: [
        `Nom : ${firstName} ${lastName}`,
        `Email : ${email}`,
        "",
        "Message :",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
