'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import type { Supplier } from '@/lib/types/supplier.types';
import { cssVars } from '@/styles/theme';
import { CheckCircle, Eye, Shield, ShoppingBag, Star, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SuppliersManagementPage() {
  const t = useTranslations('admin');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Mock data
  const [suppliers] = useState<Supplier[]>([
    {
      id: '1',
      userId: 'user-1',
      businessName: 'شركة التقنية المتطورة',
      serviceDescription: 'نقدم خدمات تقنية متميزة',
      categories: [],
      portfolio: [],
      certifications: [],
      workingHours: {
        monday: { open: '09:00', close: '18:00', closed: false },
        tuesday: { open: '09:00', close: '18:00', closed: false },
        wednesday: { open: '09:00', close: '18:00', closed: false },
        thursday: { open: '09:00', close: '18:00', closed: false },
        friday: { open: '09:00', close: '18:00', closed: false },
        saturday: { open: '10:00', close: '16:00', closed: false },
        sunday: { open: '00:00', close: '00:00', closed: true },
      },
      responseTime: 2,
      acceptanceRate: 92,
      onTimeDelivery: 95,
      isVerified: true,
      verificationDate: null,
      verificationNotes: null,
      createdAt: '2023-01-15',
      updatedAt: '2024-03-20',
      // Backward-compat optional fields
      rating: 4.9,
      totalReviews: 156,
    },
    {
      id: '2',
      userId: 'user-2',
      businessName: 'مكتب التصميم الإبداعي',
      serviceDescription: 'تصاميم احترافية مبتكرة',
      categories: [],
      portfolio: [],
      certifications: [],
      workingHours: {
        monday: { open: '09:00', close: '18:00', closed: false },
        tuesday: { open: '09:00', close: '18:00', closed: false },
        wednesday: { open: '09:00', close: '18:00', closed: false },
        thursday: { open: '09:00', close: '18:00', closed: false },
        friday: { open: '09:00', close: '18:00', closed: false },
        saturday: { open: '10:00', close: '16:00', closed: false },
        sunday: { open: '00:00', close: '00:00', closed: true },
      },
      responseTime: 4,
      acceptanceRate: 88,
      onTimeDelivery: 90,
      isVerified: true,
      verificationDate: null,
      verificationNotes: null,
      createdAt: '2023-06-10',
      updatedAt: '2024-03-19',
      rating: 4.7,
      totalReviews: 78,
    },
  ]);

  const columns = [
    {
      key: 'businessName',
      header: t('suppliers.table.name'),
      render: (supplier: Supplier) => (
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl font-bold"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.accent.primary} 15%, transparent)`,
              color: cssVars.accent.primary,
            }}
          >
            {supplier.businessName?.charAt(0) ?? 'م'}
          </div>
          <div>
            <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {supplier.businessName ?? t('common.noData')}
            </div>
            <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {supplier.serviceDescription}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'rating',
      header: t('suppliers.table.rating'),
      render: (supplier: Supplier) => (
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-current" style={{ color: cssVars.status.warning }} />
          <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {(supplier.rating ?? 0).toFixed(1)}
          </span>
          <span className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
            ({supplier.totalReviews ?? 0})
          </span>
        </div>
      ),
    },
    {
      key: 'portfolio',
      header: t('suppliers.table.projects'),
      render: (supplier: Supplier) => (
        <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {supplier.portfolio.length}
        </span>
      ),
    },
    {
      key: 'onTimeDelivery',
      header: t('suppliers.table.successRate'),
      render: (supplier: Supplier) => (
        <span
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
            color: cssVars.status.success,
          }}
        >
          {supplier.onTimeDelivery}%
        </span>
      ),
    },
    {
      key: 'isVerified',
      header: t('suppliers.table.verified'),
      render: (supplier: Supplier) => (
        <div className="flex items-center gap-1">
          {supplier.isVerified ? (
            <CheckCircle className="h-5 w-5" style={{ color: cssVars.status.success }} />
          ) : (
            <XCircle className="h-5 w-5" style={{ color: cssVars.status.error }} />
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      header: t('suppliers.table.actions'),
      render: (supplier: Supplier) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/suppliers/${supplier.id}`);
            }}
            className="rounded-lg p-2 transition-all hover:bg-opacity-80"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
            }}
          >
            <Eye className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
          </button>
          {!supplier.isVerified && (
            <button
              onClick={(e) => e.stopPropagation()}
              className="rounded-lg p-2 transition-all hover:bg-opacity-80"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 10%, transparent)`,
              }}
            >
              <Shield className="h-4 w-4" style={{ color: cssVars.status.success }} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title={t('suppliers.title')}
        description={t('suppliers.description')}
        icon={ShoppingBag}
      />

      <AdminDataTable
        data={suppliers}
        columns={columns}
        searchPlaceholder={t('suppliers.search')}
        onRowClick={(supplier) => router.push(`/admin/suppliers/${supplier.id}`)}
        isLoading={loading}
        emptyMessage={t('suppliers.empty')}
      />
    </div>
  );
}
