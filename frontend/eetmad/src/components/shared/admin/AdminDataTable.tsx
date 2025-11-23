'use client';

import { Column } from '@/lib/types/column.type';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import React from 'react';

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
  const t = useTranslations('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data || []; // Add search logic if needed
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
      <div className="border-b p-3 sm:p-4" style={{ borderColor: cssVars.neutral.border }}>
        <div className="relative">
          <Search
            className="absolute end-3 sm:end-4 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2"
            style={{ color: cssVars.neutral.textMuted }}
          />
          <input
            type="text"
            placeholder={searchPlaceholder ?? t('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border-2 py-3 sm:py-3 pe-3 sm:pe-4 ps-11 sm:ps-12 text-base sm:text-base outline-none transition-all focus:border-opacity-100 touch-manipulation min-h-[44px]"
            style={{
              backgroundColor: cssVars.neutral.bg,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="hidden md:table-header-group">
                <tr style={{ backgroundColor: cssVars.neutral.bg }}>
                  {columns.map((column) => (
                    <th
                      key={String(column.key)}
                      className="px-4 lg:px-6 py-3 lg:py-4 text-start text-xs sm:text-sm font-bold"
                      style={{ color: cssVars.secondary.DEFAULT }}
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="md:divide-y md:divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-8 sm:py-12 text-center">
                      <div
                        className="text-sm sm:text-base lg:text-lg font-semibold"
                        style={{ color: cssVars.neutral.textSecondary }}
                      >
                        {t('loading')}
                      </div>
                    </td>
                  </tr>
                ) : paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-8 sm:py-12 text-center">
                      <div
                        className="text-sm sm:text-base lg:text-lg font-semibold"
                        style={{ color: cssVars.neutral.textSecondary }}
                      >
                        {emptyMessage ?? t('noData')}
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, index) => (
                    <React.Fragment key={item.id}>
                      {/* Mobile Card View */}
                      <motion.tr
                        key={`mobile-${item.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03, duration: 0.2 }}
                        onClick={() => onRowClick?.(item)}
                        className={`md:hidden transition-all active:scale-[0.98] border-0 ${
                          onRowClick ? 'cursor-pointer' : ''
                        }`}
                        whileTap={onRowClick ? { scale: 0.98 } : {}}
                        style={{ border: 'none' }}
                      >
                        <td className="p-0 border-0" style={{ border: 'none' }}>
                          <div
                            className="mx-3 my-2 rounded-xl border-2 p-4 shadow-sm transition-all active:shadow-md"
                            style={{
                              backgroundColor: cssVars.neutral.surface,
                              borderColor: cssVars.neutral.border,
                            }}
                            onTouchStart={(e) => {
                              if (onRowClick) {
                                e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${cssVars.primary.DEFAULT} 8%, transparent)`;
                              }
                            }}
                            onTouchEnd={(e) => {
                              e.currentTarget.style.backgroundColor = cssVars.neutral.surface;
                            }}
                          >
                            <div className="space-y-3">
                              {columns.slice(0, Math.min(3, columns.length)).map((column, colIndex) => (
                                <div
                                  key={String(column.key)}
                                  className={`flex justify-between items-start gap-3 ${
                                    colIndex < Math.min(3, columns.length) - 1 ? 'border-b pb-3' : ''
                                  }`}
                                  style={{
                                    borderColor: `color-mix(in srgb, ${cssVars.neutral.border} 50%, transparent)`,
                                  }}
                                >
                                  <span
                                    className="text-xs font-bold flex-shrink-0 min-w-[90px]"
                                    style={{ color: cssVars.neutral.textSecondary }}
                                  >
                                    {column.header}
                                  </span>
                                  <span
                                    className="text-sm font-semibold text-right flex-1 break-words"
                                    style={{ color: cssVars.secondary.DEFAULT }}
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
                                  </span>
                                </div>
                              ))}
                              {columns.length > 3 && onRowClick && (
                                <div
                                  className="flex items-center justify-center gap-2 pt-2 mt-2 border-t"
                                  style={{
                                    borderColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 20%, transparent)`,
                                  }}
                                >
                                  <span
                                    className="text-xs font-bold"
                                    style={{ color: cssVars.primary.DEFAULT }}
                                  >
                                    عرض التفاصيل
                                  </span>
                                  <ChevronLeft className="h-3 w-3 rtl:rotate-180" style={{ color: cssVars.primary.DEFAULT }} />
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                      {/* Desktop Table View */}
                      <motion.tr
                        key={`desktop-${item.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onRowClick?.(item)}
                        className={`hidden md:table-row border-t transition-all ${onRowClick ? 'cursor-pointer hover:bg-opacity-50' : ''}`}
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
                            className="px-4 lg:px-6 py-3 lg:py-4 text-xs sm:text-sm whitespace-nowrap"
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
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 border-t px-3 sm:px-4 lg:px-6 py-3 sm:py-4"
          style={{ borderColor: cssVars.neutral.border }}
        >
          <div className="text-xs sm:text-sm font-semibold text-center sm:text-start" style={{ color: cssVars.neutral.textSecondary }}>
            عرض {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} من{' '}
            {filteredData.length}
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center rounded-xl transition-all disabled:opacity-50 touch-manipulation active:scale-95"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
              }}
            >
              <ChevronRight className="h-5 w-5 sm:h-5 sm:w-5" style={{ color: cssVars.primary.DEFAULT }} />
            </motion.button>

            <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(page)}
                  className="flex h-10 w-10 sm:h-10 sm:w-10 items-center justify-center rounded-xl text-sm sm:text-sm font-bold transition-all touch-manipulation active:scale-95"
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
            </div>
            <div className="sm:hidden text-xs sm:text-sm font-bold px-2" style={{ color: cssVars.primary.DEFAULT }}>
              {currentPage} / {totalPages}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center rounded-xl transition-all disabled:opacity-50 touch-manipulation active:scale-95"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
              }}
            >
              <ChevronLeft className="h-5 w-5 sm:h-5 sm:w-5" style={{ color: cssVars.primary.DEFAULT }} />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
