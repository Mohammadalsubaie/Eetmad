'use client';

import { Card, ErrorMessage, LoadingSpinner } from '@/components/ui';
import { useAuth } from '@/lib/hooks/useAuth';
import { useLogin } from '@/lib/hooks/useAuthMutations';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const t = useTranslations('auth');
  const locale = useLocale();
  const router = useRouter();
  const isRTL = locale === 'ar';
  const { login: authLogin } = useAuth();
  const { login, isLoading, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      await authLogin({ email, password });
      router.push('/dashboard');
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <Card className="w-full max-w-md p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 text-center sm:mb-8">
        <div
          className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 sm:mb-4 sm:px-4 sm:py-2"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
            border: `1px solid ${cssVars.primary.DEFAULT}30`,
          }}
        >
          <Sparkles
            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            style={{ color: cssVars.primary.DEFAULT }}
          />
          <span className="text-xs font-bold sm:text-sm" style={{ color: cssVars.primary.DEFAULT }}>
            {t('login.badge')}
          </span>
        </div>

        <h1
          className="mb-2 text-2xl font-bold sm:text-3xl md:text-4xl"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('login.title')}
        </h1>
        <p className="text-sm sm:text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('login.subtitle')}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <ErrorMessage error={error} variant="inline" />
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Email Field */}
        <div>
          <label
            className="mb-1.5 block text-xs font-bold sm:mb-2 sm:text-sm"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('common.email')}
          </label>
          <div className="relative">
            <Mail
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 sm:right-4 sm:h-5 sm:w-5"
              style={{ color: cssVars.neutral.textMuted }}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir="ltr"
              className="w-full rounded-lg border-2 py-2.5 pl-3 pr-10 text-sm font-semibold outline-none transition-all focus:border-opacity-100 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-12 sm:text-base"
              style={{
                backgroundColor: cssVars.neutral.bg,
                color: cssVars.secondary.DEFAULT,
                borderColor: cssVars.neutral.border,
              }}
              placeholder={t('emailPlaceholder')}
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label
            className="mb-1.5 block text-xs font-bold sm:mb-2 sm:text-sm"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('common.password')}
          </label>
          <div className="relative">
            <Lock
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 sm:right-4 sm:h-5 sm:w-5"
              style={{ color: cssVars.neutral.textMuted }}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-lg border-2 py-2.5 pl-10 pr-10 text-sm font-semibold outline-none transition-all focus:border-opacity-100 sm:rounded-xl sm:py-3 sm:pl-12 sm:pr-12 sm:text-base"
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
              className="absolute left-3 top-1/2 -translate-y-1/2 transition-all sm:left-4"
            >
              {showPassword ? (
                <EyeOff
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  style={{ color: cssVars.neutral.textMuted }}
                />
              ) : (
                <Eye
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  style={{ color: cssVars.neutral.textMuted }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-2 sm:h-5 sm:w-5"
              style={{ accentColor: cssVars.primary.DEFAULT }}
            />
            <span
              className="text-xs font-semibold sm:text-sm"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              {t('common.rememberMe')}
            </span>
          </label>

          <Link
            href="/forgot-password"
            className="text-xs font-bold transition-all hover:underline sm:text-sm"
            style={{ color: cssVars.primary.DEFAULT }}
          >
            {t('common.forgotPassword')}
          </Link>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-base font-bold shadow-lg transition-all disabled:opacity-50 sm:gap-3 sm:rounded-xl sm:py-4 sm:text-lg"
          style={{
            background: cssVars.gradient.primary,
            color: cssVars.neutral.surface,
          }}
        >
          {isLoading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              {t('login.submitButton')}
              {isRTL ? (
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </>
          )}
        </motion.button>
      </form>

      {/* Divider */}
      <div className="relative my-6 sm:my-8">
        <div
          className="absolute inset-0 flex items-center"
          style={{ borderTop: `1px solid ${cssVars.neutral.border}` }}
        />
        <div className="relative flex justify-center text-xs sm:text-sm">
          <span
            className="px-3 font-semibold sm:px-4"
            style={{
              backgroundColor: cssVars.neutral.surface,
              color: cssVars.neutral.textMuted,
            }}
          >
            {t('common.orContinueWith')}
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {['Google', 'Microsoft'].map((provider) => (
          <motion.button
            key={provider}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg border-2 py-2.5 text-sm font-bold transition-all sm:rounded-xl sm:py-3 sm:text-base"
            style={{
              backgroundColor: cssVars.neutral.bg,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {provider}
          </motion.button>
        ))}
      </div>

      {/* Sign Up Link */}
      <div className="mt-6 text-center sm:mt-8">
        <p className="text-xs sm:text-sm" style={{ color: cssVars.neutral.textSecondary }}>
          {t('common.dontHaveAccount')}{' '}
          <Link
            href="/register"
            className="font-bold transition-all hover:underline"
            style={{ color: cssVars.primary.DEFAULT }}
          >
            {t('login.signUpLink')}
          </Link>
        </p>
      </div>
    </Card>
  );
}
