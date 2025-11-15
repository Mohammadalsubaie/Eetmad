/**
 * CSS Variables للاستخدام مع inline styles
 * هذه المتغيرات تتغير تلقائياً عند تبديل الثيم
 * استخدم هذه بدلاً من استيراد colors مباشرة
 */

export const cssVars = {
  primary: {
    DEFAULT: 'var(--color-primary)',
    dark: 'var(--color-primary-dark)',
    darker: 'var(--color-primary-darker)',
    light: 'var(--color-primary-light)',
  },
  secondary: {
    DEFAULT: 'var(--color-secondary)',
    darker: 'var(--color-secondary-darker)',
  },
  accent: {
    primary: 'var(--color-accent-primary)',
    DEFAULT: 'var(--color-accent)',
    secondary: 'var(--color-accent-secondary)',
    dark: 'var(--color-accent-dark)',
    warm: 'var(--color-accent-warm)',
    light: 'var(--color-accent-light)',
  },
  neutral: {
    bg: 'var(--color-neutral-bg)',
    background: 'var(--color-neutral-background)',
    surface: 'var(--color-neutral-surface)',
    surfaceAlt: 'var(--color-neutral-surface-alt)',
    border: 'var(--color-neutral-border)',
    textMuted: 'var(--color-neutral-text-muted)',
    textSecondary: 'var(--color-neutral-text-secondary)',
    light: 'var(--color-neutral-light)',
    DEFAULT: 'var(--color-neutral)',
    dark: 'var(--color-neutral-dark)',
    darker: 'var(--color-neutral-darker)',
  },
  status: {
    success: 'var(--color-status-success)',
    error: 'var(--color-status-error)',
    warning: 'var(--color-status-warning)',
    info: 'var(--color-status-info)',
  },
  gradient: {
    gold: 'var(--gradient-gold)',
    primary: 'var(--gradient-primary)',
    hero: 'var(--gradient-hero)',
    cta: 'var(--gradient-cta)',
  },
} as const;

// Helper function to add opacity to CSS variables
export const withOpacity = (cssVar: string, opacity: number) => {
  // Extract the variable name
  const varName = cssVar.replace('var(', '').replace(')', '');
  // Return with opacity (works with rgb colors)
  return `color-mix(in srgb, ${cssVar} ${opacity * 100}%, transparent)`;
};
