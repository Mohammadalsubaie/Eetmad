export const radius = {
  none: '0',
  sm: '0.125rem', // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px - للأزرار الصغيرة والـ badges
  xl: '0.75rem', // 12px - للأزرار العادية والـ inputs (rounded-xl في النموذج)
  '2xl': '1rem', // 16px - للبطاقات (rounded-2xl في النموذج)
  '3xl': '1.5rem', // 24px - للبطاقات الكبيرة (rounded-3xl في النموذج)
  full: '9999px', // للدوائر
} as const;

export type Radius = typeof radius;
