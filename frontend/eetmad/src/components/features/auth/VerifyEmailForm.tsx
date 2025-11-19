'use client';

import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, RefreshCw, Sparkles } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Card from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';

export default function VerifyEmailForm() {
  const t = useTranslations('auth');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [email] = useState('user@example.com'); // TODO: Get from query params or context
  const [canResend, setCanResend] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      // When timer reaches zero, enable resend
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newCode = [...code];
    newCode[index] = value.slice(-1); // Only take the last digit
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newCode.every((digit) => digit !== '') && newCode.length === 6) {
      setTimeout(() => handleSubmit(newCode.join('')), 100);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];

    pastedData.split('').forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit;
      }
    });

    setCode(newCode);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex((digit) => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();

    // Auto-submit if complete
    if (newCode.every((digit) => digit !== '')) {
      setTimeout(() => handleSubmit(newCode.join('')), 100);
    }
  };

  const handleSubmit = async (verificationCode?: string) => {
    const codeToVerify = verificationCode || code.join('');

    if (codeToVerify.length !== 6) {
      setError(t('verifyEmail.error'));
      return;
    }

    setError('');
    setIsLoading(true);

    // TODO: Implement actual verification logic
    setTimeout(() => {
      console.log('Verify email with code:', codeToVerify);
      setIsSuccess(true);
      setIsLoading(false);

      // Redirect after success
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }, 1500);
  };

  const handleResend = () => {
    if (!canResend) return;

    setCanResend(false);
    setResendTimer(60);
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();

    // TODO: Implement actual resend logic
    console.log('Resend verification code to:', email);
  };

  return (
    <Card className="w-full max-w-md p-4 sm:p-6 md:p-8">
      {!isSuccess ? (
        <>
          {/* Header */}
          <div className="mb-6 text-center sm:mb-8">
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.accent.primary} 10%, transparent)`,
                border: `1px solid ${cssVars.accent.primary}30`,
              }}
            >
              <Sparkles className="h-4 w-4" style={{ color: cssVars.accent.primary }} />
              <span className="text-sm font-bold" style={{ color: cssVars.accent.primary }}>
                {t('verifyEmail.badge')}
              </span>
            </div>

            <h1
              className="mb-2 text-3xl font-bold md:text-4xl"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('verifyEmail.title')}
            </h1>
            <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
              {t('verifyEmail.subtitle')}
            </p>
            <p className="mt-2 text-sm font-semibold" style={{ color: cssVars.primary.DEFAULT }}>
              {email}
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

          {/* Verification Code Input */}
          <div className="mb-5 sm:mb-6">
            <label
              className="mb-2 block text-center text-xs font-bold sm:mb-3 sm:text-sm"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('verifyEmail.verificationCode')}
            </label>
            <div className="flex justify-center gap-1.5 sm:gap-2" dir="ltr">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="h-11 w-9 rounded-lg border-2 text-center text-xl font-bold outline-none transition-all focus:border-opacity-100 focus:ring-2 sm:h-14 sm:w-12 sm:rounded-xl sm:text-2xl"
                  style={{
                    backgroundColor: cssVars.neutral.bg,
                    color: cssVars.secondary.DEFAULT,
                    borderColor: digit ? cssVars.primary.DEFAULT : cssVars.neutral.border,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Resend Code */}
          <div className="mb-5 text-center sm:mb-6">
            <p className="mb-2 text-xs sm:text-sm" style={{ color: cssVars.neutral.textSecondary }}>
              {t('common.didntReceiveCode')}
            </p>
            <Button
              onClick={handleResend}
              disabled={!canResend}
              variant="ghost"
              size="sm"
              icon={RefreshCw}
              iconPosition="left"
              className="inline-flex h-auto p-0 font-bold hover:underline disabled:opacity-50"
              style={{ color: cssVars.primary.DEFAULT }}
            >
              <span className="text-xs sm:text-sm">
                {canResend ? t('verifyEmail.resendButton') : `Resend in ${resendTimer}s`}
              </span>
            </Button>
          </div>

          {/* Submit Button */}
          <motion.button
            type="button"
            onClick={() => handleSubmit()}
            disabled={isLoading || code.some((digit) => !digit)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-base font-bold shadow-lg transition-all disabled:opacity-50 sm:gap-3 sm:rounded-xl sm:py-4 sm:text-lg"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {isLoading ? (
              <div
                className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent sm:h-6 sm:w-6"
                style={{ borderColor: cssVars.secondary.DEFAULT }}
              />
            ) : (
              <>
                {t('verifyEmail.submitButton')}
                {isRTL ? (
                  <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </>
            )}
          </motion.button>

          {/* Back to Login Link */}
          <div className="mt-4 text-center sm:mt-6">
            <Link
              href="/login"
              className="text-xs font-bold transition-all hover:underline sm:text-sm"
              style={{ color: cssVars.neutral.textMuted }}
            >
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
            {t('verifyEmail.success')}
          </h2>

          <p className="mb-6 text-base" style={{ color: cssVars.neutral.textSecondary }}>
            {t('common.emailVerifiedMessage')}
          </p>

          <div
            className="flex items-center justify-center gap-2 text-sm"
            style={{ color: cssVars.neutral.textMuted }}
          >
            <div
              className="h-1 w-1 animate-pulse rounded-full"
              style={{ backgroundColor: cssVars.status.success }}
            />
            <span>{t('common.redirecting')}</span>
          </div>
        </motion.div>
      )}
    </Card>
  );
}
