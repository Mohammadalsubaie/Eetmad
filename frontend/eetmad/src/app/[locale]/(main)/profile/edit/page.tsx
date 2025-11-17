'use client';

import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProfileEditForm from '@/components/features/profile/ProfileEditForm';
import { Button } from '@/components/ui/Button';

export default function ProfileEditPage() {
  const t = useTranslations('pages.profile.edit');
  const router = useRouter();

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Button
            variant="ghost"
            size="md"
            icon={ArrowLeft}
            iconPosition="left"
            onClick={() => router.back()}
          >
            {t('back')}
          </Button>
          <h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('title')}
          </h1>
        </div>

        {/* Form */}
        <ProfileEditForm />
      </motion.div>
    </div>
  );
}
