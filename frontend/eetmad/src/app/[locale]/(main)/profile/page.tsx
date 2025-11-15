'use client';

import { useTranslations } from 'next-intl';

export default function ProfilePage() {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('profile.title')}</h1>
      {/* Profile content will be implemented here */}
    </div>
  );
}
