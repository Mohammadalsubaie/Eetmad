'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui';
import { suppliersApi } from '@/lib/api/suppliers';
import type { Supplier } from '@/lib/types/supplier.types';
import { Users, Star, CheckCircle2, ArrowRight, Search } from 'lucide-react';

export default function SuppliersPage() {
  const t = useTranslations('pages.suppliers');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const data = await suppliersApi.getAll();
      setSuppliers(data || []);
    } catch (err) {
      console.error('Failed to fetch suppliers:', err);
      setError(t('error') || 'Failed to load suppliers');
    } finally {
      setLoading(false);
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      supplier.serviceDescription?.toLowerCase().includes(query) ||
      supplier.categories?.some(
        (cat) =>
          cat.category?.nameAr?.toLowerCase().includes(query) ||
          cat.category?.nameEn?.toLowerCase().includes(query)
      )
    );
  });

  const verifiedSuppliers = filteredSuppliers.filter((s) => s.isVerified);

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
        {/* Header */}
        <div className="mb-12">
          <SectionHeader
            badge={t('badge') || 'Suppliers'}
            title={t('title') || 'Suppliers'}
            subtitle={t('subtitle') || 'Browse our verified suppliers'}
            variant="light"
            align={isRTL ? 'right' : 'left'}
            badgeColor="warm"
            className="max-w-3xl"
          />
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search
              className="absolute start-6 top-1/2 h-5 w-5 -translate-y-1/2"
              style={{ color: cssVars.neutral.textMuted }}
            />
            <input
              type="text"
              placeholder={t('searchPlaceholder') || 'Search suppliers...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 w-full rounded-2xl border-2 pe-6 ps-14 text-base font-semibold outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.surface,
                color: cssVars.secondary.DEFAULT,
                borderColor: cssVars.neutral.border,
              }}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-lg font-semibold" style={{ color: cssVars.neutral.textSecondary }}>
              {t('loading') || 'Loading suppliers...'}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div
            className="rounded-2xl border-2 p-8 text-center"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.status.error,
            }}
          >
            <p style={{ color: cssVars.status.error }}>{error}</p>
          </div>
        )}

        {/* Suppliers Grid */}
        {!loading && !error && (
          <>
            {filteredSuppliers.length === 0 ? (
              <div
                className="rounded-2xl border-2 p-12 text-center"
                style={{
                  backgroundColor: cssVars.neutral.surface,
                  borderColor: cssVars.neutral.border,
                }}
              >
                <Users
                  className="mx-auto mb-4 h-16 w-16"
                  style={{ color: cssVars.neutral.textMuted }}
                />
                <p
                  className="text-lg font-semibold"
                  style={{ color: cssVars.neutral.textSecondary }}
                >
                  {t('noSuppliers') || 'No suppliers found.'}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredSuppliers.map((supplier, index) => (
                  <motion.div
                    key={supplier.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    onClick={() => router.push(`/suppliers/${supplier.id}`)}
                    className="group cursor-pointer overflow-hidden rounded-3xl border-2 shadow-lg transition-all hover:shadow-2xl"
                    style={{
                      backgroundColor: cssVars.neutral.surface,
                      borderColor: supplier.isVerified
                        ? cssVars.status.success
                        : cssVars.neutral.border,
                    }}
                  >
                    <div className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className="flex h-16 w-16 items-center justify-center rounded-2xl"
                            style={{
                              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                            }}
                          >
                            <Users className="h-8 w-8" style={{ color: cssVars.primary.DEFAULT }} />
                          </div>
                          <div>
                            <div className="mb-1 flex items-center gap-2">
                              <h3
                                className="text-xl font-bold"
                                style={{ color: cssVars.secondary.DEFAULT }}
                              >
                                {supplier.businessName || 'Supplier'}
                              </h3>
                              {supplier.isVerified && (
                                <CheckCircle2
                                  className="h-5 w-5"
                                  style={{ color: cssVars.status.success }}
                                />
                              )}
                            </div>
                            {supplier.rating !== undefined && (
                              <div className="flex items-center gap-1">
                                <Star
                                  className="h-4 w-4 fill-current"
                                  style={{ color: cssVars.accent.warm }}
                                />
                                <span
                                  className="text-sm font-semibold"
                                  style={{ color: cssVars.neutral.textSecondary }}
                                >
                                  {supplier.rating.toFixed(1)} ({supplier.totalReviews || 0})
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <ArrowRight
                          className="h-5 w-5 transition-transform group-hover:translate-x-1"
                          style={{ color: cssVars.primary.DEFAULT }}
                        />
                      </div>

                      {supplier.serviceDescription && (
                        <p
                          className="mb-4 line-clamp-2 text-sm"
                          style={{ color: cssVars.neutral.textSecondary }}
                        >
                          {supplier.serviceDescription}
                        </p>
                      )}

                      {supplier.categories && supplier.categories.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {supplier.categories.slice(0, 3).map((cat) => {
                            const catName =
                              locale === 'ar'
                                ? cat.category?.nameAr
                                : cat.category?.nameEn || 'Category';
                            return (
                              <span
                                key={cat.id}
                                className="rounded-lg px-3 py-1 text-xs font-semibold"
                                style={{
                                  backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                                  color: cssVars.primary.DEFAULT,
                                }}
                              >
                                {catName}
                              </span>
                            );
                          })}
                          {supplier.categories.length > 3 && (
                            <span
                              className="rounded-lg px-3 py-1 text-xs font-semibold"
                              style={{
                                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                                color: cssVars.primary.DEFAULT,
                              }}
                            >
                              +{supplier.categories.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm">
                        {supplier.acceptanceRate !== undefined && (
                          <div>
                            <span
                              className="font-semibold"
                              style={{ color: cssVars.neutral.textSecondary }}
                            >
                              {t('acceptanceRate') || 'Acceptance'}:{' '}
                            </span>
                            <span className="font-bold" style={{ color: cssVars.primary.DEFAULT }}>
                              {supplier.acceptanceRate.toFixed(0)}%
                            </span>
                          </div>
                        )}
                        {supplier.onTimeDelivery !== undefined && (
                          <div>
                            <span
                              className="font-semibold"
                              style={{ color: cssVars.neutral.textSecondary }}
                            >
                              {t('onTime') || 'On Time'}:{' '}
                            </span>
                            <span className="font-bold" style={{ color: cssVars.status.success }}>
                              {supplier.onTimeDelivery.toFixed(0)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
