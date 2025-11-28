'use client';

import { Button, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { useUser } from '@/lib/hooks/useUser';
import type { UpdateUserProfileData, UserProfile } from '@/lib/types/user.types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import ProfileBasicInfoSection from './ProfileBasicInfoSection';
import ProfileCompanySection from './ProfileCompanySection';
import ProfileAddressSection from './ProfileAddressSection';
import ProfileSocialSection from './ProfileSocialSection';

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
        dateOfBirth: profile.dateOfBirth,
        nationalId: profile.nationalId,
        companyName: profile.companyName,
        commercialRegister: profile.commercialRegister,
        taxNumber: profile.taxNumber,
        bio: (profile as UserProfile).bio || '',
        website: (profile as UserProfile).website || '',
        address: {
          street: profile.address?.street || '',
          city: profile.address?.city || '',
          state: profile.address?.state || '',
          country: profile.address?.country || '',
          postalCode: profile.address?.postalCode || '',
        },
        socialLinks: {
          linkedin: (profile as UserProfile).socialLinks?.linkedin || '',
          twitter: (profile as UserProfile).socialLinks?.twitter || '',
          github: (profile as UserProfile).socialLinks?.github || '',
        },
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string | null) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData((prev) => {
        const parentValue = prev[parent as keyof UpdateUserProfileData];
        if (parentValue && typeof parentValue === 'object' && !Array.isArray(parentValue)) {
          return {
            ...prev,
            [parent]: {
              ...parentValue,
              [child]: value,
            },
          };
        }
        return prev;
      });
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
        dateOfBirth: formData.dateOfBirth,
        nationalId: formData.nationalId,
        companyName: formData.companyName,
        commercialRegister: formData.commercialRegister,
        taxNumber: formData.taxNumber,
        bio: formData.bio,
        website: formData.website,
        address: {
          street: formData.address?.street,
          city: formData.address?.city,
          state: formData.address?.state,
          country: formData.address?.country,
          postalCode: formData.address?.postalCode,
        },
        socialLinks: {
          linkedin: formData.socialLinks?.linkedin,
          twitter: formData.socialLinks?.twitter,
          github: formData.socialLinks?.github,
        },
      };

      await updateProfile(cleanedData);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch {
      setSubmitError(t('errors.saveFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {submitSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4"
          style={{ backgroundColor: cssVars.status.success, color: cssVars.neutral.white }}
        >
          {t('success')}
        </motion.div>
      )}

      {/* Error Message */}
      {submitError && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <ErrorMessage error={submitError} variant="inline" />
        </motion.div>
      )}

      <ProfileBasicInfoSection formData={formData} onInputChange={handleInputChange} />

      {/* Company Information (for suppliers) */}
      {(profile?.userType === 'supplier' || formData.companyName) && (
        <ProfileCompanySection formData={formData} onInputChange={handleInputChange} />
      )}

      <ProfileAddressSection formData={formData} onInputChange={handleInputChange} />
      <ProfileSocialSection formData={formData} onInputChange={handleInputChange} />

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button type="submit" variant="primary" size="lg" icon={Save} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" />
              {t('saving')}
            </>
          ) : (
            t('save')
          )}
        </Button>
      </div>
    </form>
  );
}
