'use client';

import { useTranslations } from 'next-intl';

export default function PortfolioPage() {
  const t = useTranslations('pages');

  return (
    <div>
      <h1>{t('portfolio.title')}</h1>
      {/* Portfolio management will be implemented here */}
    </div>
  );
}
