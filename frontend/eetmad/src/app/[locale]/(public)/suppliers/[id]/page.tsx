'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui';
import { suppliersApi } from '@/lib/api/suppliers';
import type { Supplier } from '@/lib/types/supplier.types';
import {
  Users,
  Star,
  CheckCircle2,
  ArrowLeft,
  TrendingUp,
  Clock,
  Award,
  Package,
} from 'lucide-react';

export default function SupplierDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const t = useTranslations('pages.suppliers');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const router = useRouter();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchSupplier();
    }
  }, [id]);

  const fetchSupplier = async () => {
    try {
      setLoading(true);
      const data = await suppliersApi.getById(id);
      setSupplier(data);
    } catch (err) {
      console.error('Failed to fetch supplier:', err);
      setError(t('error') || 'Failed to load supplier');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: cssVars.neutral.bg }}
      >
        <div className="text-lg font-semibold" style={{ color: cssVars.neutral.textSecondary }}>
          {t('loading') || 'Loading...'}
        </div>
      </div>
    );
  }

  if (error || !supplier) {
    return (
      <div className="container mx-auto px-4 py-20" style={{ backgroundColor: cssVars.neutral.bg }}>
        <div
          className="rounded-2xl border-2 p-8 text-center"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.status.error,
          }}
        >
          <p style={{ color: cssVars.status.error }}>
            {error || t('notFound') || 'Supplier not found'}
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 rounded-xl px-6 py-3 font-semibold"
            style={{
              backgroundColor: cssVars.primary.DEFAULT,
              color: cssVars.neutral.bg,
            }}
          >
            {t('back') || 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen py-20"
      style={{
        backgroundColor: cssVars.neutral.bg,
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute start-0 top-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.accent.primary }}
        />
        <div
          className="absolute bottom-1/4 end-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.primary.DEFAULT }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all hover:scale-105"
          style={{
            backgroundColor: cssVars.neutral.surface,
            color: cssVars.primary.DEFAULT,
          }}
        >
          <ArrowLeft className="h-5 w-5" />
          {t('back') || 'Back'}
        </motion.button>

        {/* Supplier Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 rounded-3xl border-2 p-8"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: supplier.isVerified ? cssVars.status.success : cssVars.neutral.border,
          }}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-6">
              <div
                className="flex h-24 w-24 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                }}
              >
                <Users className="h-12 w-12" style={{ color: cssVars.primary.DEFAULT }} />
              </div>
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {supplier.businessName || 'Supplier'}
                  </h1>
                  {supplier.isVerified && (
                    <div className="flex items-center gap-2 rounded-lg px-3 py-1.5">
                      <CheckCircle2 className="h-5 w-5" style={{ color: cssVars.status.success }} />
                      <span className="text-sm font-bold" style={{ color: cssVars.status.success }}>
                        {t('verified') || 'Verified'}
                      </span>
                    </div>
                  )}
                </div>
                {supplier.rating !== undefined && (
                  <div className="mb-2 flex items-center gap-2">
                    <Star className="h-5 w-5 fill-current" style={{ color: cssVars.accent.warm }} />
                    <span
                      className="text-lg font-bold"
                      style={{ color: cssVars.secondary.DEFAULT }}
                    >
                      {supplier.rating.toFixed(1)}
                    </span>
                    <span className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                      ({supplier.totalReviews || 0} {t('reviews') || 'reviews'})
                    </span>
                  </div>
                )}
                {supplier.serviceDescription && (
                  <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
                    {supplier.serviceDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {supplier.acceptanceRate !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: cssVars.neutral.textSecondary }}
                >
                  {t('acceptanceRate') || 'Acceptance Rate'}
                </span>
              </div>
              <div className="text-3xl font-bold" style={{ color: cssVars.primary.DEFAULT }}>
                {supplier.acceptanceRate.toFixed(0)}%
              </div>
            </motion.div>
          )}

          {supplier.onTimeDelivery !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-5 w-5" style={{ color: cssVars.status.success }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: cssVars.neutral.textSecondary }}
                >
                  {t('onTimeDelivery') || 'On-Time Delivery'}
                </span>
              </div>
              <div className="text-3xl font-bold" style={{ color: cssVars.status.success }}>
                {supplier.onTimeDelivery.toFixed(0)}%
              </div>
            </motion.div>
          )}

          {supplier.responseTime !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: cssVars.neutral.textSecondary }}
                >
                  {t('responseTime') || 'Response Time'}
                </span>
              </div>
              <div className="text-3xl font-bold" style={{ color: cssVars.primary.DEFAULT }}>
                {supplier.responseTime}h
              </div>
            </motion.div>
          )}
        </div>

        {/* Categories */}
        {supplier.categories && supplier.categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="mb-6 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('categories') || 'Categories'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {supplier.categories.map((cat) => {
                const catName =
                  locale === 'ar' ? cat.category?.nameAr : cat.category?.nameEn || 'Category';
                return (
                  <span
                    key={cat.id}
                    className="rounded-xl px-4 py-2 font-semibold"
                    style={{
                      backgroundColor: cat.isPrimary
                        ? cssVars.primary.DEFAULT
                        : `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                      color: cat.isPrimary ? cssVars.neutral.bg : cssVars.primary.DEFAULT,
                    }}
                  >
                    {catName}
                    {cat.isPrimary && (
                      <span className="ms-2 text-xs">({t('primary') || 'Primary'})</span>
                    )}
                  </span>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Portfolio */}
        {supplier.portfolio && supplier.portfolio.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="mb-6 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('portfolio') || 'Portfolio'}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {supplier.portfolio.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border-2 p-4"
                  style={{
                    backgroundColor: cssVars.neutral.surface,
                    borderColor: cssVars.neutral.border,
                  }}
                >
                  <h3
                    className="mb-2 text-lg font-bold"
                    style={{ color: cssVars.secondary.DEFAULT }}
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mb-2 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                      {item.description}
                    </p>
                  )}
                  {item.category && (
                    <span
                      className="inline-block rounded-lg px-3 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                        color: cssVars.primary.DEFAULT,
                      }}
                    >
                      {item.category}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Certifications */}
        {supplier.certifications && supplier.certifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('certifications') || 'Certifications'}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {supplier.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center gap-4 rounded-2xl border-2 p-4"
                  style={{
                    backgroundColor: cssVars.neutral.surface,
                    borderColor: cssVars.neutral.border,
                  }}
                >
                  <Award className="h-8 w-8 flex-shrink-0" style={{ color: cssVars.accent.warm }} />
                  <div>
                    <h3 className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                      {cert.name}
                    </h3>
                    <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                      {cert.issuer} • {new Date(cert.issuedAt).getFullYear()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
