'use client';

import AdminActionButton from '@/components/shared/admin/AdminActionButton';
import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import StatusBadge from '@/components/shared/badges/StatusBadge';
import { adminApi } from '@/lib/api/admin';
import type { User } from '@/lib/types/user.types';
import { cssVars } from '@/styles/theme';
import { Ban, CheckCircle, Download, Eye, Mail, Plus, Shield, Users, XCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function AdminUsersPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await adminApi.getUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Old inline mock data removed - now using API
  /*
  const [users] = useState<User[]>([
    {
      id: '1',
      fullName: 'أحمد محمد السعيد',
      email: 'ahmed.saeed@example.com',
      phone: '+966501234567',
      userType: 'client',
      status: 'active',
      isEmailVerified: true,
      isPhoneVerified: true,
      avatar: '',
      dateOfBirth: null,
      nationalId: null,
      companyName: null,
      commercialRegister: null,
      taxNumber: null,
      averageRating: 4.8,
      totalReviews: 24,
      completedProjects: 12,
      walletBalance: 15000,
      address: {},
      notificationPreferences: {},
      createdAt: '2024-01-15',
      updatedAt: '2024-03-20',
      lastLoginAt: '2024-03-20',
    },
    {
      id: '2',
      fullName: 'شركة التقنية المتطورة',
      email: 'info@techco.sa',
      phone: '+966507654321',
      userType: 'supplier',
      status: 'active',
      isEmailVerified: true,
      isPhoneVerified: true,
      avatar: '',
      dateOfBirth: null,
      nationalId: null,
      companyName: 'شركة التقنية المتطورة',
      commercialRegister: '1234567890',
      taxNumber: '123456789012345',
      averageRating: 4.9,
      totalReviews: 156,
      completedProjects: 89,
      walletBalance: 250000,
      address: {},
      notificationPreferences: {},
      createdAt: '2023-06-10',
      updatedAt: '2024-03-19',
      lastLoginAt: '2024-03-19',
    },
    {
      id: '3',
      fullName: 'سارة أحمد الزهراني',
      email: 'sara.z@example.com',
      phone: '+966509876543',
      userType: 'client',
      status: 'suspended',
      isEmailVerified: true,
      isPhoneVerified: false,
      avatar: '',
      dateOfBirth: null,
      nationalId: null,
      companyName: null,
      commercialRegister: null,
      taxNumber: null,
      averageRating: 3.5,
      totalReviews: 8,
      completedProjects: 3,
      walletBalance: 5000,
      address: {},
      notificationPreferences: {},
      createdAt: '2024-02-20',
      updatedAt: '2024-03-15',
      lastLoginAt: '2024-03-10',
    },
  ]);
  */

  const columns = [
    {
      key: 'fullName',
      header: t('users.table.name'),
      render: (user: User) => (
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl font-bold"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
              color: cssVars.primary.DEFAULT,
            }}
          >
            {user.fullName.charAt(0)}
          </div>
          <div>
            <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {user.fullName}
            </div>
            <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {user.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'userType',
      header: t('users.table.type'),
      render: (user: User) => (
        <span
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor:
              user.userType === 'supplier'
                ? `color-mix(in srgb, ${cssVars.accent.primary} 15%, transparent)`
                : user.userType === 'admin'
                  ? `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`
                  : `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
            color:
              user.userType === 'supplier'
                ? cssVars.accent.primary
                : user.userType === 'admin'
                  ? cssVars.status.warning
                  : cssVars.primary.DEFAULT,
          }}
        >
          {user.userType === 'supplier' ? 'مورد' : user.userType === 'admin' ? 'مسؤول' : 'عميل'}
        </span>
      ),
    },
    {
      key: 'status',
      header: t('users.table.status'),
      render: (user: User) => (
        <StatusBadge
          status={user.status}
          labels={{
            active: t('users.statuses.active'),
            inactive: t('users.statuses.inactive'),
            suspended: t('users.statuses.suspended'),
            banned: t('users.statuses.banned'),
          }}
        />
      ),
    },
    {
      key: 'verified',
      header: t('users.table.verified'),
      render: (user: User) => (
        <div className="flex items-center gap-2">
          {user.isEmailVerified ? (
            <CheckCircle className="h-4 w-4" style={{ color: cssVars.status.success }} />
          ) : (
            <XCircle className="h-4 w-4" style={{ color: cssVars.status.error }} />
          )}
          {user.isPhoneVerified ? (
            <CheckCircle className="h-4 w-4" style={{ color: cssVars.status.success }} />
          ) : (
            <XCircle className="h-4 w-4" style={{ color: cssVars.status.error }} />
          )}
        </div>
      ),
    },
    {
      key: 'projects',
      header: t('users.table.projects'),
      render: (user: User) => (
        <span style={{ color: cssVars.secondary.DEFAULT }}>{user.completedProjects}</span>
      ),
    },
    {
      key: 'rating',
      header: t('users.table.rating'),
      render: (user: User) => (
        <div className="flex items-center gap-1">
          <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {user.averageRating.toFixed(1)}
          </span>
          <span className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
            ({user.totalReviews})
          </span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: t('users.table.actions'),
      render: (user: User) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/users/${user.id}`);
            }}
            className="rounded-lg p-2 transition-all hover:bg-opacity-80"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
            }}
          >
            <Eye className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle suspend
            }}
            className="rounded-lg p-2 transition-all hover:bg-opacity-80"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.status.warning} 10%, transparent)`,
            }}
          >
            <Shield className="h-4 w-4" style={{ color: cssVars.status.warning }} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle ban
            }}
            className="rounded-lg p-2 transition-all hover:bg-opacity-80"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.status.error} 10%, transparent)`,
            }}
          >
            <Ban className="h-4 w-4" style={{ color: cssVars.status.error }} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('users.title') },
        ]}
        className="mb-6"
      />

      <AdminPageHeader
        title={t('users.title')}
        description={t('users.description')}
        icon={Users}
        action={
          <div className="flex gap-3">
            <AdminActionButton
              label={t('users.actions.sendEmail')}
              icon={Mail}
              variant="secondary"
            />
            <AdminActionButton
              label={t('users.actions.export')}
              icon={Download}
              variant="secondary"
            />
            <AdminActionButton label={t('users.actions.addUser')} icon={Plus} variant="primary" />
          </div>
        }
      />

      <AdminDataTable
        data={users}
        columns={columns}
        searchPlaceholder={t('users.search')}
        onRowClick={(user) => router.push(`/admin/users/${user.id}`)}
        isLoading={loading}
        emptyMessage={t('users.empty')}
      />
    </div>
  );
}
