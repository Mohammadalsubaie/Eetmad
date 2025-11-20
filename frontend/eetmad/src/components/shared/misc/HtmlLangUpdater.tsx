'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

/**
 * Component that updates the HTML lang attribute based on the current locale
 * This ensures the lang attribute changes when the language is switched
 */
export function HtmlLangUpdater() {
  const locale = useLocale();

  useEffect(() => {
    // Update the html lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}

