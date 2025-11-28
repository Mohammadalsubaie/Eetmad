'use client';

import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { User } from '@/lib/types/user.types';

interface ProfileAccountInfoProps {
  user: User;
}

export default function ProfileAccountInfo({ user }: ProfileAccountInfoProps) {
  const t = useTranslations('pages.profile');

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('notProvided');
    return new Date(dateString).toLocaleDateString();
  };

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
        {t('sections.accountInfo.title')}
      </h3>
      <div className="space-y-3 text-sm">
        <div>
          <div style={{ color: cssVars.neutral.textMuted }}>
            {t('sections.accountInfo.memberSince')}
          </div>
          <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {formatDate(user.createdAt)}
          </div>
        </div>
        <div>
          <div style={{ color: cssVars.neutral.textMuted }}>
            {t('sections.accountInfo.lastLogin')}
          </div>
          <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {formatDate(user.lastLoginAt)}
          </div>
        </div>
        <div>
          <div style={{ color: cssVars.neutral.textMuted }}>
            {t('sections.accountInfo.userType')}
          </div>
          <div className="font-semibold capitalize" style={{ color: cssVars.secondary.DEFAULT }}>
            {t(`sections.accountInfo.userTypes.${user.userType}`)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
