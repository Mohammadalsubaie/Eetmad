// src/proxy.ts (formerly middleware.ts)
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Rename the export from 'middleware' to 'proxy'
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_proxy (Vercel Proxy - if you use Vercel)
  // - /_static (inside /public)
  // - all root files inside /public (e.g. /favicon.ico)
  matcher: ['/((?!api|_next|_proxy|_static|_vercel|.*\\..*).*)', '/'],
};
