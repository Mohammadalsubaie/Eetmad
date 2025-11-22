'use client';

import { Button, ErrorMessage, LoadingSpinner } from '@/components/ui';
import { useUpdateSupplierProfile } from '@/lib/hooks/useSupplierMutations';
import type { Supplier } from '@/lib/types/supplier.types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ProfileEditFormProps {
  profile: Supplier;
  onSuccess?: () => void;
}

export default function ProfileEditForm({ profile, onSuccess }: ProfileEditFormProps) {
  const t = useTranslations('pages.supplierProfile');
  const locale = useLocale();
  const router = useRouter();
  const { update, isLoading, error } = useUpdateSupplierProfile();
  const [selectedCategories] = useState<string[]>(
    profile.categories?.map((c) => c.categoryId) || []
  );
  const [formData, setFormData] = useState({
    serviceDescription: profile.serviceDescription || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await update({
        serviceDescription: formData.serviceDescription,
        categories: selectedCategories.map((catId, index) => ({
          categoryId: catId,
          isPrimary: index === 0,
        })),
      });

      if (onSuccess) {
        onSuccess();
      } else {
        router.push(`/${locale}/profile`);
      }
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage error={error.message || String(error)} variant="inline" />}

      {/* Service Description */}
      <div>
        <label
          htmlFor="serviceDescription"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('serviceDescription')} *
        </label>
        <textarea
          id="serviceDescription"
          value={formData.serviceDescription}
          onChange={(e) => setFormData({ ...formData, serviceDescription: e.target.value })}
          required
          rows={8}
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
          placeholder={t('serviceDescriptionPlaceholder')}
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
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" />
                {t('saving')}
              </>
            ) : (
              t('save')
            )}
          </Button>
        </motion.div>
      </div>
    </form>
  );
}
