import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isValidLocale, locales } from "@/lib/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Outils de chantier DPF1 : fichiers statiques dans public/dpf1, hors i18n
  if (pathname === "/dpf1" || pathname === "/dpf1/") {
    return NextResponse.rewrite(new URL("/dpf1/index.html", request.url));
  }
  const dpf1Tool = pathname.match(/^\/dpf1\/(beam|grating|equipment)\/?$/);
  if (dpf1Tool) {
    return NextResponse.rewrite(
      new URL(`/dpf1/${dpf1Tool[1]}/index.html`, request.url)
    );
  }
  if (pathname.startsWith("/dpf1/")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (isValidLocale(maybeLocale)) {
    return NextResponse.next();
  }

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
