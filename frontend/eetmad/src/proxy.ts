// src/proxy.ts (formerly middleware.ts)
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check for locale preference in cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE');

  // Check if pathname already has a valid locale
  const pathLocale = pathname.split('/')[1];
  const hasValidLocale = routing.locales.includes(pathLocale as (typeof routing.locales)[number]);

  // If we have a cookie preference and the path doesn't have a locale (or has a different one)
  if (
    localeCookie &&
    routing.locales.includes(localeCookie.value as (typeof routing.locales)[number])
  ) {
    // If path doesn't have a locale prefix, add it
    if (!hasValidLocale && pathname !== '/') {
      const url = request.nextUrl.clone();
      url.pathname = `/${localeCookie.value}${pathname === '/' ? '' : pathname}`;
      return NextResponse.redirect(url);
    }

    // If path has a different locale than the cookie, redirect to preferred locale
    if (hasValidLocale && pathLocale !== localeCookie.value) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(`/${pathLocale}`, `/${localeCookie.value}`);
      return NextResponse.redirect(url);
    }
  }

  // Let next-intl middleware handle the rest
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_proxy (Vercel Proxy - if you use Vercel)
  // - /_static (inside /public)
  // - all root files inside /public (e.g. /favicon.ico)
  matcher: ['/((?!api|_next|_proxy|_static|_vercel|.*\\..*).*)', '/'],
};
