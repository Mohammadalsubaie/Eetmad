'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { suppliersApi } from '@/lib/api/suppliers';
import type { Supplier } from '@/lib/types/supplier.types';
import { Button } from '@/components/ui/Button';

interface ProfileEditFormProps {
  profile: Supplier;
  onSuccess?: () => void;
}

export default function ProfileEditForm({ profile, onSuccess }: ProfileEditFormProps) {
  const t = useTranslations('pages.supplierProfile');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories] = useState<string[]>(
    profile.categories?.map((c) => c.categoryId) || []
  );
  const [formData, setFormData] = useState({
    serviceDescription: profile.serviceDescription || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await suppliersApi.updateProfile({
        serviceDescription: formData.serviceDescription,
        categories: selectedCategories.map((catId, index) => ({
          categoryId: catId,
          isPrimary: index === 0,
        })),
      });

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/profile');
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError(t('saveError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl border-2 p-4" style={{ borderColor: cssVars.status.error }}>
          <p style={{ color: cssVars.status.error }}>{error}</p>
        </div>
      )}

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
            disabled={loading}
            className="w-full"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {loading ? t('saving') : t('save')}
          </Button>
        </motion.div>
      </div>
    </form>
  );
}
