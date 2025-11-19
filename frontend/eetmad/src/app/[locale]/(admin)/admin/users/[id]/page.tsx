'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import {
  ArrowLeft,
  Ban,
  Calendar,
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  TrendingUp,
  User as UserIcon,
  XCircle,
  FileText,
  Briefcase,
  DollarSign,
} from 'lucide-react';
import type { User } from '@/lib/types/user.types';
import { adminApi } from '@/lib/api/admin';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import StatusBadge from '@/components/shared/badges/StatusBadge';
import AdminStatCard from '@/components/shared/admin/AdminStatCard';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function AdminUserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const userId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await adminApi.getUserById(userId);
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div style={{ color: cssVars.neutral.textSecondary }}>{t('users.loading')}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div style={{ color: cssVars.status.error }}>{t('users.notFound')}</div>
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

      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 rounded-2xl border-2 p-6 shadow-md"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Avatar & Basic Info */}
          <div className="flex items-center gap-4">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-2xl text-2xl font-bold"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                color: cssVars.primary.DEFAULT,
              }}
            >
              {user.fullName.charAt(0)}
            </div>
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h2 className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {user.fullName}
                </h2>
                <StatusBadge
                  status={user.status}
                  labels={{
                    active: t('users.statuses.active'),
                    inactive: t('users.statuses.inactive'),
                    suspended: t('users.statuses.suspended'),
                    banned: t('users.statuses.banned'),
                  }}
                />
              </div>
              <div
                className="flex items-center gap-4 text-sm"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                <span
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
                  style={{
                    backgroundColor:
                      user.userType === 'supplier'
                        ? `color-mix(in srgb, ${cssVars.accent.primary} 15%, transparent)`
                        : user.userType === 'admin'
                          ? `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`
                          : `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                    color:
                      user.userType === 'supplier'
                        ? cssVars.accent.primary
                        : user.userType === 'admin'
                          ? cssVars.status.warning
                          : cssVars.primary.DEFAULT,
                  }}
                >
                  {t(`users.types.${user.userType}`)}
                </span>
                {user.isEmailVerified && user.isPhoneVerified && (
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" style={{ color: cssVars.status.success }} />
                    {t('users.verified')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
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
      </motion.div>

      {/* Stats Grid */}
      <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          title={t('users.detail.stats.rating')}
          value={user.averageRating.toFixed(1)}
          change={`${user.totalReviews} ${t('users.detail.stats.reviews')}`}
          trend="up"
          icon={Star}
          color={cssVars.status.warning}
        />
        <AdminStatCard
          title={t('users.detail.stats.projects')}
          value={user.completedProjects.toString()}
          change={t('users.detail.stats.completed')}
          trend="up"
          icon={Briefcase}
          color={cssVars.primary.DEFAULT}
        />
        <AdminStatCard
          title={t('users.detail.stats.wallet')}
          value={user.walletBalance.toLocaleString('ar-SA')}
          change={t('common.currency')}
          icon={DollarSign}
          color={cssVars.status.success}
        />
        <AdminStatCard
          title={t('users.detail.stats.lastLogin')}
          value={new Date(user.lastLoginAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
          change={new Date(user.lastLoginAt).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
          icon={TrendingUp}
          color={cssVars.status.info}
        />
      </div>

      {/* Additional Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
            <UserIcon className="h-5 w-5" />
            {t('users.detail.sections.personalInfo')}
          </h3>
          <div className="space-y-3">
            {user.dateOfBirth && (
              <div className="flex justify-between">
                <span style={{ color: cssVars.neutral.textSecondary }}>
                  {t('users.detail.dateOfBirth')}
                </span>
                <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {new Date(user.dateOfBirth).toLocaleDateString('en-US')}
                </span>
              </div>
            )}
            {user.nationalId && (
              <div className="flex justify-between">
                <span style={{ color: cssVars.neutral.textSecondary }}>
                  {t('users.detail.nationalId')}
                </span>
                <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {user.nationalId}
                </span>
              </div>
            )}
            {user.companyName && (
              <div className="flex justify-between">
                <span style={{ color: cssVars.neutral.textSecondary }}>
                  {t('users.detail.companyName')}
                </span>
                <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {user.companyName}
                </span>
              </div>
            )}
            {user.commercialRegister && (
              <div className="flex justify-between">
                <span style={{ color: cssVars.neutral.textSecondary }}>
                  {t('users.detail.commercialRegister')}
                </span>
                <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {user.commercialRegister}
                </span>
              </div>
            )}
            {user.taxNumber && (
              <div className="flex justify-between">
                <span style={{ color: cssVars.neutral.textSecondary }}>
                  {t('users.detail.taxNumber')}
                </span>
                <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {user.taxNumber}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Address Information */}
        {user.address.city && (
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
        )}

        {/* Verification Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
            <Shield className="h-5 w-5" />
            {t('users.detail.sections.verification')}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('users.detail.emailVerification')}
              </span>
              {user.isEmailVerified ? (
                <CheckCircle className="h-5 w-5" style={{ color: cssVars.status.success }} />
              ) : (
                <XCircle className="h-5 w-5" style={{ color: cssVars.status.error }} />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('users.detail.phoneVerification')}
              </span>
              {user.isPhoneVerified ? (
                <CheckCircle className="h-5 w-5" style={{ color: cssVars.status.success }} />
              ) : (
                <XCircle className="h-5 w-5" style={{ color: cssVars.status.error }} />
              )}
            </div>
          </div>
        </motion.div>

        {/* Account Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
            <FileText className="h-5 w-5" />
            {t('users.detail.sections.account')}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('users.detail.createdAt')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {new Date(user.createdAt).toLocaleDateString('en-US')}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('users.detail.updatedAt')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {new Date(user.updatedAt).toLocaleDateString('en-US')}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('users.detail.lastLogin')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {new Date(user.lastLoginAt).toLocaleDateString('en-US')}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
