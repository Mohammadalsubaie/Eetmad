'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { User } from '@/lib/types/user.types';

interface ProfileContactInfoProps {
  user: User;
}

export default function ProfileContactInfo({ user }: ProfileContactInfoProps) {
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
      <h3 className="mb-6 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('sections.contactInfo.title')}
      </h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
            }}
          >
            <Mail className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
          </div>
          <div className="flex-1">
            <div className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
              {t('sections.contactInfo.email')}
            </div>
            <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {user.email}
            </div>
            {user.isEmailVerified ? (
              <div
                className="mt-1 flex items-center gap-1 text-xs"
                style={{ color: cssVars.status.success }}
              >
                <CheckCircle2 className="h-3 w-3" />
                {t('sections.contactInfo.verified')}
              </div>
            ) : (
              <div
                className="mt-1 flex items-center gap-1 text-xs"
                style={{ color: cssVars.status.warning }}
              >
                <Clock className="h-3 w-3" />
                {t('sections.contactInfo.notVerified')}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.accent.primary} 15%, transparent)`,
            }}
          >
            <Phone className="h-5 w-5" style={{ color: cssVars.accent.primary }} />
          </div>
          <div className="flex-1">
            <div className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
              {t('sections.contactInfo.phone')}
            </div>
            <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {user.phone}
            </div>
            {user.isPhoneVerified ? (
              <div
                className="mt-1 flex items-center gap-1 text-xs"
                style={{ color: cssVars.status.success }}
              >
                <CheckCircle2 className="h-3 w-3" />
                {t('sections.contactInfo.verified')}
              </div>
            ) : (
              <div
                className="mt-1 flex items-center gap-1 text-xs"
                style={{ color: cssVars.status.warning }}
              >
                <Clock className="h-3 w-3" />
                {t('sections.contactInfo.notVerified')}
              </div>
            )}
          </div>
        </div>

        {user.address && (user.address.city || user.address.country) && (
          <div className="flex items-center gap-4">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.info} 15%, transparent)`,
              }}
            >
              <MapPin className="h-5 w-5" style={{ color: cssVars.status.info }} />
            </div>
            <div className="flex-1">
              <div className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                {t('sections.contactInfo.address')}
              </div>
              <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {[user.address.city, user.address.state, user.address.country]
                  .filter(Boolean)
                  .join(', ') || t('notProvided')}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
