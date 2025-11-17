'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { User, Phone, Calendar, MapPin, Building2, FileText, Globe, Linkedin, Twitter, Github, Save } from 'lucide-react';
import { useUser } from '@/lib/hooks/useUser';
import type { UpdateUserProfileData } from '@/lib/types/user.types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ProfileEditForm() {
  const t = useTranslations('pages.profile.edit');
  const { profile, isLoading, updateProfile } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState<UpdateUserProfileData>({
    fullName: '',
    phone: '',
    dateOfBirth: null,
    nationalId: null,
    companyName: null,
    commercialRegister: null,
    taxNumber: null,
    bio: '',
    website: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
    socialLinks: {
      linkedin: '',
      twitter: '',
      github: '',
    },
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        phone: profile.phone || '',
        dateOfBirth: profile.dateOfBirth || null,
        nationalId: profile.nationalId || null,
        companyName: profile.companyName || null,
        commercialRegister: profile.commercialRegister || null,
        taxNumber: profile.taxNumber || null,
        bio: (profile as any).bio || '',
        website: (profile as any).website || '',
        address: {
          street: profile.address?.street || '',
          city: profile.address?.city || '',
          state: profile.address?.state || '',
          country: profile.address?.country || '',
          postalCode: profile.address?.postalCode || '',
        },
        socialLinks: {
          linkedin: (profile as any).socialLinks?.linkedin || '',
          twitter: (profile as any).socialLinks?.twitter || '',
          github: (profile as any).socialLinks?.github || '',
        },
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string | null) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof UpdateUserProfileData] as any),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Clean up empty strings to null
      const cleanedData: UpdateUserProfileData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth || null,
        nationalId: formData.nationalId || null,
        companyName: formData.companyName || null,
        commercialRegister: formData.commercialRegister || null,
        taxNumber: formData.taxNumber || null,
        bio: formData.bio || undefined,
        website: formData.website || undefined,
        address: {
          street: formData.address?.street || undefined,
          city: formData.address?.city || undefined,
          state: formData.address?.state || undefined,
          country: formData.address?.country || undefined,
          postalCode: formData.address?.postalCode || undefined,
        },
        socialLinks: {
          linkedin: formData.socialLinks?.linkedin || undefined,
          twitter: formData.socialLinks?.twitter || undefined,
          github: formData.socialLinks?.github || undefined,
        },
      };

      await updateProfile(cleanedData);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      setSubmitError(t('errors.saveFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p style={{ color: cssVars.neutral.textSecondary }}>{t('loading')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {submitSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4"
          style={{ backgroundColor: cssVars.status.success, color: '#FFFFFF' }}
        >
          {t('success')}
        </motion.div>
      )}

      {/* Error Message */}
      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4"
          style={{ backgroundColor: cssVars.status.error, color: '#FFFFFF' }}
        >
          {submitError}
        </motion.div>
      )}

      {/* Basic Information */}
      <Card className="p-8">
        <h2 className="mb-6 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('sections.basicInfo')}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            icon={User}
            placeholder={t('fields.fullName.placeholder')}
            value={formData.fullName || ''}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            fullWidth
            required
          />
          <Input
            icon={Phone}
            type="tel"
            placeholder={t('fields.phone.placeholder')}
            value={formData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            fullWidth
          />
          <Input
            icon={Calendar}
            type="date"
            placeholder={t('fields.dateOfBirth.placeholder')}
            value={formData.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value || null)}
            fullWidth
          />
          <Input
            icon={FileText}
            placeholder={t('fields.nationalId.placeholder')}
            value={formData.nationalId || ''}
            onChange={(e) => handleInputChange('nationalId', e.target.value || null)}
            fullWidth
          />
        </div>
        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('fields.bio.label')}
          </label>
          <textarea
            className="w-full rounded-2xl border-2 p-6 text-lg font-semibold outline-none transition-all"
            style={{
              backgroundColor: cssVars.neutral.bg,
              color: cssVars.secondary.DEFAULT,
              borderColor: cssVars.neutral.border,
              minHeight: '120px',
            }}
            placeholder={t('fields.bio.placeholder')}
            value={formData.bio || ''}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            maxLength={500}
          />
          <p className="mt-2 text-sm" style={{ color: cssVars.neutral.textMuted }}>
            {(formData.bio || '').length}/500 {t('fields.bio.maxLength')}
          </p>
        </div>
      </Card>

      {/* Company Information (for suppliers) */}
      {(profile?.userType === 'supplier' || formData.companyName) && (
        <Card className="p-8">
          <h2 className="mb-6 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('sections.companyInfo')}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Input
              icon={Building2}
              placeholder={t('fields.companyName.placeholder')}
              value={formData.companyName || ''}
              onChange={(e) => handleInputChange('companyName', e.target.value || null)}
              fullWidth
            />
            <Input
              icon={FileText}
              placeholder={t('fields.commercialRegister.placeholder')}
              value={formData.commercialRegister || ''}
              onChange={(e) => handleInputChange('commercialRegister', e.target.value || null)}
              fullWidth
            />
            <Input
              icon={FileText}
              placeholder={t('fields.taxNumber.placeholder')}
              value={formData.taxNumber || ''}
              onChange={(e) => handleInputChange('taxNumber', e.target.value || null)}
              fullWidth
            />
          </div>
        </Card>
      )}

      {/* Address Information */}
      <Card className="p-8">
        <h2 className="mb-6 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('sections.address')}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            icon={MapPin}
            placeholder={t('fields.street.placeholder')}
            value={formData.address?.street || ''}
            onChange={(e) => handleInputChange('address.street', e.target.value || undefined)}
            fullWidth
          />
          <Input
            icon={MapPin}
            placeholder={t('fields.city.placeholder')}
            value={formData.address?.city || ''}
            onChange={(e) => handleInputChange('address.city', e.target.value || undefined)}
            fullWidth
          />
          <Input
            icon={MapPin}
            placeholder={t('fields.state.placeholder')}
            value={formData.address?.state || ''}
            onChange={(e) => handleInputChange('address.state', e.target.value || undefined)}
            fullWidth
          />
          <Input
            icon={MapPin}
            placeholder={t('fields.country.placeholder')}
            value={formData.address?.country || ''}
            onChange={(e) => handleInputChange('address.country', e.target.value || undefined)}
            fullWidth
          />
          <Input
            icon={MapPin}
            placeholder={t('fields.postalCode.placeholder')}
            value={formData.address?.postalCode || ''}
            onChange={(e) => handleInputChange('address.postalCode', e.target.value || undefined)}
            fullWidth
          />
        </div>
      </Card>

      {/* Social Links & Website */}
      <Card className="p-8">
        <h2 className="mb-6 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('sections.socialLinks')}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            icon={Globe}
            type="url"
            placeholder={t('fields.website.placeholder')}
            value={formData.website || ''}
            onChange={(e) => handleInputChange('website', e.target.value || undefined)}
            fullWidth
          />
          <Input
            icon={Linkedin}
            type="url"
            placeholder={t('fields.linkedin.placeholder')}
            value={formData.socialLinks?.linkedin || ''}
            onChange={(e) => handleInputChange('socialLinks.linkedin', e.target.value || undefined)}
            fullWidth
          />
          <Input
            icon={Twitter}
            type="url"
            placeholder={t('fields.twitter.placeholder')}
            value={formData.socialLinks?.twitter || ''}
            onChange={(e) => handleInputChange('socialLinks.twitter', e.target.value || undefined)}
            fullWidth
          />
          <Input
            icon={Github}
            type="url"
            placeholder={t('fields.github.placeholder')}
            value={formData.socialLinks?.github || ''}
            onChange={(e) => handleInputChange('socialLinks.github', e.target.value || undefined)}
            fullWidth
          />
        </div>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon={Save}
          disabled={isSubmitting}
        >
          {isSubmitting ? t('saving') : t('save')}
        </Button>
      </div>
    </form>
  );
}
