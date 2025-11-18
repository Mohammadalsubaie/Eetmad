'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Shield,
  Edit,
  Wallet,
  Star,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import { usersApi } from '@/lib/api/users';
import type { User as UserType } from '@/lib/types/user.types';

export default function ProfilePage() {
  const t = useTranslations('pages.profile');
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await usersApi.getProfile();
        setUser(profileData);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <div className="text-center" style={{ color: cssVars.neutral.textSecondary }}>
          {t('loading')}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <div className="text-center" style={{ color: cssVars.status.error }}>
          {t('error')}
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('notProvided');
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('title')}
            </h1>
            <p className="text-lg" style={{ color: cssVars.neutral.textSecondary }}>
              {t('subtitle')}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/profile/edit')}
            className="flex items-center gap-2 rounded-xl px-6 py-3 font-bold transition-all"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            <Edit className="h-5 w-5" />
            {t('editProfile')}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Profile Card */}
          <div className="space-y-6 lg:col-span-2">
            {/* Profile Info Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <div className="flex items-start gap-6">
                <div
                  className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl"
                  style={{ backgroundColor: cssVars.neutral.surfaceAlt }}
                >
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.fullName}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12" style={{ color: cssVars.neutral.textMuted }} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <h2 className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                      {user.fullName}
                    </h2>
                    {user.status === 'active' ? (
                      <div
                        className="flex items-center gap-1 rounded-lg px-2 py-1"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
                        }}
                      >
                        <CheckCircle2
                          className="h-4 w-4"
                          style={{ color: cssVars.status.success }}
                        />
                        <span
                          className="text-xs font-bold"
                          style={{ color: cssVars.status.success }}
                        >
                          {t('status.active')}
                        </span>
                      </div>
                    ) : (
                      <div
                        className="flex items-center gap-1 rounded-lg px-2 py-1"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${cssVars.status.error} 15%, transparent)`,
                        }}
                      >
                        <XCircle className="h-4 w-4" style={{ color: cssVars.status.error }} />
                        <span className="text-xs font-bold" style={{ color: cssVars.status.error }}>
                          {t('status.inactive')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div
                    className="flex items-center gap-4 text-sm"
                    style={{ color: cssVars.neutral.textSecondary }}
                  >
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" style={{ color: cssVars.accent.warm }} />
                      <span className="font-semibold">{user.averageRating.toFixed(1)}</span>
                      <span>
                        ({user.totalReviews} {t('reviews')})
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" style={{ color: cssVars.status.success }} />
                      <span>
                        {user.completedProjects} {t('completedProjects')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h3 className="mb-6 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('sections.contactInfo.title')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                    }}
                  >
                    <Mail className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                      {t('sections.contactInfo.email')}
                    </div>
                    <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                      {user.email}
                    </div>
                    {user.isEmailVerified ? (
                      <div
                        className="mt-1 flex items-center gap-1 text-xs"
                        style={{ color: cssVars.status.success }}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {t('sections.contactInfo.verified')}
                      </div>
                    ) : (
                      <div
                        className="mt-1 flex items-center gap-1 text-xs"
                        style={{ color: cssVars.status.warning }}
                      >
                        <Clock className="h-3 w-3" />
                        {t('sections.contactInfo.notVerified')}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${cssVars.accent.primary} 15%, transparent)`,
                    }}
                  >
                    <Phone className="h-5 w-5" style={{ color: cssVars.accent.primary }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                      {t('sections.contactInfo.phone')}
                    </div>
                    <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                      {user.phone}
                    </div>
                    {user.isPhoneVerified ? (
                      <div
                        className="mt-1 flex items-center gap-1 text-xs"
                        style={{ color: cssVars.status.success }}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {t('sections.contactInfo.verified')}
                      </div>
                    ) : (
                      <div
                        className="mt-1 flex items-center gap-1 text-xs"
                        style={{ color: cssVars.status.warning }}
                      >
                        <Clock className="h-3 w-3" />
                        {t('sections.contactInfo.notVerified')}
                      </div>
                    )}
                  </div>
                </div>

                {user.address && (user.address.city || user.address.country) && (
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${cssVars.status.info} 15%, transparent)`,
                      }}
                    >
                      <MapPin className="h-5 w-5" style={{ color: cssVars.status.info }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                        {t('sections.contactInfo.address')}
                      </div>
                      <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                        {[user.address.city, user.address.state, user.address.country]
                          .filter(Boolean)
                          .join(', ') || t('notProvided')}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Company Information */}
            {user.userType === 'supplier' && (user.companyName || user.commercialRegister) && (
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl border-2 p-6"
                style={{
                  backgroundColor: cssVars.neutral.surface,
                  borderColor: cssVars.neutral.border,
                }}
              >
                <h3 className="mb-6 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {t('sections.companyInfo.title')}
                </h3>
                <div className="space-y-4">
                  {user.companyName && (
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${cssVars.secondary.DEFAULT} 15%, transparent)`,
                        }}
                      >
                        <Building2
                          className="h-5 w-5"
                          style={{ color: cssVars.secondary.DEFAULT }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                          {t('sections.companyInfo.companyName')}
                        </div>
                        <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                          {user.companyName}
                        </div>
                      </div>
                    </div>
                  )}
                  {user.commercialRegister && (
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                        }}
                      >
                        <Shield className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                          {t('sections.companyInfo.commercialRegister')}
                        </div>
                        <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                          {user.commercialRegister}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h3 className="mb-4 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('sections.stats.title')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5" style={{ color: cssVars.accent.warm }} />
                    <span style={{ color: cssVars.neutral.textSecondary }}>
                      {t('sections.stats.rating')}
                    </span>
                  </div>
                  <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {user.averageRating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" style={{ color: cssVars.status.success }} />
                    <span style={{ color: cssVars.neutral.textSecondary }}>
                      {t('sections.stats.projects')}
                    </span>
                  </div>
                  <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {user.completedProjects}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" style={{ color: cssVars.accent.warm }} />
                    <span style={{ color: cssVars.neutral.textSecondary }}>
                      {t('sections.stats.wallet')}
                    </span>
                  </div>
                  <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {user.walletBalance.toLocaleString()} {t('currency')}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Account Info */}
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h3 className="mb-4 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('sections.accountInfo.title')}
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div style={{ color: cssVars.neutral.textMuted }}>
                    {t('sections.accountInfo.memberSince')}
                  </div>
                  <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {formatDate(user.createdAt)}
                  </div>
                </div>
                <div>
                  <div style={{ color: cssVars.neutral.textMuted }}>
                    {t('sections.accountInfo.lastLogin')}
                  </div>
                  <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {formatDate(user.lastLoginAt)}
                  </div>
                </div>
                <div>
                  <div style={{ color: cssVars.neutral.textMuted }}>
                    {t('sections.accountInfo.userType')}
                  </div>
                  <div
                    className="font-semibold capitalize"
                    style={{ color: cssVars.secondary.DEFAULT }}
                  >
                    {t(`sections.accountInfo.userTypes.${user.userType}`)}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Security Quick Link */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/profile/security')}
              className="w-full rounded-xl border-2 p-4 text-left transition-all"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`,
                  }}
                >
                  <Shield className="h-5 w-5" style={{ color: cssVars.status.warning }} />
                </div>
                <div className="flex-1">
                  <div className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {t('security.title')}
                  </div>
                  <div className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                    {t('security.subtitle')}
                  </div>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
