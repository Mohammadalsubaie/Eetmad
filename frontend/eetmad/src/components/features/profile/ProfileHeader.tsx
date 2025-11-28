'use client';

import { motion } from 'framer-motion';
import { Edit } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

export default function ProfileHeader() {
  const t = useTranslations('pages.profile');
  const router = useRouter();

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('title')}
        </h1>
        <p className="text-lg" style={{ color: cssVars.neutral.textSecondary }}>
          {t('subtitle')}
        </p>
      </div>
      <Button
        onClick={() => router.push('/profile/edit')}
        variant="primary"
        icon={Edit}
        iconPosition="left"
      >
        {t('editProfile')}
      </Button>
    </div>
  );
}
