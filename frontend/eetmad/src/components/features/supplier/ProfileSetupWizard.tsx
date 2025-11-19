'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { Button, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { useCategories } from '@/lib/hooks/useCategories';
import { useUpdateSupplierProfile } from '@/lib/hooks/useSupplierMutations';

export default function ProfileSetupWizard() {
  const t = useTranslations('pages.supplierSetup');
  const router = useRouter();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { update, isLoading, error } = useUpdateSupplierProfile();
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    serviceDescription: '',
    responseTime: 24,
  });

  const totalSteps = 2;

  const handleSubmit = async () => {
    try {
      await update({
        serviceDescription: formData.serviceDescription,
        categories: selectedCategories.map((catId) => ({
          categoryId: catId,
          isPrimary: catId === selectedCategories[0],
        })),
      });
      router.push('/portfolio');
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div
          className="flex items-center justify-between text-sm font-medium"
          style={{ color: cssVars.neutral.textSecondary }}
        >
          <span>
            {t('step')} {step} {t('of')} {totalSteps}
          </span>
          <span>{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 20%, transparent)`,
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
            className="h-full rounded-full"
            style={{ background: cssVars.gradient.primary }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage error={error.message || String(error)} variant="inline" />
        </div>
      )}

      {categoriesLoading && <LoadingSpinner />}

      {/* Step 1: Categories */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h2 className="mb-2 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('step1Title')}
            </h2>
            <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
              {t('step1Description')}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (selectedCategories.includes(category.id)) {
                    setSelectedCategories(selectedCategories.filter((id) => id !== category.id));
                  } else {
                    setSelectedCategories([...selectedCategories, category.id]);
                  }
                }}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  selectedCategories.includes(category.id) ? 'border-2' : ''
                }`}
                style={{
                  backgroundColor: selectedCategories.includes(category.id)
                    ? `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`
                    : cssVars.neutral.surface,
                  borderColor: selectedCategories.includes(category.id)
                    ? cssVars.primary.DEFAULT
                    : cssVars.neutral.border,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                      {category.nameEn}
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                      {category.description}
                    </p>
                  </div>
                  {selectedCategories.includes(category.id) && (
                    <Check className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 2: Service Description */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h2 className="mb-2 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('step2Title')}
            </h2>
            <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
              {t('step2Description')}
            </p>
          </div>

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
        </motion.div>
      )}

      {/* Navigation */}
      <div
        className="flex items-center justify-between border-t pt-6"
        style={{ borderColor: cssVars.neutral.border }}
      >
        <Button
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
          variant="outline"
          className="flex items-center gap-2"
          style={{
            borderColor: cssVars.neutral.border,
            color: cssVars.neutral.textSecondary,
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          {t('previous')}
        </Button>

        {step < totalSteps ? (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={step === 1 && selectedCategories.length === 0}
            className="flex items-center gap-2"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {t('next')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !formData.serviceDescription}
            className="flex items-center gap-2"
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
              t('complete')
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
