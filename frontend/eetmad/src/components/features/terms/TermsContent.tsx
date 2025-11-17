'use client';

import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';

export default function TermsContent() {
  const t = useTranslations('pages.terms');

  return (
    <div className="prose dark:prose-invert" style={{ color: cssVars.neutral.textSecondary }}>
      <p style={{ color: cssVars.neutral.textSecondary }} className="mb-4">{t('introduction')} </p>

      <h2 className="text-2xl font-semibold mb-3" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('section1Title')}
      </h2>
      <p style={{ color: cssVars.neutral.textSecondary }} className="mb-4">{t('section1Content')}</p>

      <h2 className="text-2xl font-semibold mb-3" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('section2Title')}
      </h2>
      <p style={{ color: cssVars.neutral.textSecondary }} className="mb-4">{t('section2Content')}</p>

      <h2 className="text-2xl font-semibold mb-3" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('section3Title')}
      </h2>
      <p style={{ color: cssVars.neutral.textSecondary }} className="mb-4">{t('section3Content')}</p>

      <h2 className="text-2xl font-semibold mb-3" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('section4Title')}
      </h2>
      <p style={{ color: cssVars.neutral.textSecondary }} className="mb-4">{t('section4Content')}</p>

      <h2 className="text-2xl font-semibold mb-3" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('section5Title')}
      </h2>
      <p style={{ color: cssVars.neutral.textSecondary }} className="mb-4">{t('section5Content')}</p>

      <p style={{ color: cssVars.neutral.textSecondary }} className="mt-6">{t('conclusion')}</p>
    </div>
  );
}
