'use client';

import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Calendar, CheckCircle2, User } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type { Review } from '@/lib/types/review.types';
import { Badge } from '@/components/ui';

interface ReviewCardProps {
  review: Review;
  onView?: (id: string) => void;
}

export default function ReviewCard({ review, onView }: ReviewCardProps) {
  const t = useTranslations('pages.reviews');
  const locale = useLocale();
  const router = useRouter();

  const handleClick = () => {
    if (onView) {
      onView(review.id);
    } else {
      router.push(`/${locale}/reviews/${review.id}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-current' : ''}`}
        style={{
          color: i < rating ? cssVars.status.warning : cssVars.neutral.border,
        }}
      />
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer rounded-2xl border-2 p-6 shadow-md transition-all hover:shadow-lg"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Header */}
          <div className="mb-3 flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <h3
                  className="text-xl font-bold leading-tight"
                  style={{ color: cssVars.secondary.DEFAULT }}
                >
                  {review.title}
                </h3>
                {review.isVerified && (
                  <div title={t('verified')}>
                    <CheckCircle2
                      className="h-5 w-5"
                      style={{ color: cssVars.status.success }}
                    />
                  </div>
                )}
              </div>
              <div className="mb-2 flex items-center gap-2">
                {renderStars(review.rating)}
                <span className="text-sm font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {review.rating}/5
                </span>
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
            </div>
          </div>

          {/* Comment */}
          <p
            className="mb-4 line-clamp-3 text-sm leading-relaxed"
            style={{ color: cssVars.neutral.textSecondary }}
          >
            {review.comment}
          </p>

          {/* Sub-ratings */}
          {(review.qualityRating ||
            review.communicationRating ||
            review.timelinessRating ||
            review.professionalismRating) && (
            <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
              {review.qualityRating && (
                <div className="flex items-center gap-1">
                  <span style={{ color: cssVars.neutral.textMuted }}>{t('quality')}:</span>
                  <div className="flex">{renderStars(review.qualityRating)}</div>
                </div>
              )}
              {review.communicationRating && (
                <div className="flex items-center gap-1">
                  <span style={{ color: cssVars.neutral.textMuted }}>{t('communication')}:</span>
                  <div className="flex">{renderStars(review.communicationRating)}</div>
                </div>
              )}
              {review.timelinessRating && (
                <div className="flex items-center gap-1">
                  <span style={{ color: cssVars.neutral.textMuted }}>{t('timeliness')}:</span>
                  <div className="flex">{renderStars(review.timelinessRating)}</div>
                </div>
              )}
              {review.professionalismRating && (
                <div className="flex items-center gap-1">
                  <span style={{ color: cssVars.neutral.textMuted }}>{t('professionalism')}:</span>
                  <div className="flex">{renderStars(review.professionalismRating)}</div>
                </div>
              )}
            </div>
          )}

          {/* Response */}
          {review.response && (
            <div
              className="mb-4 rounded-lg border-2 p-3"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 5%, transparent)`,
                borderColor: cssVars.primary.DEFAULT,
              }}
            >
              <p className="mb-1 text-xs font-semibold" style={{ color: cssVars.primary.DEFAULT }}>
                {t('response')}:
              </p>
              <p className="text-sm" style={{ color: cssVars.secondary.DEFAULT }}>
                {review.response}
              </p>
            </div>
          )}

          {/* Footer */}
          <div
            className="flex items-center justify-between border-t pt-3"
            style={{ borderColor: cssVars.neutral.border }}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" style={{ color: cssVars.status.success }} />
                <span className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                  {review.helpfulCount}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsDown className="h-4 w-4" style={{ color: cssVars.status.error }} />
                <span className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                  {review.notHelpfulCount}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
                <span className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                  {formatDate(review.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
