'use client';

import { useTranslations, useLocale } from 'next-intl';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { useUser } from '@/lib/hooks/useUser';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import ProfileHeader from '@/components/features/profile/ProfileHeader';
import ProfileInfoCard from '@/components/features/profile/ProfileInfoCard';
import ProfileContactInfo from '@/components/features/profile/ProfileContactInfo';
import ProfileCompanyInfo from '@/components/features/profile/ProfileCompanyInfo';
import ProfileStats from '@/components/features/profile/ProfileStats';
import ProfileAccountInfo from '@/components/features/profile/ProfileAccountInfo';
import ProfileSecurityLink from '@/components/features/profile/ProfileSecurityLink';

export default function ProfilePage() {
  const t = useTranslations('pages.profile');
  const { profile: user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <ErrorMessage
          error={error?.message || t('error')}
          variant="banner"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ProfileHeader />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Profile Card */}
          <div className="space-y-6 lg:col-span-2">
            <ProfileInfoCard user={user} />
            <ProfileContactInfo user={user} />
            <ProfileCompanyInfo user={user} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ProfileStats user={user} />
            <ProfileAccountInfo user={user} />
            <ProfileSecurityLink />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
