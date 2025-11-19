'use client';

import { cssVars } from '@/styles/theme';
import { Eye, EyeOff, Lock, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface ChangePasswordFieldsProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  showCurrentPassword: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onShowCurrentPasswordToggle: () => void;
  onShowNewPasswordToggle: () => void;
  onShowConfirmPasswordToggle: () => void;
}

export default function ChangePasswordFields({
  currentPassword,
  newPassword,
  confirmPassword,
  showCurrentPassword,
  showNewPassword,
  showConfirmPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onShowCurrentPasswordToggle,
  onShowNewPasswordToggle,
  onShowConfirmPasswordToggle,
}: ChangePasswordFieldsProps) {
  const t = useTranslations('pages.profile.security');

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

  return (
    <>
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
            onChange={(e) => onCurrentPasswordChange(e.target.value)}
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
            onClick={onShowCurrentPasswordToggle}
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
            onChange={(e) => onNewPasswordChange(e.target.value)}
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
            onClick={onShowNewPasswordToggle}
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
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
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
            onClick={onShowConfirmPasswordToggle}
            className="absolute start-4 top-1/2 -translate-y-1/2 transition-all"
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
          {t('securityTip')}
        </p>
      </div>
    </>
  );
}

