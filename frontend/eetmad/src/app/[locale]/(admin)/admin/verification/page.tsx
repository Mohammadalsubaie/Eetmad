'use client';

import { useTranslations } from 'next-intl';

export default function VerificationPage() {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('verificationQueue.title')}</h1>
      {/* Verification queue will be implemented here */}
    </div>
  );
}
