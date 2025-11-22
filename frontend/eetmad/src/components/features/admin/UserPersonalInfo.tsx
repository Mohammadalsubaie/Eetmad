'use client';

import { motion } from 'framer-motion';
import { User as UserIcon } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { User } from '@/lib/types/user.types';

interface UserPersonalInfoProps {
  user: User;
}

export default function UserPersonalInfo({ user }: UserPersonalInfoProps) {
  const t = useTranslations('admin');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
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
        <UserIcon className="h-5 w-5" />
        {t('users.detail.sections.personalInfo')}
      </h3>
      <div className="space-y-3">
        {user.dateOfBirth && (
          <div className="flex justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('users.detail.dateOfBirth')}
            </span>
            <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {new Date(user.dateOfBirth).toLocaleDateString('en-US')}
            </span>
          </div>
        )}
        {user.nationalId && (
          <div className="flex justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('users.detail.nationalId')}
            </span>
            <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {user.nationalId}
            </span>
          </div>
        )}
        {user.companyName && (
          <div className="flex justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('users.detail.companyName')}
            </span>
            <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {user.companyName}
            </span>
          </div>
        )}
        {user.commercialRegister && (
          <div className="flex justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('users.detail.commercialRegister')}
            </span>
            <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {user.commercialRegister}
            </span>
          </div>
        )}
        {user.taxNumber && (
          <div className="flex justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('users.detail.taxNumber')}
            </span>
            <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {user.taxNumber}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
