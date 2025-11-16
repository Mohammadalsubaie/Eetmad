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
    { id: 'disputes', icon: AlertTriangle, labelKey: 'nav.disputes', href: '/admin/disputes', badge: 3 },
    { id: 'verification', icon: ShieldCheck, labelKey: 'nav.verification', href: '/admin/verification', badge: 8 },
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
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden rounded-xl p-2 transition-all hover:bg-opacity-80 lg:block"
              style={{ backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)` }}
            >
              <Menu className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl p-2 transition-all hover:bg-opacity-80 lg:hidden"
              style={{ backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)` }}
            >
              <Menu className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            </button>

            <h1 className="text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('title')}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative rounded-xl p-3 transition-all"
              style={{ backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)` }}
            >
              <Bell className="h-5 w-5" style={{ color: cssVars.neutral.textSecondary }} />
              <span
                className="absolute right-2 top-2 h-2 w-2 animate-pulse rounded-full"
                style={{ backgroundColor: cssVars.status.error }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-xl px-4 py-2 transition-all"
              style={{ backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)` }}
            >
              <div
                className="h-8 w-8 rounded-lg"
                style={{ backgroundColor: cssVars.primary.DEFAULT }}
              />
              <ChevronDown className="h-4 w-4" style={{ color: cssVars.neutral.textSecondary }} />
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
              className="hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-e"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <Link key={item.id} href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all ${
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
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span className="font-semibold">{t(item.labelKey)}</span>
                      </div>
                      {item.badge && (
                        <span
                          className="rounded-full px-2 py-0.5 text-xs font-bold"
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
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all"
                  style={{
                    backgroundColor: 'transparent',
                    color: cssVars.status.error,
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-semibold">{t('nav.logout')}</span>
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
                className="fixed inset-0 z-50 bg-black/50 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
                className="fixed right-0 top-0 z-50 h-full w-80 overflow-y-auto lg:hidden"
                style={{
                  backgroundColor: cssVars.neutral.surface,
                }}
              >
                <div className="flex items-center justify-between border-b p-4" style={{ borderColor: cssVars.neutral.border }}>
                  <h2 className="text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {t('title')}
                  </h2>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl p-2"
                    style={{ backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)` }}
                  >
                    <X className="h-5 w-5" style={{ color: cssVars.neutral.textSecondary }} />
                  </button>
                </div>

                <nav className="p-4 space-y-2">
                  {navItems.map((item) => (
                    <Link key={item.id} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <div
                        className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all ${
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
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <span className="font-semibold">{t(item.labelKey)}</span>
                        </div>
                        {item.badge && (
                          <span
                            className="rounded-full px-2 py-0.5 text-xs font-bold"
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
        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
