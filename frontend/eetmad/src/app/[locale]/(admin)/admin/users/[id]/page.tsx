'use client';

import UserAccountInfo from '@/components/features/admin/UserAccountInfo';
import UserAddressInfo from '@/components/features/admin/UserAddressInfo';
import UserBasicInfo from '@/components/features/admin/UserBasicInfo';
import UserPersonalInfo from '@/components/features/admin/UserPersonalInfo';
import UserStats from '@/components/features/admin/UserStats';
import UserVerificationInfo from '@/components/features/admin/UserVerificationInfo';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { ErrorMessage, LoadingSpinner } from '@/components/ui';
import { useUserDetails } from '@/lib/hooks/useUserDetails';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, Ban, Shield, User as UserIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

export default function AdminUserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const userId = params.id as string;

  const { user, isLoading, error } = useUserDetails(userId);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex h-64 items-center justify-center">
        <ErrorMessage error={error?.message || t('users.notFound')} variant="banner" />
      </div>
    );
  }

  const handleSuspend = async () => {
    // TODO: Implement suspend action
    console.log('Suspend user:', userId);
  };

  const handleBan = async () => {
    // TODO: Implement ban action
    console.log('Ban user:', userId);
  };

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('users.title'), href: `/${locale}/admin/users` },
          { label: user.fullName },
        ]}
        className="mb-6"
      />
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="rounded-xl p-2 transition-all"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
          }}
        >
          <ArrowLeft className="h-5 w-5" style={{ color: cssVars.neutral.textSecondary }} />
        </motion.button>
        <AdminPageHeader
          title={user.fullName}
          description={t('users.detail.description')}
          icon={UserIcon}
          action={
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSuspend}
                className="flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.status.warning} 10%, transparent)`,
                  color: cssVars.status.warning,
                }}
              >
                <Shield className="h-4 w-4" />
                {t('users.actions.suspend')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBan}
                className="flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.status.error} 10%, transparent)`,
                  color: cssVars.status.error,
                }}
              >
                <Ban className="h-4 w-4" />
                {t('users.actions.ban')}
              </motion.button>
            </div>
          }
        />
      </div>

      {/* User Info */}
      <UserBasicInfo user={user} />

      {/* Stats Grid */}
      <UserStats user={user} />

      {/* Additional Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        <UserPersonalInfo user={user} />
        <UserAddressInfo user={user} />
        <UserVerificationInfo user={user} />
        <UserAccountInfo user={user} />
      </div>
    </div>
  );
}
