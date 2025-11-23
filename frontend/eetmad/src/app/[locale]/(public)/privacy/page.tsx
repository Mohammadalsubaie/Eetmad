'use client';

import { cssVars } from '@/styles/theme';
import { useTranslations, useLocale } from 'next-intl';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function PrivacyPage() {
  const t = useTranslations('pages');
  const locale = useLocale();

  return (
    <div className="container mx-auto px-4 py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: t('privacy.title') }]} className="mb-6" />

      <h1 style={{ color: cssVars.secondary.DEFAULT }}>{t('privacy.title')}</h1>
      <div className="container mx-auto px-4 py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <h2 className="mb-6 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('privacy.introduction.title')}
        </h2>
        <p className="mb-4" style={{ color: cssVars.neutral.dark }}>
          {t('privacy.introduction.paragraph1')}
        </p>
        <p className="mb-8" style={{ color: cssVars.neutral.dark }}>
          {t('privacy.introduction.paragraph2')}
        </p>

        <h3 className="mb-4 text-2xl font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('privacy.dataCollection.title')}
        </h3>
        <p className="mb-4" style={{ color: cssVars.neutral.dark }}>
          {t('privacy.dataCollection.paragraph1')}
        </p>
        <ul className="mb-8 list-inside list-disc pl-5">
          <li style={{ color: cssVars.neutral.dark }}>{t('privacy.dataCollection.item1')}</li>
          <li style={{ color: cssVars.neutral.dark }}>{t('privacy.dataCollection.item2')}</li>
          <li style={{ color: cssVars.neutral.dark }}>{t('privacy.dataCollection.item3')}</li>
        </ul>

        <h3 className="mb-4 text-2xl font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('privacy.dataUsage.title')}
        </h3>
        <p className="mb-8" style={{ color: cssVars.neutral.dark }}>
          {t('privacy.dataUsage.paragraph1')}
        </p>

        <h3 className="mb-4 text-2xl font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('privacy.userRights.title')}
        </h3>
        <p className="mb-8" style={{ color: cssVars.neutral.dark }}>
          {t('privacy.userRights.paragraph1')}
        </p>

        <h3 className="mb-4 text-2xl font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('privacy.changes.title')}
        </h3>
        <p className="mb-8" style={{ color: cssVars.neutral.dark }}>
          {t('privacy.changes.paragraph1')}
        </p>

        <h3 className="mb-4 text-2xl font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('privacy.contact.title')}
        </h3>
        <p className="mb-4" style={{ color: cssVars.neutral.dark }}>
          {t('privacy.contact.paragraph1')}
        </p>
      </div>
    </div>
  );
}
