'use client';

import { useTranslations } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('terms.title')}</h1>
      {/* Terms of service content will be implemented here */}
    </div>
  );
}
