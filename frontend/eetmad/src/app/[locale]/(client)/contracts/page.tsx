'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import ContractsList from '@/components/features/contracts/ContractsList';
import { Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function ContractsPage() {
  const t = useTranslations('pages.contracts');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('title')}
          </h1>
          <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
            {t('subtitle')}
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => router.push(`/${locale}/contracts/new`)}
            className="flex items-center gap-2"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            <Plus className="h-5 w-5" />
            {t('createContract')}
          </Button>
        </motion.div>
      </div>

      {/* Contracts List */}
      <ContractsList />
    </div>
  );
}

