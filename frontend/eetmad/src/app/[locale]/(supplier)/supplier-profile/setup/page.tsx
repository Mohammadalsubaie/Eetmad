'use client';

import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import ProfileSetupWizard from '@/components/features/supplier/ProfileSetupWizard';

export default function SupplierSetupPage() {
  const t = useTranslations('pages.supplierSetup');

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('title')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('subtitle')}
        </p>
      </div>

      {/* Wizard Card */}
      <div
        className="rounded-2xl border-2 p-8"
        style={{ backgroundColor: cssVars.neutral.surface, borderColor: cssVars.neutral.border }}
      >
        <ProfileSetupWizard />
      </div>
    </div>
  );
}
