'use client';

import { useUsersTableColumns } from '@/components/features/admin/UsersTableColumns';
import AdminActionButton from '@/components/shared/admin/AdminActionButton';
import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { ErrorMessage } from '@/components/ui';
import { useAdminUsers } from '@/lib/hooks/useAdminUsers';
import { Download, Mail, Plus, Users } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function AdminUsersPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();
  const { users, isLoading, error } = useAdminUsers();
  const columns = useUsersTableColumns();

  if (error) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('users.title') },
          ]}
          className="mb-6"
        />
        <ErrorMessage error={error.message} variant="banner" />
      </div>
    );
  }

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
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <AdminActionButton
              label={t('users.actions.sendEmail')}
              icon={Mail}
              variant="secondary"
              size="sm"
            />
            <AdminActionButton
              label={t('users.actions.export')}
              icon={Download}
              variant="secondary"
              size="sm"
            />
            <AdminActionButton label={t('users.actions.addUser')} icon={Plus} variant="primary" size="sm" />
          </div>
        }
      />

      <AdminDataTable
        data={users}
        columns={columns}
        searchPlaceholder={t('users.search')}
        onRowClick={(user) => router.push(`/admin/users/${user.id}`)}
        isLoading={isLoading}
        emptyMessage={t('users.empty')}
      />
    </div>
  );
}
