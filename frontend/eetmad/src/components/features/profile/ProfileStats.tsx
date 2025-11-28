'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Star, Wallet } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import type { User } from '@/lib/types/user.types';

interface ProfileStatsProps {
  user: User;
}

export default function ProfileStats({ user }: ProfileStatsProps) {
  const t = useTranslations('pages.profile');

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border-2 p-6"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <h3 className="mb-4 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('sections.stats.title')}
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5" style={{ color: cssVars.accent.warm }} />
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('sections.stats.rating')}
            </span>
          </div>
          <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {user.averageRating.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" style={{ color: cssVars.status.success }} />
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('sections.stats.projects')}
            </span>
          </div>
          <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {user.completedProjects}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" style={{ color: cssVars.accent.warm }} />
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('sections.stats.wallet')}
            </span>
          </div>
          <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            <CurrencyDisplay amount={user.walletBalance} iconSize={16} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
