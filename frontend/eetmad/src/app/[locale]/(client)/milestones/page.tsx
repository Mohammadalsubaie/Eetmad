'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useMilestones } from '@/lib/hooks/useMilestones';
import { LoadingSpinner, ErrorMessage, EmptyState, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import MilestoneCard from '@/components/features/projects/MilestoneCard';

export default function MilestonesPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('pages.projects');
  const { data: milestones, isLoading, error } = useMilestones();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('milestonesSection.title') }]} className="mb-6" />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('milestonesSection.title') }]} className="mb-6" />
        <ErrorMessage error={error.message} variant="banner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: t('milestonesSection.title') }]} className="mb-6" />

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('milestonesSection.title')}
          </h1>
          <p className="mt-2 text-base" style={{ color: cssVars.neutral.textSecondary }}>
            {t('milestonesSection.description')}
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => router.push(`/${locale}/milestones/new`)}
            icon={Plus}
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {t('milestonesSection.new')}
          </Button>
        </motion.div>
      </div>

      {/* Statistics */}
      {milestones.length > 0 && (
        <div
          className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <div
            className="rounded-xl border-2 p-4"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <div className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {milestones.length}
            </div>
            <div className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
              إجمالي المراحل
            </div>
          </div>
          <div
            className="rounded-xl border-2 p-4"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <div className="text-2xl font-bold" style={{ color: cssVars.status.success }}>
              {milestones.filter((m) => m.status === 'completed' || m.status === 'approved').length}
            </div>
            <div className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
              مكتملة
            </div>
          </div>
          <div
            className="rounded-xl border-2 p-4"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <div className="text-2xl font-bold" style={{ color: cssVars.status.warning }}>
              {milestones.filter((m) => m.status === 'in_progress').length}
            </div>
            <div className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
              قيد التنفيذ
            </div>
          </div>
          <div
            className="rounded-xl border-2 p-4"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <div className="text-2xl font-bold" style={{ color: cssVars.neutral.textSecondary }}>
              {milestones.filter((m) => m.status === 'pending').length}
            </div>
            <div className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
              معلقة
            </div>
          </div>
        </div>
      )}

      {/* Milestones List */}
      <div className="space-y-4">
        {milestones.length === 0 ? (
          <EmptyState
            title={t('milestonesSection.empty')}
            description={t('milestonesSection.emptyDescription')}
          />
        ) : (
          milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <MilestoneCard
                milestone={milestone}
                index={index}
                onApprove={async () => {
                  // Handle approve
                }}
                onReject={async () => {
                  // Handle reject
                }}
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

