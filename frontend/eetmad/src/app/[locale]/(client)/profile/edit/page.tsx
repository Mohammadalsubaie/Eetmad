'use client';

import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { Avatar, Button, ErrorMessage, LoadingSpinner } from '@/components/ui';
import Input from '@/components/ui/Input/Input';
import { useProfile, useUpdateProfile, useUploadAvatar } from '@/lib/hooks/useUsers';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditProfilePage() {
  const t = useTranslations('pages.profile.edit');
  const tProfile = useTranslations('pages.profile');
  const locale = useLocale();
  const router = useRouter();
  const { data: profile, isLoading: loadingProfile } = useProfile();
  const { mutate: updateProfile, isLoading: updating, error: updateError } = useUpdateProfile();
  const { mutate: uploadAvatar, isLoading: uploadingAvatar } = useUploadAvatar();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    dateOfBirth: '',
    nationalId: '',
    companyName: '',
    commercialRegister: '',
    taxNumber: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      // Use setTimeout to avoid synchronous setState in effect
      const timer = setTimeout(() => {
        setFormData({
          fullName: profile.fullName || '',
          phone: profile.phone || '',
          dateOfBirth: profile.dateOfBirth
            ? new Date(profile.dateOfBirth).toISOString().split('T')[0]
            : '',
          nationalId: profile.nationalId || '',
          companyName: profile.companyName || '',
          commercialRegister: profile.commercialRegister || '',
          taxNumber: profile.taxNumber || '',
          street: profile.address?.street || '',
          city: profile.address?.city || '',
          state: profile.address?.state || '',
          country: profile.address?.country || '',
          postalCode: profile.address?.postalCode || '',
        });
        setAvatarPreview(profile.avatar || null);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    try {
      const result = await uploadAvatar(file);
      setAvatarPreview(result.avatar);
    } catch {
      // Error handled by hook
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProfile({
        fullName: formData.fullName,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth || null,
        nationalId: formData.nationalId || null,
        companyName: formData.companyName || null,
        commercialRegister: formData.commercialRegister || null,
        taxNumber: formData.taxNumber || null,
        address: {
          street: formData.street || undefined,
          city: formData.city || undefined,
          state: formData.state || undefined,
          country: formData.country || undefined,
          postalCode: formData.postalCode || undefined,
        },
      });
      router.push(`/${locale}/profile`);
    } catch {
      // Error handled by hook
    }
  };

  if (loadingProfile) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: tProfile('title'), href: `/${locale}/profile` }, { label: t('title') }]}
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
          items={[{ label: tProfile('title'), href: `/${locale}/profile` }, { label: t('title') }]}
          className="mb-6"
        />
        <ErrorMessage error={tProfile('error') || 'Profile not found'} variant="banner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[{ label: tProfile('title'), href: `/${locale}/profile` }, { label: t('title') }]}
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
          {t('title')}
        </h1>
        <p className="mt-2 text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('subtitle')}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {updateError && (
          <ErrorMessage error={updateError.message || String(updateError)} variant="inline" />
        )}

        {/* Avatar Upload */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <label
            className="mb-4 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('avatar')}
          </label>
          <div className="flex items-center gap-6">
            <Avatar src={avatarPreview || undefined} alt={formData.fullName} size="xl" />
            <div className="flex-1">
              <label
                htmlFor="avatar"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all hover:opacity-80"
                style={{
                  borderColor: cssVars.primary.DEFAULT,
                  color: cssVars.primary.DEFAULT,
                }}
              >
                <Upload className="h-4 w-4" />
                {uploadingAvatar ? t('uploading') : t('uploadAvatar')}
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                disabled={uploadingAvatar}
              />
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h2 className="mb-4 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('personalInformation')}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('fullName')} *
              </label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('phone')} *
              </label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="dateOfBirth"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('dateOfBirth')}
              </label>
              <Input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="nationalId"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('nationalId')}
              </label>
              <Input
                type="text"
                id="nationalId"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h2 className="mb-4 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('companyInformation')}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="companyName"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('companyName')}
              </label>
              <Input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="commercialRegister"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('commercialRegister')}
              </label>
              <Input
                type="text"
                id="commercialRegister"
                name="commercialRegister"
                value={formData.commercialRegister}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="taxNumber"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('taxNumber')}
              </label>
              <Input
                type="text"
                id="taxNumber"
                name="taxNumber"
                value={formData.taxNumber}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div
          className="rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h2 className="mb-4 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('address')}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label
                htmlFor="street"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('street')}
              </label>
              <Input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('city')}
              </label>
              <Input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('state')}
              </label>
              <Input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('country')}
              </label>
              <Input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="postalCode"
                className="mb-2 block text-sm font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('postalCode')}
              </label>
              <Input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
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
