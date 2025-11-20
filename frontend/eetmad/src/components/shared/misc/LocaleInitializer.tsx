'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

/**
 * Component that syncs locale preference between localStorage and cookie
 * This ensures the middleware can access the locale preference
 */
export function LocaleInitializer() {
  const locale = useLocale();

  useEffect(() => {
    // Sync current locale to cookie if it exists in localStorage
    const storedLocale = localStorage.getItem('locale');
    const currentLocale = storedLocale || locale;

    // Set cookie that expires in 1 year
    if (typeof window !== 'undefined') {
      document.cookie = `NEXT_LOCALE=${currentLocale}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
      
      // Also update localStorage if it doesn't match current locale
      if (!storedLocale || storedLocale !== locale) {
        localStorage.setItem('locale', locale);
      }
    }
  }, [locale]);

  return null;
}

