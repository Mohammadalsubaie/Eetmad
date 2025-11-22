'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Users, Plus } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useSuppliers } from '@/lib/hooks/useSuppliers';
import { LoadingSpinner, ErrorMessage, EmptyState, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import SupplierCard from '@/components/features/suppliers/SupplierCard';
import { ResourceGrid } from '@/components/shared/data-display';

export default function SuppliersPage() {
  const t = useTranslations('pages.suppliers');
  const locale = useLocale();
  const router = useRouter();
  const { data: suppliers, isLoading, error } = useSuppliers();

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <Users className="h-8 w-8" style={{ color: cssVars.primary.DEFAULT }} />
            <h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('title')}
            </h1>
          </div>
          <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
            {t('subtitle')}
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => router.push(`/${locale}/suppliers/me`)}
            className="flex items-center gap-2"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
            icon={Plus}
          >
            {t('createProfile')}
          </Button>
        </motion.div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : error ? (
        <ErrorMessage error={error.message || String(error)} variant="banner" />
      ) : suppliers.length === 0 ? (
        <EmptyState
          title={t('noSuppliers')}
          description={t('noSuppliersDescription')}
        />
      ) : (
        <ResourceGrid columns={{ default: 1, md: 2, lg: 3 }}>
          {suppliers.map((supplier, index) => (
            <SupplierCard key={supplier.id} supplier={supplier} index={index} />
          ))}
        </ResourceGrid>
      )}
    </div>
  );
}

