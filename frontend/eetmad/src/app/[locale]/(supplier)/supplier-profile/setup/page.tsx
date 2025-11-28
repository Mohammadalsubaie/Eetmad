'use client';

import { useTranslations, useLocale } from 'next-intl';
import { cssVars } from '@/styles/theme';
import ProfileSetupWizard from '@/components/features/supplier/ProfileSetupWizard';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function SupplierSetupPage() {
  const t = useTranslations('pages.supplierSetup');
  const tPages = useTranslations('pages');
  const locale = useLocale();

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: 'Supplier profile', href: `/${locale}/supplier-profile` },
          { label: tPages('setup.title') },
        ]}
        className="mb-6"
      />

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
