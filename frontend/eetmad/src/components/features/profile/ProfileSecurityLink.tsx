'use client';

import { Button } from '@/components/ui';
import { Shield } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function ProfileSecurityLink() {
  const t = useTranslations('pages.profile');
  const locale = useLocale();
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(`/${locale}/profile/security`)}
      variant="outline"
      fullWidth
      icon={Shield}
      iconPosition="left"
      className="justify-start"
    >
      <div>
        <div className="font-bold">{t('security.title')}</div>
        <div className="text-sm">{t('security.subtitle')}</div>
      </div>
    </Button>
  );
}
