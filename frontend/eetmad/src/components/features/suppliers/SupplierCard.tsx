'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Users, Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type { Supplier } from '@/lib/types/supplier.types';

interface SupplierCardProps {
  supplier: Supplier;
  index: number;
}

export default function SupplierCard({ supplier, index }: SupplierCardProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('pages.suppliers');

  return (
    <motion.div
      key={supplier.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={() => router.push(`/suppliers/${supplier.id}`)}
      className="group cursor-pointer overflow-hidden rounded-3xl border-2 shadow-lg transition-all hover:shadow-2xl"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: supplier.isVerified ? cssVars.status.success : cssVars.neutral.border,
      }}
    >
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
              }}
            >
              <Users className="h-8 w-8" style={{ color: cssVars.primary.DEFAULT }} />
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h3 className="text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {supplier.businessName || 'Supplier'}
                </h3>
                {supplier.isVerified && (
                  <CheckCircle2 className="h-5 w-5" style={{ color: cssVars.status.success }} />
                )}
              </div>
              {supplier.rating !== undefined && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current" style={{ color: cssVars.accent.warm }} />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: cssVars.neutral.textSecondary }}
                  >
                    {supplier.rating.toFixed(1)} ({supplier.totalReviews || 0})
                  </span>
                </div>
              )}
            </div>
          </div>
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            style={{ color: cssVars.primary.DEFAULT }}
          />
        </div>

        {supplier.serviceDescription && (
          <p className="mb-4 line-clamp-2 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
            {supplier.serviceDescription}
          </p>
        )}

        {supplier.categories && supplier.categories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {supplier.categories.slice(0, 3).map((cat) => {
              const catName =
                locale === 'ar' ? cat.category?.nameAr : cat.category?.nameEn || 'Category';
              return (
                <span
                  key={cat.id}
                  className="rounded-lg px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                    color: cssVars.primary.DEFAULT,
                  }}
                >
                  {catName}
                </span>
              );
            })}
            {supplier.categories.length > 3 && (
              <span
                className="rounded-lg px-3 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                  color: cssVars.primary.DEFAULT,
                }}
              >
                +{supplier.categories.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 text-sm">
          {supplier.acceptanceRate !== undefined && (
            <div>
              <span className="font-semibold" style={{ color: cssVars.neutral.textSecondary }}>
                {t('acceptanceRate') || 'Acceptance'}:{' '}
              </span>
              <span className="font-bold" style={{ color: cssVars.primary.DEFAULT }}>
                {supplier.acceptanceRate.toFixed(0)}%
              </span>
            </div>
          )}
          {supplier.onTimeDelivery !== undefined && (
            <div>
              <span className="font-semibold" style={{ color: cssVars.neutral.textSecondary }}>
                {t('onTime') || 'On Time'}:{' '}
              </span>
              <span className="font-bold" style={{ color: cssVars.status.success }}>
                {supplier.onTimeDelivery.toFixed(0)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
