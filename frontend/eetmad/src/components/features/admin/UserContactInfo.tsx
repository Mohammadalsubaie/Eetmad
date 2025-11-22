'use client';

import { Calendar, Mail, MapPin, Phone } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { User } from '@/lib/types/user.types';

interface UserContactInfoProps {
  user: User;
}

export default function UserContactInfo({ user }: UserContactInfoProps) {
  const t = useTranslations('admin');

  return (
    <div
      className="mt-6 grid gap-4 border-t pt-6 sm:grid-cols-2 lg:grid-cols-4"
      style={{ borderColor: cssVars.neutral.border }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
          }}
        >
          <Mail className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
        </div>
        <div>
          <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
            {t('users.detail.email')}
          </div>
          <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {user.email}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
          }}
        >
          <Phone className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
        </div>
        <div>
          <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
            {t('users.detail.phone')}
          </div>
          <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {user.phone}
          </div>
        </div>
      </div>

      {user.address.city && (
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
            }}
          >
            <MapPin className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
          </div>
          <div>
            <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {t('users.detail.location')}
            </div>
            <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {user.address.city}, {user.address.state}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
          }}
        >
          <Calendar className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
        </div>
        <div>
          <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
            {t('users.detail.memberSince')}
          </div>
          <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {new Date(user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
