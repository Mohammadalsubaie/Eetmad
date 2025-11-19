'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { usersApi } from '@/lib/api/users';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { CheckCircle2, Eye, EyeOff, Lock, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ChangePasswordForm() {
  const t = useTranslations('pages.profile.security');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Password strength indicator
  const getPasswordStrength = () => {
    if (newPassword.length === 0) return { label: '', strength: 0, color: cssVars.neutral.border };
    if (newPassword.length < 8)
      return {
        label: t('passwordStrength.weak'),
        strength: 33,
        color: cssVars.status.error,
      };
    if (newPassword.length < 12)
      return {
        label: t('passwordStrength.medium'),
        strength: 66,
        color: cssVars.status.warning,
      };
    return {
      label: t('passwordStrength.strong'),
      strength: 100,
      color: cssVars.status.success,
    };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (!currentPassword) {
      setError(t('errors.currentPasswordRequired'));
      return;
    }

    if (newPassword.length < 8) {
      setError(t('errors.passwordTooShort'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('errors.passwordsNotMatch'));
      return;
    }

    if (currentPassword === newPassword) {
      setError(t('errors.samePassword'));
      return;
    }

    setIsSubmitting(true);

    try {
      await usersApi.changePassword({
        currentPassword,
        newPassword,
      });

      setSuccess(true);
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } })?.response?.data?.message
          : undefined;
      setError(errorMessage || t('errors.changePasswordFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 rounded-xl border-2 p-4"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 10%, transparent)`,
              borderColor: cssVars.status.success,
            }}
          >
            <CheckCircle2
              className="h-5 w-5 flex-shrink-0"
              style={{ color: cssVars.status.success }}
            />
            <p className="text-sm font-semibold" style={{ color: cssVars.status.success }}>
              {t('success.passwordChanged')}
            </p>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border-2 p-4"
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

        {/* Current Password Field */}
        <div>
          <label
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('currentPassword')}
          </label>
          <div className="relative">
            <Lock
              className="absolute end-6 top-1/2 h-6 w-6 -translate-y-1/2"
              style={{ color: cssVars.neutral.textMuted }}
            />
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full rounded-2xl border-2 py-4 pe-16 ps-8 text-lg font-semibold outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.bg,
                color: cssVars.secondary.DEFAULT,
                borderColor: cssVars.neutral.border,
              }}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute start-4 top-1/2 -translate-y-1/2 transition-all"
            >
              {showCurrentPassword ? (
                <EyeOff className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
              ) : (
                <Eye className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
              )}
            </button>
          </div>
        </div>

        {/* New Password Field */}
        <div>
          <label
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('newPassword')}
          </label>
          <div className="relative">
            <Lock
              className="absolute end-6 top-1/2 h-6 w-6 -translate-y-1/2"
              style={{ color: cssVars.neutral.textMuted }}
            />
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-2xl border-2 py-4 pe-16 ps-8 text-lg font-semibold outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.bg,
                color: cssVars.secondary.DEFAULT,
                borderColor: cssVars.neutral.border,
              }}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute start-4 top-1/2 -translate-y-1/2 transition-all"
            >
              {showNewPassword ? (
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
                <span
                  className="text-xs font-semibold"
                  style={{ color: cssVars.neutral.textSecondary }}
                >
                  {t('passwordStrength.label')}
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
          <label
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('confirmPassword')}
          </label>
          <div className="relative">
            <Lock
              className="absolute end-6 top-1/2 h-6 w-6 -translate-y-1/2"
              style={{ color: cssVars.neutral.textMuted }}
            />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-2xl border-2 py-4 pe-16 ps-8 text-lg font-semibold outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.bg,
                color: cssVars.secondary.DEFAULT,
                borderColor:
                  confirmPassword && confirmPassword !== newPassword
                    ? cssVars.status.error
                    : cssVars.neutral.border,
              }}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute start-4 top-1/2 -translate-y-1/2 transition-all"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
              ) : (
                <Eye className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
              )}
            </button>
          </div>
          {confirmPassword && confirmPassword !== newPassword && (
            <p className="mt-1 text-xs font-semibold" style={{ color: cssVars.status.error }}>
              {t('errors.passwordsNotMatch')}
            </p>
          )}
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
            {t('securityTip')}
          </p>
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            t('saveButton')
          )}
        </Button>
      </form>
    </Card>
  );
}
