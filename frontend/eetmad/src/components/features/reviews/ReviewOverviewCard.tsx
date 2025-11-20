'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Star, XCircle } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Review } from '@/lib/types/review.types';

interface ReviewOverviewCardProps {
  review: Review;
}

export default function ReviewOverviewCard({ review }: ReviewOverviewCardProps) {
  const t = useTranslations('admin');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 rounded-2xl border-2 p-6 shadow-md"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`,
              color: cssVars.status.warning,
            }}
          >
            {review.rating}
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {review.title}
            </h2>
            <div className="mt-1 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5"
                  style={{
                    color: i < review.rating ? cssVars.status.warning : cssVars.neutral.border,
                    fill: i < review.rating ? cssVars.status.warning : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {review.isVerified ? (
            <span
              className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
                color: cssVars.status.success,
              }}
            >
              <CheckCircle className="h-3 w-3" />
              {t('reviews.verified')}
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.neutral.textMuted} 15%, transparent)`,
                color: cssVars.neutral.textMuted,
              }}
            >
              <XCircle className="h-3 w-3" />
              {t('reviews.notVerified')}
            </span>
          )}
        </div>
      </div>

      {/* Comment */}
      <div
        className="mb-6 rounded-xl border-2 p-4"
        style={{ borderColor: cssVars.neutral.border }}
      >
        <p style={{ color: cssVars.secondary.DEFAULT }}>{review.comment}</p>
      </div>

      {/* Sub-ratings */}
      {(review.qualityRating ||
        review.communicationRating ||
        review.timelinessRating ||
        review.professionalismRating) && (
        <div
          className="grid gap-4 border-t pt-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{ borderColor: cssVars.neutral.border }}
        >
          {review.qualityRating && (
            <div>
              <div
                className="mb-2 text-xs font-semibold"
                style={{ color: cssVars.neutral.textMuted }}
              >
                {t('reviews.detail.qualityRating')}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    style={{
                      color:
                        i < review.qualityRating!
                          ? cssVars.status.warning
                          : cssVars.neutral.border,
                      fill: i < review.qualityRating! ? cssVars.status.warning : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {review.communicationRating && (
            <div>
              <div
                className="mb-2 text-xs font-semibold"
                style={{ color: cssVars.neutral.textMuted }}
              >
                {t('reviews.detail.communicationRating')}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    style={{
                      color:
                        i < review.communicationRating!
                          ? cssVars.status.warning
                          : cssVars.neutral.border,
                      fill: i < review.communicationRating! ? cssVars.status.warning : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {review.timelinessRating && (
            <div>
              <div
                className="mb-2 text-xs font-semibold"
                style={{ color: cssVars.neutral.textMuted }}
              >
                {t('reviews.detail.timelinessRating')}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    style={{
                      color:
                        i < review.timelinessRating!
                          ? cssVars.status.warning
                          : cssVars.neutral.border,
                      fill: i < review.timelinessRating! ? cssVars.status.warning : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {review.professionalismRating && (
            <div>
              <div
                className="mb-2 text-xs font-semibold"
                style={{ color: cssVars.neutral.textMuted }}
              >
                {t('reviews.detail.professionalismRating')}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    style={{
                      color:
                        i < review.professionalismRating!
                          ? cssVars.status.warning
                          : cssVars.neutral.border,
                      fill: i < review.professionalismRating! ? cssVars.status.warning : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

