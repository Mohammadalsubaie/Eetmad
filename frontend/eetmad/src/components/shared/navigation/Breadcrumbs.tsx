'use client';

import { cssVars } from '@/styles/theme';
import { Home } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export default function Breadcrumbs({ items, showHome = true, className = '' }: BreadcrumbsProps) {
  const t = useTranslations('common');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Build breadcrumb items array
  const breadcrumbItems: BreadcrumbItem[] = showHome
    ? [{ label: t('home'), href: `/${locale}` }, ...items]
    : items;

  if (breadcrumbItems.length === 0) {
    return null;
  }

  const separator = ' > ';

  return (
    <nav className={`flex items-center gap-1 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <ol className="flex flex-wrap items-center gap-1">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <li key={index} className="flex items-center gap-1">
              {index === 0 && showHome ? (
                <Link
                  href={item.href || '#'}
                  className="flex items-center gap-1 transition-colors hover:opacity-80"
                  style={{ color: cssVars.neutral.textSecondary }}
                >
                  <Home className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ) : isLast ? (
                <span
                  className="text-sm font-semibold"
                  style={{ color: cssVars.secondary.DEFAULT }}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: cssVars.neutral.textSecondary }}
                >
                  {item.label}
                </Link>
              )}

              {!isLast && (
                <span
                  className="mx-1 text-sm"
                  style={{ color: cssVars.neutral.textMuted }}
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
