'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { suppliersApi } from '@/lib/api/suppliers';
import type { PortfolioItem } from '@/lib/types/supplier.types';
import { Button } from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';

export default function PortfolioManager() {
  const t = useTranslations('pages.portfolio');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError(null);
      const profile = await suppliersApi.getMyProfile();
      setItems(profile.portfolio || []);
    } catch (err) {
      console.error('Failed to fetch portfolio:', err);
      setError(t('fetchError'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('confirmDelete'))) return;

    try {
      await suppliersApi.deletePortfolioItem(id);
      fetchPortfolio();
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg font-medium" style={{ color: cssVars.neutral.textSecondary }}>
          {t('loading')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border-2 p-4" style={{ borderColor: cssVars.status.error }}>
        <p style={{ color: cssVars.status.error }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('title')}
          </h2>
          <p className="mt-1 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
            {t('subtitle')}
          </p>
        </div>
        <Button
          onClick={() => {
            /* TODO: Open add modal */
          }}
          className="flex items-center gap-2"
          style={{
            background: cssVars.gradient.gold,
            color: cssVars.secondary.DEFAULT,
          }}
        >
          <Plus className="h-5 w-5" />
          {t('addItem')}
        </Button>
      </div>

      {/* Portfolio Grid */}
      {items.length === 0 ? (
        <EmptyState title={t('noItems')} description={t('noItemsDescription')} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-2xl border-2 shadow-lg"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              {/* Image */}
              <div
                className="relative h-48 w-full overflow-hidden bg-cover bg-center"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                }}
              >
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-12 w-12" style={{ color: cssVars.primary.DEFAULT }} />
                  </div>
                )}
                {/* Actions Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black bg-opacity-0 transition-all group-hover:bg-opacity-50">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      /* TODO: Edit */
                    }}
                    className="rounded-lg bg-white p-2 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Edit className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(item.id)}
                    className="rounded-lg bg-white p-2 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" style={{ color: cssVars.status.error }} />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {item.title}
                </h3>
                <p
                  className="mb-3 line-clamp-2 text-sm"
                  style={{ color: cssVars.neutral.textSecondary }}
                >
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-medium"
                    style={{ color: cssVars.neutral.textMuted }}
                  >
                    {formatDate(item.completedAt)}
                  </span>
                  {item.category && (
                    <span
                      className="rounded-full px-2 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                        color: cssVars.primary.DEFAULT,
                      }}
                    >
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
