'use client';

import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { cssVars } from '@/styles/theme';
import { useSupplierProfile } from '@/lib/hooks/useSupplier';
import { LoadingSpinner } from '@/components/ui';
import ProfileEditForm from '@/components/features/supplier/ProfileEditForm';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function SupplierProfileEditPage() {
  const t = useTranslations('pages.supplierProfile');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();
  const { profile, isLoading } = useSupplierProfile();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: 'Supplier profile', href: `/${locale}/supplier-profile` },
            { label: tPages('edit.title') },
          ]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: 'Supplier profile', href: `/${locale}/supplier-profile` },
          { label: tPages('edit.title') },
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

      {/* Form Card */}
      {profile && (
        <div
          className="rounded-2xl border-2 p-8"
          style={{ backgroundColor: cssVars.neutral.surface, borderColor: cssVars.neutral.border }}
        >
          <ProfileEditForm profile={profile} onSuccess={() => router.push('/profile')} />
        </div>
      )}
    </div>
  );
}
