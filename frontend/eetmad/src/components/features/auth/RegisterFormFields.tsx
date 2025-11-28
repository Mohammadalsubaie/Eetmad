'use client';

import type { UserType } from '@/lib/types/user.types';
import { cssVars } from '@/styles/theme';
import { Building2, Eye, EyeOff, FileText, Lock, Mail, Phone, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface RegisterFormFieldsProps {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  commercialReg: string;
  agreeTerms: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  userType: UserType | null;
  onFullNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onCompanyNameChange: (value: string) => void;
  onCommercialRegChange: (value: string) => void;
  onAgreeTermsChange: (checked: boolean) => void;
  onShowPasswordToggle: () => void;
  onShowConfirmPasswordToggle: () => void;
}

export default function RegisterFormFields({
  fullName,
  email,
  phoneNumber,
  password,
  confirmPassword,
  companyName,
  commercialReg,
  agreeTerms,
  showPassword,
  showConfirmPassword,
  userType,
  onFullNameChange,
  onEmailChange,
  onPhoneNumberChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onCompanyNameChange,
  onCommercialRegChange,
  onAgreeTermsChange,
  onShowPasswordToggle,
  onShowConfirmPasswordToggle,
}: RegisterFormFieldsProps) {
  const t = useTranslations('auth');

  return (
    <>
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
            onChange={(e) => onFullNameChange(e.target.value)}
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
            onChange={(e) => onEmailChange(e.target.value)}
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
            onChange={(e) => onPhoneNumberChange(e.target.value)}
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
                onChange={(e) => onCompanyNameChange(e.target.value)}
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
                onChange={(e) => onCommercialRegChange(e.target.value)}
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
              onChange={(e) => onPasswordChange(e.target.value)}
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
              onClick={onShowPasswordToggle}
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
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
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
              onClick={onShowConfirmPasswordToggle}
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
          onChange={(e) => onAgreeTermsChange(e.target.checked)}
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
    </>
  );
}
