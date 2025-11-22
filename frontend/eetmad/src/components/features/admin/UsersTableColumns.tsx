'use client';

import { Ban, CheckCircle, Eye, Shield, XCircle } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import StatusBadge from '@/components/shared/badges/StatusBadge';
import type { User } from '@/lib/types/user.types';

export function useUsersTableColumns() {
  const t = useTranslations('admin');
  const router = useRouter();

  return [
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
          {user.userType === 'supplier' 
            ? t('users.types.supplier') 
            : user.userType === 'admin' 
              ? t('users.types.admin') 
              : t('users.types.client')}
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
}

