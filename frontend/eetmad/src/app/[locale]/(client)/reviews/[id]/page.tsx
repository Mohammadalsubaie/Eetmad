'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Edit,
  Trash2,
  Flag,
} from 'lucide-react';
import { cssVars } from '@/styles/theme';
import {
  useReview,
  useRespondToReview,
  useMarkHelpful,
  useMarkNotHelpful,
  useDeleteReview,
  useReportReview,
} from '@/lib/hooks/useReviews';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { Badge } from '@/components/ui';
import Input from '@/components/ui/Input/Input';

export default function ReviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.reviews');
  const { data: review, isLoading, error } = useReview(id);
  const { mutate: respond, isLoading: responding } = useRespondToReview();
  const { mutate: markHelpful, isLoading: markingHelpful } = useMarkHelpful();
  const { mutate: markNotHelpful, isLoading: markingNotHelpful } = useMarkNotHelpful();
  const { mutate: deleteReview, isLoading: deleting } = useDeleteReview();
  const { mutate: reportReview, isLoading: reporting } = useReportReview();
  const [responseText, setResponseText] = useState('');

  // TODO: Get actual user ID from auth context
  const currentUserId = 'user-1';
  const canEdit = review?.reviewerId === currentUserId;
  const canRespond = review?.reviewedId === currentUserId && !review.response;

  const handleRespond = async () => {
    if (!responseText.trim()) return;

    try {
      await respond(id, responseText);
      setResponseText('');
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleMarkHelpful = async () => {
    try {
      await markHelpful(id);
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleMarkNotHelpful = async () => {
    try {
      await markNotHelpful(id);
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleDelete = async () => {
    if (confirm(t('confirmDelete'))) {
      try {
        await deleteReview(id);
        router.push(`/${locale}/reviews`);
      } catch (err) {
        // Error handled by hook
      }
    }
  };

  const handleReport = async () => {
    const reason = prompt(t('reportReasonPrompt'));
    if (reason) {
      try {
        await reportReview(id, reason);
        alert(t('reportSubmitted'));
      } catch (err) {
        // Error handled by hook
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/reviews` }, { label: id }]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !review) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/reviews` }, { label: id }]}
          className="mb-6"
        />
        <ErrorMessage error={error?.message || t('reviewNotFound')} variant="banner" />
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('notAvailable');
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'fill-current' : ''}`}
        style={{
          color: i < rating ? cssVars.status.warning : cssVars.neutral.border,
        }}
      />
    ));
  };

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[{ label: t('title'), href: `/${locale}/reviews` }, { label: review.title }]}
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
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex items-center gap-2">
            {renderStars(review.rating)}
            <span className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {review.rating}/5
            </span>
          </div>
          {review.isVerified && (
            <Badge
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
                color: cssVars.status.success,
                borderColor: cssVars.status.success,
              }}
            >
              <CheckCircle2 className="mr-1 h-3 w-3" />
              {t('verified')}
            </Badge>
          )}
          <Badge
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
              color: cssVars.primary.DEFAULT,
              borderColor: cssVars.primary.DEFAULT,
            }}
          >
            {t(`type.${review.reviewType}`)}
          </Badge>
        </div>
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {review.title}
        </h1>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          <span className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
            {formatDate(review.createdAt)}
          </span>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          {/* Comment */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('comment')}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: cssVars.neutral.textSecondary }}>
              {review.comment}
            </p>
          </div>

          {/* Sub-ratings */}
          {(review.qualityRating ||
            review.communicationRating ||
            review.timelinessRating ||
            review.professionalismRating) && (
            <div
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('detailedRatings')}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {review.qualityRating && (
                  <div>
                    <p
                      className="mb-2 text-sm font-semibold"
                      style={{ color: cssVars.neutral.textMuted }}
                    >
                      {t('quality')}
                    </p>
                    <div className="flex">{renderStars(review.qualityRating)}</div>
                  </div>
                )}
                {review.communicationRating && (
                  <div>
                    <p
                      className="mb-2 text-sm font-semibold"
                      style={{ color: cssVars.neutral.textMuted }}
                    >
                      {t('communication')}
                    </p>
                    <div className="flex">{renderStars(review.communicationRating)}</div>
                  </div>
                )}
                {review.timelinessRating && (
                  <div>
                    <p
                      className="mb-2 text-sm font-semibold"
                      style={{ color: cssVars.neutral.textMuted }}
                    >
                      {t('timeliness')}
                    </p>
                    <div className="flex">{renderStars(review.timelinessRating)}</div>
                  </div>
                )}
                {review.professionalismRating && (
                  <div>
                    <p
                      className="mb-2 text-sm font-semibold"
                      style={{ color: cssVars.neutral.textMuted }}
                    >
                      {t('professionalism')}
                    </p>
                    <div className="flex">{renderStars(review.professionalismRating)}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Response */}
          {review.response && (
            <div
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                borderColor: cssVars.primary.DEFAULT,
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
                <h3 className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {t('response')}
                </h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: cssVars.secondary.DEFAULT }}>
                {review.response}
              </p>
              {review.respondedAt && (
                <p className="mt-2 text-xs" style={{ color: cssVars.neutral.textMuted }}>
                  {formatDate(review.respondedAt)}
                </p>
              )}
            </div>
          )}

          {/* Add Response */}
          {canRespond && (
            <div
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h3 className="mb-4 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('addResponse')}
              </h3>
              <div className="space-y-3">
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border-2 px-4 py-3 text-sm"
                  style={{
                    backgroundColor: cssVars.neutral.bg,
                    borderColor: cssVars.neutral.border,
                    color: cssVars.secondary.DEFAULT,
                  }}
                  placeholder={t('responsePlaceholder')}
                />
                <Button
                  onClick={handleRespond}
                  disabled={responding || !responseText.trim()}
                  variant="primary"
                  style={{
                    background: cssVars.gradient.gold,
                    color: cssVars.secondary.DEFAULT,
                  }}
                >
                  {responding ? t('responding') : t('submitResponse')}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button
                onClick={handleMarkHelpful}
                disabled={markingHelpful}
                variant="outline"
                icon={ThumbsUp}
                className="flex-1"
                style={{
                  borderColor: cssVars.status.success,
                  color: cssVars.status.success,
                }}
              >
                {review.helpfulCount}
              </Button>
              <Button
                onClick={handleMarkNotHelpful}
                disabled={markingNotHelpful}
                variant="outline"
                icon={ThumbsDown}
                className="flex-1"
                style={{
                  borderColor: cssVars.status.error,
                  color: cssVars.status.error,
                }}
              >
                {review.notHelpfulCount}
              </Button>
            </div>
            {canEdit && (
              <>
                <Button
                  onClick={() => router.push(`/${locale}/reviews/${id}/edit`)}
                  variant="outline"
                  icon={Edit}
                  fullWidth
                >
                  {t('edit')}
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={deleting}
                  variant="outline"
                  icon={Trash2}
                  fullWidth
                  style={{
                    borderColor: cssVars.status.error,
                    color: cssVars.status.error,
                  }}
                >
                  {t('delete')}
                </Button>
              </>
            )}
            <Button
              onClick={handleReport}
              disabled={reporting}
              variant="outline"
              icon={Flag}
              fullWidth
              style={{
                borderColor: cssVars.status.warning,
                color: cssVars.status.warning,
              }}
            >
              {t('report')}
            </Button>
          </div>

          {/* Stats */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h3 className="mb-4 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('stats')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                  {t('helpful')}
                </span>
                <span className="font-semibold" style={{ color: cssVars.status.success }}>
                  {review.helpfulCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                  {t('notHelpful')}
                </span>
                <span className="font-semibold" style={{ color: cssVars.status.error }}>
                  {review.notHelpfulCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
