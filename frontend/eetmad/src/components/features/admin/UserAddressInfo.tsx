'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { User } from '@/lib/types/user.types';

interface UserAddressInfoProps {
  user: User;
}

export default function UserAddressInfo({ user }: UserAddressInfoProps) {
  const t = useTranslations('admin');

  if (!user.address.city) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
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
        <MapPin className="h-5 w-5" />
        {t('users.detail.sections.address')}
      </h3>
      <div className="space-y-2" style={{ color: cssVars.secondary.DEFAULT }}>
        {user.address.street && <div>{user.address.street}</div>}
        <div>
          {user.address.city}
          {user.address.state && `, ${user.address.state}`}
        </div>
        {user.address.postalCode && <div>{user.address.postalCode}</div>}
        {user.address.country && <div>{user.address.country}</div>}
      </div>
    </motion.div>
  );
}

