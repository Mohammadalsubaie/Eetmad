'use client';

import { useState } from 'react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Download, CheckCircle2, Copy, Check } from 'lucide-react';

export default function TwoFactorSetup() {
  const t = useTranslations('auth.twoFactor');
  const [step, setStep] = useState<'scan' | 'verify' | 'success'>('scan');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Mock data - in real app, these would come from API
  const qrCodeUrl = 'https://via.placeholder.com/200x200?text=QR+Code';
  const backupCodes = [
    '1234-5678-9012',
    '3456-7890-1234',
    '5678-9012-3456',
    '7890-1234-5678',
    '9012-3456-7890',
    '1234-5678-9012',
    '3456-7890-1234',
    '5678-9012-3456',
  ];

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownloadCodes = () => {
    const text = backupCodes.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup-codes.txt';
    a.click();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement actual 2FA verification
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 1500);
  };

  return (
    <div
      className="w-full max-w-2xl rounded-3xl border-2 p-8 shadow-2xl md:p-10"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <div
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl"
          style={{ background: cssVars.gradient.primary }}
        >
          <Shield className="h-10 w-10" style={{ color: cssVars.neutral.surface }} />
        </div>

        <h1
          className="mb-2 text-3xl font-bold md:text-4xl"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('title')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('subtitle')}
        </p>
      </div>

      {/* Step Indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {['scan', 'verify', 'success'].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full transition-all ${step === s ? 'w-8' : ''}`}
              style={{
                backgroundColor:
                  step === s ||
                  (s === 'scan' && step !== 'scan') ||
                  (s === 'verify' && step === 'success')
                    ? cssVars.primary.DEFAULT
                    : cssVars.neutral.border,
              }}
            />
          </div>
        ))}
      </div>

      {/* Step 1: Scan QR Code */}
      {step === 'scan' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="rounded-2xl p-6" style={{ backgroundColor: cssVars.neutral.bg }}>
            <div className="mb-4 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrCodeUrl} alt={t('qrCodeAlt')} className="h-48 w-48 rounded-xl" />
            </div>
            <p
              className="text-center text-sm font-semibold"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              {t('setupInstructions.step1')}
            </p>
          </div>

          <motion.button
            type="button"
            onClick={() => setStep('verify')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-xl py-4 text-lg font-bold shadow-lg"
            style={{
              background: cssVars.gradient.primary,
              color: cssVars.neutral.surface,
            }}
          >
            Continue
          </motion.button>
        </motion.div>
      )}

      {/* Step 2: Verify Code */}
      {step === 'verify' && (
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleVerify}
          className="space-y-6"
        >
          <div className="rounded-2xl p-6" style={{ backgroundColor: cssVars.neutral.bg }}>
            <p
              className="mb-4 text-center text-sm font-semibold"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              {t('setupInstructions.step2')}
            </p>

            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              required
              maxLength={6}
              className="w-full rounded-xl border-2 py-4 text-center text-2xl font-bold tracking-wider outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.surface,
                color: cssVars.secondary.DEFAULT,
                borderColor: cssVars.neutral.border,
              }}
              placeholder="000000"
            />
          </div>

          <div className="flex gap-3">
            <motion.button
              type="button"
              onClick={() => setStep('scan')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl border-2 px-6 py-4 font-bold"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            >
              Back
            </motion.button>

            <motion.button
              type="submit"
              disabled={isLoading || verificationCode.length !== 6}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 rounded-xl py-4 text-lg font-bold shadow-lg disabled:opacity-50"
              style={{
                background: cssVars.gradient.primary,
                color: cssVars.neutral.surface,
              }}
            >
              {isLoading ? (
                <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                t('submitButton')
              )}
            </motion.button>
          </div>
        </motion.form>
      )}

      {/* Step 3: Success & Backup Codes */}
      {step === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
              }}
            >
              <CheckCircle2 className="h-10 w-10" style={{ color: cssVars.status.success }} />
            </motion.div>

            <h2 className="mb-2 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              2FA Enabled Successfully!
            </h2>
            <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
              {t('setupInstructions.step3')}
            </p>
          </div>

          <div className="rounded-2xl p-6" style={{ backgroundColor: cssVars.neutral.bg }}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('backupCodes')}
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadCodes}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold"
                style={{
                  backgroundColor: cssVars.primary.DEFAULT,
                  color: cssVars.neutral.surface,
                }}
              >
                <Download className="h-4 w-4" />
                {t('downloadCodes')}
              </motion.button>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              {backupCodes.map((code, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCopy(code, idx)}
                  className="flex items-center justify-between rounded-lg border-2 p-3 font-mono text-sm transition-all hover:border-opacity-100"
                  style={{
                    backgroundColor: cssVars.neutral.surface,
                    borderColor: cssVars.neutral.border,
                    color: cssVars.secondary.DEFAULT,
                  }}
                >
                  <span>{code}</span>
                  {copiedIndex === idx ? (
                    <Check className="h-4 w-4" style={{ color: cssVars.status.success }} />
                  ) : (
                    <Copy className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-xl py-4 text-lg font-bold shadow-lg"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            Done
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
