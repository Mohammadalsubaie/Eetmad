'use client';

import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', fullName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', fullName: 'العربية' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;

    startTransition(() => {
      // Remove current locale from pathname and add new one
      const pathWithoutLocale = pathname.replace(`/${locale}`, '');
      const newPath = `/${newLocale}${pathWithoutLocale}`;
      router.push(newPath);
    });
  };

  const otherLang = languages.find((lang) => lang.code !== locale);

  return (
    <div className="relative inline-block">
      <motion.button
        onClick={() => otherLang && handleLanguageChange(otherLang.code)}
        disabled={isPending}
        className="relative flex h-10 items-center gap-2 rounded-full px-4 shadow-sm disabled:opacity-50"
        style={{
          background: cssVars.gradient.gold,
          border: `1px solid ${cssVars.neutral.border}`,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${otherLang?.fullName}`}
      >
        {/* Globe icon */}
        <motion.div
          animate={{
            rotate: isPending ? 360 : 0,
          }}
          transition={{
            duration: isPending ? 1 : 0,
            repeat: isPending ? Infinity : 0,
            ease: 'linear',
          }}
        >
          <Globe className="h-4 w-4" style={{ color: cssVars.secondary.DEFAULT }} />
        </motion.div>

        {/* Language text - shows the OTHER language (what you'll switch to) */}
        <span
          className="text-sm font-bold"
          style={{
            color: cssVars.secondary.DEFAULT,
          }}
        >
          {otherLang?.nativeName}
        </span>
      </motion.button>
    </div>
  );
}
