export const shadows = {
  sm: '0 1px 2px var(--shadow-color-sm)',
  md: '0 4px 6px var(--shadow-color-md)',
  lg: '0 10px 15px var(--shadow-color-lg)',
  xl: '0 20px 25px var(--shadow-color-xl)',
  '2xl': '0 25px 50px var(--shadow-color-2xl)',
} as const;

export type Shadows = typeof shadows;
