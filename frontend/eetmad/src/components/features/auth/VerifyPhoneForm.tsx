'use client';

import { Button, Card, ErrorMessage, LoadingSpinner } from '@/components/ui';
import { useVerifyPhone } from '@/lib/hooks/useAuthMutations';
import { resendVerification } from '@/lib/api/auth';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, RefreshCw, Sparkles, Phone } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function VerifyPhoneForm() {
  const t = useTranslations('auth');
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone') || '';
  const isRTL = locale === 'ar';
  const { verify, isLoading, error, success } = useVerifyPhone();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [canResend, setCanResend] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.push(`/${locale}/login`);
      }, 2000);
    }
  }, [success, router, locale]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setValidationError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

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

    const nextEmptyIndex = newCode.findIndex((digit) => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();

    if (newCode.every((digit) => digit !== '')) {
      setTimeout(() => handleSubmit(newCode.join('')), 100);
    }
  };

  const handleSubmit = async (verificationCode?: string) => {
    const codeToVerify = verificationCode || code.join('');

    if (codeToVerify.length !== 6) {
      setValidationError(t('verifyPhone.error'));
      return;
    }

    setValidationError('');

    try {
      await verify(codeToVerify, phone || undefined);
    } catch {
      // Error handled by hook
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setCanResend(false);
    setResendTimer(60);
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();

    try {
      await resendVerification('phone', undefined, phone || undefined);
    } catch (err) {
      console.error('Failed to resend verification code:', err);
      setCanResend(true);
      setResendTimer(0);
    }
  };

  return (
    <Card className="w-full max-w-md p-4 sm:p-6 md:p-8">
      {!success ? (
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
                {t('verifyPhone.badge')}
              </span>
            </div>

            <h1
              className="mb-2 text-3xl font-bold md:text-4xl"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('verifyPhone.title')}
            </h1>
            <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
              {t('verifyPhone.subtitle')}
            </p>
            {phone && (
              <p
                className="mt-2 flex items-center justify-center gap-2 text-sm font-semibold"
                style={{ color: cssVars.primary.DEFAULT }}
              >
                <Phone className="h-4 w-4" />
                {phone}
              </p>
            )}
          </div>

          {/* Error Message */}
          {(error || validationError) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <ErrorMessage
                error={error?.message || validationError || String(error)}
                variant="inline"
              />
            </motion.div>
          )}

          {/* Verification Code Input */}
          <div className="mb-5 sm:mb-6">
            <label
              className="mb-2 block text-center text-xs font-bold sm:mb-3 sm:text-sm"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('verifyPhone.verificationCode')}
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
                {canResend
                  ? t('verifyPhone.resendButton')
                  : `${t('verifyPhone.resendIn')} ${resendTimer}s`}
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
              <LoadingSpinner size="sm" />
            ) : (
              <>
                {t('verifyPhone.submitButton')}
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
            {t('verifyPhone.success')}
          </h2>

          <p className="mb-6 text-base" style={{ color: cssVars.neutral.textSecondary }}>
            {t('verifyPhone.successMessage')}
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
