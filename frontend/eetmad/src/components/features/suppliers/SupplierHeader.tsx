'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Star, Users } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Supplier } from '@/lib/types/supplier.types';

interface SupplierHeaderProps {
  supplier: Supplier;
}

export default function SupplierHeader({ supplier }: SupplierHeaderProps) {
  const t = useTranslations('pages.suppliers');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 rounded-3xl border-2 p-8"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: supplier.isVerified ? cssVars.status.success : cssVars.neutral.border,
      }}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-6">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
            }}
          >
            <Users className="h-12 w-12" style={{ color: cssVars.primary.DEFAULT }} />
          </div>
          <div>
            <div className="mb-2 flex items-center gap-3">
              <h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {supplier.businessName || 'Supplier'}
              </h1>
              {supplier.isVerified && (
                <div className="flex items-center gap-2 rounded-lg px-3 py-1.5">
                  <CheckCircle2 className="h-5 w-5" style={{ color: cssVars.status.success }} />
                  <span className="text-sm font-bold" style={{ color: cssVars.status.success }}>
                    {t('verified') || 'Verified'}
                  </span>
                </div>
              )}
            </div>
            {supplier.rating !== undefined && (
              <div className="mb-2 flex items-center gap-2">
                <Star className="h-5 w-5 fill-current" style={{ color: cssVars.accent.warm }} />
                <span
                  className="text-lg font-bold"
                  style={{ color: cssVars.secondary.DEFAULT }}
                >
                  {supplier.rating.toFixed(1)}
                </span>
                <span className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                  ({supplier.totalReviews || 0} {t('reviews') || 'reviews'})
                </span>
              </div>
            )}
            {supplier.serviceDescription && (
              <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
                {supplier.serviceDescription}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

