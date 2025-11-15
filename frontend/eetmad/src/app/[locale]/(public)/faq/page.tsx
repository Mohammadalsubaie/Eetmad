'use client';

import { useTranslations } from 'next-intl';

export default function FAQPage() {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('faq.title')}</h1>
      {/* FAQ content will be implemented here */}
    </div>
  );
}
