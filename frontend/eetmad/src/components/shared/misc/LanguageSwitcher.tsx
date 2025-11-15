'use client';

import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
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

  const otherLanguage = languages.find((lang) => lang.code !== locale);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => otherLanguage && handleLanguageChange(otherLanguage.code)}
        disabled={isPending}
        className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 transition-colors hover:bg-accent disabled:opacity-50"
        aria-label="Switch language"
      >
        <Globe className="text-foreground h-5 w-5" />
        <span className="text-foreground text-sm font-medium">{otherLanguage?.nativeName}</span>
      </button>
    </div>
  );
}
