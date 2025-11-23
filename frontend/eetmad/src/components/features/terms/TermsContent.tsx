'use client';

import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';

export default function TermsContent() {
  const t = useTranslations('pages.terms');

  return (
    <div className="prose dark:prose-invert">
      <p style={{ color: cssVars.neutral.darker }} className="mb-4">
        {t('introduction')}{' '}
      </p>

      <h2 className="mb-3 text-2xl font-semibold" style={{ color: cssVars.neutral.darker }}>
        {t('section1Title')}
      </h2>
      <p style={{ color: cssVars.neutral.dark }} className="mb-4">
        {t('section1Content')}
      </p>

      <h2 className="mb-3 text-2xl font-semibold" style={{ color: cssVars.neutral.darker }}>
        {t('section2Title')}
      </h2>
      <p style={{ color: cssVars.neutral.dark }} className="mb-4">
        {t('section2Content')}
      </p>

      <h2 className="mb-3 text-2xl font-semibold" style={{ color: cssVars.neutral.darker }}>
        {t('section3Title')}
      </h2>
      <p style={{ color: cssVars.neutral.dark }} className="mb-4">
        {t('section3Content')}
      </p>

      <h2 className="mb-3 text-2xl font-semibold" style={{ color: cssVars.neutral.darker }}>
        {t('section4Title')}
      </h2>
      <p style={{ color: cssVars.neutral.dark }} className="mb-4">
        {t('section4Content')}
      </p>

      <h2 className="mb-3 text-2xl font-semibold" style={{ color: cssVars.neutral.darker }}>
        {t('section5Title')}
      </h2>
      <p style={{ color: cssVars.neutral.dark }} className="mb-4">
        {t('section5Content')}
      </p>

      <p style={{ color: cssVars.neutral.dark }} className="mt-6">
        {t('conclusion')}
      </p>
    </div>
  );
}
