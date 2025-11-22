'use client';

import { motion } from 'framer-motion';
import { Building2, Shield } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { User } from '@/lib/types/user.types';

interface ProfileCompanyInfoProps {
  user: User;
}

export default function ProfileCompanyInfo({ user }: ProfileCompanyInfoProps) {
  const t = useTranslations('pages.profile');

  if (user.userType !== 'supplier' || (!user.companyName && !user.commercialRegister)) {
    return null;
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border-2 p-6"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <h3 className="mb-6 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('sections.companyInfo.title')}
      </h3>
      <div className="space-y-4">
        {user.companyName && (
          <div className="flex items-center gap-4">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.secondary.DEFAULT} 15%, transparent)`,
              }}
            >
              <Building2 className="h-5 w-5" style={{ color: cssVars.secondary.DEFAULT }} />
            </div>
            <div className="flex-1">
              <div className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                {t('sections.companyInfo.companyName')}
              </div>
              <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {user.companyName}
              </div>
            </div>
          </div>
        )}
        {user.commercialRegister && (
          <div className="flex items-center gap-4">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
              }}
            >
              <Shield className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            </div>
            <div className="flex-1">
              <div className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                {t('sections.companyInfo.commercialRegister')}
              </div>
              <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {user.commercialRegister}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
