'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Edit,
  Settings,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Star,
  Wallet,
  Briefcase,
} from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useProfile, useUserStatistics } from '@/lib/hooks/useUsers';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { Avatar, Badge } from '@/components/ui';

export default function ProfilePage() {
  const t = useTranslations('pages.profile');
  const locale = useLocale();
  const router = useRouter();
  const { data: profile, isLoading, error } = useProfile();
  const { data: statistics } = useUserStatistics();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />
        <ErrorMessage error={error?.message || t('profileNotFound')} variant="banner" />
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('notAvailable');
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />

      {/* Header */}
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="rounded-full border-4" style={{ borderColor: cssVars.primary.DEFAULT }}>
              <Avatar src={profile.avatar} alt={profile.fullName} size="xl" />
            </div>
            <div>
              <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {profile.fullName}
              </h1>
              <div className="flex items-center gap-4">
                <Badge
                  style={{
                    backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                    color: cssVars.primary.DEFAULT,
                    borderColor: cssVars.primary.DEFAULT,
                  }}
                >
                  {t(`userType.${profile.userType}`)}
                </Badge>
                {profile.isEmailVerified && (
                  <Badge
                    style={{
                      backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
                      color: cssVars.status.success,
                      borderColor: cssVars.status.success,
                    }}
                  >
                    {t('verified')}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => router.push(`/${locale}/profile/edit`)}
              variant="outline"
              icon={Edit}
            >
              {t('editProfile')}
            </Button>
            <Button
              onClick={() => router.push(`/${locale}/profile/settings`)}
              variant="outline"
              icon={Settings}
            >
              {t('settings')}
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      {statistics && (
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Star className="h-5 w-5" style={{ color: cssVars.status.warning }} />
              <span className="text-sm font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                {t('averageRating')}
              </span>
            </div>
            <p className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {statistics.averageRating.toFixed(1)}
            </p>
          </div>
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Briefcase className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
              <span className="text-sm font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                {t('completedProjects')}
              </span>
            </div>
            <p className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {statistics.completedProjects}
            </p>
          </div>
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Star className="h-5 w-5" style={{ color: cssVars.status.info }} />
              <span className="text-sm font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                {t('totalReviews')}
              </span>
            </div>
            <p className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {statistics.totalReviews}
            </p>
          </div>
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Wallet className="h-5 w-5" style={{ color: cssVars.status.success }} />
              <span className="text-sm font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                {t('walletBalance')}
              </span>
            </div>
            <p className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              <CurrencyDisplay amount={profile.walletBalance} iconSize={20} />
            </p>
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h2 className="mb-6 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('personalInformation')}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
              <div>
                <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                  {t('email')}
                </p>
                <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                  {profile.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
              <div>
                <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                  {t('phone')}
                </p>
                <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                  {profile.phone}
                </p>
              </div>
            </div>
            {profile.dateOfBirth && (
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
                <div>
                  <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                    {t('dateOfBirth')}
                  </p>
                  <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                    {formatDate(profile.dateOfBirth)}
                  </p>
                </div>
              </div>
            )}
            {profile.nationalId && (
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
                <div>
                  <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                    {t('nationalId')}
                  </p>
                  <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                    {profile.nationalId}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Company Information */}
        {(profile.companyName || profile.commercialRegister || profile.taxNumber) && (
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h2 className="mb-6 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('companyInformation')}
            </h2>
            <div className="space-y-4">
              {profile.companyName && (
                <div>
                  <p
                    className="mb-1 text-xs font-semibold"
                    style={{ color: cssVars.neutral.textMuted }}
                  >
                    {t('companyName')}
                  </p>
                  <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                    {profile.companyName}
                  </p>
                </div>
              )}
              {profile.commercialRegister && (
                <div>
                  <p
                    className="mb-1 text-xs font-semibold"
                    style={{ color: cssVars.neutral.textMuted }}
                  >
                    {t('commercialRegister')}
                  </p>
                  <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                    {profile.commercialRegister}
                  </p>
                </div>
              )}
              {profile.taxNumber && (
                <div>
                  <p
                    className="mb-1 text-xs font-semibold"
                    style={{ color: cssVars.neutral.textMuted }}
                  >
                    {t('taxNumber')}
                  </p>
                  <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                    {profile.taxNumber}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Address */}
        {profile.address && (
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h2 className="mb-6 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('address')}
            </h2>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
              <div className="space-y-1">
                {profile.address.street && (
                  <p className="text-sm" style={{ color: cssVars.secondary.DEFAULT }}>
                    {profile.address.street}
                  </p>
                )}
                <p className="text-sm" style={{ color: cssVars.secondary.DEFAULT }}>
                  {[profile.address.city, profile.address.state, profile.address.country]
                    .filter(Boolean)
                    .join(', ')}
                </p>
                {profile.address.postalCode && (
                  <p className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                    {t('postalCode')}: {profile.address.postalCode}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
