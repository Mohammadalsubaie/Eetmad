'use client';

import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { requestsApi } from '@/lib/api/requests';
import type { Request } from '@/lib/types/request.types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, DollarSign, Edit, Eye, MapPin, Tag } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.requests');
  const [request, setRequest] = useState<Request | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequest = useCallback(
    async (requestId: string) => {
      try {
        setLoading(true);
        setError(null);
        const data = await requestsApi.getById(requestId);
        setRequest(data);
      } catch (err) {
        console.error('Failed to fetch request:', err);
        setError(t('fetchError'));
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    if (id) {
      fetchRequest(id);
    }
  }, [id, fetchRequest]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatBudget = (min: number | null, max: number | null) => {
    if (min && max) {
      return `${min.toLocaleString()} - ${max.toLocaleString()} ${t('currency')}`;
    }
    if (min) {
      return `${t('budgetMin')}: ${min.toLocaleString()} ${t('currency')}`;
    }
    if (max) {
      return `${t('budgetMax')}: ${max.toLocaleString()} ${t('currency')}`;
    }
    return t('budgetNotSpecified');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return cssVars.status.success;
      case 'in_progress':
        return cssVars.status.info;
      case 'completed':
        return cssVars.primary.DEFAULT;
      case 'cancelled':
      case 'closed':
        return cssVars.status.error;
      default:
        return cssVars.neutral.textSecondary;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <div className="flex items-center justify-center py-12">
          <div className="text-lg font-medium" style={{ color: cssVars.neutral.textSecondary }}>
            {t('loading')}
          </div>
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <div
          className="rounded-2xl border-2 p-8 text-center"
          style={{ borderColor: cssVars.status.error }}
        >
          <p style={{ color: cssVars.status.error }}>{error || t('notFound')}</p>
          <Button
            onClick={() => router.push('/requests')}
            className="mt-4"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {t('backToRequests')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: t('title'), href: `/${locale}/requests` }, { label: request.title }]}
        className="mb-6"
      />

      {/* Back Button */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-medium"
        style={{ color: cssVars.primary.DEFAULT }}
      >
        <ArrowLeft className="h-4 w-4" />
        {t('back')}
      </motion.button>

      {/* Header */}
      <div
        className="mb-8 rounded-2xl border-2 p-6"
        style={{ backgroundColor: cssVars.neutral.surface, borderColor: cssVars.neutral.border }}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 text-xs font-bold"
                style={{
                  backgroundColor: `color-mix(in srgb, ${getStatusColor(request.status)} 15%, transparent)`,
                  color: getStatusColor(request.status),
                  borderColor: getStatusColor(request.status),
                }}
              >
                {t(`status.${request.status}`)}
              </span>
              {request.requestNumber && (
                <span className="text-sm font-medium" style={{ color: cssVars.neutral.textMuted }}>
                  {request.requestNumber}
                </span>
              )}
            </div>
            <h1 className="mb-4 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {request.title}
            </h1>
          </div>
          <Button
            onClick={() => router.push(`/requests/${id}/edit`)}
            variant="outline"
            className="flex items-center gap-2"
            style={{
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            <Edit className="h-4 w-4" />
            {t('edit.title')}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            <div>
              <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                {t('views')}
              </p>
              <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {request.viewsCount}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            <div>
              <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                {t('offers')}
              </p>
              <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {request.offersCount}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            <div>
              <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                {t('budget')}
              </p>
              <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {formatBudget(request.budgetMin, request.budgetMax)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            <div>
              <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                {t('duration')}
              </p>
              <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {request.expectedDuration} {t('days')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          {/* Description */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('description')}
            </h2>
            <p className="leading-relaxed" style={{ color: cssVars.neutral.textSecondary }}>
              {request.description}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Details Card */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h3 className="mb-4 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('details')}
            </h3>
            <div className="space-y-4">
              <div>
                <p
                  className="mb-1 text-xs font-medium"
                  style={{ color: cssVars.neutral.textMuted }}
                >
                  {t('deadline')}
                </p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
                  <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                    {formatDate(request.deadline)}
                  </p>
                </div>
              </div>
              {request.location && (
                <div>
                  <p
                    className="mb-1 text-xs font-medium"
                    style={{ color: cssVars.neutral.textMuted }}
                  >
                    {t('location')}
                  </p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
                    <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                      {request.location.city ||
                        request.location.region ||
                        t('locationNotSpecified')}
                    </p>
                  </div>
                </div>
              )}
              {request.requiresOnSiteVisit && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 text-xs font-bold"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${cssVars.accent.warm} 15%, transparent)`,
                    color: cssVars.accent.warm,
                    borderColor: cssVars.accent.warm,
                  }}
                >
                  {t('onSiteVisit')}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          {request.status === 'open' && request.offersCount > 0 && (
            <Button
              onClick={() => router.push(`/requests/${id}/offers`)}
              className="w-full"
              style={{
                background: cssVars.gradient.gold,
                color: cssVars.secondary.DEFAULT,
              }}
            >
              {t('viewOffers')} ({request.offersCount})
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
