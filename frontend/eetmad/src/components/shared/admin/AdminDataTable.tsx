'use client';

import { Column } from '@/lib/types/column.type';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

/**
 * Admin-specific column configuration type.
 * This is an alias for Column<T> to maintain architectural separation
 * where admin components reference admin-specific types.
 */
export type ColumnConfig<T> = Column<T>;

interface AdminDataTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  searchPlaceholder?: string;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function AdminDataTable<T extends { id: string }>({
  data,
  columns,
  searchPlaceholder,
  onRowClick,
  isLoading = false,
  emptyMessage,
}: AdminDataTableProps<T>) {
  const t = useTranslations('admin');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data; // Add search logic if needed
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div
      className="rounded-2xl border-2 shadow-md"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      {/* Search Bar */}
      <div className="border-b p-4" style={{ borderColor: cssVars.neutral.border }}>
        <div className="relative">
          <Search
            className="absolute end-4 top-1/2 h-5 w-5 -translate-y-1/2"
            style={{ color: cssVars.neutral.textMuted }}
          />
          <input
            type="text"
            placeholder={searchPlaceholder ?? t('common.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border-2 py-3 pe-4 ps-12 outline-none transition-all focus:border-opacity-100"
            style={{
              backgroundColor: cssVars.neutral.bg,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: cssVars.neutral.bg }}>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-6 py-4 text-start text-sm font-bold"
                  style={{ color: cssVars.secondary.DEFAULT }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center">
                  <div
                    className="text-lg font-semibold"
                    style={{ color: cssVars.neutral.textSecondary }}
                  >
                    {t('common.loading')}
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center">
                  <div
                    className="text-lg font-semibold"
                    style={{ color: cssVars.neutral.textSecondary }}
                  >
                    {emptyMessage ?? t('common.noData')}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onRowClick?.(item)}
                  className={`border-t transition-all ${onRowClick ? 'cursor-pointer hover:bg-opacity-50' : ''}`}
                  style={{
                    borderColor: cssVars.neutral.border,
                  }}
                  whileHover={
                    onRowClick
                      ? {
                          backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 5%, transparent)`,
                        }
                      : {}
                  }
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="px-6 py-4 text-sm"
                      style={{ color: cssVars.neutral.textSecondary }}
                    >
                      {column.render
                        ? column.render(item)
                        : String(
                            ((item as unknown as Record<string, unknown>)[String(column.key)] as
                              | string
                              | number
                              | boolean
                              | null
                              | undefined) ?? '-'
                          )}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className="flex items-center justify-between border-t px-6 py-4"
          style={{ borderColor: cssVars.neutral.border }}
        >
          <div className="text-sm font-semibold" style={{ color: cssVars.neutral.textSecondary }}>
            عرض {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} من{' '}
            {filteredData.length}
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-all disabled:opacity-50"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
              }}
            >
              <ChevronRight className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            </motion.button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(page)}
                className="flex h-10 w-10 items-center justify-center rounded-xl font-bold transition-all"
                style={{
                  backgroundColor:
                    currentPage === page
                      ? cssVars.primary.DEFAULT
                      : `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                  color: currentPage === page ? cssVars.neutral.surface : cssVars.primary.DEFAULT,
                }}
              >
                {page}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-all disabled:opacity-50"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
              }}
            >
              <ChevronLeft className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
