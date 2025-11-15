'use client';

import { cssVars } from '@/styles/theme';
import { Button } from '@/components/ui';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import React from 'react';

interface Category {
  id: string;
  name: string;
  count: number;
  icon: React.ElementType;
}

interface SearchAndFiltersProps {
  categories: Category[];
  selectedFilter: string;
  onFilterChange: (filterId: string) => void;
}

export default function SearchAndFilters({
  categories,
  selectedFilter,
  onFilterChange,
}: SearchAndFiltersProps) {
  const t = useTranslations('biddingPlatform.search');

  return (
    <section
      className="border-b py-12"
      style={{ backgroundColor: cssVars.neutral.surface, borderColor: cssVars.neutral.border }}
    >
      <div className="container">
        <div className="flex flex-col items-center gap-6 lg:flex-row">
          <div className="relative w-full flex-1">
            <Search
              className="absolute end-6 top-1/2 h-6 w-6 -translate-y-1/2"
              style={{ color: cssVars.primary.light }}
            />
            <input
              type="text"
              placeholder={t('placeholder')}
              className="h-16 w-full rounded-2xl border-2 ps-8 pe-16 text-lg font-semibold outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.bg,
                color: cssVars.secondary.DEFAULT,
                borderColor: cssVars.neutral.border,
              }}
            />
          </div>

          <div className="flex flex-wrap gap-3 lg:flex-nowrap">
            <Button
              variant="outline"
              size="lg"
              icon={Filter}
              iconPosition="right"
              className="border-2"
              style={{
                borderColor: cssVars.primary.DEFAULT,
                color: cssVars.primary.DEFAULT,
                backgroundColor: cssVars.neutral.surface,
              }}
            >
              <span className="hidden sm:inline">{t('filterButton')}</span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              style={{ backgroundColor: cssVars.primary.DEFAULT, color: cssVars.neutral.bg }}
            >
              {t('searchButton')}
            </Button>
          </div>
        </div>

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onFilterChange(cat.id)}
              className={`whitespace-nowrap rounded-xl border-2 px-6 py-3 font-bold transition-all ${
                selectedFilter === cat.id ? 'shadow-lg' : ''
              }`}
              style={{
                backgroundColor:
                  selectedFilter === cat.id
                    ? cssVars.primary.DEFAULT
                    : cssVars.neutral.surfaceAlt,
                borderColor:
                  selectedFilter === cat.id ? cssVars.primary.dark : 'transparent',
                color: selectedFilter === cat.id ? cssVars.neutral.bg : cssVars.secondary.DEFAULT,
              }}
            >
              <div className="flex items-center gap-3">
                <cat.icon className="h-5 w-5" />
                <span>{cat.name}</span>
                <span
                  className="rounded-lg px-2.5 py-1 text-xs font-bold"
                  style={{
                    backgroundColor: selectedFilter === cat.id
                      ? `color-mix(in srgb, ${cssVars.neutral.bg} 20%, transparent)`
                      : cssVars.neutral.surface,
                    color: selectedFilter === cat.id ? cssVars.neutral.bg : cssVars.primary.DEFAULT,
                  }}
                >
                  {cat.count}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

