'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { easing } from '@/lib/theme/animation-standards';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowUp, Facebook, Globe, Linkedin, Target, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Footer() {
  const t = useTranslations('footer');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#0A66C2' },
    { icon: Twitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
    { icon: Facebook, href: '#', label: 'Facebook', color: '#1877F2' },
    { icon: Globe, href: '#', label: 'Website', color: cssVars.primary.DEFAULT },
  ];

  const footerSections = [
    {
      title: t('quickLinks.title'),
      links: [
        { label: t('quickLinks.projects'), href: '/projects' },
        { label: t('quickLinks.organizations'), href: '/organizations' },
        { label: t('quickLinks.resources'), href: '/resources' },
        { label: t('quickLinks.pricing'), href: '/pricing' },
      ],
    },
    {
      title: t('support.title'),
      links: [
        { label: t('support.help'), href: '/help' },
        { label: t('support.faq'), href: '/faq' },
        { label: t('support.contact'), href: '/contact' },
        { label: t('support.terms'), href: '/terms' },
      ],
    },
    {
      title: t('info.title'),
      links: [
        { label: t('info.about'), href: '/about' },
        { label: t('info.privacy'), href: '/privacy' },
        { label: t('info.security'), href: '/security' },
        { label: t('info.careers'), href: '/careers' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easing.easeIn },
    },
  };

  const isAdminPage = pathname?.includes('/admin');
  if (isAdminPage) {
    return null;
  }
  return (
    <footer
      role="contentinfo"
      className="relative overflow-hidden pb-10 pt-20"
      style={{ backgroundColor: isDark ? cssVars.neutral.background : cssVars.primary.DEFAULT }}
    >
      {/* Decorative background gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${cssVars.primary.light} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${cssVars.secondary.DEFAULT} 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="mb-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section - Enhanced */}
          <motion.div variants={itemVariants}>
            <div className="mb-6 flex items-center gap-3">
              <motion.div
                className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl"
                style={{ background: cssVars.gradient.primary }}
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Target
                  className="h-7 w-7"
                  style={{ color: isDark ? cssVars.neutral.surface : cssVars.neutral.bg }}
                  aria-hidden="true"
                />
              </motion.div>
              <h3
                className="text-2xl font-bold"
                style={{ color: isDark ? cssVars.neutral.darker : cssVars.neutral.bg }}
              >
                {t('brandName')}
              </h3>
            </div>
            <p
              className="mb-6 text-sm leading-relaxed"
              style={{
                color: isDark ? cssVars.neutral.textSecondary : cssVars.neutral.bg,
                opacity: isDark ? 1 : 0.9,
              }}
            >
              {t('brandDescription')}
            </p>

            {/* Enhanced Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  className="group relative flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center overflow-hidden rounded-xl transition-all"
                  style={{
                    backgroundColor: isDark
                      ? `color-mix(in srgb, ${cssVars.neutral.textMuted} 15%, transparent)`
                      : `color-mix(in srgb, ${cssVars.neutral.bg} 20%, transparent)`,
                  }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDark
                      ? `color-mix(in srgb, ${social.color} 20%, transparent)`
                      : `color-mix(in srgb, ${cssVars.neutral.bg} 40%, transparent)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDark
                      ? `color-mix(in srgb, ${cssVars.neutral.textMuted} 15%, transparent)`
                      : `color-mix(in srgb, ${cssVars.neutral.bg} 20%, transparent)`;
                  }}
                >
                  <social.icon
                    className="relative z-10 h-5 w-5 transition-colors"
                    style={{
                      color: isDark ? cssVars.neutral.textMuted : cssVars.neutral.bg,
                    }}
                    aria-hidden="true"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Sections - Enhanced with stagger animation */}
          {footerSections.map((section, idx) => (
            <motion.nav key={idx} variants={itemVariants} aria-labelledby={`footer-section-${idx}`}>
              <h4
                id={`footer-section-${idx}`}
                className="relative mb-6 inline-block text-lg font-bold"
                style={{ color: isDark ? cssVars.neutral.darker : cssVars.neutral.bg }}
              >
                {section.title}
                <motion.span
                  className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r"
                  style={{
                    backgroundImage: cssVars.gradient.primary,
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '30px' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                />
              </h4>
              <ul className="space-y-3" role="list">
                {section.links.map((link, i) => (
                  <motion.li
                    key={i}
                    role="listitem"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="group relative flex min-h-[44px] items-center py-1 text-sm transition-all"
                      style={{
                        color: isDark ? cssVars.neutral.textSecondary : cssVars.neutral.bg,
                        opacity: isDark ? 1 : 0.9,
                      }}
                      aria-label={link.label}
                    >
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 w-0 transition-all"
                        style={{
                          background: cssVars.gradient.primary,
                        }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                      <span
                        className="transition-all"
                        style={{
                          color: 'inherit',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = isDark
                            ? cssVars.neutral.darker
                            : cssVars.neutral.bg;
                          e.currentTarget.style.opacity = '1';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = isDark
                            ? cssVars.neutral.textSecondary
                            : cssVars.neutral.bg;
                          e.currentTarget.style.opacity = isDark ? '1' : '0.9';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>

        {/* Bottom Bar - Enhanced */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row"
          style={{
            borderColor: isDark
              ? `color-mix(in srgb, ${cssVars.neutral.textMuted} 20%, transparent)`
              : `color-mix(in srgb, ${cssVars.neutral.bg} 30%, transparent)`,
          }}
        >
          <p
            className="text-sm"
            style={{
              color: isDark ? cssVars.neutral.textSecondary : cssVars.neutral.bg,
              opacity: isDark ? 1 : 0.8,
            }}
          >
            {t('copyright')}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="group relative flex min-h-[44px] items-center text-sm transition-all"
              style={{
                color: isDark ? cssVars.neutral.textSecondary : cssVars.neutral.bg,
                opacity: isDark ? 1 : 0.9,
              }}
              aria-label={t('termsAndConditions')}
            >
              <span
                className="transition-all"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDark
                    ? cssVars.neutral.darker
                    : cssVars.neutral.bg;
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDark
                    ? cssVars.neutral.textSecondary
                    : cssVars.neutral.bg;
                  e.currentTarget.style.opacity = isDark ? '1' : '0.9';
                }}
              >
                {t('termsAndConditions')}
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-px"
                style={{ background: cssVars.gradient.primary }}
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            <Link
              href="/privacy"
              className="group relative flex min-h-[44px] items-center text-sm transition-all"
              style={{
                color: isDark ? cssVars.neutral.textSecondary : cssVars.neutral.bg,
                opacity: isDark ? 1 : 0.9,
              }}
              aria-label={t('privacyPolicy')}
            >
              <span
                className="transition-all"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDark
                    ? cssVars.neutral.darker
                    : cssVars.neutral.bg;
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDark
                    ? cssVars.neutral.textSecondary
                    : cssVars.neutral.bg;
                  e.currentTarget.style.opacity = isDark ? '1' : '0.9';
                }}
              >
                {t('privacyPolicy')}
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-px"
                style={{ background: cssVars.gradient.primary }}
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-2xl backdrop-blur-sm"
        style={{
          background: cssVars.gradient.primary,
          opacity: showScrollTop ? 1 : 0,
          pointerEvents: showScrollTop ? 'auto' : 'none',
        }}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUp
          className="h-5 w-5"
          style={{ color: isDark ? cssVars.neutral.surface : cssVars.neutral.bg }}
          aria-hidden="true"
        />
      </motion.button>
    </footer>
  );
}
