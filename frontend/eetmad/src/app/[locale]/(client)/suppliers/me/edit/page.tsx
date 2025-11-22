'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useMySupplierProfile, useUpdateSupplierProfile } from '@/lib/hooks/useSuppliers';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import Input from '@/components/ui/Input/Input';

export default function EditSupplierProfilePage() {
  const t = useTranslations('pages.suppliers');
  const locale = useLocale();
  const router = useRouter();
  const { data: profile, isLoading: loadingProfile } = useMySupplierProfile();
  const {
    mutate: updateProfile,
    isLoading: updating,
    error: updateError,
  } = useUpdateSupplierProfile();

  const [formData, setFormData] = useState({
    serviceDescription: '',
    responseTime: 0,
    acceptanceRate: 0,
    onTimeDelivery: 0,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        serviceDescription: profile.serviceDescription || '',
        responseTime: profile.responseTime || 0,
        acceptanceRate: profile.acceptanceRate || 0,
        onTimeDelivery: profile.onTimeDelivery || 0,
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'responseTime' || name === 'acceptanceRate' || name === 'onTimeDelivery'
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProfile(formData);
      router.push(`/${locale}/suppliers/me`);
    } catch (err) {
      // Error handled by hook
    }
  };

  if (loadingProfile) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('myProfile'), href: `/${locale}/suppliers/me` }, { label: t('edit') }]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('myProfile'), href: `/${locale}/suppliers/me` }, { label: t('edit') }]}
          className="mb-6"
        />
        <ErrorMessage error={t('profileNotFound')} variant="banner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[{ label: t('myProfile'), href: `/${locale}/suppliers/me` }, { label: t('edit') }]}
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
        <h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('editProfileTitle')}
        </h1>
        <p className="mt-2 text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('editProfileDescription')}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {updateError && (
          <ErrorMessage error={updateError.message || String(updateError)} variant="inline" />
        )}

        {/* Service Description */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <label
            htmlFor="serviceDescription"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('serviceDescription')} *
          </label>
          <textarea
            id="serviceDescription"
            name="serviceDescription"
            value={formData.serviceDescription}
            onChange={handleChange}
            required
            rows={6}
            className="w-full rounded-xl border-2 px-4 py-3 text-sm"
            style={{
              backgroundColor: cssVars.neutral.bg,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
            placeholder={t('serviceDescriptionPlaceholder')}
          />
        </div>

        {/* Performance Metrics */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h2 className="mb-4 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('performanceMetrics')}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label
                htmlFor="responseTime"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('responseTime')} (minutes)
              </label>
              <Input
                type="number"
                id="responseTime"
                name="responseTime"
                value={formData.responseTime}
                onChange={handleChange}
                min="0"
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="acceptanceRate"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('acceptanceRate')} (%)
              </label>
              <Input
                type="number"
                id="acceptanceRate"
                name="acceptanceRate"
                value={formData.acceptanceRate}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="onTimeDelivery"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('onTimeDelivery')} (%)
              </label>
              <Input
                type="number"
                id="onTimeDelivery"
                name="onTimeDelivery"
                value={formData.onTimeDelivery}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full"
              />
            </div>
          </div>
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
              disabled={updating}
              className="w-full"
              style={{
                background: cssVars.gradient.gold,
                color: cssVars.secondary.DEFAULT,
              }}
            >
              {updating ? t('saving') : t('save')}
            </Button>
          </motion.div>
        </div>
      </form>
    </div>
  );
}
