'use client';

import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Facebook, Globe, Linkedin, Target, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
// for test only
export function Footer() {
  const t = useTranslations('footer');

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Globe, href: '#', label: 'Website' },
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

  return (
    <footer className="pb-10 pt-20" style={{ backgroundColor: cssVars.primary.DEFAULT }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl"
                style={{ background: cssVars.gradient.primary }}
              >
                <Target className="h-7 w-7" style={{ color: cssVars.neutral.bg }} />
              </div>
              <h3 className="text-2xl font-bold" style={{ color: cssVars.neutral.bg }}>
                {t('brandName')}
              </h3>
            </div>
            <p className="mb-6 leading-relaxed" style={{ color: cssVars.neutral.textMuted }}>
              {t('brandDescription')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl transition-all"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${cssVars.neutral.textMuted} 15%, transparent)`,
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" style={{ color: cssVars.neutral.textMuted }} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h4 className="mb-6 text-xl font-bold" style={{ color: cssVars.neutral.bg }}>
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="group text-base transition-all"
                      style={{ color: cssVars.neutral.textMuted }}
                    >
                      <span
                        className="transition-colors group-hover:opacity-100"
                        style={{
                          color: 'inherit',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = cssVars.neutral.bg;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = cssVars.neutral.textMuted;
                        }}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row"
          style={{
            borderColor: `color-mix(in srgb, ${cssVars.neutral.textMuted} 20%, transparent)`,
          }}
        >
          <p style={{ color: cssVars.neutral.textMuted }}>{t('copyright')}</p>
          <div className="flex gap-6">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/terms"
                className="text-sm transition-all"
                style={{ color: cssVars.neutral.textMuted }}
              >
                <span
                  className="transition-colors"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = cssVars.neutral.bg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = cssVars.neutral.textMuted;
                  }}
                >
                  {t('termsAndConditions')}
                </span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/privacy"
                className="text-sm transition-all"
                style={{ color: cssVars.neutral.textMuted }}
              >
                <span
                  className="transition-colors"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = cssVars.neutral.bg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = cssVars.neutral.textMuted;
                  }}
                >
                  {t('privacyPolicy')}
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
