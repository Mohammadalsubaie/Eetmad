'use client';

import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('contact.title')}</h1>
      {/* Contact form will be implemented here */}
    </div>
  );
}
