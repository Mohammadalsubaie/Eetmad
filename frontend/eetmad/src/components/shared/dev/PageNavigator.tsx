'use client';

import { cssVars } from '@/styles/theme';
import { ChevronDown, ChevronRight, ExternalLink, Search, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

interface PageRoute {
  path: string;
  label: string;
  group?: string;
  isDynamic?: boolean;
}

// All pages in the project
const ALL_PAGES: PageRoute[] = [
  // Public pages
  { path: '', label: 'Home', group: 'Public' },
  { path: 'about', label: 'About', group: 'Public' },
  { path: 'how-it-works', label: 'How It Works', group: 'Public' },
  { path: 'categories', label: 'Categories', group: 'Public' },
  { path: 'categories/[slug]', label: 'Category Detail', group: 'Public', isDynamic: true },
  { path: 'suppliers', label: 'Suppliers', group: 'Public' },
  { path: 'suppliers/[id]', label: 'Supplier Detail', group: 'Public', isDynamic: true },
  { path: 'contact', label: 'Contact', group: 'Public' },
  { path: 'faq', label: 'FAQ', group: 'Public' },
  { path: 'terms', label: 'Terms', group: 'Public' },
  { path: 'privacy', label: 'Privacy', group: 'Public' },

  // Auth pages
  { path: 'login', label: 'Login', group: 'Auth' },
  { path: 'register', label: 'Register', group: 'Auth' },
  { path: 'forgot-password', label: 'Forgot Password', group: 'Auth' },
  { path: 'reset-password', label: 'Reset Password', group: 'Auth' },
  { path: 'verify-email', label: 'Verify Email', group: 'Auth' },

  // Main pages
  { path: 'dashboard', label: 'Dashboard', group: 'Main' },
  { path: 'profile', label: 'Profile', group: 'Main' },
  { path: 'profile/edit', label: 'Edit Profile', group: 'Main' },
  { path: 'profile/security', label: 'Security', group: 'Main' },

  // Client pages
  { path: 'requests', label: 'Requests', group: 'Client' },
  { path: 'requests/new', label: 'New Request', group: 'Client' },
  { path: 'requests/my-requests', label: 'My Requests', group: 'Client' },
  { path: 'requests/[id]', label: 'Request Detail', group: 'Client', isDynamic: true },
  { path: 'requests/[id]/edit', label: 'Edit Request', group: 'Client', isDynamic: true },
  { path: 'requests/[id]/offers', label: 'Request Offers', group: 'Client', isDynamic: true },
  { path: 'projects', label: 'Projects', group: 'Client' },
  { path: 'projects/[id]', label: 'Project Detail', group: 'Client', isDynamic: true },
  {
    path: 'projects/[id]/milestones',
    label: 'Project Milestones',
    group: 'Client',
    isDynamic: true,
  },

  // Supplier pages
  { path: 'offers', label: 'Offers', group: 'Supplier' },
  { path: 'offers/new', label: 'New Offer', group: 'Supplier' },
  { path: 'offers/[id]', label: 'Offer Detail', group: 'Supplier', isDynamic: true },
  { path: 'offers/[id]/edit', label: 'Edit Offer', group: 'Supplier', isDynamic: true },
  { path: 'portfolio', label: 'Portfolio', group: 'Supplier' },
  { path: 'stats', label: 'Stats', group: 'Supplier' },
  { path: 'supplier-profile/setup', label: 'Profile Setup', group: 'Supplier' },
  { path: 'supplier-profile/edit', label: 'Edit Supplier Profile', group: 'Supplier' },
  { path: 'supplier-projects/[id]', label: 'Supplier Project', group: 'Supplier', isDynamic: true },

  // Admin pages
  { path: 'admin/dashboard', label: 'Admin Dashboard', group: 'Admin' },
  { path: 'admin/users', label: 'Users', group: 'Admin' },
  { path: 'admin/users/[id]', label: 'User Detail', group: 'Admin', isDynamic: true },
  { path: 'admin/categories', label: 'Categories', group: 'Admin' },
  { path: 'admin/categories/new', label: 'New Category', group: 'Admin' },
  { path: 'admin/categories/[id]', label: 'Category Detail', group: 'Admin', isDynamic: true },
  { path: 'admin/categories/[id]/edit', label: 'Edit Category', group: 'Admin', isDynamic: true },
  { path: 'admin/requests', label: 'Requests', group: 'Admin' },
  { path: 'admin/offers', label: 'Offers', group: 'Admin' },
  { path: 'admin/projects', label: 'Projects', group: 'Admin' },
  { path: 'admin/disputes', label: 'Disputes', group: 'Admin' },
  { path: 'admin/disputes/[id]', label: 'Dispute Detail', group: 'Admin', isDynamic: true },
  { path: 'admin/payments', label: 'Payments', group: 'Admin' },
  { path: 'admin/payments/[id]', label: 'Payment Detail', group: 'Admin', isDynamic: true },
  { path: 'admin/reviews', label: 'Reviews', group: 'Admin' },
  { path: 'admin/reviews/new', label: 'New Review', group: 'Admin' },
  { path: 'admin/reviews/[id]', label: 'Review Detail', group: 'Admin', isDynamic: true },
  { path: 'admin/reviews/[id]/edit', label: 'Edit Review', group: 'Admin', isDynamic: true },
  { path: 'admin/reports', label: 'Reports', group: 'Admin' },
  { path: 'admin/analytics', label: 'Analytics', group: 'Admin' },
  { path: 'admin/verification', label: 'Verification', group: 'Admin' },
  { path: 'admin/suppliers', label: 'Suppliers', group: 'Admin' },
  { path: 'admin/settings', label: 'Settings', group: 'Admin' },
];

export default function PageNavigator() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(['Public', 'Auth', 'Main', 'Client', 'Supplier', 'Admin'])
  );
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('dev');

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const toggleGroup = (group: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(group)) {
      newExpanded.delete(group);
    } else {
      newExpanded.add(group);
    }
    setExpandedGroups(newExpanded);
  };

  const navigateToPage = (path: string) => {
    const fullPath = `/${locale}/${path}`;
    router.push(fullPath);
    setIsOpen(false);
  };

  const filteredPages = ALL_PAGES.filter(
    (page) =>
      page.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.group?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedPages = filteredPages.reduce(
    (acc, page) => {
      const group = page.group || 'Other';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(page);
      return acc;
    },
    {} as Record<string, PageRoute[]>
  );

  const isActive = (path: string) => {
    const currentPath = pathname.replace(`/${locale}`, '').replace(/^\//, '');
    if (path === '') {
      return currentPath === '' || currentPath === locale;
    }
    // For dynamic routes, check if the base path matches
    if (path.includes('[')) {
      const basePath = path.split('/[')[0];
      return currentPath.startsWith(basePath);
    }
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110"
        style={{
          backgroundColor: cssVars.primary.DEFAULT,
          color: cssVars.neutral.bg,
        }}
        title={t('pageNavigator')}
      >
        {isOpen ? <X className="h-6 w-6" /> : <ExternalLink className="h-6 w-6" />}
      </button>

      {/* Navigator Panel */}
      {isOpen && (
        <div
          className="fixed right-4 top-4 z-50 flex h-[calc(100vh-2rem)] w-80 flex-col rounded-2xl border-2 shadow-2xl"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between border-b-2 p-4"
            style={{ borderColor: cssVars.neutral.border }}
          >
            <h2 className="text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              📄 Page Navigator
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 transition-colors hover:opacity-80"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search */}
          <div className="border-b-2 p-4" style={{ borderColor: cssVars.neutral.border }}>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: cssVars.neutral.textMuted }}
              />
              <input
                type="text"
                placeholder={t('searchPages')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border-2 px-10 py-2 text-sm focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: cssVars.neutral.bg,
                  borderColor: cssVars.neutral.border,
                  color: cssVars.neutral.DEFAULT,
                }}
              />
            </div>
          </div>

          {/* Pages List */}
          <div className="flex-1 overflow-y-auto p-4">
            {Object.entries(groupedPages).map(([group, pages]) => (
              <div key={group} className="mb-4">
                <button
                  onClick={() => toggleGroup(group)}
                  className="mb-2 flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ color: cssVars.primary.DEFAULT }}
                >
                  <span>{group}</span>
                  {expandedGroups.has(group) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {expandedGroups.has(group) && (
                  <div className="space-y-1">
                    {pages.map((page) => {
                      const active = isActive(page.path);
                      return (
                        <button
                          key={page.path}
                          onClick={() => navigateToPage(page.path)}
                          className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            active ? 'font-semibold' : ''
                          }`}
                          style={{
                            backgroundColor: active
                              ? `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`
                              : 'transparent',
                            color: active ? cssVars.primary.DEFAULT : cssVars.neutral.DEFAULT,
                          }}
                          onMouseEnter={(e) => {
                            if (!active) {
                              e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!active) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span>{page.label}</span>
                            {page.isDynamic && (
                              <span className="text-xs opacity-60">{t('dynamic')}</span>
                            )}
                          </div>
                          {page.path && <div className="mt-1 text-xs opacity-60">{page.path}</div>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {filteredPages.length === 0 && (
              <div
                className="py-8 text-center text-sm"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                {t('noPagesFound')}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="border-t-2 p-3 text-center text-xs"
            style={{
              borderColor: cssVars.neutral.border,
              color: cssVars.neutral.textMuted,
            }}
          >
            <div>{t('totalPages', { count: ALL_PAGES.length })}</div>
            <div className="mt-1">{t('devModeOnly')}</div>
          </div>
        </div>
      )}
    </>
  );
}
