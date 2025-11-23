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
            className="absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 sm:end-4 sm:h-5 sm:w-5"
            style={{ color: cssVars.neutral.textMuted }}
          />
          <input
            type="text"
            placeholder={searchPlaceholder ?? t('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-h-[44px] w-full touch-manipulation rounded-xl border-2 py-3 pe-3 ps-11 text-base outline-none transition-all focus:border-opacity-100 sm:py-3 sm:pe-4 sm:ps-12 sm:text-base"
            style={{
              backgroundColor: cssVars.neutral.bg,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="-mx-2 overflow-x-auto sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="hidden md:table-header-group">
                <tr style={{ backgroundColor: cssVars.neutral.bg }}>
                  {columns.map((column) => (
                    <th
                      key={String(column.key)}
                      className="px-4 py-3 text-start text-xs font-bold sm:text-sm lg:px-6 lg:py-4"
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
                    <td colSpan={columns.length} className="px-4 py-8 text-center sm:py-12">
                      <div
                        className="text-sm font-semibold sm:text-base lg:text-lg"
                        style={{ color: cssVars.neutral.textSecondary }}
                      >
                        {t('loading')}
                      </div>
                    </td>
                  </tr>
                ) : paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-8 text-center sm:py-12">
                      <div
                        className="text-sm font-semibold sm:text-base lg:text-lg"
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
                        className={`border-0 transition-all active:scale-[0.98] md:hidden ${
                          onRowClick ? 'cursor-pointer' : ''
                        }`}
                        whileTap={onRowClick ? { scale: 0.98 } : {}}
                        style={{ border: 'none' }}
                      >
                        <td className="border-0 p-0" style={{ border: 'none' }}>
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
                              {columns
                                .slice(0, Math.min(3, columns.length))
                                .map((column, colIndex) => (
                                  <div
                                    key={String(column.key)}
                                    className={`flex items-start justify-between gap-3 ${
                                      colIndex < Math.min(3, columns.length) - 1
                                        ? 'border-b pb-3'
                                        : ''
                                    }`}
                                    style={{
                                      borderColor: `color-mix(in srgb, ${cssVars.neutral.border} 50%, transparent)`,
                                    }}
                                  >
                                    <span
                                      className="min-w-[90px] flex-shrink-0 text-xs font-bold"
                                      style={{ color: cssVars.neutral.textSecondary }}
                                    >
                                      {column.header}
                                    </span>
                                    <span
                                      className="flex-1 break-words text-right text-sm font-semibold"
                                      style={{ color: cssVars.secondary.DEFAULT }}
                                    >
                                      {column.render
                                        ? column.render(item)
                                        : String(
                                            ((item as unknown as Record<string, unknown>)[
                                              String(column.key)
                                            ] as string | number | boolean | null | undefined) ??
                                              '-'
                                          )}
                                    </span>
                                  </div>
                                ))}
                              {columns.length > 3 && onRowClick && (
                                <div
                                  className="mt-2 flex items-center justify-center gap-2 border-t pt-2"
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
                                  <ChevronLeft
                                    className="h-3 w-3 rtl:rotate-180"
                                    style={{ color: cssVars.primary.DEFAULT }}
                                  />
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
                        className={`hidden border-t transition-all md:table-row ${onRowClick ? 'cursor-pointer hover:bg-opacity-50' : ''}`}
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
                            className="whitespace-nowrap px-4 py-3 text-xs sm:text-sm lg:px-6 lg:py-4"
                            style={{ color: cssVars.neutral.textSecondary }}
                          >
                            {column.render
                              ? column.render(item)
                              : String(
                                  ((item as unknown as Record<string, unknown>)[
                                    String(column.key)
                                  ] as string | number | boolean | null | undefined) ?? '-'
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
          className="flex flex-col items-center justify-between gap-3 border-t px-3 py-3 sm:flex-row sm:gap-0 sm:px-4 sm:py-4 lg:px-6"
          style={{ borderColor: cssVars.neutral.border }}
        >
          <div
            className="text-center text-xs font-semibold sm:text-start sm:text-sm"
            style={{ color: cssVars.neutral.textSecondary }}
          >
            عرض {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} من{' '}
            {filteredData.length}
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl transition-all active:scale-95 disabled:opacity-50 sm:h-10 sm:w-10"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
              }}
            >
              <ChevronRight
                className="h-5 w-5 sm:h-5 sm:w-5"
                style={{ color: cssVars.primary.DEFAULT }}
              />
            </motion.button>

            <div className="hidden items-center gap-1.5 sm:flex sm:gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(page)}
                  className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-xl text-sm font-bold transition-all active:scale-95 sm:h-10 sm:w-10 sm:text-sm"
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
            <div
              className="px-2 text-xs font-bold sm:hidden sm:text-sm"
              style={{ color: cssVars.primary.DEFAULT }}
            >
              {currentPage} / {totalPages}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl transition-all active:scale-95 disabled:opacity-50 sm:h-10 sm:w-10"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
              }}
            >
              <ChevronLeft
                className="h-5 w-5 sm:h-5 sm:w-5"
                style={{ color: cssVars.primary.DEFAULT }}
              />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
