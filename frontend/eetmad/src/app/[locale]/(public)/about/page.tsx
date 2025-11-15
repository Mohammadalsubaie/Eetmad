'use client';

import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('about.title')}</h1>
      {/* About page content will be implemented here */}
    </div>
  );
}
