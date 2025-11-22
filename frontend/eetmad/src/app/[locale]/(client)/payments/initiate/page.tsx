'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, DollarSign } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useInitiatePayment } from '@/lib/hooks/usePayments';
import { Button, ErrorMessage, LoadingSpinner } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import Input from '@/components/ui/Input/Input';

export default function InitiatePaymentPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('pages.payments');
  const { mutate: initiatePayment, isLoading, error } = useInitiatePayment();
  const [formData, setFormData] = useState({
    projectId: '',
    milestoneId: '',
    amount: '',
    paymentType: 'deposit' as const,
    paymentMethod: 'credit_card' as const,
    gateway: 'moyasar',
    notes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payment = await initiatePayment({
        projectId: formData.projectId,
        milestoneId: formData.milestoneId || null,
        amount: parseFloat(formData.amount),
        paymentType: formData.paymentType,
        paymentMethod: formData.paymentMethod,
        gateway: formData.gateway,
        notes: formData.notes || null,
      });
      router.push(`/${locale}/payments/${payment.id}`);
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/payments` },
          { label: t('initiatePayment') },
        ]}
        className="mb-6"
      />

      {/* Back Button */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-medium"
        style={{ color: cssVars.primary.DEFAULT }}
      >
        <ArrowLeft className="h-4 w-4" />
        {t('back')}
      </motion.button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('initiatePayment')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('initiatePaymentDescription')}
        </p>
      </div>

      {/* Form */}
      <div
        className="rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <ErrorMessage error={error.message || String(error)} variant="inline" />}

          {/* Project ID */}
          <div>
            <label
              htmlFor="projectId"
              className="mb-2 block text-sm font-bold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('projectId')} *
            </label>
            <Input
              type="text"
              id="projectId"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              required
              className="w-full"
              placeholder={t('projectIdPlaceholder')}
            />
          </div>

          {/* Milestone ID */}
          <div>
            <label
              htmlFor="milestoneId"
              className="mb-2 block text-sm font-bold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('milestoneId')} ({t('optional')})
            </label>
            <Input
              type="text"
              id="milestoneId"
              name="milestoneId"
              value={formData.milestoneId}
              onChange={handleChange}
              className="w-full"
              placeholder={t('milestoneIdPlaceholder')}
            />
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="amount"
              className="mb-2 block text-sm font-bold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('amount')} *
            </label>
            <div className="relative">
              <DollarSign
                className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
                style={{ color: cssVars.neutral.textMuted }}
              />
              <Input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full pe-12"
                placeholder={t('amountPlaceholder')}
              />
            </div>
          </div>

          {/* Payment Type */}
          <div>
            <label
              htmlFor="paymentType"
              className="mb-2 block text-sm font-bold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('paymentType')} *
            </label>
            <select
              id="paymentType"
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
              required
              className="w-full rounded-xl border-2 px-4 py-3 text-sm"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            >
              <option value="deposit">{t('type.deposit')}</option>
              <option value="milestone">{t('type.milestone')}</option>
              <option value="final">{t('type.final')}</option>
            </select>
          </div>

          {/* Payment Method */}
          <div>
            <label
              htmlFor="paymentMethod"
              className="mb-2 block text-sm font-bold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('paymentMethod')} *
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="w-full rounded-xl border-2 px-4 py-3 text-sm"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            >
              <option value="credit_card">{t('method.credit_card')}</option>
              <option value="debit_card">{t('method.debit_card')}</option>
              <option value="bank_transfer">{t('method.bank_transfer')}</option>
              <option value="wallet">{t('method.wallet')}</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="mb-2 block text-sm font-bold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('notes')} ({t('optional')})
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-xl border-2 px-4 py-3 text-sm"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
              placeholder={t('notesPlaceholder')}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
              style={{
                borderColor: cssVars.neutral.border,
                color: cssVars.neutral.textSecondary,
              }}
            >
              {t('cancel')}
            </Button>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                style={{
                  background: cssVars.gradient.gold,
                  color: cssVars.secondary.DEFAULT,
                }}
              >
                {isLoading ? t('processing') : t('initiate')}
              </Button>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
