'use client';

import type { User } from '@/lib/types/user.types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface UserAccountInfoProps {
  user: User;
}

export default function UserAccountInfo({ user }: UserAccountInfoProps) {
  const t = useTranslations('admin');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl border-2 p-6 shadow-md"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <h3
        className="mb-4 flex items-center gap-2 text-lg font-bold"
        style={{ color: cssVars.secondary.DEFAULT }}
      >
        <FileText className="h-5 w-5" />
        {t('users.detail.sections.account')}
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('users.detail.createdAt')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {new Date(user.createdAt).toLocaleDateString('en-US')}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('users.detail.updatedAt')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {new Date(user.updatedAt).toLocaleDateString('en-US')}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('users.detail.lastLogin')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {new Date(user.lastLoginAt).toLocaleDateString('en-US')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
