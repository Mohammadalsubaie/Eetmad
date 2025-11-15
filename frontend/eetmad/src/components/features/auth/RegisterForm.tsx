'use client';

import type { UserType } from '@/lib/types/user.types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  Lock,
  Mail,
  Phone,
  Sparkles,
  User,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import UserTypeSelector from './UserTypeSelector';

export default function RegisterForm() {
  const t = useTranslations('auth');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [step, setStep] = useState<'type' | 'details'>('type');
  const [userType, setUserType] = useState<UserType | null>(null);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [commercialReg, setCommercialReg] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTypeSelect = (type: UserType) => {
    setUserType(type);
  };

  const handleContinueToDetails = () => {
    if (userType) {
      setStep('details');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError(t('common.passwordsNotMatch'));
      return;
    }

    if (!agreeTerms) {
      setError(t('common.agreeTermsError'));
      return;
    }

    setIsLoading(true);

    // TODO: Implement actual registration logic
    setTimeout(() => {
      console.log('Register:', {
        userType,
        fullName,
        email,
        phoneNumber,
        password,
        companyName,
        commercialReg,
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div
      className="w-full max-w-2xl rounded-2xl border-2 p-4 shadow-2xl sm:rounded-3xl sm:p-6 md:p-8"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      {/* Header */}
      <div className="mb-6 text-center sm:mb-8">
        <div
          className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 sm:mb-4 sm:px-4 sm:py-2"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.accent.primary} 10%, transparent)`,
            border: `1px solid ${cssVars.accent.primary}30`,
          }}
        >
          <Sparkles
            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            style={{ color: cssVars.accent.primary }}
          />
          <span className="text-xs font-bold sm:text-sm" style={{ color: cssVars.accent.primary }}>
            {t('register.badge')}
          </span>
        </div>

        <h1
          className="mb-2 text-2xl font-bold sm:text-3xl md:text-4xl"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('register.title')}
        </h1>
        <p className="text-sm sm:text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('register.subtitle')}
        </p>
      </div>

      {/* Step Indicator */}
      <div className="mb-6 flex items-center justify-center gap-2 sm:mb-8 sm:gap-3">
        {['type', 'details'].map((s, idx) => (
          <div key={s} className="flex items-center gap-2 sm:gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all sm:h-10 sm:w-10 ${
                step === s || (s === 'type' && step === 'details') ? 'ring-2' : ''
              }`}
              style={{
                backgroundColor:
                  step === s || (s === 'type' && step === 'details')
                    ? cssVars.primary.DEFAULT
                    : cssVars.neutral.border,
                color:
                  step === s || (s === 'type' && step === 'details')
                    ? cssVars.neutral.surface
                    : cssVars.neutral.textMuted,
              }}
            >
              {s === 'type' && step === 'details' ? (
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                idx + 1
              )}
            </div>
            {idx < 1 && (
              <div
                className="h-0.5 w-8 sm:w-12"
                style={{
                  backgroundColor:
                    step === 'details' ? cssVars.primary.DEFAULT : cssVars.neutral.border,
                }}
              />
            )}
          </div>
        ))}
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

      {/* Step 1: User Type Selection */}
      {step === 'type' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <UserTypeSelector selectedType={userType} onSelect={handleTypeSelect} />

          <motion.button
            type="button"
            onClick={handleContinueToDetails}
            disabled={!userType}
            whileHover={{ scale: userType ? 1.02 : 1 }}
            whileTap={{ scale: userType ? 0.98 : 1 }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-base font-bold shadow-lg transition-all disabled:opacity-50 sm:mt-6 sm:gap-3 sm:rounded-xl sm:py-4 sm:text-lg"
            style={{
              background: userType ? cssVars.gradient.primary : cssVars.neutral.border,
              color: cssVars.neutral.surface,
            }}
          >
            {t('common.continue')}
            {isRTL ? (
              <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </motion.button>
        </motion.div>
      )}

      {/* Step 2: Registration Details */}
      {step === 'details' && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4 sm:space-y-5"
        >
          {/* Full Name */}
          <div>
            <label
              className="mb-1.5 block text-xs font-bold sm:mb-2 sm:text-sm"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('register.fullName')}
            </label>
            <div className="relative">
              <User
                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 sm:right-4 sm:h-5 sm:w-5"
                style={{ color: cssVars.neutral.textMuted }}
              />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full rounded-lg border-2 py-2.5 pl-3 pr-10 text-sm font-semibold outline-none transition-all focus:border-opacity-100 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-12 sm:text-base"
                style={{
                  backgroundColor: cssVars.neutral.bg,
                  color: cssVars.secondary.DEFAULT,
                  borderColor: cssVars.neutral.border,
                }}
              />
            </div>
          </div>

          {/* Email */}
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
                className="w-full rounded-lg border-2 py-2.5 pl-3 pr-10 text-sm font-semibold outline-none transition-all focus:border-opacity-100 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-12 sm:text-base"
                style={{
                  backgroundColor: cssVars.neutral.bg,
                  color: cssVars.secondary.DEFAULT,
                  borderColor: cssVars.neutral.border,
                }}
                placeholder="example@email.com"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label
              className="mb-2 block text-sm font-bold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('register.phoneNumber')}
            </label>
            <div className="relative">
              <Phone
                className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2"
                style={{ color: cssVars.neutral.textMuted }}
              />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full rounded-xl border-2 py-3 pl-4 pr-12 font-semibold outline-none transition-all focus:border-opacity-100"
                style={{
                  backgroundColor: cssVars.neutral.bg,
                  color: cssVars.secondary.DEFAULT,
                  borderColor: cssVars.neutral.border,
                }}
              />
            </div>
          </div>

          {/* Supplier-specific fields */}
          {userType === 'supplier' && (
            <>
              <div>
                <label
                  className="mb-2 block text-sm font-bold"
                  style={{ color: cssVars.secondary.DEFAULT }}
                >
                  {t('register.companyName')}
                </label>
                <div className="relative">
                  <Building2
                    className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2"
                    style={{ color: cssVars.neutral.textMuted }}
                  />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="w-full rounded-xl border-2 py-3 pl-4 pr-12 font-semibold outline-none transition-all focus:border-opacity-100"
                    style={{
                      backgroundColor: cssVars.neutral.bg,
                      color: cssVars.secondary.DEFAULT,
                      borderColor: cssVars.neutral.border,
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-bold"
                  style={{ color: cssVars.secondary.DEFAULT }}
                >
                  {t('register.commercialRegistration')}
                </label>
                <div className="relative">
                  <FileText
                    className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2"
                    style={{ color: cssVars.neutral.textMuted }}
                  />
                  <input
                    type="text"
                    value={commercialReg}
                    onChange={(e) => setCommercialReg(e.target.value)}
                    required
                    className="w-full rounded-xl border-2 py-3 pl-4 pr-12 font-semibold outline-none transition-all focus:border-opacity-100"
                    style={{
                      backgroundColor: cssVars.neutral.bg,
                      color: cssVars.secondary.DEFAULT,
                      borderColor: cssVars.neutral.border,
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Password Fields */}
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('common.password')}
              </label>
              <div className="relative">
                <Lock
                  className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2"
                  style={{ color: cssVars.neutral.textMuted }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
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
          </div>

          {/* Terms Agreement */}
          <label className="flex cursor-pointer items-start gap-2 sm:gap-3">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 cursor-pointer rounded border-2 sm:mt-1 sm:h-5 sm:w-5"
              style={{ accentColor: cssVars.primary.DEFAULT }}
            />
            <span className="text-xs sm:text-sm" style={{ color: cssVars.neutral.textSecondary }}>
              {t.rich('register.termsAgreement', {
                terms: (chunks) => (
                  <Link
                    href="/terms"
                    className="font-bold hover:underline"
                    style={{ color: cssVars.primary.DEFAULT }}
                  >
                    {chunks}
                  </Link>
                ),
                privacy: (chunks) => (
                  <Link
                    href="/privacy"
                    className="font-bold hover:underline"
                    style={{ color: cssVars.primary.DEFAULT }}
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </span>
          </label>

          {/* Submit Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <motion.button
              type="button"
              onClick={() => setStep('type')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg border-2 px-4 py-3 text-sm font-bold transition-all sm:rounded-xl sm:px-6 sm:py-4 sm:text-base"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            >
              {t('common.back')}
            </motion.button>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-base font-bold shadow-lg transition-all disabled:opacity-50 sm:gap-3 sm:rounded-xl sm:py-4 sm:text-lg"
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
                  {t('register.submitButton')}
                  {isRTL ? (
                    <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      )}

      {/* Sign In Link */}
      {step === 'type' && (
        <div className="mt-6 text-center sm:mt-8">
          <p className="text-xs sm:text-sm" style={{ color: cssVars.neutral.textSecondary }}>
            {t('common.alreadyHaveAccount')}{' '}
            <Link
              href="/login"
              className="font-bold transition-all hover:underline"
              style={{ color: cssVars.primary.DEFAULT }}
            >
              {t('register.signInLink')}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
