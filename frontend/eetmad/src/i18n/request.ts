import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  // Log missing keys in development
  if (process.env.NODE_ENV === 'development') {
    // This will help catch missing keys at runtime
    const originalMessages = messages;
    // Note: next-intl will automatically log missing keys in development
  }

  return {
    locale,
    messages,
    timeZone: 'Asia/Riyadh',
  };
});
