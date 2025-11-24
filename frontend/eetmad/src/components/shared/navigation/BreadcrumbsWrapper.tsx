import { pageExists } from '@/lib/utils/page-exists';
import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs';

interface BreadcrumbsWrapperProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
  locale?: string;
}

/**
 * Server Component wrapper that checks if pages exist before rendering breadcrumbs
 * This ensures that only real pages are clickable
 *
 * Usage:
 * <BreadcrumbsWrapper
 *   items={[
 *     { label: 'الإدارة', href: '/ar/admin' }, // Will be non-clickable if page doesn't exist
 *     { label: 'المستخدمين', href: '/ar/admin/users' } // Will be clickable if page exists
 *   ]}
 *   locale="ar"
 * />
 */
export default function BreadcrumbsWrapper({
  items,
  showHome = true,
  className = '',
  locale = 'ar',
}: BreadcrumbsWrapperProps) {
  // Check each item to see if its page exists
  const validatedItems: BreadcrumbItem[] = items.map((item) => {
    // If no href, it's not clickable
    if (!item.href || item.href === '#') {
      return { ...item, href: undefined };
    }

    // Check if the page exists
    const exists = pageExists(item.href, locale);

    // If page doesn't exist, remove href to make it non-clickable
    return {
      ...item,
      href: exists ? item.href : undefined,
    };
  });

  return <Breadcrumbs items={validatedItems} showHome={showHome} className={className} />;
}
