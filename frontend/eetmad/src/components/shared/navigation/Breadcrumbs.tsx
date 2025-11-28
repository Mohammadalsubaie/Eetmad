'use client';

import { checkPageExists } from '@/lib/actions/check-page';
import { cssVars } from '@/styles/theme';
import { Home } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

interface ValidatedBreadcrumbItem extends BreadcrumbItem {
  isValid?: boolean;
  isChecking?: boolean;
}

export default function Breadcrumbs({ items, showHome = true, className = '' }: BreadcrumbsProps) {
  const t = useTranslations('common');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [validatedItems, setValidatedItems] = useState<ValidatedBreadcrumbItem[]>(items);

  // Build breadcrumb items array
  const breadcrumbItems: ValidatedBreadcrumbItem[] = showHome
    ? [{ label: t('home'), href: `/${locale}`, isValid: true }, ...validatedItems]
    : validatedItems;

  // Validate pages on mount
  useEffect(() => {
    const validatePages = async () => {
      const validationPromises = items.map(async (item) => {
        // If no href, it's not clickable
        if (!item.href || item.href === '#') {
          return { ...item, isValid: false, isChecking: false };
        }

        // Check if the page exists
        const exists = await checkPageExists(item.href, locale);
        return { ...item, isValid: exists, isChecking: false };
      });

      const validated = await Promise.all(validationPromises);
      setValidatedItems(validated);
    };

    validatePages();
  }, [items, locale]);

  if (breadcrumbItems.length === 0) {
    return null;
  }

  const separator = ' > ';

  return (
    <nav className={`flex items-center gap-1 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <ol className="flex flex-wrap items-center gap-1">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          // Only make clickable if href exists, is not '#', and page is valid
          const hasHref = item.href && item.href !== '#' && item.isValid !== false;

          return (
            <li key={index} className="flex items-center gap-1">
              {index === 0 && showHome ? (
                hasHref ? (
                  <Link
                    href={item.href!}
                    className="flex items-center gap-1 transition-colors hover:opacity-80"
                    style={{ color: cssVars.neutral.textSecondary }}
                  >
                    <Home className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ) : (
                  <span
                    className="flex items-center gap-1 text-sm font-medium"
                    style={{ color: cssVars.neutral.textSecondary }}
                  >
                    <Home className="h-4 w-4" />
                    <span>{item.label}</span>
                  </span>
                )
              ) : isLast ? (
                <span
                  className="text-sm font-semibold"
                  style={{ color: cssVars.secondary.DEFAULT }}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : hasHref ? (
                <Link
                  href={item.href!}
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: cssVars.neutral.textSecondary }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="text-sm font-medium"
                  style={{ color: cssVars.neutral.textSecondary }}
                >
                  {item.label}
                </span>
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
