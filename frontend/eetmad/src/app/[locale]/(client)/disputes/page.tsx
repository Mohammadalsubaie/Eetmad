'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, AlertTriangle } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import DisputesList from '@/components/features/disputes/DisputesList';
import { Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function DisputesPage() {
  const t = useTranslations('pages.disputes');
  const locale = useLocale();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'resolved'>('all');

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <AlertTriangle className="h-8 w-8" style={{ color: cssVars.status.warning }} />
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
            onClick={() => router.push(`/${locale}/disputes/new`)}
            className="flex items-center gap-2"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
            icon={Plus}
          >
            {t('newDispute')}
          </Button>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b-2" style={{ borderColor: cssVars.neutral.border }}>
        <button
          onClick={() => setActiveTab('all')}
          className="relative px-4 py-2 font-semibold transition-colors"
          style={{
            color: activeTab === 'all' ? cssVars.primary.DEFAULT : cssVars.neutral.textMuted,
          }}
        >
          {t('all')}
          {activeTab === 'all' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ backgroundColor: cssVars.primary.DEFAULT }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className="relative px-4 py-2 font-semibold transition-colors"
          style={{
            color: activeTab === 'pending' ? cssVars.primary.DEFAULT : cssVars.neutral.textMuted,
          }}
        >
          {t('pending')}
          {activeTab === 'pending' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ backgroundColor: cssVars.primary.DEFAULT }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('resolved')}
          className="relative px-4 py-2 font-semibold transition-colors"
          style={{
            color: activeTab === 'resolved' ? cssVars.primary.DEFAULT : cssVars.neutral.textMuted,
          }}
        >
          {t('resolved')}
          {activeTab === 'resolved' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ backgroundColor: cssVars.primary.DEFAULT }}
            />
          )}
        </button>
      </div>

      {/* Disputes List */}
      <DisputesList filter={activeTab} />
    </div>
  );
}

