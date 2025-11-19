'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

export default function ProfileSecurityLink() {
  const t = useTranslations('pages.profile');
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push('/profile/security')}
      variant="outline"
      fullWidth
      icon={Shield}
      iconPosition="left"
      className="justify-start"
    >
      <div className="flex-1 text-left">
        <div className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('security.title')}
        </div>
        <div className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
          {t('security.subtitle')}
        </div>
      </div>
    </Button>
  );
}

