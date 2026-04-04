import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const locales = ["en", "uz", "ru"];
export const defaultLocale = "en";

// Simplified language detection
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  // Extremely basic parsing: find the first match in our locales list
  for (const locale of locales) {
    if (acceptLanguage.includes(locale)) {
      return locale;
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|profile.jpg|farrux.jpg|resume.pdf|.*\\.svg).*)"],
};
