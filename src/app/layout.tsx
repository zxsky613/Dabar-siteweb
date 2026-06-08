import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dabar — Gestion de projet logistique",
    template: "%s | Dabar",
  },
  description:
    "Expert en installation intralogistique — trieurs, rayonnages intelligents, ingénierie électrique et mécanique. Solutions clés en main en Europe.",
  metadataBase: new URL("https://www.dabarfrance.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="relative flex min-h-full flex-col text-foreground">{children}</body>
    </html>
  );
}
