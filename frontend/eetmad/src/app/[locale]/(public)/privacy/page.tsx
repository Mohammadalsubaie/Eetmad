'use client';

import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';

export default function PrivacyPage() {
  const t = useTranslations('pages');

  return (
    <div>
      <h1 style={{ color: cssVars.primary.DEFAULT }}>{t('privacy.title')}</h1>
      <div className="container mx-auto py-8 px-4" style={{ backgroundColor: cssVars.neutral.bg, color: cssVars.secondary.DEFAULT }}>
        <h2 className="text-3xl font-bold mb-6" style={{ color: cssVars.primary.DEFAULT }}>{t('privacy.introduction.title')}</h2>
        <p className="mb-4" style={{ color: cssVars.primary.DEFAULT }}>{t('privacy.introduction.paragraph1')}</p>
        <p className="mb-8"style={{ color: cssVars.primary.DEFAULT }}>{t('privacy.introduction.paragraph2')}</p>

        <h3 className="text-2xl font-semibold mb-4" style={{ color: cssVars.primary.DEFAULT }}>{t('privacy.dataCollection.title')}</h3>
        <p className="mb-4" style={{ color: cssVars.primary.DEFAULT }}>{t('privacy.dataCollection.paragraph1')}</p>
        <ul className="list-disc list-inside mb-8 pl-5">
          <li>{t('privacy.dataCollection.item1')}</li>
          <li>{t('privacy.dataCollection.item2')}</li>
          <li>{t('privacy.dataCollection.item3')}</li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4" style={{ color: cssVars.primary.DEFAULT }}>{t('privacy.dataUsage.title')}</h3>
        <p className="mb-8"style={{ color: cssVars.primary.DEFAULT }}>{t('privacy.dataUsage.paragraph1')}</p>

        <h3 className="text-2xl font-semibold mb-4" style={{ color: cssVars.primary.DEFAULT }}>{t('privacy.userRights.title')}</h3>
        <p className="mb-8"style={{ color: cssVars.primary.DEFAULT }}>{t('privacy.userRights.paragraph1')}</p>

        <h3 className="text-2xl font-semibold mb-4" style={{ color: cssVars.primary.DEFAULT }}>{t('privacy.changes.title')}</h3>
        <p className="mb-8"style={{ color: cssVars.primary.DEFAULT }}>{t('privacy.changes.paragraph1')}</p>

        <h3 className="text-2xl font-semibold mb-4" style={{ color: cssVars.primary.DEFAULT }}>{t('privacy.contact.title')}</h3>
        <p className="mb-4"style={{ color: cssVars.primary.DEFAULT }}>{t('privacy.contact.paragraph1')}</p>
      </div>
    </div>
  );
}
