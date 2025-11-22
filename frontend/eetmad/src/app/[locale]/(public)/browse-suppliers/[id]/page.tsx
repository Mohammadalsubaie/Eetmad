'use client';

import SupplierCategories from '@/components/features/suppliers/SupplierCategories';
import SupplierCertifications from '@/components/features/suppliers/SupplierCertifications';
import SupplierHeader from '@/components/features/suppliers/SupplierHeader';
import SupplierPortfolio from '@/components/features/suppliers/SupplierPortfolio';
import SupplierStats from '@/components/features/suppliers/SupplierStats';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { Button, ErrorMessage, LoadingSpinner } from '@/components/ui';
import { useSupplier } from '@/lib/hooks/useSupplier';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

export default function SupplierDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const t = useTranslations('pages.suppliers');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const router = useRouter();
  const { supplier, isLoading, error } = useSupplier(id);

  if (isLoading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: cssVars.neutral.bg }}
      >
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/suppliers` }, { label: id }]}
          className="mb-6"
        />
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" />
          <div className="text-lg font-semibold" style={{ color: cssVars.neutral.textSecondary }}>
            {t('loading') || 'Loading...'}
          </div>
        </div>
      </div>
    );
  }

  if (error || !supplier) {
    return (
      <div className="container mx-auto px-4 py-20" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/suppliers` }, { label: id }]}
          className="mb-6"
        />
        <div className="flex flex-col items-center gap-4">
          <ErrorMessage
            error={error?.message || t('notFound') || 'Supplier not found'}
            variant="banner"
          />
          <Button onClick={() => router.back()} variant="primary">
            {t('back') || 'Back'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen py-20"
      style={{
        backgroundColor: cssVars.neutral.bg,
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute start-0 top-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.accent.primary }}
        />
        <div
          className="absolute bottom-1/4 end-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.primary.DEFAULT }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all hover:scale-105"
          style={{
            backgroundColor: cssVars.neutral.surface,
            color: cssVars.primary.DEFAULT,
          }}
        >
          <ArrowLeft className="h-5 w-5" />
          {t('back') || 'Back'}
        </motion.button>

        <SupplierHeader supplier={supplier} />
        <SupplierStats supplier={supplier} />
        <SupplierCategories supplier={supplier} />
        <SupplierPortfolio supplier={supplier} />
        <SupplierCertifications supplier={supplier} />
      </div>
    </div>
  );
}
