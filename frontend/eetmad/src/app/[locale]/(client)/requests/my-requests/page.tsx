'use client';

import RequestsList from '@/components/features/requests/RequestsList';
import { Button } from '@/components/ui';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function MyRequestsPage() {
  const t = useTranslations('pages.requests');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[{ label: t('title'), href: `/${locale}/requests` }, { label: 'My requests' }]}
        className="mb-6"
      />

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('myRequests')}
          </h1>
          <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
            {t('myRequestsSubtitle')}
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => router.push('/requests/new')}
            className="flex items-center gap-2"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            <Plus className="h-5 w-5" />
            {t('createRequest')}
          </Button>
        </motion.div>
      </div>

      {/* My Requests List */}
      <RequestsList showMyRequests={true} />
    </div>
  );
}
