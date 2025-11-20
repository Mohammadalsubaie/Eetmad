'use client';

import type { User } from '@/lib/types/user.types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { CheckCircle2, Star, User as UserIcon, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface ProfileInfoCardProps {
  user: User;
}

export default function ProfileInfoCard({ user }: ProfileInfoCardProps) {
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
      <div className="flex items-start gap-6">
        <div
          className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl"
          style={{ backgroundColor: cssVars.neutral.surfaceAlt }}
        >
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.fullName}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserIcon className="h-12 w-12" style={{ color: cssVars.neutral.textMuted }} />
          )}
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <h2 className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {user.fullName}
            </h2>
            {user.status === 'active' ? (
              <div
                className="flex items-center gap-1 rounded-lg px-2 py-1"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
                }}
              >
                <CheckCircle2 className="h-4 w-4" style={{ color: cssVars.status.success }} />
                <span className="text-xs font-bold" style={{ color: cssVars.status.success }}>
                  {t('status.active')}
                </span>
              </div>
            ) : (
              <div
                className="flex items-center gap-1 rounded-lg px-2 py-1"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.status.error} 15%, transparent)`,
                }}
              >
                <XCircle className="h-4 w-4" style={{ color: cssVars.status.error }} />
                <span className="text-xs font-bold" style={{ color: cssVars.status.error }}>
                  {t('status.inactive')}
                </span>
              </div>
            )}
          </div>
          <div
            className="flex items-center gap-4 text-sm"
            style={{ color: cssVars.neutral.textSecondary }}
          >
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" style={{ color: cssVars.accent.warm }} />
              <span className="font-semibold">{user.averageRating.toFixed(1)}</span>
              <span>
                ({user.totalReviews} {t('reviews')})
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" style={{ color: cssVars.status.success }} />
              <span>
                {user.completedProjects} {t('completedProjects')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
