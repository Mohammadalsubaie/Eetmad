'use client';

import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Supplier } from '@/lib/types/supplier.types';

interface SupplierPortfolioProps {
  supplier: Supplier;
}

export default function SupplierPortfolio({ supplier }: SupplierPortfolioProps) {
  const t = useTranslations('pages.suppliers');

  if (!supplier.portfolio || supplier.portfolio.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <h2 className="mb-6 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('portfolio') || 'Portfolio'}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {supplier.portfolio.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border-2 p-4"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h3 className="mb-2 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {item.title}
            </h3>
            {item.description && (
              <p className="mb-2 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                {item.description}
              </p>
            )}
            {item.category && (
              <span
                className="inline-block rounded-lg px-3 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                  color: cssVars.primary.DEFAULT,
                }}
              >
                {item.category}
              </span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
