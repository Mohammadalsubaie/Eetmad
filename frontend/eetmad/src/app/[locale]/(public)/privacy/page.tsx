'use client';

import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('privacy.title')}</h1>
      {/* Privacy policy content will be implemented here */}
    </div>
  );
}
