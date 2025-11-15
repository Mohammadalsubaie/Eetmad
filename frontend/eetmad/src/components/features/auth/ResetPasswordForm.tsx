'use client';

import { useState } from 'react';
import { cssVars } from '@/styles/theme';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import Link from 'next/link';

export default function ResetPasswordForm() {
  const t = useTranslations('auth');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (newPassword.length < 8) {
      setError(t('common.passwordTooShort'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('common.passwordsNotMatch'));
      return;
    }

    setIsLoading(true);

    // TODO: Implement actual reset password logic
    setTimeout(() => {
      console.log('Reset password');
      setIsSuccess(true);
      setIsLoading(false);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }, 1500);
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (newPassword.length === 0) return { label: '', strength: 0, color: cssVars.neutral.border };
    if (newPassword.length < 8) return { label: t('common.passwordStrength.weak'), strength: 33, color: cssVars.status.error };
    if (newPassword.length < 12) return { label: t('common.passwordStrength.medium'), strength: 66, color: cssVars.status.warning };
    return { label: t('common.passwordStrength.strong'), strength: 100, color: cssVars.status.success };
  };

  const strength = getPasswordStrength();

  return (
    <div
      className="w-full max-w-md rounded-3xl border-2 p-8 shadow-2xl md:p-10"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      {!isSuccess ? (
        <>
          {/* Header */}
          <div className="mb-8 text-center">
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                border: `1px solid ${cssVars.primary.DEFAULT}30`,
              }}
            >
              <Sparkles className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
              <span className="text-sm font-bold" style={{ color: cssVars.primary.DEFAULT }}>
                {t('resetPassword.badge')}
              </span>
            </div>

            <h1 className="mb-2 text-3xl font-bold md:text-4xl" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('resetPassword.title')}
            </h1>
            <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
              {t('resetPassword.subtitle')}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-xl border-2 p-4"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.error} 10%, transparent)`,
                borderColor: cssVars.status.error,
              }}
            >
              <p className="text-sm font-semibold" style={{ color: cssVars.status.error }}>
                {error}
              </p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password Field */}
            <div>
              <label className="mb-2 block text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('resetPassword.newPassword')}
              </label>
              <div className="relative">
                <Lock
                  className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2"
                  style={{ color: cssVars.neutral.textMuted }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full rounded-xl border-2 py-3 pl-12 pr-12 font-semibold outline-none transition-all focus:border-opacity-100"
                  style={{
                    backgroundColor: cssVars.neutral.bg,
                    color: cssVars.secondary.DEFAULT,
                    borderColor: cssVars.neutral.border,
                  }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 transition-all"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
                  ) : (
                    <Eye className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {newPassword.length > 0 && (
                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs font-semibold" style={{ color: cssVars.neutral.textSecondary }}>
                      {t('common.passwordStrength.label')}
                    </span>
                    <span className="text-xs font-bold" style={{ color: strength.color }}>
                      {strength.label}
                    </span>
                  </div>
                  <div
                    className="h-2 w-full overflow-hidden rounded-full"
                    style={{ backgroundColor: cssVars.neutral.border }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${strength.strength}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: strength.color }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="mb-2 block text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('common.confirmPassword')}
              </label>
              <div className="relative">
                <Lock
                  className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2"
                  style={{ color: cssVars.neutral.textMuted }}
                />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full rounded-xl border-2 py-3 pl-12 pr-12 font-semibold outline-none transition-all focus:border-opacity-100"
                  style={{
                    backgroundColor: cssVars.neutral.bg,
                    color: cssVars.secondary.DEFAULT,
                    borderColor: cssVars.neutral.border,
                  }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 transition-all"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
                  ) : (
                    <Eye className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
                  )}
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div
              className="flex items-start gap-3 rounded-xl p-4"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.info} 10%, transparent)`,
              }}
            >
              <Shield className="h-5 w-5 flex-shrink-0" style={{ color: cssVars.status.info }} />
              <p className="text-xs" style={{ color: cssVars.neutral.textSecondary }}>
                {t('common.securityTip')}
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-3 rounded-xl py-4 text-lg font-bold shadow-lg transition-all disabled:opacity-50"
              style={{
                background: cssVars.gradient.primary,
                color: cssVars.neutral.surface,
              }}
            >
              {isLoading ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  {t('resetPassword.submitButton')}
                  {isRTL ? (
                    <ArrowLeft className="h-6 w-6" />
                  ) : (
                    <ArrowRight className="h-6 w-6" />
                  )}
                </>
              )}
            </motion.button>
          </form>
        </>
      ) : (
        /* Success State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
            style={{ backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)` }}
          >
            <CheckCircle2 className="h-12 w-12" style={{ color: cssVars.status.success }} />
          </motion.div>

          <h2 className="mb-3 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('resetPassword.success')}
          </h2>

          <p className="mb-6 text-base" style={{ color: cssVars.neutral.textSecondary }}>
            {t('common.successMessage')}
          </p>

          <div className="flex items-center justify-center gap-2 text-sm" style={{ color: cssVars.neutral.textMuted }}>
            <div className="h-1 w-1 animate-pulse rounded-full" style={{ backgroundColor: cssVars.status.success }} />
            <span>{t('common.redirecting')}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
