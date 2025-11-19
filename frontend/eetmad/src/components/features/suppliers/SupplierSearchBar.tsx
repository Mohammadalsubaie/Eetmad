'use client';

import { Search } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';

interface SupplierSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SupplierSearchBar({ searchQuery, onSearchChange }: SupplierSearchBarProps) {
  const t = useTranslations('pages.suppliers');

  return (
    <div className="mb-8">
      <div className="relative">
        <Search
          className="absolute start-6 top-1/2 h-5 w-5 -translate-y-1/2"
          style={{ color: cssVars.neutral.textMuted }}
        />
        <input
          type="text"
          placeholder={t('searchPlaceholder') || 'Search suppliers...'}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-14 w-full rounded-2xl border-2 pe-6 ps-14 text-base font-semibold outline-none transition-all focus:border-opacity-100"
          style={{
            backgroundColor: cssVars.neutral.surface,
            color: cssVars.secondary.DEFAULT,
            borderColor: cssVars.neutral.border,
          }}
        />
      </div>
    </div>
  );
}

