'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Shield, XCircle } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { User } from '@/lib/types/user.types';

interface UserVerificationInfoProps {
  user: User;
}

export default function UserVerificationInfo({ user }: UserVerificationInfoProps) {
  const t = useTranslations('admin');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
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
        <Shield className="h-5 w-5" />
        {t('users.detail.sections.verification')}
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('users.detail.emailVerification')}
          </span>
          {user.isEmailVerified ? (
            <CheckCircle className="h-5 w-5" style={{ color: cssVars.status.success }} />
          ) : (
            <XCircle className="h-5 w-5" style={{ color: cssVars.status.error }} />
          )}
        </div>
        <div className="flex items-center justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('users.detail.phoneVerification')}
          </span>
          {user.isPhoneVerified ? (
            <CheckCircle className="h-5 w-5" style={{ color: cssVars.status.success }} />
          ) : (
            <XCircle className="h-5 w-5" style={{ color: cssVars.status.error }} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

