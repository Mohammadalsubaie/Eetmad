'use client';

import SupplierCategories from '@/components/features/suppliers/SupplierCategories';
import SupplierCertifications from '@/components/features/suppliers/SupplierCertifications';
import SupplierHeader from '@/components/features/suppliers/SupplierHeader';
import SupplierPortfolio from '@/components/features/suppliers/SupplierPortfolio';
import SupplierStats from '@/components/features/suppliers/SupplierStats';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { ErrorMessage, LoadingSpinner } from '@/components/ui';
import { useSupplier } from '@/lib/hooks/useSuppliers';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

export default function SupplierDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const supplierId = params.id as string;

  const { data: supplier, isLoading, error } = useSupplier(supplierId);

  if (isLoading) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('suppliers.title'), href: `/${locale}/admin/suppliers` },
            { label: supplierId },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !supplier) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('suppliers.title'), href: `/${locale}/admin/suppliers` },
            { label: supplierId },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <ErrorMessage error={error?.message || t('suppliers.notFound')} variant="banner" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('suppliers.title'), href: `/${locale}/admin/suppliers` },
          { label: supplierId },
        ]}
        className="mb-6"
      />
      {/* Header */}
      <div className="mb-4 flex items-start gap-2 sm:mb-6 sm:items-center sm:gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="flex-shrink-0 rounded-xl p-2 transition-all"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
          }}
        >
          <ArrowLeft
            className="h-4 w-4 sm:h-5 sm:w-5"
            style={{ color: cssVars.neutral.textSecondary }}
          />
        </motion.button>
        <div className="min-w-0 flex-1">
          <AdminPageHeader
            title={t('suppliers.detail.title')}
            description={t('suppliers.detail.description')}
            icon={ShoppingBag}
          />
        </div>
      </div>

      <SupplierHeader supplier={supplier} />

      {/* Stats */}
      <SupplierStats supplier={supplier} />

      {/* Details Sections */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <SupplierPortfolio supplier={supplier} />
        <SupplierCertifications supplier={supplier} />
        <SupplierCategories supplier={supplier} />
      </div>
    </div>
  );
}
