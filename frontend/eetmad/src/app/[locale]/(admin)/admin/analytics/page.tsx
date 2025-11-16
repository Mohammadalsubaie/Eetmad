'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Download,
  Calendar,
} from 'lucide-react';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import AdminStatCard from '@/components/shared/admin/AdminStatCard';
import AdminActionButton from '@/components/shared/admin/AdminActionButton';

export default function AnalyticsPage() {
  const t = useTranslations('admin');

  return (
    <div>
      <AdminPageHeader
        title={t('analytics.title')}
        description={t('analytics.description')}
        icon={BarChart3}
        action={
          <div className="flex gap-3">
            <AdminActionButton
              label={t('analytics.actions.selectPeriod')}
              icon={Calendar}
              variant="secondary"
            />
            <AdminActionButton
              label={t('analytics.actions.exportReport')}
              icon={Download}
              variant="primary"
            />
          </div>
        }
      />

      {/* Key Metrics */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          title="إجمالي المستخدمين"
          value="1,247"
          change="+12%"
          trend="up"
          icon={Users}
          color={cssVars.primary.DEFAULT}
        />
        <AdminStatCard
          title="إجمالي الإيرادات"
          value="2.8M ر.س"
          change="+18%"
          trend="up"
          icon={DollarSign}
          color={cssVars.status.success}
        />
        <AdminStatCard
          title={t('analytics.stats.activeProjects')}
          value="156"
          change="+24%"
          trend="up"
          icon={Activity}
          color={cssVars.status.info}
        />
        <AdminStatCard
          title={t('analytics.stats.growthRate')}
          value="94.5%"
          change="+5%"
          trend="up"
          icon={TrendingUp}
          color={cssVars.accent.primary}
        />
      </div>

      {/* Charts Placeholders */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border-2 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h3 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            نمو المستخدمين
          </h3>
          <div
            className="flex h-64 items-center justify-center rounded-xl"
            style={{ backgroundColor: cssVars.neutral.bg }}
          >
            <p style={{ color: cssVars.neutral.textMuted }}>مخطط نمو المستخدمين</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border-2 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h3 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            الإيرادات الشهرية
          </h3>
          <div
            className="flex h-64 items-center justify-center rounded-xl"
            style={{ backgroundColor: cssVars.neutral.bg }}
          >
            <p style={{ color: cssVars.neutral.textMuted }}>مخطط الإيرادات</p>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border-2 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h3 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            توزيع المشاريع حسب الفئة
          </h3>
          <div
            className="flex h-64 items-center justify-center rounded-xl"
            style={{ backgroundColor: cssVars.neutral.bg }}
          >
            <p style={{ color: cssVars.neutral.textMuted }}>مخطط دائري للفئات</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border-2 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h3 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            معدل إتمام المشاريع
          </h3>
          <div
            className="flex h-64 items-center justify-center rounded-xl"
            style={{ backgroundColor: cssVars.neutral.bg }}
          >
            <p style={{ color: cssVars.neutral.textMuted }}>مخطط معدل الإتمام</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
