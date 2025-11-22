'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Calendar, Building, Star, Briefcase } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useUser } from '@/lib/hooks/useUsers';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { Avatar, Badge } from '@/components/ui';

export default function UserProfilePage() {
  const params = useParams();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.users');
  const { data: user, isLoading, error } = useUser(id);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('title') }, { label: id }]} className="mb-6" />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('title') }, { label: id }]} className="mb-6" />
        <ErrorMessage error={error?.message || t('userNotFound')} variant="banner" />
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
      <Breadcrumbs items={[{ label: t('title') }, { label: user.fullName }]} className="mb-6" />

      {/* Header */}
      <div className="mb-8">
        <div className="mb-6 flex items-center gap-6">
          <div className="border-4 rounded-full" style={{ borderColor: cssVars.primary.DEFAULT }}>
            <Avatar
              src={user.avatar}
              alt={user.fullName}
              size="xl"
            />
          </div>
          <div>
            <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {user.fullName}
            </h1>
            <div className="flex items-center gap-4">
              <Badge
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                  color: cssVars.primary.DEFAULT,
                  borderColor: cssVars.primary.DEFAULT,
                }}
              >
                {t(`accountInfo.userTypes.${user.userType}`) || user.userType}
              </Badge>
              {user.isEmailVerified && (
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
      </div>

      {/* Statistics */}
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
            {user.averageRating.toFixed(1)}
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
            {user.completedProjects}
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
            {user.totalReviews}
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
            <Calendar className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
            <span className="text-sm font-semibold" style={{ color: cssVars.neutral.textMuted }}>
              {t('memberSince')}
            </span>
          </div>
          <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
            {formatDate(user.createdAt)}
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Information */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h2
            className="mb-6 text-xl font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('contactInformation')}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
              <div>
                <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                  {t('email')}
                </p>
                <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                  {user.email}
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
                  {user.phone}
                </p>
              </div>
            </div>
            {user.address && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
                <div>
                  <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                    {t('address')}
                  </p>
                  <p className="text-sm" style={{ color: cssVars.secondary.DEFAULT }}>
                    {[user.address.street, user.address.city, user.address.state, user.address.country]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Company Information */}
        {(user.companyName || user.commercialRegister || user.taxNumber) && (
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h2
              className="mb-6 text-xl font-bold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('companyInformation')}
            </h2>
            <div className="space-y-4">
              {user.companyName && (
                <div>
                  <p className="mb-1 text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                    {t('companyName')}
                  </p>
                  <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                    {user.companyName}
                  </p>
                </div>
              )}
              {user.commercialRegister && (
                <div>
                  <p className="mb-1 text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                    {t('commercialRegister')}
                  </p>
                  <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                    {user.commercialRegister}
                  </p>
                </div>
              )}
              {user.taxNumber && (
                <div>
                  <p className="mb-1 text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                    {t('taxNumber')}
                  </p>
                  <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                    {user.taxNumber}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

