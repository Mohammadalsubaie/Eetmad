'use client';

import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import PortfolioManager from '@/components/features/supplier/PortfolioManager';

export default function PortfolioPage() {
  const t = useTranslations('pages.portfolio');

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('pageTitle')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('pageSubtitle')}
        </p>
      </div>

      {/* Portfolio Manager */}
      <PortfolioManager />
    </div>
  );
}
