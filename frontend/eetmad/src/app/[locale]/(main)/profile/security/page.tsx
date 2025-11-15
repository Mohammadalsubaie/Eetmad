'use client';

import { useTranslations } from 'next-intl';

export default function ProfileSecurityPage() {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('security.title')}</h1>
      {/* Security settings will be implemented here */}
    </div>
  );
}
