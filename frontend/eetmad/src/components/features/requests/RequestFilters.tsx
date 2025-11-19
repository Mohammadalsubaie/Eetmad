'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { Button } from '@/components/ui';
import type {
  RequestStatus,
  RequestFilters as RequestFiltersType,
} from '@/lib/types/request.types';

interface RequestFiltersProps {
  filters?: RequestFiltersType;
  onFilterChange?: (filters: RequestFiltersType) => void;
}

export default function RequestFilters({ filters = {}, onFilterChange }: RequestFiltersProps) {
  const t = useTranslations('pages.requests');
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<RequestFiltersType>({
    status: filters.status || '',
    categoryId: filters.categoryId || '',
    budgetMin: filters.budgetMin || '',
    budgetMax: filters.budgetMax || '',
    ...filters,
  });

  const statusOptions: RequestStatus[] = [
    'open',
    'in_progress',
    'completed',
    'cancelled',
    'closed',
  ];

  const handleFilterChange = (key: string, value: string | number | RequestStatus) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleClearFilters = () => {
    const clearedFilters: RequestFiltersType = {
      status: '' as RequestStatus | '',
      categoryId: '',
      budgetMin: '',
      budgetMax: '',
    };
    setLocalFilters(clearedFilters);
    if (onFilterChange) {
      onFilterChange(clearedFilters);
    }
  };

  const activeFiltersCount = Object.values(localFilters).filter(
    (v) => v !== '' && v !== null
  ).length;

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="flex items-center gap-2"
        style={{
          borderColor: cssVars.neutral.border,
          color: cssVars.secondary.DEFAULT,
        }}
      >
        <Filter className="h-4 w-4" />
        {t('filters')}
        {activeFiltersCount > 0 && (
          <span
            className="ml-1 rounded-full px-2 py-0.5 text-xs font-bold"
            style={{
              backgroundColor: cssVars.primary.DEFAULT,
              color: cssVars.neutral.white,
            }}
          >
            {activeFiltersCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full z-50 mt-2 w-full min-w-72 rounded-2xl border-2 p-6 shadow-2xl"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('filters')}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 transition-colors hover:bg-opacity-10"
                style={{
                  color: cssVars.neutral.textSecondary,
                }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Status Filter */}
              <div>
                <label
                  className="mb-2 block text-sm font-medium"
                  style={{ color: cssVars.secondary.DEFAULT }}
                >
                  {t('filterStatus')}
                </label>
                <select
                  value={localFilters.status || ''}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full rounded-lg border-2 px-4 py-2 text-sm"
                  style={{
                    backgroundColor: cssVars.neutral.surface,
                    borderColor: cssVars.neutral.border,
                    color: cssVars.secondary.DEFAULT,
                  }}
                >
                  <option value="">{t('allStatuses')}</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {t(`status.${status}`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="mb-2 block text-sm font-medium"
                    style={{ color: cssVars.secondary.DEFAULT }}
                  >
                    {t('filterBudgetMin')}
                  </label>
                  <input
                    type="number"
                    value={localFilters.budgetMin || ''}
                    onChange={(e) => handleFilterChange('budgetMin', e.target.value)}
                    placeholder={t('filterBudgetMinPlaceholder')}
                    className="w-full rounded-lg border-2 px-4 py-2 text-sm"
                    style={{
                      backgroundColor: cssVars.neutral.surface,
                      borderColor: cssVars.neutral.border,
                      color: cssVars.secondary.DEFAULT,
                    }}
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-medium"
                    style={{ color: cssVars.secondary.DEFAULT }}
                  >
                    {t('filterBudgetMax')}
                  </label>
                  <input
                    type="number"
                    value={localFilters.budgetMax || ''}
                    onChange={(e) => handleFilterChange('budgetMax', e.target.value)}
                    placeholder={t('filterBudgetMaxPlaceholder')}
                    className="w-full rounded-lg border-2 px-4 py-2 text-sm"
                    style={{
                      backgroundColor: cssVars.neutral.surface,
                      borderColor: cssVars.neutral.border,
                      color: cssVars.secondary.DEFAULT,
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div
                className="flex items-center justify-between gap-2 border-t pt-4"
                style={{ borderColor: cssVars.neutral.border }}
              >
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  className="flex-1"
                  style={{
                    borderColor: cssVars.neutral.border,
                    color: cssVars.neutral.textSecondary,
                  }}
                >
                  {t('clearFilters')}
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                  style={{
                    background: cssVars.gradient.gold,
                    color: cssVars.secondary.DEFAULT,
                  }}
                >
                  {t('applyFilters')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
