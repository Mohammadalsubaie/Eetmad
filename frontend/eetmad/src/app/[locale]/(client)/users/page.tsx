'use client';

import { useTranslations, useLocale } from 'next-intl';
import { cssVars } from '@/styles/theme';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function UsersPage() {
  const t = useTranslations('pages.users');
  const locale = useLocale();

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: 'Users' }]} className="mb-6" />

      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          Users
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          This page is under construction.
        </p>
      </div>

      {/* TODO: Implement page content */}
    </div>
  );
}
