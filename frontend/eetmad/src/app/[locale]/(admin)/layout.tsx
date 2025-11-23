'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  FileText,
  Briefcase,
  AlertTriangle,
  ShieldCheck,
  FolderTree,
  CreditCard,
  Star,
  Flag,
  Settings,
  BarChart3,
  Menu,
  X,
  Bell,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  id: string;
  icon: typeof LayoutDashboard;
  labelKey: string;
  href: string;
  badge?: number;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('admin');
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'dashboard', icon: LayoutDashboard, labelKey: 'nav.dashboard', href: '/admin/dashboard' },
    { id: 'users', icon: Users, labelKey: 'nav.users', href: '/admin/users' },
    { id: 'suppliers', icon: ShoppingBag, labelKey: 'nav.suppliers', href: '/admin/suppliers' },
    { id: 'requests', icon: FileText, labelKey: 'nav.requests', href: '/admin/requests' },
    { id: 'offers', icon: Briefcase, labelKey: 'nav.offers', href: '/admin/offers' },
    { id: 'projects', icon: Briefcase, labelKey: 'nav.projects', href: '/admin/projects' },
    {
      id: 'disputes',
      icon: AlertTriangle,
      labelKey: 'nav.disputes',
      href: '/admin/disputes',
      badge: 3,
    },
    {
      id: 'verification',
      icon: ShieldCheck,
      labelKey: 'nav.verification',
      href: '/admin/verification',
      badge: 8,
    },
    { id: 'categories', icon: FolderTree, labelKey: 'nav.categories', href: '/admin/categories' },
    { id: 'payments', icon: CreditCard, labelKey: 'nav.payments', href: '/admin/payments' },
    { id: 'reviews', icon: Star, labelKey: 'nav.reviews', href: '/admin/reviews' },
    { id: 'reports', icon: Flag, labelKey: 'nav.reports', href: '/admin/reports', badge: 5 },
    { id: 'analytics', icon: BarChart3, labelKey: 'nav.analytics', href: '/admin/analytics' },
    { id: 'settings', icon: Settings, labelKey: 'nav.settings', href: '/admin/settings' },
  ];

  const isActive = (href: string) => pathname?.includes(href);

  return (
    <div className="min-h-screen" style={{ backgroundColor: cssVars.neutral.bg }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-lg"
        style={{
          backgroundColor: `color-mix(in srgb, ${cssVars.neutral.surface} 95%, transparent)`,
          borderColor: cssVars.neutral.border,
        }}
      >
        <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 lg:px-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden rounded-xl p-2.5 transition-all hover:bg-opacity-80 active:scale-95 touch-manipulation lg:block"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                minWidth: '44px',
                minHeight: '44px',
              }}
            >
              <Menu className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl p-2.5 transition-all hover:bg-opacity-80 active:scale-95 touch-manipulation lg:hidden"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                minWidth: '44px',
                minHeight: '44px',
              }}
            >
              <Menu className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            </button>

            <h1 className="text-lg sm:text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('title')}
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative rounded-xl p-2.5 sm:p-3 transition-all touch-manipulation active:scale-95"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
                minWidth: '44px',
                minHeight: '44px',
              }}
            >
              <Bell className="h-5 w-5 sm:h-5 sm:w-5" style={{ color: cssVars.neutral.textSecondary }} />
              <span
                className="absolute right-1.5 top-1.5 sm:right-2 sm:top-2 h-2 w-2 sm:h-2.5 sm:w-2.5 animate-pulse rounded-full ring-2 ring-white"
                style={{ backgroundColor: cssVars.status.error }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-4 py-2.5 transition-all touch-manipulation active:scale-95"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
                minWidth: '44px',
                minHeight: '44px',
              }}
            >
              <div
                className="h-8 w-8 sm:h-8 sm:w-8 rounded-lg flex-shrink-0"
                style={{ backgroundColor: cssVars.primary.DEFAULT }}
              />
              <ChevronDown className="hidden sm:block h-4 w-4 flex-shrink-0" style={{ color: cssVars.neutral.textSecondary }} />
            </motion.button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="sticky top-16 hidden h-[calc(100vh-4rem)] overflow-y-auto border-e lg:block"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <nav className="space-y-2 p-2 sm:p-4">
                {navItems.map((item) => (
                  <Link key={item.id} href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-center justify-between rounded-xl px-3 sm:px-4 py-3 sm:py-3 transition-all touch-manipulation active:scale-[0.98] min-h-[44px] ${
                        isActive(item.href) ? 'shadow-md' : ''
                      }`}
                      style={{
                        backgroundColor: isActive(item.href)
                          ? cssVars.primary.DEFAULT
                          : 'transparent',
                        color: isActive(item.href)
                          ? cssVars.neutral.surface
                          : cssVars.neutral.textSecondary,
                      }}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-sm sm:text-base font-semibold">{t(item.labelKey)}</span>
                      </div>
                      {item.badge && (
                        <span
                          className="rounded-full px-1.5 sm:px-2 py-0.5 text-xs font-bold"
                          style={{
                            backgroundColor: cssVars.status.error,
                            color: cssVars.neutral.surface,
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  </Link>
                ))}

                <motion.button
                  whileHover={{ x: 4 }}
                  className="flex w-full items-center gap-2 sm:gap-3 rounded-xl px-3 sm:px-4 py-3 sm:py-3 transition-all touch-manipulation active:scale-[0.98] min-h-[44px]"
                  style={{
                    backgroundColor: 'transparent',
                    color: cssVars.status.error,
                  }}
                >
                  <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base font-semibold">{t('nav.logout')}</span>
                </motion.button>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden touch-none"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed right-0 top-0 z-50 h-full w-[85vw] max-w-sm sm:w-80 overflow-y-auto lg:hidden shadow-2xl"
                style={{
                  backgroundColor: cssVars.neutral.surface,
                  boxShadow: `0 0 20px color-mix(in srgb, ${cssVars.neutral.darker} 30%, transparent)`,
                }}
              >
                <div
                  className="flex items-center justify-between border-b p-3 sm:p-4"
                  style={{ borderColor: cssVars.neutral.border }}
                >
                  <h2 className="text-base sm:text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {t('title')}
                  </h2>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl p-2.5 touch-manipulation active:scale-95 transition-all"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
                      minWidth: '44px',
                      minHeight: '44px',
                    }}
                  >
                    <X className="h-5 w-5" style={{ color: cssVars.neutral.textSecondary }} />
                  </button>
                </div>

                <nav className="space-y-2 p-3 sm:p-4">
                  {navItems.map((item) => (
                    <Link key={item.id} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <div
                        className={`flex items-center justify-between rounded-xl px-3 sm:px-4 py-3 sm:py-3 transition-all touch-manipulation active:scale-[0.98] min-h-[44px] ${
                          isActive(item.href) ? 'shadow-md' : ''
                        }`}
                        style={{
                          backgroundColor: isActive(item.href)
                            ? cssVars.primary.DEFAULT
                            : 'transparent',
                          color: isActive(item.href)
                            ? cssVars.neutral.surface
                            : cssVars.neutral.textSecondary,
                        }}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <item.icon className="h-5 w-5" />
                          <span className="text-sm sm:text-base font-semibold">{t(item.labelKey)}</span>
                        </div>
                        {item.badge && (
                          <span
                            className="rounded-full px-1.5 sm:px-2 py-0.5 text-xs font-bold"
                            style={{
                              backgroundColor: cssVars.status.error,
                              color: cssVars.neutral.surface,
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
