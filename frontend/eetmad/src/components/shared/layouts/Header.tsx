'use client';

import { LanguageSwitcher } from '@/components/shared/misc/LanguageSwitcher';
import { ThemeToggle } from '@/components/shared/misc/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Bell, Menu, Sparkles, Target, User, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [hasNotifications] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const navItems = [
    { key: 'home', href: '/', disabled: false },
    { key: 'about', href: '/about', disabled: false },
    { key: 'categories', href: '/categories', disabled: false },
    { key: 'suppliers', href: '/suppliers', disabled: false },
    { key: 'contact', href: '/contact', disabled: false },
    { key: 'projects', href: '/projects', disabled: true },
    { key: 'organizations', href: '/organizations', disabled: true },
    { key: 'resources', href: '/resources', disabled: true },
    { key: 'support', href: '/support', disabled: true },
  ];

  // Helper function to check if a nav item is active
  const isActive = (href: string) => {
    // Remove locale from pathname for comparison
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    // For home, check if path is exactly '/' or just the locale
    if (href === '/') {
      return pathWithoutLocale === '/' || pathname === `/${locale}`;
    }
    // For other routes, check if pathname starts with the href
    return pathWithoutLocale === href || pathWithoutLocale.startsWith(`${href}/`);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-lg"
      style={{
        backgroundColor: isDark
          ? `color-mix(in srgb, ${cssVars.neutral.background} 85%, transparent)`
          : `color-mix(in srgb, ${cssVars.primary.DEFAULT} 95%, transparent)`,
        borderColor: isDark
          ? `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`
          : `color-mix(in srgb, ${cssVars.neutral.border} 20%, transparent)`,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <div
                className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl shadow-lg"
                style={{ background: cssVars.gradient.primary }}
              >
                <Sparkles
                  className="absolute h-6 w-6"
                  style={{ color: cssVars.accent.warm, opacity: 0.3 }}
                />
                <Target
                  className="relative z-10 h-6 w-6"
                  style={{ color: isDark ? cssVars.neutral.surface : cssVars.neutral.bg }}
                />
              </div>
            </motion.div>
            <div>
              <h1
                className="text-xl font-bold"
                style={{ color: isDark ? cssVars.neutral.darker : cssVars.neutral.bg }}
              >
                {t('brandName')}
              </h1>
              <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                {t('brandTagline')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems
              .filter((item) => !item.disabled)
              .map((item) => {
                const active = isActive(item.href);
                return (
                  <Link key={item.key} href={item.href}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-xl px-5 py-2.5 font-semibold transition-all"
                      style={{
                        color: active ? cssVars.accent.warm : cssVars.neutral.textMuted,
                        backgroundColor: active
                          ? `color-mix(in srgb, ${cssVars.accent.warm} 10%, transparent)`
                          : 'transparent',
                      }}
                    >
                      {t(item.key)}
                    </motion.button>
                  </Link>
                );
              })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <LanguageSwitcher />

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="relative rounded-xl p-3 transition-all"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.neutral.textMuted} 15%, transparent)`,
              }}
              aria-label={t('notifications')}
            >
              <Bell className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
              {hasNotifications && (
                <span
                  className="absolute end-2 top-2 h-2 w-2 animate-pulse rounded-full"
                  style={{ backgroundColor: cssVars.accent.primary }}
                />
              )}
            </motion.button>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 rounded-xl px-6 py-3 font-bold shadow-lg transition-all"
                style={{
                  background: cssVars.gradient.gold,
                  color: cssVars.secondary.DEFAULT,
                }}
              >
                <User className="h-5 w-5" />
                <span>{t('myAccount')}</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="rounded-xl p-3"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.neutral.textMuted} 15%, transparent)`,
              }}
              aria-label={t('menu')}
            >
              {showMobileMenu ? (
                <X className="h-6 w-6" style={{ color: cssVars.neutral.textMuted }} />
              ) : (
                <Menu className="h-6 w-6" style={{ color: cssVars.neutral.textMuted }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border-t py-4 lg:hidden"
            style={{
              borderColor: isDark
                ? `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`
                : `color-mix(in srgb, ${cssVars.neutral.border} 20%, transparent)`,
            }}
          >
            <div className="space-y-2">
              {navItems
                .filter((item) => !item.disabled)
                .map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link key={item.key} href={item.href}>
                      <button
                        className="w-full rounded-xl px-4 py-3 text-start font-semibold transition-all hover:bg-opacity-10"
                        style={{
                          color: active
                            ? cssVars.accent.warm
                            : isDark
                              ? cssVars.neutral.darker
                              : cssVars.neutral.bg,
                          backgroundColor: active
                            ? `color-mix(in srgb, ${cssVars.accent.warm} 10%, transparent)`
                            : isDark
                              ? `color-mix(in srgb, ${cssVars.neutral.textMuted} 10%, transparent)`
                              : `color-mix(in srgb, ${cssVars.neutral.textMuted} 5%, transparent)`,
                        }}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        {t(item.key)}
                      </button>
                    </Link>
                  );
                })}

              <Link href="/login">
                <button
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-bold shadow-lg transition-all"
                  style={{
                    background: cssVars.gradient.gold,
                    color: cssVars.secondary.DEFAULT,
                  }}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <User className="h-5 w-5" />
                  <span>{t('myAccount')}</span>
                </button>
              </Link>
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
}
