'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { User } from '@/lib/types/user.types';
import StatusBadge from '@/components/shared/badges/StatusBadge';
import UserContactInfo from './UserContactInfo';

interface UserBasicInfoProps {
  user: User;
}

export default function UserBasicInfo({ user }: UserBasicInfoProps) {
  const t = useTranslations('admin');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 rounded-2xl border-2 p-6 shadow-md"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Avatar & Basic Info */}
        <div className="flex items-center gap-4">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-2xl text-2xl font-bold"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
              color: cssVars.primary.DEFAULT,
            }}
          >
            {user.fullName.charAt(0)}
          </div>
          <div>
            <div className="mb-2 flex items-center gap-3">
              <h2 className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {user.fullName}
              </h2>
              <StatusBadge
                status={user.status}
                labels={{
                  active: t('users.statuses.active'),
                  inactive: t('users.statuses.inactive'),
                  suspended: t('users.statuses.suspended'),
                  banned: t('users.statuses.banned'),
                }}
              />
            </div>
            <div
              className="flex items-center gap-4 text-sm"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              <span
                className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
                style={{
                  backgroundColor:
                    user.userType === 'supplier'
                      ? `color-mix(in srgb, ${cssVars.accent.primary} 15%, transparent)`
                      : user.userType === 'admin'
                        ? `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`
                        : `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                  color:
                    user.userType === 'supplier'
                      ? cssVars.accent.primary
                      : user.userType === 'admin'
                        ? cssVars.status.warning
                        : cssVars.primary.DEFAULT,
                }}
              >
                {t(`users.types.${user.userType}`)}
              </span>
              {user.isEmailVerified && user.isPhoneVerified && (
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" style={{ color: cssVars.status.success }} />
                  {t('users.verified')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <UserContactInfo user={user} />
    </motion.div>
  );
}

