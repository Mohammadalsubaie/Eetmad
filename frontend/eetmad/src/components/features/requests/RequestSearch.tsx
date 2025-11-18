'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';
import { cssVars } from '@/styles/theme';

interface RequestSearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function RequestSearch({ onSearch, placeholder }: RequestSearchProps) {
  const t = useTranslations('pages.requests');
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <Search className="absolute start-4 h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder || t('searchPlaceholder')}
          className="w-full rounded-2xl border-2 py-3 pe-12 ps-12 text-sm transition-all focus:outline-none focus:ring-2"
          style={
            {
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
              '--tw-ring-color': cssVars.primary.DEFAULT,
            } as React.CSSProperties
          }
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute end-4 rounded-lg p-1 transition-colors hover:bg-opacity-10"
            style={{
              color: cssVars.neutral.textMuted,
            }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
