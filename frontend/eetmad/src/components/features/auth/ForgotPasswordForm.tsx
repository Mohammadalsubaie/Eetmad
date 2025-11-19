'use client';

import { Button, Card, ErrorMessage, LoadingSpinner } from '@/components/ui';
import { useForgotPassword } from '@/lib/hooks/useAuthMutations';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, Sparkles } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordForm() {
  const t = useTranslations('auth');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const { sendResetLink, isLoading, error, success } = useForgotPassword();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendResetLink(email);
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleResend = async () => {
    try {
      await sendResetLink(email);
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <Card className="w-full max-w-md p-8 md:p-10">
      {!success ? (
        <>
          {/* Header */}
          <div className="mb-8 text-center">
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.info} 10%, transparent)`,
                border: `1px solid ${cssVars.status.info}30`,
              }}
            >
              <Sparkles className="h-4 w-4" style={{ color: cssVars.status.info }} />
              <span className="text-sm font-bold" style={{ color: cssVars.status.info }}>
                {t('forgotPassword.badge')}
              </span>
            </div>

            <h1
              className="mb-2 text-3xl font-bold md:text-4xl"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('forgotPassword.title')}
            </h1>
            <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
              {t('forgotPassword.subtitle')}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <ErrorMessage error={error.message || String(error)} variant="inline" />
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('common.email')}
              </label>
              <div className="relative">
                <Mail
                  className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2"
                  style={{ color: cssVars.neutral.textMuted }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  dir="ltr"
                  className="w-full rounded-xl border-2 py-3 pl-4 pr-12 font-semibold outline-none transition-all focus:border-opacity-100"
                  style={{
                    backgroundColor: cssVars.neutral.bg,
                    color: cssVars.secondary.DEFAULT,
                    borderColor: cssVars.neutral.border,
                  }}
                  placeholder={t('emailPlaceholder')}
                />
              </div>
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
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  {t('forgotPassword.submitButton')}
                  {isRTL ? <ArrowLeft className="h-6 w-6" /> : <ArrowRight className="h-6 w-6" />}
                </>
              )}
            </motion.button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 font-bold transition-all hover:underline"
              style={{ color: cssVars.primary.DEFAULT }}
            >
              <ArrowLeft className="h-4 w-4" />
              {t('common.backToLogin')}
            </Link>
          </div>
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
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
            }}
          >
            <CheckCircle2 className="h-12 w-12" style={{ color: cssVars.status.success }} />
          </motion.div>

          <h2 className="mb-3 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('forgotPassword.checkEmail.title')}
          </h2>

          <p className="mb-2 text-base" style={{ color: cssVars.neutral.textSecondary }}>
            {t('forgotPassword.checkEmail.message', { email })}
          </p>

          <div
            className="mb-6 rounded-xl p-4"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.status.info} 10%, transparent)`,
            }}
          >
            <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
              {t('forgotPassword.checkEmail.note')}{' '}
              <Button
                onClick={handleResend}
                disabled={isLoading}
                variant="ghost"
                size="sm"
                className="inline h-auto p-0 font-bold hover:underline disabled:opacity-50"
                style={{ color: cssVars.primary.DEFAULT }}
              >
                {t('forgotPassword.checkEmail.resendLink')}
              </Button>
            </p>
          </div>

          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 py-3 font-bold transition-all"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.primary.DEFAULT,
                color: cssVars.primary.DEFAULT,
              }}
            >
              <ArrowLeft className="h-5 w-5" />
              {t('common.backToLogin')}
            </motion.button>
          </Link>
        </motion.div>
      )}
    </Card>
  );
}
